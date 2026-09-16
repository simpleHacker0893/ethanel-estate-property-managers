# Sprint 003 Acceptance — The property domain

**Phase 0 — Platform · Week 3 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | A partner's smallest building is fully represented - properties, units, landlords, residents, leases - entered by hand. | _fill in the week before_ | | ☐ |
| 2 | The domain model has been checked against the partner's real lease and rent roll from Sprint 001 and survived without a field being forced. | _fill in the week before_ | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

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
