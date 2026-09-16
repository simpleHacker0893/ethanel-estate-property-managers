# Sprint NNN Acceptance — {sprint name}

> Template. The exit criteria from `requirements.md` restated as checks **anyone
> could run**, each with the command or the click path.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

Verbatim from `./requirements.md`. Do not paraphrase, do not soften.

| # | Criterion | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | | | | ☐ |
| 2 | | | | ☐ |

## Readiness items paid

From `./requirements.md`, defined in `../../READINESS.md`.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| | | | ☐ |

## Permanent gates still green

Every gate from `../../VALIDATION.md` §2 that existed before this sprint must
still pass. A sprint that breaks an earlier gate is not done.

| Gate | Green |
|---|---|
| Cross-organization isolation (E3) | ☐ |
| Image vulnerability scan | ☐ |
| D-34 pod-security gates | ☐ |
| Ledger invariants (E1), from 005 | ☐ |

## Boundary check

```bash
graphify update .
graphify god-nodes --top 15
```

Did a new god node appear this week, and was it intentional? An unplanned hub in
a schema-per-service architecture is a boundary leak, and R-01's second tripwire.

| Question | Answer |
|---|---|
| New god nodes | |
| Intentional | |

## Outcome

- **Passed:**
- **Did not pass:**
- **Moved, and to where:**

Anything that moved is reflected in `../../STATE.md`, and in `../../RISKS.md` or
`../../QUESTIONS.md` if this week changed either.
