# Sprint 004 Acceptance — The grid and the readiness floor

**Phase 0 — Platform · Week 4 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | The grid does every behaviour in the grid requirements on real partner data. | _fill in the week before_ | | ☐ |
| 2 | You have restored the database from backup once, on the clock, with the steps written down. | _fill in the week before_ | | ☐ |
| 3 | The staging seed is large enough to make a 500-unit rent run meaningful in Sprint 006. | _fill in the week before_ | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

## Readiness items paid

Codes are the roadmap/readiness sense. See `../../READINESS.md` §4 for why
that distinction matters.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| **D-36** | Observability: Sentry, CloudWatch Container Insights, uptime checks, alerts to WhatsApp and SMS | | ☐ |
| **D-37** | Backups: Neon PITR plus a nightly encrypted dump to S3 in a second region | | ☐ |
| **E7** | Database restore drill, on the clock, steps recorded as they actually happened | | ☐ |
| **E22** | Anonymised staging seed, production-shaped and production-sized | | ☐ |

## Permanent gates still green

Gates introduced in earlier sprints must still pass. A sprint that breaks an
earlier gate is not done. Source: `../../VALIDATION.md` §2.

| Gate | Green |
|---|---|
| Cross-organization isolation (E3) | ☐ |
| Image vulnerability scan, blocking on high and critical | ☐ |
| D-34 pod-security gates, structural | ☐ |

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
