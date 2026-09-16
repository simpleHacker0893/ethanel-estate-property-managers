## What this changes

<!-- One paragraph. What is true after this merges that was not true before. -->

**Closes** #

## Which exit criterion this moves

<!-- Quote the row from the sprint's or track's acceptance.md. Not a paraphrase. -->

## Evidence

<!--
"The ticket is closed" is not evidence (VALIDATION.md §1). Paste one of:
test output, a command someone else can rerun, or a screenshot path.
-->

## Shared surfaces

- [ ] Does **not** touch `packages/chassis` or `charts/service`.
- [ ] Touches one of them. Blast radius from `graphify affected "<symbol>" --depth 3`:

<details><summary>Blast radius</summary>

```
```

</details>

Expand → migrate → contract, not one mechanical edit.

## Boundary check

```
graphify update .
```

Graph delta:

<!--
No cross-schema join and no cross-schema foreign key, even when the callee is in
the same pod (D-11, D-54). Working around a contract because the callee is
"right there" is a chassis defect, not a shortcut — R-01's second tripwire.
-->

- [ ] No new god node, or a new one that is intentional and named here.
- [ ] Every tenant-scoped table added here ships its RLS policy and a
      cross-organization test in this same change.

## Money

- [ ] Touches no money path.
- [ ] Touches a money path. The invariant preserved is `sum(debit) = sum(credit)`
      after any sequence of operations, and the property-based test was written
      before the implementation. `bigint` minor units, UUIDv7, no float anywhere
      near money including in tests. Postings are immutable; a reversal is a new
      entry with a reason.

## Business facts

- [ ] Invents nothing. Any threshold, fee, rate, notice period or approval rule
      not in `DECISIONS.md` or the sprint's `requirements.md` is in
      `QUESTIONS.md` or marked `ASSUMPTION:` inline with no default.

## Copy

- [ ] Uses *organization*, *resident*, *landlord*, *caretaker*, *unit*, *plot*,
      *repair request*, *work order*, *posting*, *allocation*, *reversal*.
      Never *tenant* for a person.

---

Reviewer agents ran first; the operator reviews this diff personally before
merge (D-51).
