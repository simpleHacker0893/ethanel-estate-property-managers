# Sprint 003 · The property domain

**Phase 0 — Platform · Week 3 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Represent a design partner's portfolio correctly enough that their own paperwork fits without contortion.

## Services touched

- property-svc
- web shell

## In scope

- property-svc: landlords, properties, units, unit types, amenities, media, leases, residents, lease lifecycle (move-in, renewal, notice, move-out — D-60; "tenancy" is the SaaS boundary only), deposits held, caretaker assignment, occupancy. Leases carry **parties**, plural (`lease_parties`), and the receivable is keyed to the lease (D-57, ADR-023).
- Media pipeline: S3 + CloudFront, signed URLs, server-side image compression.
- web shell: organization switcher, navigation, role-aware routing, the shadcn/ui + Radix + Tailwind v4 token set (D-19), next-intl scaffolding English-only (D-25), the nuqs + TanStack Query conventions (D-17, D-23).

## Out of scope

- Invoicing or any money model - Sprint 005 owns the ledger and nothing may pre-empt it.
- Import tooling (Sprint 015).
- Listings and the public storefront (Sprint 011).

## Depends on

- 002 (chassis, tenancy, identity)

## Readiness items paid

- _none_

## Blocked by

- Q5 (deposit rules) by start of sprint

## Exit criteria

- A partner's smallest building is fully represented - properties, units, landlords, residents, leases - entered by hand.
- The domain model has been checked against the partner's real lease and rent roll from Sprint 001 and survived without a field being forced.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
