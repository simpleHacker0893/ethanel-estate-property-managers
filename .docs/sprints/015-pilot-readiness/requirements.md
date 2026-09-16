# Sprint 015 · Pilot readiness

**Phase 4 — Readiness · Week 15 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Meet the 95% bar on real data and move a partner's entire portfolio without editing a spreadsheet by hand.

## Services touched

- web
- payments-svc
- money-svc

## In scope

- Self-serve import (D-47): properties, units, residents, leases, opening balances. Dry run, a validation report naming the row and the reason, and rollback. Built against the Sprint 001 partner files, not an invented format.
- Usability tests: 5 residents on pay and repair, 5 caretakers on tasks, 3 accountants on month-end. Fixes land in this same sprint - that is why it is before go-live and not during it.
- The D-39 gate, measured on real partner data: 95% of payments matched with no human action. Go/no-go, not a target.
- Close whatever reconciliation gap Sprint 007 exposed.
- ADRs complete for every hard-to-reverse decision (E17) - the list is in DECISIONS.md.
- E14: write the Africa-first posture with the international scale path - what triggers a second region and what changes when it does.

## Out of scope

- New features of any kind.

## Depends on

- 014 (reliability), 007 (the reconciliation measurement)

## Readiness items paid

- D-39 (the gate)
- D-47
- E14
- E17
- Usability tests (field work; no decision number)

## Blocked by

- Q8 (which partner, their real export)

## Exit criteria

- The 95% auto-match bar is met on real partner data.
- One partner's entire portfolio has been imported with no manual spreadsheet editing.
- Every hard-to-reverse decision in DECISIONS.md has an ADR.
- Usability fixes from the usability tests are merged, not backlogged.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
