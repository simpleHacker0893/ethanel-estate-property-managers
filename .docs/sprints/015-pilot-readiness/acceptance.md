# Sprint 015 Acceptance — Pilot readiness

**Phase 4 — Readiness · Week 15 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | The 95% auto-match bar is met on real partner data. | _fill in the week before_ | | ☐ |
| 2 | One partner's entire portfolio has been imported with no manual spreadsheet editing. | _fill in the week before_ | | ☐ |
| 3 | Every hard-to-reverse decision in DECISIONS.md has an ADR. | _fill in the week before_ | | ☐ |
| 4 | Usability fixes from the usability tests are merged, not backlogged. | _fill in the week before_ | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

## Readiness items paid

Codes are the roadmap/readiness sense. See `../../READINESS.md` §4 for why
that distinction matters.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| **D-39** | 95% of payments matched with no human action (the gate) | | ☐ |
| **D-47** | Self-serve import: properties, units, residents, leases, opening balances | | ☐ |
| **E14** | Africa-first posture written down with the international scale path | | ☐ |
| **E17** | ADRs under `.docs/adr/` for every hard-to-reverse decision | | ☐ |
| **Usability tests** | 5 residents, 5 caretakers, 3 accountants | | ☐ |

## Permanent gates still green

Gates introduced in earlier sprints must still pass. A sprint that breaks an
earlier gate is not done. Source: `../../VALIDATION.md` §2.

| Gate | Green |
|---|---|
| Cross-organization isolation (E3) | ☐ |
| Image vulnerability scan, blocking on high and critical | ☐ |
| D-34 pod-security gates, structural | ☐ |
| Ledger invariants (E1) on `money-svc` | ☐ |
| End-to-end journeys (E2) on every PR | ☐ |

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
