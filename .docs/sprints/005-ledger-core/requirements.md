# Sprint 005 · Ledger core

**Phase 1 — Money · Week 5 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Make every money movement the pilot needs expressible as a balanced journal entry, and make it impossible to unbalance.

## Services touched

- money-svc

## In scope

- Chart of accounts per organization — **the pinned list is `DOMAIN.md` §4 (D-61), nine accounts**: lease receivable, deposit liability, landlord payable, agency commission income, VAT payable, repairs expense, client account cash, cash in transit, suspense. Note two renames: the receivable is keyed to the lease and called **lease receivable** (D-57, ADR-023), and an **allocation** is not a reversal and carries no approval threshold (D-62).
- Double-entry journal: entries and lines, immutable once posted, bigint minor units (D-08), UUIDv7 (D-07), period close, trial balance.
- Reversal rules (D-44): accountant reverses with a mandatory reason; above a threshold an admin approves. Threshold from Q1.
- Automated posting and reconciliation tests (E1) become a permanent merge gate on money-svc, including property-based tests asserting the trial balance nets to zero after any sequence of operations.
- Review gate (RISKS R-07): put the chart of accounts and three worked journal examples - a rent payment, a deposit refund, a landlord remittance with commission - in front of a partner accountant this sprint, on paper, for one hour.

## Out of scope

- Invoices and rent schedules (Sprint 006).
- Payments and matching (Sprint 007).
- Any UI beyond what the accountant review needs.

## Depends on

- 003 (units, leases, residents to post against)

## Readiness items paid

- E1

## Blocked by

- Q1 (reversal threshold)
- Q2 (agency fee terms, VAT, who bears M-Pesa charges) - highest-value unknown in the pack

## Exit criteria

- Every pilot money movement - rent, deposit, refund, repair cost, commission, landlord remittance, penalty, write-off - is expressible as a journal entry.
- Property-based tests cannot produce an unbalanced ledger.
- A partner accountant has reviewed the chart of accounts and the three worked examples and agreed with them.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
