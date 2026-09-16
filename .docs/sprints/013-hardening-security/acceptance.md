# Sprint 013 Acceptance — Security, isolation and obligations

**Phase 4 — Readiness · Week 13 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | The D-34 gate list is green in CI output rather than in someone's opinion. | _fill in the week before_ | | ☐ |
| 2 | E3 coverage is 100% of tenant-scoped tables and endpoints, with the coverage number published. | _fill in the week before_ | | ☐ |
| 3 | A data subject access request can be fulfilled end to end by following a written procedure. | _fill in the week before_ | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

## Readiness items paid

Codes are the roadmap/readiness sense. See `../../READINESS.md` §4 for why
that distinction matters.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| **E3** | Cross-organization test harness; a tenant-scoped table without an RLS policy fails CI (completion) | | ☐ |
| **E5** | Threat model day: authentication, money, uploads, webhooks | | ☐ |
| **E10** | Public versioned API and API keys: scopes, rate limits, published OpenAPI, rotation | | ☐ |
| **E12** | Data Protection Act tooling: DSAR export, deletion with ledger carve-outs, retention schedules | | ☐ |
| **D-34** | The pod-security gates, structural in `charts/service`. **Count conflict:** ROADMAP says seven gates, this sprint's requirements say eight. Reconcile before signing off (verification) | | ☐ |

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
