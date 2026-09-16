# Tracks

A **track** is work that is real, scoped and graded like a sprint, but does not
sit in the sixteen-week sequence.

`sprints/` is a calendar: sixteen one-week slots (D-50), and `STATE.md` justifies
sixteen weeks over twelve on the arithmetic that eighteen of twenty-two readiness
items are paid before go-live. `READINESS.md` §2 is blunt about it — *"Do not
retire a row to tidy the list. The count is load-bearing."* Adding a
seventeenth sprint folder would move a number that forty-four files cite, for
work that is not on the critical path to collecting rent.

So a track gets the same three files and the same standard:

| File | Same as a sprint? |
|---|---|
| `requirements.md` | Yes. Goal, in scope, out of scope, exit criteria. |
| `blueprint.md` | Yes. Specific enough that the Builder makes no product decisions. |
| `acceptance.md` | Yes. Exit criteria restated **verbatim**, with evidence per row. |

And the same rule: **a track is done when `acceptance.md` passes, not when the
code compiles.** Evidence is test output, a rerunnable command or a screenshot
path — never "the ticket is closed" (`VALIDATION.md` §1).

## What a track is not

- **Not a place to park scope that failed a sprint's out-of-scope list.** If work
  belongs to a sprint, it goes in that sprint.
- **Not exempt from `DECISIONS.md`.** A track inherits every house rule. If one
  is wrong, it gets a superseding decision like anything else.
- **Not off the readiness checklist.** Where a track pays or narrows an E-row, it
  says so and `READINESS.md` is amended to match.

## Current tracks

| Track | Authorised by | Status |
|---|---|---|
| [`marketing-site/`](marketing-site/) | **D-68** | In progress |
