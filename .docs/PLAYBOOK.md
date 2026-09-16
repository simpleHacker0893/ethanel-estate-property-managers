# PLAYBOOK

How a week of work actually runs: `mattpocock-skills` as the execution layer,
graphify as the map the agent reads before it touches code.

`.docs/` stays the source of truth for scope, acceptance and ADRs. The skills do
not add a second planning system, and graphify does not add a second source of
truth. One pack, one tracker.

**§7 lists where an earlier draft of this playbook was wrong about this repo.**
Read it before following any prompt that mentions fifteen Deployments.

---

## 1. What each tool is for

| | mattpocock-skills | graphify |
|---|---|---|
| What it is | A disciplined idea → spec → tickets → TDD → review loop | A local AST knowledge graph of the repo, queried in natural language |
| Owns | How a week of work gets built | What the agent knows before it edits |
| Cost | — | No LLM cost for code (tree-sitter). Docs and PDFs need a key |
| The risk it kills | Drifting off spec, horizontal slices, untested money code | Reading forty files to answer one question; blast-radius blindness |

They connect at one point: **`/implement` never starts a ticket in `money-svc` or
the chassis without first asking the graph what it is about to break.**

Installed state: `mattpocock-skills` (user scope), graphify 0.9.43 with the
`sql`, `postgres`, `terraform` and `pdf` extras, project-scoped in strict mode,
with post-commit and post-checkout hooks and the `graph.json` merge driver.

---

## 2. The weekly loop

Substitute the sprint number and name. This runs sixteen times.

**Context hygiene:** keep A → C in **one unbroken window**. Do not `/compact` or
`/clear` until after `/to-tickets`; if you approach the smart zone before then,
`/compact` at a phase boundary. Then `/clear` between **every** `/implement`.
Never resolve more than one ticket per session. Research tickets are the only
exception.

### A — Monday: orient on the graph, then grill

```
/graphify . --update
```

```
/grill-with-docs

We are starting Sprint <NNN> — <name>. Read .docs/ROADMAP.md for this sprint's
entry, .docs/sprints/<NNN>-<slug>/requirements.md and blueprint.md,
.docs/DECISIONS.md, .docs/DOMAIN.md, .docs/RISKS.md and .docs/QUESTIONS.md.

Do not write code. Grill me until every branch of this sprint's design is
resolved, and sharpen the domain model as you go.

- Query the knowledge graph before asking me anything you could have answered
  yourself. Facts are your job, not mine.
- Every term this sprint introduces goes into .docs/DOMAIN.md as a glossary entry
  the moment it resolves. The vocabulary is fixed: organization, resident,
  landlord, unit, lease, caretaker. Never "tenant" for a person, never "user" for
  a resident.
- Any decision that is hard to reverse, surprising without context, and the
  result of a real trade-off becomes an ADR under .docs/adr/ using DECISIONS.md
  numbering.
- The exit criteria in acceptance.md are not negotiable. If what I am describing
  cannot meet them, say so now rather than on Friday.
```

### B — Monday, same window: freeze the spec

```
/to-spec

Publish as a GitHub issue titled "Sprint <NNN> — <name>". The acceptance section
is the exit criteria from .docs/sprints/<NNN>-<slug>/acceptance.md, verbatim. List
the readiness items this sprint pays, with their meanings from .docs/READINESS.md
rather than bare codes. Label it ready-for-agent.
```

> Bare codes are ambiguous across documents — see `READINESS.md` §4 and Q15.
> Write the meaning out in anything that leaves the repo.

### C — Monday, same window: cut the tickets

```
/to-tickets

Break the spec into tracer-bullet tickets on GitHub Issues with native blocking
relationships. Hard constraints:

- Every slice is VERTICAL: schema, service, API, UI and tests in one ticket.
  Never a horizontal slice of one layer.
- Every slice is demoable or verifiable on its own, sized to one fresh context
  window.
- Any prefactoring is its own ticket, sequenced first.
- A ticket touching packages/chassis or charts/service says so in the body. Those
  are inherited by every Deployment and get expand/migrate/contract, not one
  mechanical edit.
- Money tickets name the ledger invariant they preserve: sum(debit) = sum(credit)
  after any sequence of operations.
```

Then **`/clear`**.

### D — Tuesday to Thursday: one ticket, one fresh session

```
/implement #<issue-number>

Before writing anything:
  1. graphify query "what already exists for <the thing this ticket touches>?"
  2. If this edits a shared symbol: graphify affected "<symbol>" --depth 3, and
     paste the blast radius into the issue as a comment.

Then build it. Drive TDD at the seams agreed in the spec, red before green. For
anything in money-svc, write the property-based test asserting the trial balance
nets to zero BEFORE the implementation. Run code-review against the merge-base
with main before committing; fix Standards findings, bring Spec findings to me.

When tests are green, run `graphify update .` and put the graph delta in the PR.
```

`/clear` between every ticket. Repeat until the frontier is empty.

### E — Friday: close the sprint

