# Sprint 012 · Land inventory, God's-eye view, billing

**Phase 3 — Market · Week 12 of 16 · Status: not started**

> **SLIP ABSORBER. Deferrable to R1.1 if Phase 1 overruns.**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Onboard a land-selling company and be able to switch any risky feature off per organization without a deploy.

## Services touched

- listing-svc
- billing-svc

## In scope

- Plot inventory: subdivisions, plot status (available, reserved, sold), instalment sale schedules posting to the ledger.
- God's-eye view: MapLibre 2D portfolio map as the default; CesiumJS 3D loaded on demand only and never on the resident path (D-26).
- billing-svc: plans priced by units, properties and features; usage counters recorded from this sprint so the eventual automation has history (DEBT-01); per-organization feature flags (E9) gating every pilot-risky surface.

## Out of scope

- Automated SaaS metering and card collection (DEBT-01, R1.1).
- Title deed or land registry integration.

## Depends on

- 011 (listings), 005 (ledger for instalment schedules)

## Readiness items paid

- E9
- E19 (accepted as DEBT-01)

## Blocked by

- Q7 (pricing tiers)

## Exit criteria

- A land company is onboarded end to end and can market and sell a plot on instalments.
- Every pilot-risky feature is behind a flag you can flip per organization without a deploy.
- Usage counters produce the number a manual invoice would be based on.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
