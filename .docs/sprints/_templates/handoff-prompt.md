# Sprint NNN Builder Handoff Prompt

> Template. The single prompt handed to the Builder at the start of the sprint.
> Everything below the line is the prompt itself — paste it as-is.

---

Read these before making any change:

1. `AGENTS.md`
2. `.docs/STATE.md`
3. `.docs/DECISIONS.md` — including the superseding entries at the bottom
4. `.docs/DOMAIN.md`
5. `.docs/SERVICE-TOPOLOGY.md`
6. `.docs/sprints/NNN-{slug}/requirements.md`
7. `.docs/sprints/NNN-{slug}/blueprint.md`
8. `.docs/sprints/NNN-{slug}/acceptance.md`

Then, before writing code, run:

```bash
graphify query "what already exists for {the thing this sprint touches}?"
```

Then summarise, and stop:

1. What you believe this sprint is supposed to accomplish.
2. The files you expect to create or modify.
3. The tests or validation steps you will run, and where red-before-green applies.
4. Any blockers or ambiguities.

**Do not start implementing until I approve that summary.**

## Rules for this sprint

- Vertical slices only. A ticket that says "add the schema for X" is wrong; it
  should say "a resident can do X end to end, thinly".
- Do not redefine scope. Do not invent business rules. If a threshold, fee, rate,
  notice period or approval rule is not written in `DECISIONS.md` or
  `requirements.md`, put it in `.docs/QUESTIONS.md` or mark it `ASSUMPTION:`
  inline. A plausible invented number is the most expensive thing you can produce.
- Every tenant-scoped table ships with its RLS policy and a cross-organization
  test in the same change.
- No cross-schema joins or foreign keys, even when the callee is in the same pod.
- Anything touching `packages/chassis` or `charts/service` is inherited by every
  Deployment: run `graphify affected "<symbol>" --depth 3`, paste the blast radius
  into the ticket, and use expand then migrate then contract rather than one
  mechanical edit.
- Anything under `services/money-svc`: property-based test first, asserting the
  trial balance nets to zero after any sequence of operations. `bigint` minor
  units, UUIDv7, no floats anywhere near money including in tests. Postings are
  immutable; a reversal is a new entry with a reason.
- Run code review against the merge-base with `main` before committing. Fix
  Standards findings; bring Spec findings to me rather than acting on them.
- When the tests are green, run `graphify update .` and put the graph delta in
  the PR description.

## When you believe the sprint is done

Review the work against `acceptance.md` and report:

1. Which criteria are complete, with the evidence for each — test output, a
   rerunnable command, or a screenshot path. Not "the ticket is closed".
2. Which are incomplete or uncertain.
3. What files changed.
4. What validation you ran.
5. Any risks introduced.
6. Any decisions that should be added to `.docs/DECISIONS.md`.
7. Any status changes for `.docs/STATE.md`.
8. Any follow-up that should become next sprint's work.

Do not mark the sprint complete if the acceptance criteria are not satisfied.
