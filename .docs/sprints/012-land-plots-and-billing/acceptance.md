# Sprint 012 Acceptance — Land inventory, God's-eye view, billing

**Phase 3 — Market · Week 12 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | A land company is onboarded end to end and can market and sell a plot on instalments. | _fill in the week before_ | | ☐ |
| 2 | Every pilot-risky feature is behind a flag you can flip per organization without a deploy. | _fill in the week before_ | | ☐ |
| 3 | Usage counters produce the number a manual invoice would be based on. | _fill in the week before_ | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

## Readiness items paid

Codes are the roadmap/readiness sense. See `../../READINESS.md` §4 for why
that distinction matters.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| **E9** | Per-organization feature flags, flippable without a deploy | | ☐ |
| **E19** | Usage counters recorded; pilot invoicing manual, accepted debt (accepted as DEBT-01) | | ☐ |

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
