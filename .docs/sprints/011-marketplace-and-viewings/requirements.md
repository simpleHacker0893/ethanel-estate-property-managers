# Sprint 011 · Marketplace, storefronts and viewings

**Phase 3 — Market · Week 11 of 16 · Status: not started**

> **SLIP ABSORBER. If Sprint 007 overruns, this sprint moves to R1.1 and the pilot ships as a management platform.**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Let a firm win business through Ethanel, not only administer it.

## Services touched

- listing-svc

## In scope

- Listings for units, houses and plots, sale or lease; media; Postgres full-text search with pg_trgm (D-06); filters; saved searches.
- Public storefront per organization: Ethanel theme with the organization's logo and accent colour (D-27).
- Cache Components / 'use cache' (D-18) - this is the only surface that uses it, because it is the only one where a stale page costs nobody money.
- Viewings: available slots, agent calendar, booking, confirmations. The agent starts a WhatsApp video call; a Google Meet link only after the prospect is verified (D-46).
- MapLibre GL map view of listings (D-26).

## Out of scope

- 3D God's-eye view (Sprint 012).
- Plot inventory and instalment sales (Sprint 012).
- Paid listing promotion.

## Depends on

- 003 (units), 009 (booking confirmations)

## Readiness items paid

- D-46

## Blocked by

- _none_

## Exit criteria

- A storefront is publicly reachable, indexable, and renders the organization's branding.
- A prospect searches, books a viewing, and attends it, with no one touching a phone book.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
