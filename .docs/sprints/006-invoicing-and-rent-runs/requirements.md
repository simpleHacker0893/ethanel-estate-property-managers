# Sprint 006 · Invoicing and rent runs

**Phase 1 — Money · Week 6 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Bill 500 units in under two minutes, twice, without creating a duplicate.

## Services touched

- money-svc
- money-worker
- docs-svc
- docs-worker

## In scope

- Invoices, rent schedules, pro-rata on mid-month move-in, charge types (rent, service charge, water by meter reading, penalties), credit notes.
- The rent run (D-40): 500 units in one run, under 2 minutes. Batched through pg-boss, idempotent per unit, resumable after a crash, safe to run twice.
- docs-svc + docs-worker with Playwright (D-10): invoice, receipt and statement templates rendering from HTML.
- Draft and submit the WhatsApp notification templates now, three sprints before Sprint 009 needs them (RISKS R-05).

## Out of scope

- Payment capture and matching (Sprint 007).
- Notification delivery (Sprint 009).

## Depends on

- 005 (ledger), 004 (staging seed at scale)

## Readiness items paid

- D-40
- E4 (partial - invoice run load only)

## Blocked by

- Q9 (late rent penalty)
- Q10 (how water is billed)

## Exit criteria

- A 500-unit run on the staging seed finishes inside the D-40 budget.
- Running the same rent run twice creates no duplicate invoices and no duplicate postings.
- An invoice, a receipt and a statement render as PDFs that a partner would send to a landlord unedited.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
