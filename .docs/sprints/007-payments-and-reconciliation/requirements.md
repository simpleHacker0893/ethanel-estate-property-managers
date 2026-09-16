# Sprint 007 · Payments and reconciliation

**Phase 1 — Money · Week 7 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Take real M-Pesa money, survive a callback burst, and publish the honest auto-match rate nine weeks before it becomes a gate.

## Services touched

- payments-svc
- payments-worker
- gateway

## In scope

- Daraja: paybill/C2B for residents paying from their own handset, STK push for pay-from-the-app. Client account mapping per agency.
- gateway webhook ingress (D-14): signature verification, idempotency key, persist to payments.callback_inbox, return 200 immediately. Matching never runs inline.
- Load test to 50 callbacks/second for 10 minutes with zero loss (D-41).
- Reconciliation engine: account number parsing, fuzzy resident match via pg_trgm, confidence scoring, auto-post above threshold, suspense account plus a manual match queue below it (D-15).
- Instrument the auto-match rate from the first payment so D-39's 95% is a dashboard number from week 7.
- Acquire a live paybill and push low-value real transactions through staging - not sandbox only (RISKS R-03).

## Out of scope

- Resident pay-now UI (Sprint 010).
- Receipt delivery over WhatsApp (Sprint 009).

## Depends on

- 006 (invoices to match against), 002 (gateway chassis)

## Readiness items paid

- D-39 (instrumented, not yet gated)
- D-41

## Blocked by

- Q3 (how residents are identified on an M-Pesa payment today) - sets the ceiling on the match rate

## Exit criteria

- The burst test passes: 50/s for 10 minutes, zero loss.
- The measured auto-match rate against the partners' real M-Pesa statements is published, whatever it is.
- If the rate is under 95%, the causes are written into RISKS.md and the fix is scoped into Sprint 015.
- A real shilling has moved through staging end to end.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
