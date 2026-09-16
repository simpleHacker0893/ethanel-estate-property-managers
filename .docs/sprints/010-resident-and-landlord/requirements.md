# Sprint 010 · Resident and landlord experience

**Phase 2 — Operations · Week 10 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Get a partner's accountant to run a real month-end close and sign off on the numbers.

## Services touched

- web
- money-svc

## In scope

- Resident PWA (Serwist, shell and static assets precached, no offline data - D-24): balance, pay now via STK push, payment history, receipts, raise a repair request, lease documents.
- Landlord portal: every figure read live from the ledger with a 'last updated' stamp (D-45), never a cached summary table. Monthly statement, arrears, repairs spend, occupancy, remittance history.
- Accountant month-end: rent roll, arrears ageing, landlord remittance run, commission calculation, VAT, period close.

## Out of scope

- Marketplace and public storefronts (Sprint 011).
- Offline resident data.

## Depends on

- 009 (notifications), 007 (payments), 006 (statements), 004 (the grid)

## Readiness items paid

- D-45

## Blocked by

- Q4 (landlord remittance cycle)
- Q8 (which partner, how many units) by end of this sprint

## Exit criteria

- A partner's accountant runs a full month-end close on staging against their own portfolio data and signs off on the numbers.
- A resident pays from the PWA and sees the receipt without refreshing.
- A landlord's statement figures match the trial balance exactly.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
