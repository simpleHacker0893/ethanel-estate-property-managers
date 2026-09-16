# Sprint 014 Acceptance — Reliability and operations

**Phase 4 — Readiness · Week 14 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | Every failure mode that has occurred in staging has a runbook written from a real reproduction. | _fill in the week before_ | | ☐ |
| 2 | The combined load test passes with both workloads running together. | _fill in the week before_ | | ☐ |
| 3 | An SLO breach pages your phone within the stated detection window. | _fill in the week before_ | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

## Readiness items paid

Codes are the roadmap/readiness sense. See `../../READINESS.md` §4 for why
that distinction matters.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| **E2** | End-to-end journeys in Playwright on every PR: rent payment, repair, month-end | | ☐ |
| **E4** | Full load test: a 500-unit invoice run and a callback burst at the same time | | ☐ |
| **E8** | Runbooks, each written by causing the failure in staging | | ☐ |
| **E13** | SLO alerting paged to WhatsApp and SMS | | ☐ |
| **E15** | Cloud cost budgets and anomaly alerts | | ☐ |
| **D-35** | HPA tuning for `web` and `gateway`; worker replica plan for rent days | | ☐ |
| **D-37** | Backups: Neon PITR plus a nightly encrypted dump to S3 in a second region (recurring drill) | | ☐ |

## Permanent gates still green

Gates introduced in earlier sprints must still pass. A sprint that breaks an
earlier gate is not done. Source: `../../VALIDATION.md` §2.

| Gate | Green |
|---|---|
| Cross-organization isolation (E3) | ☐ |
| Image vulnerability scan, blocking on high and critical | ☐ |
| D-34 pod-security gates, structural | ☐ |
| Ledger invariants (E1) on `money-svc` | ☐ |

## Boundary check

```bash
graphify update .
graphify god-nodes --top 15
```

An unplanned hub in a schema-per-service architecture is a boundary leak, and
it is R-01's second tripwire.

| Question | Answer |
|---|---|
| New god nodes this week | |
| Intentional | |

## Outcome

- **Passed:**
- **Did not pass:**
- **Moved, and to where:**

Anything that moved is reflected in `../../STATE.md`, and in `../../RISKS.md`
or `../../QUESTIONS.md` if this week changed either.
