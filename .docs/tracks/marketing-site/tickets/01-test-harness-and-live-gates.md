# 01: Test harness and live gates

**What to build:** Nothing a visitor sees. This is the prefactor that makes every later ticket's
red-first test possible, and it moves the three approved gates to the *front* of
the track rather than the end. Wired this way, an accessibility or budget
regression fails at the commit that causes it instead of being discovered in the
final slice. The blueprint mandated a red-first above-the-fold assertion in its
third slice while installing the runner in its thirteenth; this ticket resolves
that.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] `playwright`, `@axe-core/playwright` and `@lhci/cli` added as development dependencies only — zero browser bytes reach any page.
- [ ] One command runs the browser suite and one runs the budget suite, both discoverable from the package scripts.
- [ ] A smoke test proves the harness reaches the running `web` app and that the accessibility scanner reports zero serious or critical violations against what exists today.
- [ ] The budget runner asserts the marketing budgets on a throttled 4G profile and **reports the actual numbers**, not only pass or fail.
- [ ] All three run in continuous integration on every pull request, and a failure blocks the merge.
- [ ] No other dependency is added. The dependency policy still requires asking the operator for anything further.
