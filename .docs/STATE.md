# STATE

A rolling snapshot, edited in place. Not a log. If you want history, read git.

**Last updated:** 2026-09-15
**Phase:** pre-Sprint 001 — planning
**Current sprint:** none started
**Next sprint:** 001 · Ground truth and the pipeline

## Where the project is

Two rounds of scoping are answered and recorded in `DECISIONS.md`. The deployable
architecture is in `SERVICE-TOPOLOGY.md` and the sixteen-week sequence in
`ROADMAP.md`. All sixteen sprint folders are stubbed with `requirements.md`; none
has a blueprint yet.

**The `.docs/` pack and the two older long-form documents are now reconciled.**
`ARCHITECTURE.md` and `PRD.md` are at v1.2 and no longer contradict
`DECISIONS.md`; `RECONCILIATION.md` is closed and records what moved.

Two things were decided to close it:

- **ADR-001 / D-54 — eleven logical services, four Deployments.** The service
  boundaries, schemas, roles and contracts are exactly as `SERVICE-TOPOLOGY.md`
  had them; the deployment count drops from fifteen to four, with documented
  triggers for splitting one out (`ARCHITECTURE.md` §13.1). This was the reversal
  D-01 made of v1.1's considered monolith-first decision, and it is now settled
  in writing rather than implicitly.
- **One ADR namespace.** `DECISIONS.md`'s numbering wins; `ARCHITECTURE.md` §14
  was renumbered around it and records where each old number went.

No code exists. No infrastructure exists. The repository exists and holds the
pack.

**The operator kit is now complete and the execution layer is wired.**
`DOMAIN.md`, `READINESS.md`, `VALIDATION.md`, `FILE_INVENTORY.md`, `PLAYBOOK.md`
and `meetings/` were missing and are written. All sixteen sprint folders now have
`acceptance.md` and `handoff-prompt.md`; `blueprint.md` exists for 001 and 002,
with templates in `sprints/_templates/` for the rest, per the just-in-time rule.
`AGENTS.md` is canonical, with `CLAUDE.md` and `CODEX.md` as thin adapters.
`mattpocock-skills`, the Clerk skill bundles and graphify (project-scoped, strict
mode, git hooks) are installed.

**A domain-modelling pass then cross-referenced `DOMAIN.md` against the table
inventory in `ARCHITECTURE.md` §7, and found seven divergences.** The glossary and
the schema had drifted, and in every case the schema was the more careful of the
two. All seven are closed as **D-57 to D-62 and D-65**, with `DOMAIN.md` rewritten
around them:

- **The receivable was named for the resident and keyed to the lease.** Every key
  in the money path said lease; only the prose said resident. Renamed **lease
  receivable**, parties are co-liable, and the grain is recorded in **ADR-023**
  because immutable postings make it unreversible once Sprint 005 ships.
- **`management_agreement` was missing from the glossary entirely**, though it is
  where `fee_type`, `fee_rate`, `fee_base` and `remittance_day` already live,
  versioned by effective date. That reshaped **Q2** into a blocking half
  (recognition timing) and a configurable half (the rates), and narrowed **Q4**.
- **`prospect` and `buyer` were actors in the architecture and absent from the
  glossary**, which undercounted the cross-organization RLS policies Sprint 002
  has to write — four non-member actor classes, not two.
- **"Tenancy" meant two things**, the SaaS boundary and the lease sense, in a pack
  that had just spent 194 citations de-colliding its codes. The lease sense is now
  **lease lifecycle**, which is what the events always said.
- **Two non-matching charts of accounts** existed, eight rows against five. One
  list now, nine accounts, pinned in `DOMAIN.md`.
- **Nothing named the act of attributing a suspense payment**, so the routine path
  and the reversal path shared vocabulary — and a threshold. It is an
  **allocation**, and it is not a correction.
- **D-39's 95% had no denominator.** Now written down and superseded in.

**Two earlier defects surfaced while writing the kit. Both are also closed.**

- **`READINESS.md` did not exist**, though every `requirements.md` cites it. It is
  reconstructed from evidence: the checklist is the **E-series, E1–E22**, and the
  roadmap pays exactly eighteen of them, which is what "18 of 22" meant. One row,
  **E18**, was referenced as paid by Sprint 001 and defined nowhere.
  **Closed by D-55:** E18 is the automated delivery pipeline — Sprint 001's
  headline exit criterion, and the only substantial deliverable in that sprint
  with no code attached. Recovered by elimination, which is weaker provenance
  than the other 21 rows and is flagged as such in both places. Retiring the code
  instead would have broken the 18-of-22 arithmetic this file leans on below.
- **A second namespace collision**, of the same class as the ADR one that
  `RECONCILIATION.md` item 12 fixed: `PRD.md` and the pack used the same bare
  codes for different things — `D7` was "WhatsApp is primary" in one and
  "landlord figures read live" in the other.
  **Closed by D-56:** the `D-nn` decision numbers win, and the fix was a
  substitution rather than a renumber, because every round-2 answer code had
  already been promoted to a numbered decision. 194 citations across 44 files now
  cite the decision. `E1`–`E22` stays bare as the checklist; `PRD.md` keeps its
  own codes prefixed. Mapping and standing rule in `READINESS.md` §4.
  **Three further collisions surfaced while fixing it** — the PRD used `D2` for
  two different things internally, `001/blueprint.md` used `A1`–`B5` as local
  task IDs (now `M1`–`M5`/`P1`–`P5`), and `B4` appears in the PRD as a literal
  unit code in a worked example.

## What has to happen before Sprint 001 can start

