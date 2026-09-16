# Ethanel — Deployable Architecture

Status: **reconciled.** Hardened into ADR-001 by D-54.
Derived from the round 2 answers, now recorded as **D-01–D-10** (stack) and
**D-28–D-38** (platform) in `DECISIONS.md`.

> **Reconciled with `.docs/ARCHITECTURE.md` and `.docs/PRD.md`** on 15 September
> 2026. Both are now at v1.2 and agree with this file and with `DECISIONS.md`.
> The one change this reconciliation made to *this* file is the deployment count:
> the service boundaries below are unchanged, but they are hosted in four
> Deployments rather than fifteen (D-54). **D-67 later added a twelfth service,
> `reporting-svc`, and a tenth schema — still inside the same four Deployments.** `RECONCILIATION.md` records what moved.

## 1. What runs

Twelve services. **Each owns exactly one Postgres schema, one database role and
one versioned contract** — that part is the architecture and it is not negotiable.
They are *hosted* in **four Kubernetes Deployments** on one EKS Auto Mode cluster
(D-54), and a service earns its own Deployment by meeting a trigger in
`ARCHITECTURE.md` §13.1 — not by being a service.

| # | Service | Schema | Owns | Hosted in |
|---|---|---|---|---|
| 1 | `web` | — | Next.js App Router (Active LTS line). Server Components, Server Actions, the BFF for every screen. Holds no domain logic and no direct database access outside its own session/cache needs. | **`web`** · HPA, min 2 |
| 2 | `gateway` | — | Public versioned REST API, API keys and scopes, **all inbound webhooks** (M-Pesa, WhatsApp, Clerk, Paystack). Verifies signature, writes to the owning service's inbox table, returns 200. | **`gateway`** · HPA, min 2 |
| 3 | `identity-svc` | `identity` | Organizations (Clerk org mirror), users, memberships, roles, permissions, property assignments, support sessions, audit log, Clerk webhook projection. | `web`, `gateway` |
| 4 | `property-svc` | `property` | Landlords, management agreements, properties, units, unit types, amenities, leases, residents, lease lifecycle, deposits held, inspections, caretaker assignment. | `web` |
| 5 | `listing-svc` | `listing` | Marketplace listings (unit / house / plot, sale or lease), plot inventory and subdivisions, storefronts, viewings, leads, sale milestones, search (Postgres FTS + `pg_trgm`). | `web` |
| 6 | `money-svc` | `money` | Chart of accounts, double-entry journal, invoices, rent schedules, credit notes, receipts, statements, reversals, period close, arrears, landlord periods and remittance records. **The only writer of ledger truth.** | `web`, `gateway` |
| 7 | `money-worker` | `money` | Rent runs, statement generation, arrears rollups, period close jobs. | **`worker`** · fixed replicas, scaled up before rent days (D-35) |
| 8 | `payments-svc` | `payments` | M-Pesa Daraja (paybill/C2B + STK push), payment intents, callback inbox, client-account mapping, idempotency keys, reconciliation engine, suspense account, manual match queue. | `web`, `gateway` |
| 9 | `payments-worker` | `payments` | Drains the callback inbox, matches, posts to `money-svc`. This is what absorbs the D-41 burst. | **`worker`** · headroom for 50 callbacks/s |
| 10 | `messaging-svc` | `messaging` | WhatsApp Business API, conversation inbox and assignment, notification preferences, template catalogue. | `web`, `gateway` |
| 11 | `messaging-worker` | `messaging` | Outbound send, retries, 24-hour-window handling, SMS/email fallback. | **`worker`** |
| 12 | `ops-svc` | `ops` | Repair requests, work orders, caretaker tasks, inspections, meter readings, running costs, expenses, approvals, vendors. | `web` |
| 13 | `docs-svc` | `docs` | Template catalogue and render requests for leases, receipts, invoices, statements; signature requests and certificates. | `web` |
| 14 | `docs-worker` | `docs` | Headless Chromium (Playwright) rendering (D-10). Memory-heavy, **kept in its own Deployment from day one** so a Chromium leak cannot take a request path down. | **`docs-worker`** · fixed, own resource class |
| 15 | `billing-svc` | `billing` | SaaS plans priced by units / properties / features, usage counters, per-organization feature flags (E9). Pilot invoicing is manual (E19). | `web` |
| 16 | `reporting-svc` | `reporting` | Read models, exports and saved views. Materialised `rpt_*` tables fed **only** by outbox events, with a replay path. Never a cross-schema join. Added by **D-67 / ADR-012** — the twelfth logical service, and the tenth schema. | `web` (reads), **`worker`** (projections) |

Rows 3–16 are ten domain services and their worker halves. "Hosted in `web`"
means the service module is loaded in-process by that Deployment and reached
through its contract — **never by a query across its schema line.** Each module
connects as its own role, so Postgres refuses a cross-boundary read even from a
caller sharing its pod.

