# Ethanel — 16-Sprint Architectural Roadmap

One-week sprints (D-50). Sprint 016 ends with the first paying agency collecting
rent through Ethanel. Read `SERVICE-TOPOLOGY.md` first; this file sequences it.

## The shape of the plan

| Phase | Sprints | Question it answers |
|---|---|---|
| **0 — Platform** | 001–004 | Can a new service reach production in a day, and can an agency's portfolio be represented at all? |
| **1 — Money** | 005–007 | Does rent arrive, land in the right account, and reconcile itself? |
| **2 — Operations** | 008–010 | Can the people who use this daily — caretakers, residents, accountants — do their whole job in it? |
| **3 — Market** | 011–012 | Can a firm win business and be billed for it? |
| **4 — Readiness** | 013–016 | Would you put a stranger's rent through this? |

Phase 0 is four weeks of no visible product. That is deliberate. Eleven service
boundaries built on an improvised chassis would cost more than four weeks across
sprints 005–016, paid in fragments, invisibly — and the chassis is also what
makes D-54's deferred split cheap later, so it is not optional under the reduced
deployment count either.

D-54 (four Deployments, not fifteen) takes work out of Sprint 002 — one Helm
values file per Deployment instead of fifteen, four NetworkPolicies instead of
fifteen, one rollout order instead of fifteen. **That margin is not spent pulling
go-live earlier.** It goes to Sprint 007, the riskiest week, and to Phase 4,
which is the reason this plan is sixteen weeks. Sixteen one-week sprints stands
(D-50); if Phase 0 exits early, the gain shows up as slack in sprints 011 and 012
rather than as a new date.

## Critical path

```
002 chassis ──┬──> 003 property ──> 005 ledger ──> 006 invoicing ──> 007 payments ──┐
              │                                                                      │
              └──> 004 grid ────────────────────────────────────────────────────────┤
                                                                                     ▼
                                                        008 ops ──> 009 messaging ──> 010 resident+landlord
                                                                                     │
                                                    011 marketplace, 012 land+billing┤ (parallelisable, off the path)
                                                                                     ▼
                                                                    013 ──> 014 ──> 015 ──> 016 go-live
```

**Sprint 002 blocks everything.** **Sprint 007 is the riskiest week in the
plan** — it is the only sprint whose exit criterion depends on a third party
(Daraja) and on data quality you do not control. It is scheduled at week 7 of 16
on purpose: there are nine sprints of real usage behind it before anyone's rent
depends on it.

Sprints 011 and 012 are the designated slip absorbers. If 007 overruns, the
marketplace moves to R1.1 and the pilot ships as a management platform. Nothing
in 013–016 may be traded away — those sprints exist because you marked 18 of 22
readiness items "pay before go-live", and this plan's whole reason for being 16
weeks instead of 12 is to actually pay them.

---

## Phase 0 — Platform

### Sprint 001 · Ground truth and the pipeline
**Services:** `web`, `identity-svc` (as a hello-world) · **Pays:** D-32, D-38, E11, E17, E18, D-49, D-52, D-53

The week is half measurement, half plumbing, because three decisions that are
hard to reverse are still guesses.

- Measure Nairobi → Neon latency across `af-south-1`, `eu-west-1`, `eu-central-1`
  on a real Safaricom connection, p50 and p95. Decide the region. Write ADR-002.
- Collect real sample files from the design partners (the partner sample files): their current rent
  roll spreadsheet, a landlord statement, a bank/M-Pesa statement export, a lease.
  These become the fixtures for sprints 004, 006, 007 and 015. **Nothing else in
  this plan is more valuable per hour than these files.**
- Write up the caretaker phone and data audit as a constraints document:
  device classes, screen sizes, data cost per MB, where they stand when they use
  the phone. This is the spec `ops-svc`'s UI is graded against in Sprint 008.
- Monorepo: pnpm + Turborepo, TypeScript strict, ESLint, Prettier, Renovate
  weekly, Husky. `.docs/` pack committed. GitHub Issues + Projects. Trunk-based.
