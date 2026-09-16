# Sprint 002 Blueprint — The chassis and tenancy

**Phase 0 — Platform · Week 2 of 16**

## Objective

Make the marginal service nearly free, and make cross-organization leakage
structurally impossible rather than carefully avoided.

## Why this week is different

**Sprint 002 blocks everything** (`ROADMAP.md` critical path), and everything
built here is inherited by every Deployment. A chassis defect is not a bug in one
place, it is the same bug in eleven services.

So the interfaces get designed **before** either is written. Design
`packages/chassis` more than one way and compare the candidates on depth,
locality and seam placement before committing. The cost of a second design is
hours; the cost of the wrong seam is fourteen sprints.

> D-54 took work out of this sprint: **four Deployments, not fifteen** — one Helm
> values file per Deployment, four NetworkPolicies, one rollout order. That
> margin is explicitly **not** spent pulling go-live earlier; it goes to Sprint
> 007 and Phase 4. Do not expand scope into it.

## Files to review first

- `../../AGENTS.md` — the non-negotiable engineering rules apply from this sprint
- `../../DECISIONS.md` — D-11, D-54, D-34; and `../../DOMAIN.md` §2, the identity model
- `../../SERVICE-TOPOLOGY.md` — the schemas and the four Deployments (now ten schemas: D-67 adds `reporting`)
- `../../VALIDATION.md` §2 — this sprint creates three of the permanent gates
- `./requirements.md`, `./acceptance.md`

## The trap that would make this sprint pass while being broken

**Neon's pooled connections run in transaction mode.** Therefore:

- the RLS hook must use **`SET LOCAL`**, not `SET`, and
- the application role must **not** hold `BYPASSRLS`.

Get either wrong and **the hook silently does nothing while every tenancy test
still passes** — because the tests run as a role that can see everything anyway.

This sprint owes a test that **fails when the hook is a no-op**. Not a test that
passes when the hook works; those are worthless here. Design that test first,
before the hook exists, and prove it goes red by deliberately breaking the hook.

This is the single highest-value hour in the sprint. `RECONCILIATION.md` flagged
it; do not let it become a footnote.

## Work

### 1 · `packages/chassis`

Config loading, structured logging, OpenTelemetry, readiness and liveness probes,
graceful shutdown, error envelope, zod→OpenAPI emission, internal JWT signing and
verification, `pg-boss` wiring, and the Prisma 7 base client with the RLS
transaction hook.

Design candidates first, then build one. Expand → migrate → contract is the rule
for changes to this package from the moment a second service exists.

### 2 · `charts/service` — the Helm library chart

Every Deployment inherits it: probes, CPU and memory requests and limits,
PodDisruptionBudget, non-root with read-only root filesystem, default-deny
NetworkPolicy with an explicit allow list.

**Rows 1–5 of the D-34 gates become structural.** A Deployment that omits any of those five must not
be renderable — not "should be caught in review". If a gate can be omitted and
still deploy, the chart is not done.

> **Settled (D-65), and it was not really a count conflict.** D-34 names eight
> gates and the list is now written out row by row in `READINESS.md` §1a with an
> enforcement home against each. **Only five of the eight can be structural in
> this chart.** Image scanning is a CI step, graceful worker shutdown is a
> chassis behaviour, and per-namespace resource quotas are a namespace manifest —
> a Helm chart can render none of the three. Make the chart enforce rows 1–5 by
> construction, and check rows 6–8 where they actually live.

### 3 · The ten schemas and their roles

One Prisma schema each, created up front, even though only `identity` has tables
this week. The boundary is cheap now and expensive to retrofit (D-11, D-54).

**A service module loads its own client bound to its own role.** Several services
share a Deployment under D-54, so an in-process caller is common — and it still
cannot read across a boundary, because Postgres refuses. Working around a
contract because the callee is "right there" is a chassis defect, not a shortcut.

Commit `prisma/migrations/**/migration.sql`: graphify does not parse `.prisma`,
so migrations are how the schema reaches the knowledge graph.

### 4 · `identity-svc` for real

Organizations mirrored from Clerk, users, memberships, roles, permission checks,
immutable audit log, Clerk webhooks. Google sign-in end to end.

The permission matrix is PRD §4.2, with property-level assignment scoping. The
identity model from `DOMAIN.md` §2 is the part to get right: **membership is
optional**, landlords and residents are **not** organization members, so their
RLS policies span organizations, and `verified_phones` is the only link between a
Google identity and payments, chats, leases or leads.

> **Q11 is ANSWERED (D-63): the gate is accepted as designed.** WhatsApp one-time code, SMS fallback, hashed, five attempts per hour; a number change re-verifies; a manual re-link is `org:owner` or `org:admin` only and is audited; one standard, no weaker prospect tier (D-59). The gate does not wait on Meta — if WhatsApp Business verification (R-05) is not through, it ships SMS-only. This
> is the sprint that builds the gate. Get the answer before building the flow, or
> build the gate behind a seam you can change.

### 5 · The cross-organization test harness (E3)

A generator: for every table registered in a service's manifest, assert
organization A cannot **read**, **write** or **enumerate** organization B's rows.

From this sprint on, **adding a tenant-scoped table without an RLS policy fails
CI.** Sprint 013 audits this to completeness; if that audit turns out to be a
writing exercise rather than a coverage check, the harness was built wrong.

### 6 · Image vulnerability scanning in CI

Blocking on high and critical.

## Vertical slices

1. Prefactor: chassis design candidates compared, seams chosen. *Sequenced first.*
2. The failing-by-default RLS no-op test, red.
3. Chassis config, logging, error envelope, probes, shutdown — thin, one service consuming it.
4. Prisma base client + RLS hook with `SET LOCAL`, turning slice 2 green.
5. `charts/service` with the pinned gate list, structural.
6. Ten schemas and roles, migrations committed — the nine domain schemas plus `reporting` (D-67, ADR-012).
7. `identity-svc`: Clerk mirror, Google sign-in, memberships, audit log.
8. E3 harness + CI wiring, and a deliberately policy-less table proving CI rejects it.
9. Scaffold a throwaway second service end to end, timed.
10. Move one service to its own Deployment, once, to prove the split path.

Slices 9 and 10 **are** two of the exit criteria, not a victory lap.

## Out of scope

- Property, money or messaging domain models.
- Any grid or reporting work.
- Splitting more than one service out.

## Graph queries before starting

```bash
graphify query "what already exists for config, logging and database access?"
graphify affected "chassis" --depth 3
```

`affected` will be thin this week — nothing inherits the chassis yet. Run it
anyway, so the Sprint 003 comparison has a baseline.

## Risks this sprint could realise

- **R-01 — eleven boundaries, one person.** The first exit criterion *is* the
  tripwire: if scaffolding a new service and reaching staging takes more than a
  day, R-01 has fired and the plan needs revisiting, not more hours.
- **R-01's second tripwire** points the other way: services sharing a pod must
  not start reaching across each other's schemas. The `god-nodes` check in
  `acceptance.md` is how that gets noticed.
