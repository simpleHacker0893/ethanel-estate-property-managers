# Sprint 001 Blueprint — Ground truth and the pipeline

**Phase 0 — Platform · Week 1 of 16**

## Objective

Three hard-to-reverse decisions stop being guesses, and a commit on `main`
reaches the staging cluster with no human step.

## The shape of this week

**This sprint has two halves and they need different ticket shapes.** Half of it
is measurement, and measurement is not a coding ticket — driving it through a
TDD implement loop will produce something that looks like work and answers
nothing. Cut the two halves as different kinds of ticket.

| Half | Ticket shape | Why |
|---|---|---|
| Measurement | Research tickets. No TDD seams. Output is a document or a fixture. | The deliverable is a number or a file, not a diff. |
| Plumbing | Normal vertical tracer bullets. | The deliverable is a running pipeline. |

Research tickets are the one case where more than one may run in a session.

## Files to review first

- `../../AGENTS.md`, `../../STATE.md`, `../../DECISIONS.md`, `../../DOMAIN.md`
- `../../SERVICE-TOPOLOGY.md` — especially §6, region
- `../../FILE_INVENTORY.md` §1 and §2 — this sprint fills most of it
- `../../RISKS.md` — R-04 (partner files) and R-05 (multi-week external tails)
- `./requirements.md`, `./acceptance.md`

## Half A — measurement

> Task IDs are **`M1`–`M5`** for measurement and **`P1`–`P5`** for plumbing. They
> were `A1`–`A5` and `B1`–`B5`, which collided with the round-2 answer codes of
> the same spelling — the Q15 defect. Task IDs are local to this file; the codes
> in brackets are decisions from `DECISIONS.md` and readiness items from
> `READINESS.md`.

### M1 · Nairobi to Neon latency  → ADR-002

Measure p50 and p95 from Nairobi to a Neon endpoint in `af-south-1`,
`eu-west-1` and `eu-central-1`, **on a real Safaricom mobile connection**, not on
office fibre and not from a cloud shell. The posture being tested is a resident
on a handset.

Output is **ADR-002** with the numbers in it and the region decided.

**"Permits" has a number now, written before the measurement:** `af-south-1` wins
unless its p95 is more than **50 ms worse** than the best alternative
(`QUESTIONS.md`, E14, confirmed). Without a threshold a result like 180 ms
against 195 ms decides nothing and ADR-002 becomes an argument with yourself on
the day. The number was set while nobody had a stake in the outcome; if you want
to move it, move it *now*, not after seeing the readings.

`.docs/adr/` is currently empty. ADR-002 is the first file in it, which also
starts paying E17.

> ADR **numbering** follows `DECISIONS.md`, per the reconciliation. Do not use
> the old `ARCHITECTURE.md` §14 numbers.

### M2 · Design-partner files  → `fixtures/partners/`

The four files in `FILE_INVENTORY.md` §1: rent roll spreadsheet, landlord
statement, M-Pesa or bank statement export, a signed lease.

**`ROADMAP.md`: "Nothing else in this plan is more valuable per hour than these
files."** Sprints 004, 006, 007 and 015 are graded against them.

- Name all four **in advance** of the partner meeting — that is R-04's mitigation
  and it only works if the ask is specific.
- Anonymise, then commit under `fixtures/partners/`.
- Raw originals never enter git. `.gitignore` covers `samples/raw/` and
  `samples/private/`, and deliberately does not blanket-ignore spreadsheet or PDF
  extensions, so the anonymised versions are committable.
- Then put them in the graph, so partner paperwork is queryable rather than a
  folder nobody rereads:

```bash
graphify add ./fixtures/partners --author "design partner"
graphify extract . --mode deep
```

> **Deferred, deliberately.** `graphify-out/` has no `graph.json` yet and document
> indexing needs an LLM key and real money, where code indexing is free. The
> twenty-eight planning documents are files you have just read and can grep, so
> the graph buys little in week 1 and compounds only as code arrives. Run
> `graphify update .` from this sprint's first commit so the **code** graph
> exists; revisit document indexing around Sprint 004. `AGENTS.md` §Knowledge
> graph is amended to say so, because an instruction to query a graph that does
> not exist only teaches you to ignore the instruction.

### M3 · Caretaker device and data constraints

