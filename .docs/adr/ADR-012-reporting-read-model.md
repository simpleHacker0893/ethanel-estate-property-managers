# ADR-012 · Reporting is a read-model service fed by outbox events

**Status:** accepted · **Decision:** D-67 · **Date:** 15 September 2026
**Exercised:** Sprint 002 (schema created), Sprint 004 (first read models)
**Supersedes:** v1.1's cross-module `reporting` design, suspended by D-11

The rent roll, arrears ageing and landlord statement each span four or five
services, and D-11 forbids cross-schema joins — so v1.1's materialised summary
tables built by cross-module joins were suspended, leaving `reporting` with no
owner. We are adding a **tenth logical service owning a `reporting` schema, fed
only by outbox events**, materialising `rpt_*` tables with a replay path. It is
decided now and its schema is created in **Sprint 002 alongside the other nine**,
rather than at the end of Sprint 004 as originally scheduled.

## Considered options

**Composition in `web`** — each service exposes report endpoints, `web` joins
pages in memory. Rejected on a requirement already committed: `ARCHITECTURE.md`
§7.4 needs server-side sort, filter and grouping across the whole set for
datasets over 5,000 rows, and in-memory composition cannot do that across five
services without pulling everything into a request pod. It also has no staleness,
which is its real attraction — see the consequence below for why that matters
less than it appears.

**A `reporting` schema with read-only Postgres subscriptions or views onto the
others.** Rejected, and it is the option to stay away from. It is the cheapest to
write and the only one that damages the chassis: it re-creates precisely the
coupling D-11 exists to prevent, and it makes the later Neon-project split that
`SERVICE-TOPOLOGY.md` §2 promises — "a connection-string change, because nothing
joins across the line" — painful instead of trivial.

## Why the date moved forward, from Sprint 004 to Sprint 002

Two reasons, and the second is the one that decided it.

Under **D-54** a new *service* costs a package, a schema and a role — four
Deployments already host the eleven existing ones, so this twelfth service (and
tenth schema) adds no pod, no PodDisruptionBudget and no rollout step. The thing
that used to make "one more service" expensive is gone.

And Sprint 002 already creates the nine domain schemas up front "even though only
`identity` has tables this week", on the stated grounds that a boundary is cheap
now and expensive to retrofit. `reporting` is a boundary of exactly that kind.
Deciding it in Sprint 004 would have meant creating nine schemas in week 2 and a
tenth in week 4 for no reason other than the calendar.

## Consequences

- **Reports are eventually consistent, and that is bounded by D-45.** Every
  landlord-facing and dashboard figure already reads **live** from the ledger
  with a "last updated" stamp, so the figures someone acts on are explicitly out
  of this service's scope. Staleness applies to reports, where it is tolerable.
- **A replay path has to exist and has to be tested.** Rebuilding `rpt_*` from
  the event stream is the correctness story for this service; without it, a bug
  in a projection is unrecoverable. It is not optional scaffolding.
- **Every figure still reconciles to the ledger** (PRD M7-05), and reports are
  fed by outbox events, never by a cross-schema join. Both rules pre-date this
  ADR and are unaffected by which option was chosen.
- **Sprint 004 is unblocked either way.** It was already scoped to build the grid
  against `property`- and `money`-owned endpoints only, which covers the rent
  roll and does not prejudge this answer.
- **Sprint 005's ledger design can proceed.** It was waiting on this, which is
  why §7.4 dated the decision to the end of Sprint 004.