- [x] Create the repository and commit this `.docs/` pack.
- [x] Resolve the `ARCHITECTURE.md` / `PRD.md` contradictions — was a Sprint 001
      task, done early. See `RECONCILIATION.md`.
- [ ] Confirm the two assumptions at the bottom of `QUESTIONS.md`.
- [ ] Get an answer to **Q2 (agency fee terms)** moving — it blocks Sprint 005
      and it is the highest-value unknown in the pack.
- [ ] Line up the design-partner meeting for week 1, with the four sample files
      named in advance so they arrive (see RISKS R-04).
- [ ] Answer **Q11 (phone verification, PRD-F3)** — it blocks Sprint 002, which
      is two weeks away and builds the gate.
- [ ] Start WhatsApp Business verification and the eTIMS integrator conversation.
      Both have multi-week tails owned by someone else (RISKS R-05).
- [ ] **Install and authenticate `gh` — confirmed missing** (`gh: command not
      found`). Hard gate: the whole ticket workflow (`/to-spec`, `/to-tickets`,
      `/wayfinder`) and `graphify prs` depend on it. Do it before cutting a
      ticket, not during.
- [x] Decide whether the planning pack goes in the knowledge graph — **not now.**
      Document indexing costs money, code indexing is free, and the twenty-eight
      documents are greppable files you have just read. `graphify-out/` has no
      `graph.json` at all yet. Run `graphify update .` from Sprint 001's first
      commit for the code graph; revisit documents around Sprint 004. `AGENTS.md`
      §Knowledge graph is amended so it no longer instructs you to query a graph
      that does not exist.
- [x] Answer **Q14 (what is E18?)** — D-55, the delivery pipeline.
- [x] Answer **Q15 (which code namespace wins?)** — D-56, the `D-nn` decisions.
- [x] Settle the D-34 (was C7) gate count — **eight**, and then the real defect
      underneath it. **Closed by D-65:** the count was never the problem, the
      *enforcement home* was. Only five of the eight can be structural in
      `charts/service`; image scanning is a CI step, graceful worker shutdown is
      a `packages/chassis` behaviour, and per-namespace quotas are a namespace
      manifest. `READINESS.md` §1a is the row-by-row table, and
      `002/acceptance.md` is split into four checkboxes to match.
- [x] Fix the stale ADR-012 due date in `ARCHITECTURE.md` §5.2 — now end of
      Sprint 004 in all four places that state it.

## The go-live target

First paying agency live at the end of Sprint 016. That is four months from
Sprint 001, not the three originally targeted. The extra four weeks are Phase 4,
and they exist because eighteen of twenty-two readiness items are marked
"pay before go-live".

## Open questions blocking the nearest sprints

| Question | Blocks | Needed by |
|---|---|---|
| **Q2a · commission recognised on invoice or on collection** | Sprint 005 — its *shape* | **week 2**, not week 5 — the only fact that can stop a sprint dead |
| Q5 · deposit rules | Sprint 003 | week 3 |
| Q17 · are lease parties jointly and severally liable | Sprint 003 | week 3, from the Sprint 001 lease fixture |
| Q1 · reversal approval threshold | Sprint 005 | week 5 |
| Q16 · do any landlords take rent directly | Sprint 005 | week 5 — adds a tenth ledger account |
| Q18 · does a fee rate change mid-lease | Sprint 005 | week 5 |
| Q2b · fee rates, VAT, M-Pesa charges | Sprint 005's *values* | week 5 — configuration, not a blocker (D-64) |
| Q3 · how residents are identified on an M-Pesa payment | Sprint 007 | week 1, from partner statements |
| Q6 · data controller registration | Sprint 013 | week 4 |
| Q19 · a plot's payment reference | Sprint 012 | week 12, or whenever 012 is pulled forward |

Q11 (the phone-verification gate), Q14 (E18) and Q15 (the code namespace) are
**answered** — D-63, D-55 and D-56. Q2 and Q4 are **narrowed**: D-58 put the fee
terms and the remittance day on the management agreement, so what is left of Q2
is one blocking half and one configurable half, and what is left of Q4 is gross
versus net.

Four questions are **new**, and every one of them is a business fact the
domain-modelling pass refused to invent: Q16, Q17, Q18, Q19.

## Architecture decisions — none open

**ADR-012 · the reporting read model is settled** (D-67), and it was the one
structural hole the reconciliation opened and did not fill. The answer is a
**read-model service**: a `reporting` schema fed only by outbox events,
materialising `rpt_*` tables with a replay path. Composition in `web` lost
because §7.4 requires server-side sort and grouping across five services above
5,000 rows; read-only subscriptions lost because they re-create the coupling
D-11 exists to prevent.

**Decided in Sprint 002 rather than at the end of Sprint 004.** Under D-54 a new
service costs a package, a schema and a role — no pod, no PodDisruptionBudget,
no rollout step — and Sprint 002 was already creating its schemas up front on the
grounds that a boundary is cheap now and expensive to retrofit. `reporting` is
exactly that kind of boundary, so it is created with the others. That makes it
**twelve logical services and ten schemas, still in four Deployments.**

`.docs/adr/` is no longer empty: `ADR-012-reporting-read-model.md` and
`ADR-023-lease-receivable-grain.md` are its first two files. ADR-002 (the region)
joins them in Sprint 001.

## Live risks

R-01 (twelve boundaries, one person — D-67 added the twelfth) and R-02 (reconciliation rate) are the two
that can move the date. Both have tripwires with dates attached — see `RISKS.md`.
R-01's likelihood dropped from high to medium under D-54, and it gained a second
tripwire pointing the other way: services sharing a pod must not start reaching
across each other's schemas.
