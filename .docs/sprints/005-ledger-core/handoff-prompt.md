# Sprint 005 Builder Handoff Prompt — Ledger core

> Everything below the line is the prompt. Paste it as-is into a fresh session.

---

We are starting **Sprint 005 — Ledger core**. Services touched: `money-svc`.

Read these before making any change:

1. `AGENTS.md`
2. `.docs/STATE.md`
3. `.docs/DECISIONS.md` — including the superseding entries at the bottom
4. `.docs/DOMAIN.md`
5. `.docs/SERVICE-TOPOLOGY.md`
6. `.docs/sprints/005-ledger-core/requirements.md`
7. `.docs/sprints/005-ledger-core/blueprint.md`
8. `.docs/sprints/005-ledger-core/acceptance.md`

Then, before writing code:

```bash
graphify query "what already exists for ledger core?"
```

Then summarise, and stop:

1. What you believe this sprint is supposed to accomplish.
2. The files you expect to create or modify.
3. The tests or validation steps you will run, and where red-before-green applies.
4. Any blockers or ambiguities.

**Do not start implementing until I approve that summary.**

## Exit criteria — non-negotiable

1. Every pilot money movement - rent, deposit, refund, repair cost, commission, landlord remittance, penalty, write-off - is expressible as a journal entry.
2. Property-based tests cannot produce an unbalanced ledger.
3. A partner accountant has reviewed the chart of accounts and the three worked examples and agreed with them.

These are restated in `.docs/sprints/005-ledger-core/acceptance.md` with an evidence
column. If what I describe cannot meet them, say so now rather than on Friday.

## Standing rules

- Vertical slices only. A ticket that says "add the schema for X" is wrong; it
  should say "a resident can do X end to end, thinly".
- Do not redefine scope. Do not invent business rules. If a threshold, fee, rate,
  notice period or approval rule is not written in `DECISIONS.md` or
  `requirements.md`, put it in `.docs/QUESTIONS.md` or mark it `ASSUMPTION:`
  inline. A plausible invented number is the most expensive thing you can produce.
- Every tenant-scoped table ships with its RLS policy and a cross-organization
  test in the same change.
- No cross-schema joins or foreign keys, even when the callee is in the same pod.
- `packages/chassis` and `charts/service` are inherited by every Deployment: run
  `graphify affected "<symbol>" --depth 3`, paste the blast radius into the
  ticket, and use expand then migrate then contract rather than one mechanical
  edit.
- `services/money-svc`: property-based test first, asserting the trial balance
  nets to zero after any sequence of operations. `bigint` minor units, UUIDv7, no
  floats near money including in tests. Postings are immutable; a reversal is a
  new entry with a reason.
- Run code review against the merge-base with `main` before committing. Fix
  Standards findings; bring Spec findings to me rather than acting on them.
- When the tests are green, run `graphify update .` and put the graph delta in
  the PR description.

## When you believe the sprint is done

Review the work against `.docs/sprints/005-ledger-core/acceptance.md` and report:

1. Which criteria are complete, with evidence for each — test output, a
   rerunnable command, or a screenshot path. Not "the ticket is closed".
2. Which are incomplete or uncertain.
3. What files changed.
4. What validation you ran.
5. Any risks introduced.
6. Any decisions that should be added to `.docs/DECISIONS.md`.
7. Any status changes for `.docs/STATE.md`.
8. Any follow-up that should become next sprint's work.

Do not mark the sprint complete if the acceptance criteria are not satisfied.