- OpenTofu: VPC, EKS Auto Mode cluster, ECR, Neon project, AWS Secrets Manager,
  External Secrets Operator, Cloudflare zone.
- GitHub Actions → Helm → `staging` namespace, with a manual gate to `production`.

**Exit:** a commit on `main` reaches the staging cluster with no human step, the
region is decided and recorded, and the partner sample files are in the repo as
anonymised fixtures.

### Sprint 002 · The chassis and tenancy
**Services:** chassis package, Helm library chart, `identity-svc` · **Pays:** D-34 (rows 1–7 of the eight; see `READINESS.md` §1a for which gate is enforced where), E3 (harness)

The most leveraged week in the plan. Everything built here is inherited fifteen
times.

- `packages/chassis`: config loading, structured logging, OpenTelemetry, readiness
  and liveness probes, graceful shutdown, error envelope, zod→OpenAPI emission,
  internal JWT signing and verification, `pg-boss` wiring, Prisma 7 base client
  with the RLS transaction hook.
- `charts/service`: a Helm library chart every Deployment inherits — probes, CPU
  and memory requests and limits, PodDisruptionBudget, non-root with read-only
  root filesystem, default-deny NetworkPolicy with an explicit allow list. The D-34
  gates become structural: a Deployment cannot be rendered without them.
- The **ten** domain schemas and their roles created up front — the nine service
  schemas plus `reporting` (D-67, ADR-012) — one Prisma schema
  each, even though only `identity` has tables this week. The boundary is cheap
  now and expensive to retrofit (D-11, D-54).
- Image vulnerability scanning in CI, blocking on high and critical.
- `identity-svc` for real: organizations mirrored from Clerk, users, memberships,
  roles, permission checks, immutable audit log. Google sign-in end to end.
- The tenancy pattern proven: `organization_id` + RLS policy + the chassis hook.
- The **cross-organization test harness** (E3): a generator that, for every table
  registered in a service's manifest, asserts organization A cannot read, write or
  enumerate organization B's rows. From this sprint on, adding a table without a
  policy fails CI.

**Exit:** a second service can be scaffolded — schema, role, contract, job
handlers, loaded by an existing Deployment — and reach staging in under a day,
and moving one to its own Deployment is a `values.yaml` change that has been done
once to prove it. A user signs in with Google, lands in their organization, and
is provably unable to see another organization's data.

### Sprint 003 · The property domain
**Services:** `property-svc`, `web` shell · **Pays:** —

- `property-svc`: landlords, properties, units, unit types, amenities, media,
  leases, residents, lease lifecycle (move-in, renewal, notice, move-out),
  deposits held, caretaker assignment, occupancy.
- Media: S3 + CloudFront, signed URLs, server-side image compression.
- `web` shell: organization switcher, navigation, role-aware routing, shadcn/ui +
  Radix + Tailwind v4 token set (D-19), `next-intl` scaffolding with English only
  (D-25), the nuqs + TanStack Query conventions (D-17, D-23).

**Exit:** a design partner's smallest building — properties, units, landlords,
residents, leases — is represented correctly, entered by hand, and the domain
model survives contact with their actual paperwork from Sprint 001.

### Sprint 004 · The grid and the readiness floor
**Services:** `web`, platform · **Pays:** D-36, D-37, E7, E22

Two unrelated things share this sprint because both are foundations that get
more expensive the later they land.

- One reusable `<DataGrid>` on AG Grid Community, server-side: sort, filter,
  group with subtotals, copy and paste to and from Excel, print-formatted report
  (the grid requirements). Pivot tables stay out until the Enterprise licence trigger — record what
  the trigger is. Graded against the partner spreadsheets from Sprint 001.
- Chart primitives: Recharts via shadcn charts (D-21).
- Observability: Sentry, CloudWatch Container Insights, uptime checks, alerts to
  WhatsApp and SMS (D-36). SLO definitions written now; alerting wired in 014.
- Backups: Neon PITR plus a nightly encrypted dump to S3 in a second region
  (D-37). **Run the first restore drill this week** (E7) and time it.
- Anonymised staging seed (E22): mock listings, all user roles, transaction
  history — shaped like production, sized like production.