**What makes this affordable solo.** Two things, and they are different. The
marginal cost of a new *service* must be a package and a schema, not a new
pipeline — that is what Sprint 002's chassis package and Helm library chart buy,
and if a new service takes more than a day to stand up after Sprint 002 the
chassis is wrong, so fix the chassis and not the service. The marginal cost of a
new *Deployment* is a floor of two replicas, a PodDisruptionBudget, a
NetworkPolicy, a rollout step and somewhere for a partial deploy to hide — which
is why the count starts at four and grows only when something forces it
(RISKS R-01).

## 2. Data

**One Neon project, schema per service.** Each service owns one Postgres schema
and connects with a role that can see only that schema.

House rules, enforced in review and in CI:

- No cross-schema joins. No cross-schema foreign keys.
- A service reads another service's data only through its contract in
  `packages/contracts` — in-process while they share a Deployment, over versioned
  `/v1` REST once split (§4). Never by a query across the schema line.
- `money` schema is append-only for postings. Corrections are new entries (D-44).

This keeps the boundary discipline of separate databases while keeping one
`pg-boss` installation, one full-text search index, one PITR timeline and one
backup drill. Splitting a schema onto its own Neon project later is a
connection-string change, because nothing joins across the line.

**Tenancy.** Every tenant-scoped table carries `organization_id uuid not null`
(the Clerk org id), plus a Postgres RLS policy keyed on
`current_setting('app.organization_id')`. The chassis sets it per transaction.
Application filtering alone is not the control; RLS is, and application
filtering is the ergonomics. E3 requires a cross-organization test on every
table and endpoint — RLS is what makes that test cheap to write and impossible
to forget, because a missing policy fails the test by default.

**Keys.** UUIDv7 everywhere (D-07), generated in the application.
**Money.** `bigint` minor units, KES, end to end (D-08). No float reaches money code.

## 3. Consistency across services

There are no distributed transactions. The pattern is **transactional outbox +
`pg-boss`** (D-04):

1. A service writes its own rows and an outbox row in one transaction.
2. Its worker publishes the outbox row as a `pg-boss` job.
3. The consumer handles it idempotently, keyed on the event id.

The money path is the one place this matters most:

```
M-Pesa → gateway (verify, persist to payments.callback_inbox, 200 OK)
       → payments-worker (idempotent match against invoices + residents)
       → money-svc POST /v1/postings  (double-entry, immutable)
       → outbox → messaging-worker (WhatsApp receipt)
```

`gateway` never does matching work inline. That is what lets 50 callbacks/second
for 10 minutes (D-41) survive a slow reconciliation query, a Daraja retry storm,
or a `money-svc` restart: nothing is lost, only delayed.

Unmatched payments land in a **suspense account** and a manual match queue. They
are money in the ledger from the moment they arrive; they are just not yet
attributed. That is the design that makes the D-39 bar (95% auto-matched) a
measurement rather than a cliff.

## 4. API surface (D-02)

- **Screens → `web`**: Server Actions. Not exposed publicly.
- **`web` → services** and **service → service**: the service's contract in
  `packages/contracts` — `/v1/...` shapes, OpenAPI generated from the zod
  schemas. While two services share a Deployment the call is in-process against
  that same contract; once one is split out it is versioned internal REST with a
  short-TTL signed internal JWT and a default-deny NetworkPolicy allowing only
  declared callers. **The call site does not change when it splits** — that is
  the whole point of routing every call through the contract from day one.
- **Outside world → Ethanel**: `gateway` only. API keys, scopes, per-key rate
  limits (E10).

The zod schemas live in a shared `packages/contracts` and are the single
definition of a request shape, its OpenAPI entry, and its React Hook Form
validation (D-22). One change, three places updated.

## 5. Edge and platform

Cloudflare (DNS, WAF, CDN) → AWS load balancer managed by EKS Auto Mode (D-28, D-29)
→ `web` / `gateway`. CloudFront serves media from S3 only. One cluster, `staging`
and `production` namespaces (D-30), OpenTofu for infrastructure (D-32), External
Secrets Operator against AWS Secrets Manager (D-33), GitHub Actions + Helm with a
manual production approval (D-31).

Valkey (ElastiCache) is cache only (D-05): Next.js cache, rate limit counters,
OTP codes, short-lived session data. **Nothing durable lives in Valkey.** Losing
the whole cluster must cost latency, never data — that is what makes D-04's choice
of `pg-boss` over a Redis queue load-bearing rather than a preference.

## 6. Region (D-38)

Open until Sprint 001 measures it. Candidates: `af-south-1` (Cape Town),
`eu-west-1` (Ireland), `eu-central-1` (Frankfurt). The measurement is p50/p95
round-trip from Nairobi on a real mobile network, not from a datacentre, because
the resident PWA is the latency-sensitive surface and it runs on Safaricom LTE.
E14's answer ("region africa, scale international later") biases toward
`af-south-1`; the measurement decides, and the result becomes ADR-002.