```
Sprint <NNN> close-out. In order, stop at the first failure:

1. Every ticket in the Sprint <NNN> milestone closed, or tell me which are not
   and why.
2. Verify each exit criterion in acceptance.md against the actual repo, not
   against the tickets. Fill the evidence column: test output, a rerunnable
   command, a screenshot path. "The ticket is closed" is not evidence.
3. graphify update . && graphify god-nodes --top 15
   Did a new god node appear, and was it intentional? An unplanned hub in a
   schema-per-service architecture is a boundary leak, and R-01's second tripwire.
4. Fill the Outcome section of acceptance.md. Update STATE.md in place, and
   RISKS.md or QUESTIONS.md if this week changed either.
5. Confirm .docs/sprints/<NNN+1>/blueprint.md is written, since it is due now.
```

```
/handoff

Next session starts Sprint <NNN+1>.
```

---

## 3. Just-in-time sprint folders

`sprints/README.md` is the rule and it is deliberate: **`blueprint.md` is written
in the week before its sprint**, because Sprint 011's blueprint should benefit
from what Sprint 007 taught.

Current state:

- `requirements.md` — all sixteen, stubbed up front so the shape is visible.
- `acceptance.md` and `handoff-prompt.md` — all sixteen, generated from each
  sprint's own exit criteria. These are faithful restatements, not forecasts, so
  writing them early costs nothing. The "how to verify" column is filled in the
  week before.
- `blueprint.md` — **001 and 002 only.** Templates for the rest are in
  `sprints/_templates/`.

Sprint 005's blueprint is now unblocked: it depended on ADR-012, which **D-67
resolved in Sprint 002** rather than at the end of Sprint 004. It is written in
the week before Sprint 005 like every other blueprint.

---

## 4. Sprint 001 — settle what is still open

The reconciliation is **closed**, so most of what an earlier draft wanted
`/wayfinder` to chart is already decided. Three decisions remain:

```
/wayfinder

Chart the open architectural decisions, from .docs/STATE.md and
.docs/ARCHITECTURE.md §7.4. One decision ticket each for:

1. eTIMS. Integration is only possible through a KRA-certified integrator.
   Find the real lead time NOW. If it is longer than sixteen weeks this is a
   Sprint 001 action, not a Sprint 013 one.

Use GitHub Issues with native blocking relationships so the frontier renders in
the Projects board. Research tickets may run in parallel; everything else, one
per session.
```

Also close in Sprint 001, both cheap now and expensive later:

- ~~**Q14** — what is readiness item E18?~~ **Closed by D-55:** the automated
  delivery pipeline.
- ~~**Q15** — which C/D/E/F/G namespace wins.~~ **Closed by D-56:** the `D-nn`
  decision numbers.
- ~~The D-34 gate count.~~ **Closed by D-65:** eight gates, three enforcement
  homes, and only five can be structural in `charts/service`. `READINESS.md`
  §1a is the row-by-row table.

**`/wayfinder` hands off at `/to-spec`.** Looping a map straight into
`/implement` throws away the linked detail the map was built to capture.

---

## 5. Where graphify earns its keep here

| Sprint | Command | What it answers |
|---|---|---|
| 001 | `graphify add ./fixtures/partners --author "design partner"` | Partner paperwork becomes queryable domain knowledge |
| 002 | `graphify affected "chassis" --depth 3` | A chassis change is inherited by every Deployment |
| 005 | `graphify path "money-svc" "property-svc"` | Proves schema-per-service is not quietly leaking |
| 007 | `graphify path "gateway" "money-svc"` | Every route a payment callback can take to the ledger |
| 010 | `graphify query "which services does the landlord statement read from?"` | The ADR-012 decision, answered from the code |
| 013 | `graphify affected "<auth/webhook/upload entry point>" --depth 4` | Threat modelling as reachability, not recall |
| 013 | `graphify god-nodes --top 20` | An unplanned hub is a boundary leak |
| 014+ | `graphify prs --conflicts` | PRs sharing graph communities: merge-order risk. Needs `gh` |
| every | `graphify update .` | AST-only refresh, no API cost |

### Caveats that are real on this version

1. **`.prisma` is not parsed.** The schema is invisible as written. Commit
   `prisma/migrations/**/migration.sql` — SQL is first-class, so tables, views,
   foreign keys and JOIN relationships extract deterministically. Belt and
   braces against a Neon staging branch:
   ```bash
   graphify extract . --postgres "postgresql://<neon-staging-branch-url>"
   ```
2. **No Helm, Kubernetes manifest or OpenAPI support.** `charts/service` and the
   generated OpenAPI are outside the graph. **`.tf` files are covered** — the
   `terraform` extra is installed, so OpenTofu is in.
3. **Deep mode on docs needs an LLM key.** Code is free; the twenty-eight
   planning documents are not. Set `GEMINI_API_KEY`, `ANTHROPIC_API_KEY` or
   equivalent, or pass `--code-only` and accept that the pack stays out.
4. **`git pull` does not update the graph.** Add the alias:
   ```bash
   git config --global alias.gpull '!git pull && graphify update .'
   ```

---

## 6. Guardrails

