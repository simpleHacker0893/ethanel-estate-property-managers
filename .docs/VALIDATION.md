# VALIDATION

How this project proves its output is correct rather than asserting it.

The pack already states the standard in three places, and they agree: *"A sprint
is done when `acceptance.md` passes, not when the code compiles"* (`AGENTS.md`),
*"the gate list is green in CI output, not in someone's opinion"* (ROADMAP
Sprint 013), and Sprint 016's rule that every discrepancy between Ethanel and the
partner's spreadsheet is a go-live blocker, **including the ones that look like
rounding**.

---

## 1. Principles

- **Evidence, not status.** "The ticket is closed" is not evidence. Evidence is
  test output, a command someone else can rerun, or a screenshot path.
- **Measured, not targeted.** Where the pack states a number, the number gets
  instrumented the week the feature is built, not the week it is audited. The
  auto-match rate is on a dashboard from Sprint 007 precisely so Sprint 015 is a
  gate rather than a discovery.
- **Honest numbers beat good ones.** Sprint 007 exits on the real auto-match
  rate whatever it is. If it is below 95%, the causes are classified and the fix
  is scoped into Sprint 015 — the engine is not tuned to chase the number in
  week 7.
- **Graded against reality.** The grid, pro-rata, reconciliation and import are
  all graded against the design partners' real files, never against a format
  Ethanel invented. See `FILE_INVENTORY.md`.
- **Never invent a business fact.** A plausible invented number is the most
  expensive thing a Builder can produce, because it will be built on. Unknowns go
  to `QUESTIONS.md` or are marked `ASSUMPTION:` inline.

---

## 2. Permanent merge gates

These block a PR from the sprint they are introduced, forever after.

| Gate | From | What it enforces |
|---|---|---|
| Cross-organization isolation (E3) | 002 | For every table in a service manifest, organization A cannot read, write or enumerate organization B's rows. **A tenant-scoped table without an RLS policy fails CI.** |
| Image vulnerability scan | 002 | Blocks on high and critical. |
| D-34 pod-security gates | 002 | Structural: a Deployment that omits probes, limits, a PDB, non-root, read-only root filesystem or a default-deny NetworkPolicy **cannot be rendered**. |
| Ledger invariants (E1) | 005 | Property-based tests asserting the trial balance nets to zero after any sequence of operations. A posting path without a test does not merge. |
| End-to-end journeys (E2) | 014 | Playwright on every PR: rent payment, repair, month-end. |
| TypeScript strict, no `any` in a public interface | 001 | Plus a coverage floor on the domain packages. |

### The RLS trap this project must not fall into

Neon's pooled connections run in **transaction mode**, so the chassis RLS hook
must use `SET LOCAL` and the application role must not hold `BYPASSRLS`. Get it
wrong and the hook silently does nothing **while every tenancy test still
passes**. Sprint 002 owes a test that fails when the hook is a no-op — not just
tests that pass when it works.

---

## 3. Validation by area

| Area | Method | Evidenced by | Sprint |
|---|---|---|---|
| Pipeline | A commit on `main` reaches staging with no human step | The deploy run | 001 |
| Region choice | Measured p50/p95 on a real Safaricom connection | ADR-002, with the numbers in it | 001 |
| Marginal service cost | Scaffold a new service and reach staging | Under one day, timed. If not, R-01's tripwire has fired | 002 |
| Deployment split path | Move one service to its own Deployment, once | A `values.yaml` diff and a connection string, done not claimed | 002 |
| Tenancy | Sign in, land in the right organization, fail to reach another's data by API **and** by direct query | The E3 harness output | 002 |
| Domain model | Represent a partner's smallest building from their real paperwork | The entered portfolio | 003 |
| Grid | Everything the grid requirements ask, on the partner rent roll | Sort, filter, group with subtotals, Excel copy/paste both directions, print report | 004 |
| Restore | Restore from PITR and from the cross-region dump, on the clock | Elapsed time and the steps as they actually happened | 004, 014, monthly |
| Ledger | Every pilot money movement expressible as a journal entry, and the ledger unbreakable | Property-based test suite | 005 |
| Rent run | 500 units under 2 minutes, and safe to run twice | Timing output, plus a test asserting zero duplicate invoices on a second run | 006 |
| Webhook ingress | 50 callbacks/second for 10 minutes, zero loss | The load test, written before the implementation | 007 |
| Reconciliation | Measured auto-match rate on the partners' real statements | The published number, with misses classified by cause | 007, gated 015 |
| Caretaker UI | A caretaker completes a task on a real low-end handset over mobile data, unaccompanied | Per-screen KB budgets, stated and met | 008 |
| Month-end | A partner's accountant runs a full close on staging against their own data and signs off | Their sign-off | 010 |
| Security | Threat model on four surfaces; E3 to completeness; every D-34 gate live in `production` | CI output, not an opinion | 013 |
| Load | A 500-unit invoice run **and** a callback burst simultaneously | Passing them separately is not passing | 014 |
| Runbooks | Cause each failure in staging, record what was actually done | One runbook per failure mode that has occurred | 014 |
| Import | One partner's entire portfolio imported with zero spreadsheets edited by hand | Dry run, a validation report naming row and reason, rollback | 015 |
| The D-39 gate | 95% of payments matched with no human action, on real partner data | A go/no-go, reported unrounded | 015 |
| Go-live | One full rent cycle run **in parallel** with the partner's existing spreadsheet, reconciled by hand | Both sets of books agree; every discrepancy is a blocker | 016 |

---

## 4. SLO targets

Recovered from `RECONCILIATION.md`, which carries numbers the newer files omit.
These are the definitions written in Sprint 004 and alerted on in Sprint 014.

| Target | Value |
|---|---|
| Pilot availability | 99.5% |
| RPO | Under 15 minutes |
| RTO | Under 4 hours |
| Interactive response on 3G | Under 2 seconds |
| Scale | 50,000 units, 500 organizations |
| Callback processed | Within 60 seconds for 99% |
| Receipt delivered | Within 2 minutes for 95% |
| Auto-match rate | 95% with no human action (D-39, the go-live gate) |

Alerting (E13) pages on webhook failure rate, `pg-boss` queue age, error rate,
and reconciliation rate below 90%.

---

## 5. Known exceptions

| Exception | Why it is accepted | Revisit |
|---|---|---|
| Pilot SaaS invoicing is manual (E19) | Usage counters are recorded from Sprint 012; automating the invoice is not worth a sprint yet | More than five paying organizations |
| No external penetration test (E6) | Cost, at pilot scale | First client over 1,000 units, or a security questionnaire |
| No accessibility audit (E16) — **product surfaces only** (D-70) | Deferred deliberately, not overlooked. Marketing routes gate on axe-core from the marketing track, because static pages are cheap to get right and expensive to retrofit | First institutional or government client |
| No performance budgets in CI (E21) — **product surfaces only** (D-70) | Measured manually during the pilot. Marketing routes are budget-gated by `@lhci/cli` from the marketing track | Resident page p75 LCP exceeds 2.5s on 3G |
| Caretaker offline mode absent | Online-only is a decision, not an oversight | A caretaker reports a failed task submission twice |
| E12 tooling built on an assumed reading of the Act | Registration status is Q6, open | Before Sprint 013 closes |