- **Decide ADR-012, the reporting read model** (`ARCHITECTURE.md` §7.4). D-11
  forbids the cross-schema joins the old `reporting` module used, and the rent
  roll, arrears ageing and landlord statement each span four or five services.
  Three candidates are written up; pick one this week, because Sprint 005's
  ledger design depends on which it is. The grid itself is built against
  `property` and `money` endpoints only, so it does not prejudge the answer.

**Exit:** the grid does everything the grid requirements ask on real partner data, you have
restored the database from backup once, on the clock, with the steps written
down, and ADR-012 is written.

---

## Phase 1 — Money

### Sprint 005 · Ledger core
**Services:** `money-svc` · **Pays:** E1

- Chart of accounts per organization, pinned in `DOMAIN.md` §4 (D-61): lease
  receivable (**not** resident receivable — D-57), deposit liability,
  landlord payable, agency commission income, VAT, repairs expense, client
  account cash, suspense.
- Double-entry journal: entries and lines, immutable once posted, `bigint` minor
  units, UUIDv7, period close, trial balance.
- Reversal rules (D-44): an accountant reverses with a reason; above a threshold it
  needs admin approval. **The threshold is unknown — see QUESTIONS.md Q1.**
- Automated posting and reconciliation tests (E1) begin here and are a merge gate
  on `money-svc` forever after, including property-based tests asserting the
  trial balance nets to zero after any sequence of operations.

**Exit:** every money movement the pilot needs — rent, deposit, refund, repair
cost, commission, landlord remittance, penalty, write-off — is expressible as a
journal entry, and the ledger cannot be made to unbalance.

### Sprint 006 · Invoicing and rent runs
**Services:** `money-svc`, `money-worker`, `docs-svc`, `docs-worker` · **Pays:** D-40, E4 (partial)

- Invoices, rent schedules, pro-rata on mid-month move-in, charge types (rent,
  service charge, water by meter reading, penalties), credit notes.
- The rent run: **500 units in one run, under 2 minutes** (D-40). Batched through
  `pg-boss`, idempotent per unit, resumable after a crash, and safe to run twice.
- `docs-svc` + Playwright: invoice, receipt and statement templates (D-10).

**Exit:** a 500-unit run on the staging seed finishes inside the D-40 budget, and
running it a second time creates no duplicate invoices.

### Sprint 007 · Payments and reconciliation — the risk sprint
**Services:** `payments-svc`, `payments-worker`, `gateway` · **Pays:** D-39 (instrumented), D-41

- Daraja: paybill/C2B for residents who pay from their own handset, STK push for
  pay-from-the-app. Client-account mapping per agency.
- `gateway` webhook ingress: signature verification, idempotency key, persist to
  inbox, 200 immediately. **Load tested this sprint to 50 callbacks/second for
  10 minutes with zero loss** (D-41).
- The reconciliation engine: account-number parsing, fuzzy resident match via
  `pg_trgm`, confidence scoring, auto-post above threshold, suspense account plus
  a manual match queue below it.
- The auto-match rate is instrumented from the first payment, so D-39's 95% bar is
  a number on a dashboard from week 7, not a discovery in week 15.

**Exit:** the measured auto-match rate against the partners' real M-Pesa
statements is published, whatever it is, and the burst test passes. If the rate
is below 95%, the gap and its causes are written into `RISKS.md` and the fix is
scoped into Sprint 015, not hand-waved.

---

## Phase 2 — Operations

### Sprint 008 · Repairs, caretakers and running costs
**Services:** `ops-svc` · **Pays:** D-42

- Repair requests raised by residents, work orders, assignment to caretaker or
  vendor, status transitions, photo evidence, cost capture posting to the ledger
  as expense against the right property.
- Inspections, water meter readings feeding Sprint 006's charges, running-cost
  categories, vendor records.
- Caretaker UI graded against Sprint 001's constraints document: online-only (D-42),
  the task list is the home screen, large touch targets, client-side image
  compression before upload, every screen under a stated KB budget.