- **One unbroken window** for `/grill-with-docs` → `/to-spec` → `/to-tickets`.
- **`/clear` between every `/implement`.** One ticket per session.
- **Don't `/triage` your own tickets.** Triage is for issues you did not create:
  partner bug reports, external PRs. `/to-tickets` output is already agent-ready.
- **Vertical slices only.** "Add the schema for X" is a wrong ticket. "A resident
  can do X end to end, thinly" is a right one.
- **`/code-review` runs two sub-agents, Standards and Spec, and does not merge
  their findings.** Act on Standards. Spec findings come to you as the reviewer.
- **Chassis and `charts/service` get expand → migrate → contract**, never one
  mechanical edit, once more than two services exist.
- **Never invent a business fact.** If a threshold, fee, rate, notice period or
  approval rule is not in `DECISIONS.md` or the sprint's `requirements.md`, it
  goes to `QUESTIONS.md` or is marked `ASSUMPTION:` inline.

---

## 7. Corrections against the earlier draft

An earlier draft of this playbook was written against a superseded copy of the
pack. If you are working from it, these are wrong in it:

| Claim in the draft | Reality |
|---|---|
| "11 services and 15 Deployments" | **Eleven logical services, four Deployments** (D-54 / ADR-001). Splitting one out is a `values.yaml` change on documented triggers. |
| Chassis is "inherited fifteen times" | Inherited by **four** Deployments. D-54's saving is deliberately spent on Sprint 007 and Phase 4, not on pulling go-live earlier. |
| `/wayfinder` should chart monolith vs services | **Closed.** ADR-001 / D-54 settled it; `RECONCILIATION.md` records the reversal. |
| `/wayfinder` should chart the ADR namespace collision | **Closed.** `DECISIONS.md` numbering wins; `ARCHITECTURE.md` §14 was renumbered around it. |
| "This repo has CLAUDE.md. Edit it. Do not create AGENTS.md." | Backwards. **`AGENTS.md` is canonical**; `CLAUDE.md` and `CODEX.md` are thin adapters pointing at it. |
| ADRs live at `.docs/adr/` | Correct, and worth keeping — it is the one deviation the setup skill must record rather than override. |
| PRD §9.2 and §9.3 "answer Q7" | **No.** PRD §14 states those pricing tables are explicitly **hypotheses, not decisions**. Q7 is open. Do not meter against them. |
| ADR-012 due by Sprint 005 | **Resolved in Sprint 002** (D-67, ADR-012): reporting is a read-model service fed by outbox events. The draft, and the pack's own "end of Sprint 004" date, are both superseded. |
| `graphify affected` / `god-nodes` may not exist | Both real in 0.9.43. |
| `.tf` files may be uncovered | Covered; the `terraform` extra is installed. |
| `graphify . --mode deep` is free | Free for code. The pack's documents need an API key. |

The draft was right about: `graphify install --project --strict`, `hook install`,
`.claudeignore`, the reconciliation order, the repair state machine, the
`SET LOCAL` and `BYPASSRLS` trap, and every skill name it used.

---

## 8. Agent tooling — CLIs and skill bundles

Installed 16 September 2026. Every agent session can rely on these being
present; re-run the install command if a machine is missing one. These are
**global CLIs and skill bundles, not project dependencies** — the blueprint's
dependency policy (approved: `playwright`, `@axe-core/playwright`, `@lhci/cli`
as devDependencies) is unaffected.

| Tool | What it is for | Install | Reference |
|---|---|---|---|
| `playwright-cli` | Browser automation from the terminal: open, navigate, snapshot, fill, click — the harness behind the browser test suites and the marketing track's gates. Ships its own skill into `.claude/skills/playwright-cli`. | `npm install -g @playwright/cli@latest`, then `playwright-cli install --skills` inside the repo | [github.com/microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) · `playwright-cli --help` |
| `neon` | Neon Postgres CLI — branching, staging-branch URLs for `graphify extract . --postgres`, schema work from Sprint 001's ADR-002 region decision onward. | `npm i -g neon@latest` | [neon.com/docs/reference/cli](https://neon.com/docs/reference/cli) · [github.com/neondatabase/neon-cli](https://github.com/neondatabase/neon-cli) |
| Clerk skill bundle | Clerk auth patterns (organizations, sessions, webhooks) for `identity-svc` and the `organization_id` boundary work from Sprint 002. 20 skills into `.claude/skills/`. | `npx skills add clerk/skills -y --agent claude-code` | [github.com/clerk/skills](https://github.com/clerk/skills) |
| Neon agent skills | Neon-specific agent guidance (branching, serverless driver, connection pooling). 7 skills into `.claude/skills/`. | `npx skills add neondatabase/agent-skills -y --agent claude-code` | [github.com/neondatabase/agent-skills](https://github.com/neondatabase/agent-skills) |

Notes:

- The `skills` CLI is interactive by default; pass `-y --agent claude-code` when
  running without a TTY, or it cancels silently.
- Skill bundles land in `.claude/skills/` (and `.agents/skills/`). Review them
  before use — they run with full agent permissions.
- `playwright-cli install --skills` also adds `.playwright-cli/` to
  `.gitignore` and uses Chrome as the default browser when one is present.