Field observation, written up as a constraints document: device classes, screen
sizes, data cost per MB, usage posture, where they physically stand when they use
the phone. **It must name specific devices** — that is an exit criterion.

This is the spec Sprint 008's UI is graded against, so it needs KB budgets a
reviewer can hold a screen to.

### M4 · eTIMS certified-integrator lead time

Integration is only possible through a KRA-certified integrator (PRD-D13, PRD-G11).
Find out the real lead time **now**. If it is longer than sixteen weeks, that is
a Sprint 001 finding that changes the plan, not a Sprint 013 discovery.

### M5 · Start the external clocks

WhatsApp Business API verification and the eTIMS conversation both have
multi-week tails owned by someone else (R-05). Starting them is this week's job;
finishing them is not.

## Half B — plumbing

### P1 · Monorepo  (E11)

pnpm + Turborepo, TypeScript strict, ESLint, Prettier, Husky, Renovate on a
weekly schedule. No `any` in a public interface. Coverage floor configured now,
enforced on the domain packages as they appear.

### P2 · Repository governance  (D-49, D-52, D-53)

`.docs/` pack committed. GitHub Project and issue templates. Trunk-based branch
protection with required PR checks.

> **`gh` is not installed** — `gh: command not found` as of week 0. It is a hard
> dependency for the whole ticket workflow from here on (`/to-spec`,
> `/to-tickets`, `/wayfinder`, and `graphify prs`), so install and authenticate
> it **before** cutting a single ticket. Discovering it mid-`/to-tickets` costs
> the unbroken planning window `PLAYBOOK.md` requires.

### P3 · Infrastructure in OpenTofu  (D-32)

VPC, EKS Auto Mode cluster, ECR, Neon project, AWS Secrets Manager, External
Secrets Operator, Cloudflare zone. All of it in OpenTofu — nothing clicked in a
console, because Sprint 013 has to verify it and Sprint 014 has to restore it.

Region comes from M1. Do not start this before ADR-002 is written, or it gets
built twice.

`.tf` files are indexed by the graph (the `terraform` extra is installed), so
infrastructure is queryable alongside code.

### P4 · Pipeline  (D-31, pays **E18**)

GitHub Actions → Helm → `staging`. `production` namespace created with a manual
approval gate. A commit on `main` reaches `staging` **with no human step** — that
is the exit criterion, and "no human step" means none, including approvals.

### P5 · Deployable shells

`web` skeleton and `identity-svc` as a hello-world. Just enough to prove the
pipeline carries a real artifact. **No domain model, no chassis** — the chassis
is Sprint 002 and deserves the full week.

## Out of scope

- Any domain model.
- Any UI beyond a deployable shell.
- The service chassis.
- Anything that looks like a feature.

## Sequencing

```
M1 latency ──> ADR-002 ──> P3 infrastructure ──> P4 pipeline ──> P5 shells
M2 partner files   (parallel, start first - longest external lead time)
M3 caretaker audit (parallel)
M4 eTIMS enquiry   (parallel, start day one)
P1 monorepo, P2 governance (parallel, no dependency on M1)
```

M2 and M4 start on day one because they depend on other people. P3 waits on
ADR-002.

## Risks this sprint could realise

- **R-04 — partner files do not arrive.** The mitigation is a specific, named ask
  in advance. If they have not arrived by the end of the week, say so in
  `acceptance.md` rather than substituting invented fixtures. Four later sprints
  are graded against real files; fake ones would hide the problem until Sprint 007.
- **R-05 — external tails.** WhatsApp verification and eTIMS certification are
  owned by third parties. Not starting them this week is the failure mode.

## Open items this sprint should close

- ~~**Q14 — what is E18?**~~ **Answered** (D-55): E18 is this sprint's **P4**,
  the automated delivery pipeline. Recovered by elimination, not from source
  notes — if the round-2 notes say otherwise, supersede D-55 and say so.
- ~~**Q15 — which code namespace wins?**~~ **Answered** (D-56): the `D-nn`
  decision numbers. This file's task IDs were renamed `M`/`P` as part of it.
- The two assumptions at the bottom of `QUESTIONS.md`.
- **Q3** is partly answerable from the M2 statement export, ahead of Sprint 007.
- **Q11** (phone verification) blocks Sprint 002, which starts next week.