**Exit:** repair request → work order → cost → landlord statement line completes
end to end, and a caretaker completes a task on a real low-end handset over
mobile data without you sitting next to them.

### Sprint 009 · WhatsApp and notifications
**Services:** `messaging-svc`, `messaging-worker` · **Pays:** D-43, D-48

- WhatsApp Business API: template catalogue and approval tracking, the 24-hour
  window, inbound routing to a conversation.
- Inbox: one assignee per conversation, everyone else read-only (D-43), claim and
  release, polling every 20–60 seconds (D-09).
- Notification engine: per-event-group, per-channel preferences with financial
  notices mandatory and unturnoffable (D-48). WhatsApp primary, SMS fallback,
  email for documents.
- The pilot's actual notifications: rent due, rent received with receipt, arrears
  nudge, repair status, lease expiry.

**Exit:** a resident pays and receives a WhatsApp receipt generated from the
ledger entry, and two staff cannot reply to the same conversation.

### Sprint 010 · Resident and landlord experience
**Services:** `web`, `money-svc` · **Pays:** D-45

- Resident PWA (Serwist, shell and static assets precached, no offline data —
  D-24): balance, pay now via STK push, payment history, receipts, raise a repair
  request, lease documents.
- Landlord portal: figures read live from the ledger with a "last updated" stamp
  (D-45) — never a cached summary table. Monthly statement, arrears, repairs spend,
  occupancy, remittance history.
- Accountant month-end: rent roll, arrears ageing, landlord remittance run,
  commission calculation, VAT, period close.

**Exit:** a partner's accountant runs a full month-end close on staging against
their own portfolio data and signs off on the numbers.

---

## Phase 3 — Market

### Sprint 011 · Marketplace, storefronts and viewings
**Services:** `listing-svc` · **Pays:** D-46

- Listings for units, houses and plots, sale or lease; media; Postgres full-text
  search with `pg_trgm` (D-06); filters; saved searches.
- Public storefront per organization: Ethanel theme with the organization's logo
  and accent colour (D-27). **This is the only surface using Cache Components /
  `use cache` (D-18)** — the reason is that it is the only surface where a page can
  be stale without someone losing money.
- Viewings: available slots, agent calendar, booking, confirmations. The agent
  starts a WhatsApp video call in the pilot; a Google Meet link is offered only
  after the prospect is verified (D-46).
- MapLibre GL map view of listings (D-26).

**Exit:** a storefront is publicly reachable and indexable, and a prospect books
and attends a viewing without anyone touching a phone book.

### Sprint 012 · Land inventory, God's-eye view, billing
**Services:** `listing-svc`, `billing-svc` · **Pays:** E9, E19 (accepted debt)

- Plot inventory for land-selling companies: subdivisions, plot status
  (available, reserved, sold), instalment sale schedules posting to the ledger.
- God's-eye view: MapLibre 2D portfolio map as the default, CesiumJS 3D loaded
  on demand only and never on the resident path (D-26).
- `billing-svc`: plans priced by units, properties and features; usage counters
  recorded from this sprint even though pilot invoicing is done by hand (E19);
  per-organization feature flags (E9) gating every surface that might need to be
  switched off during the pilot.

**Exit:** a land company is onboarded end to end, and every pilot-risky feature
is behind a flag you can flip per organization without a deploy.

---

## Phase 4 — Readiness

These four sprints are the reason this plan is 16 weeks. Cutting them does not
save four weeks; it moves them to after the money is real.

### Sprint 013 · Security, isolation and obligations
**Pays:** E3 (completion), E5, E10, E12, D-34 (verification)

- Threat model day (E5): authentication, money, uploads, webhooks. One day, four
  surfaces, written output.
- E3 to completeness: every table and every endpoint, not a sample. The Sprint 002
  harness makes this an audit of coverage rather than a writing exercise.
- Verify each D-34 gate is actually live in `production`, not just in the chart:
  default-deny NetworkPolicies, non-root and read-only root filesystems, resource
  quotas per namespace, image scanning blocking merges.
- Public versioned API and API keys (E10): scopes, per-key rate limits, published
  OpenAPI, key rotation.
