# Sprint 008 · Repairs, caretakers and running costs

**Phase 2 — Operations · Week 8 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Let a caretaker do a full day's work on a cheap handset over mobile data, and make every shilling spent land on the right property's ledger.

## Services touched

- ops-svc

## In scope

- Repair requests raised by residents, work orders, assignment to caretaker or vendor, status transitions, photo evidence, cost capture posting to the ledger as expense against the correct property.
- Inspections, water meter readings feeding Sprint 006's charges, running-cost categories, vendor records.
- Caretaker UI graded against Sprint 001's constraints document: online-only (D-42), the task list is the home screen, large touch targets, client-side image compression before upload, a stated KB budget per screen that CI checks.

## Out of scope

- Offline mode (DEBT-03, R1.1).
- Vendor self-service portal.

## Depends on

- 005 (ledger for expense postings), 003 (units, caretaker assignment)

## Readiness items paid

- D-42

## Blocked by

- Q10 (water billing) if meter readings are in scope

## Exit criteria

- Repair request -> work order -> cost -> landlord statement line completes end to end.
- A real caretaker completes a task on their own low-end handset over mobile data, unaided and unobserved by you.
- Every caretaker screen is under its KB budget.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
