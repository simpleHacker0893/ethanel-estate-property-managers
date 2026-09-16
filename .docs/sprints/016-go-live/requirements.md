# Sprint 016 · Go-live

**Phase 4 — Readiness · Week 16 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

First paying agency collects rent through Ethanel, with two sets of books that agree.

## Services touched

- all
- production

## In scope

- Production cutover: live Daraja credentials, live WhatsApp number, DNS through Cloudflare with WAF rules tuned (D-29).
- Migrate the first partner for real.
- Run one full rent cycle in parallel with their existing spreadsheet and reconcile the two by hand. Any discrepancy is a go-live blocker.
- Go/no-go review against the readiness checklist.
- Day-2: support rota, incident communications plan, a watched first week.

## Out of scope

- Second agency onboarding.
- Any R1.1 item.

## Depends on

- 015 (the D-39 gate met, import proven)

## Readiness items paid

- the pilot

## Blocked by

- _none_

## Exit criteria

- The first paying agency collects rent through Ethanel.
- Ethanel's ledger and the partner's spreadsheet agree for a full rent cycle.
- STATE.md records what actually shipped and what moved to R1.1.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
