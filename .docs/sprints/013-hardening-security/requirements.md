# Sprint 013 · Security, isolation and obligations

**Phase 4 — Readiness · Week 13 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Turn the readiness gates from intentions into CI output.

## Services touched

- all
- gateway

## In scope

- Threat model day (E5): authentication, money, uploads, webhooks. One day, four surfaces, written output with owners.
- E3 to completeness: every table and every endpoint, not a sample. The Sprint 002 harness makes this a coverage audit rather than a writing exercise.
- Verify each D-34 gate is live in production, not merely present in the chart: default-deny NetworkPolicies, non-root and read-only root filesystems, per-namespace resource quotas, image scanning blocking merges.
- Public versioned API and API keys (E10): scopes, per-key rate limits, published OpenAPI, key rotation.
- Kenya Data Protection Act tooling (E12): subject access export, deletion with ledger-retention carve-outs, retention schedules per data class.
- Secrets rotation procedure; credential-leak runbook (first of the E8 set).

## Out of scope

- External penetration test (DEBT-06).
- Accessibility audit (DEBT-04).

## Depends on

- All feature sprints complete - 003 through 012

## Readiness items paid

- E3 (completion)
- E5
- E10
- E12
- D-34 (verification)

## Blocked by

- Q6 (data controller registration and retention rules) - needed by week 4, not week 13

## Exit criteria

- The D-34 gate list is green in CI output rather than in someone's opinion.
- E3 coverage is 100% of tenant-scoped tables and endpoints, with the coverage number published.
- A data subject access request can be fulfilled end to end by following a written procedure.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
