# Sprint 014 · Reliability and operations

**Phase 4 — Readiness · Week 14 of 16 · Status: not started**

> Stub. `blueprint.md`, `acceptance.md` and `handoff-prompt.md` are written in
> the week before this sprint starts — see `../README.md`.

## Goal

Make every failure mode you have seen survivable by someone who is not you.

## Services touched

- all

## In scope

- E2 end-to-end journeys in Playwright, running on every PR: rent payment, repair, month-end.
- E4 full load test: a 500-unit invoice run and a callback burst running at the same time, at pilot scale, on production-shaped infrastructure.
- SLO alerting (E13) against the Sprint 004 definitions: webhook failure rate, pg-boss queue age, error rate, reconciliation rate. Paged to WhatsApp and SMS.
- Runbooks (E8): M-Pesa outage, webhook failure backlog, WhatsApp outage, database restore, credential leak. Write each one by causing the failure in staging and recording what you actually did.
- Second restore drill; the monthly drill goes on the calendar (D-37).
- HPA tuning for web and gateway; the worker replica plan for rent days (D-35).
- Cloud cost budgets and anomaly alerts (E15).

## Out of scope

- Chaos engineering beyond the five named failure modes.
- Multi-region failover (DEBT, R1.1).

## Depends on

- 013 (security gates green first)

## Readiness items paid

- E2
- E4
- E8
- E13
- E15
- D-35
- D-37 (recurring drill)

## Blocked by

- _none_

## Exit criteria

- Every failure mode that has occurred in staging has a runbook written from a real reproduction.
- The combined load test passes with both workloads running together.
- An SLO breach pages your phone within the stated detection window.

## Decisions this sprint may not re-open

See `../../DECISIONS.md`. If one of them is wrong, write a superseding decision
and say so out loud — do not work around it quietly.

## Notes

_Filled during the sprint. What surprised you goes here, and then into
`../../RISKS.md` or `../../DECISIONS.md` if it outlives the week._
