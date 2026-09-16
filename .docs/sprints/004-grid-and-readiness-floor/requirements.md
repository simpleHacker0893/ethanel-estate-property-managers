# Sprint 004 · The grid and the readiness floor

**Phase 0 — Platform · Week 4 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Give every future screen one grid and one chart primitive, and prove the database can be restored.

## Services touched

- web
- platform

## In scope

- One reusable <DataGrid> on AG Grid Community, server-side: sort, filter, group with subtotals, copy and paste to and from Excel, print-formatted report (the grid requirements). Graded against the Sprint 001 partner spreadsheets.
- Record the trigger that buys the AG Grid Enterprise licence (pivot tables) rather than buying it now.
- Chart primitives: Recharts via shadcn charts (D-21).
- Observability (D-36): Sentry, CloudWatch Container Insights, uptime checks, alerts routed to WhatsApp and SMS.
- Write the SLO definitions now (alerting is wired in Sprint 014): webhook failure rate, queue age, error rate, reconciliation rate.
- Backups (D-37): Neon PITR plus a nightly encrypted dump to S3 in a second region.
- Run the first database restore drill (E7). Time it. Write down the steps as they actually happened.
- Anonymised staging seed (E22): mock listings, every user role, transaction history - production-shaped and production-sized.

## Out of scope

- Pivot tables.
- Offline grid editing.

## Depends on

- 003 (something to put in the grid)

## Readiness items paid

- D-36
- D-37
- E7
- E22

## Blocked by

- _none_

## Exit criteria

- The grid does every behaviour in the grid requirements on real partner data.
- You have restored the database from backup once, on the clock, with the steps written down.
- The staging seed is large enough to make a 500-unit rent run meaningful in Sprint 006.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