- Data Protection Act tooling (E12): data subject access export, deletion with
  ledger-retention carve-outs, retention schedules per data class.
- Secrets rotation procedure and the credential-leak runbook.

**Exit:** the gate list is green in CI output, not in someone's opinion.

### Sprint 014 · Reliability and operations
**Pays:** E2, E4, E8, E13, E15, D-35, D-37 (recurring)

- E2 end-to-end journeys in Playwright, running on every PR: rent payment,
  repair, month-end.
- E4 full load test: a 500-unit invoice run and a callback burst at the same
  time, at pilot scale, on production-shaped infrastructure.
- SLO alerting (E13): webhook failure rate, `pg-boss` queue age, error rate,
  reconciliation rate. Paged to WhatsApp and SMS.
- Runbooks (E8): M-Pesa outage, webhook failure backlog, WhatsApp outage,
  database restore, credential leak. Each one written by causing the failure in
  staging and recording what you actually did.
- Second restore drill; the monthly drill goes on the calendar (D-37).
- HPA tuning for `web` and `gateway`; worker replica plan for rent days (D-35).
- Cloud cost budgets and anomaly alerts (E15).

**Exit:** every failure mode that has occurred in staging has a runbook, and the
load test passes with both workloads running together.

### Sprint 015 · Pilot readiness
**Pays:** D-39 (the gate), D-47, E14, E17, and the usability tests

- Self-serve import (D-47): properties, units, residents, leases, opening balances.
  Dry run, validation report naming the row and the reason, rollback. Built
  against the Sprint 001 partner files, not against an invented format.
- Usability tests: 5 residents on pay and repair, 5 caretakers on tasks,
  3 accountants on month-end. Fixes land in this same sprint — that is why it is
  scheduled before go-live and not during it.
- **The D-39 gate, measured on real partner data: 95% of payments matched with no
  human action.** This is a go/no-go, not a target.
- ADRs complete for every hard-to-reverse decision (E17).
- E14: the Africa-first posture written down with the international scale path —
  what triggers a second region, and what changes when it happens.

**Exit:** the 95% bar is met on real data, and one partner's entire portfolio has
been imported without you editing a spreadsheet by hand.

### Sprint 016 · Go-live
**Pays:** the pilot

- Production cutover: live Daraja credentials, live WhatsApp number, DNS through
  Cloudflare with WAF rules tuned (D-29).
- Migrate the first partner for real, then **run one full rent cycle in parallel
  with their existing spreadsheet** and reconcile the two by hand. Discrepancies
  are go-live blockers.
- Go/no-go against the readiness checklist.
- Day-2: support rota, incident communications, a watched first week.

**Exit:** the first paying agency collects rent through Ethanel, and the two sets
of books agree.

---

## Release 1.1 backlog

Deferred deliberately, with the trigger that pulls each one forward:

| Item | Trigger |
|---|---|
| Swahili for residents and caretakers | Pilot feedback, or the second agency |
| Caretaker offline mode (D-42) | A caretaker reports a failed task submission twice |
| AG Grid Enterprise, pivots (D-20) | An accountant asks for a pivot in a usability test |
| Accessibility audit, WCAG 2.1 AA (E16) | First institutional or government client |
| Performance budgets in CI (E21) | Resident page p75 LCP exceeds 2.5s on 3G |
| External penetration test (E6) | First client handling more than 1,000 units, or a security questionnaire |
| Automated SaaS metering (E19) | More than 5 paying organizations |
| Multi-region database (E14) | Expansion outside East Africa |
| Mombasa, Nakuru, Nanyuki rollout | Second agency live in the Nairobi metro |

## How a sprint runs (D-51, D-52, D-53)

Branch from `main`, short-lived. Reviewer agents run first; you review every PR
diff yourself. Preview environment per PR. Tasks in GitHub Issues and Projects.
Each sprint folder under `.docs/sprints/` gets `requirements.md`, `blueprint.md`,
`acceptance.md` and `handoff-prompt.md` filled in the week before it starts —
just in time, so that Sprint 011's blueprint benefits from what Sprint 007 taught.
