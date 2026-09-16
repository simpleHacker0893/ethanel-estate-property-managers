# READINESS

The readiness checklist the rest of the pack keeps citing. It was referenced in
`STATE.md`, `ROADMAP.md` and all sixteen `requirements.md` files but never
written down, so every "Readiness items paid" list pointed at nothing.

**This file is reconstructed from evidence in the pack, not authored fresh.**
Each row's meaning is harvested from the place the code is actually used, and the
source is cited. Rows marked **UNDEFINED** could not be recovered and are open
questions, not guesses.

## What "22 items, 18 paid before go-live" means

`STATE.md` says eighteen of twenty-two readiness items are marked "pay before
go-live". That reconciles exactly against the **E-series**:

- The checklist is **E1–E22** — twenty-two items.
- `ROADMAP.md` schedules eighteen of them: E1–E5, E7–E15, E17–E19, E22.
- The four not paid before go-live are **E6**, **E16**, **E21** and **E20** —
  three deferred and one void. **E16 and E21 are since narrowed to product
  surfaces by D-70**, so marketing routes gate on both. The three deferred are
  to Release 1.1 with a written trigger, and **E20**, which is void.

The C, D, F and G codes are **not** part of this checklist. They are separate
series, indexed in §3, because the pack cites them the same way and they are the
source of a live ambiguity (§4).

---

## 1. The readiness checklist — E1 to E22

| Code | Item | Paid in | Source |
|---|---|---|---|
| **E1** | Automated posting and reconciliation tests, including property-based tests asserting the trial balance nets to zero after any sequence of operations. A permanent merge gate on `money-svc`. | 005 | ROADMAP Sprint 005 |
| **E2** | End-to-end journeys in Playwright running on every PR: rent payment, repair, month-end. | 014 | ROADMAP Sprint 014 |
| **E3** | Cross-organization test harness. For every table in a service manifest, generate assertions that organization A cannot read, write or enumerate organization B's rows. A tenant-scoped table without an RLS policy fails CI. | 002 harness, 013 completion | ROADMAP 002, 013; ARCHITECTURE "CI merge gates (D-34, E3)" |
| **E4** | Full load test: a 500-unit invoice run and a callback burst **at the same time**, at pilot scale, on production-shaped infrastructure. Passing them separately is not passing. | 006 partial, 014 full | ROADMAP 006, 014 |
| **E5** | Threat model day. Four surfaces — authentication, money, uploads, webhooks — one day, written output with owners. | 013 | ROADMAP 013; 013 requirements |
| **E6** | External penetration test. | **Deferred to R1.1.** Trigger: first client over 1,000 units, or a security questionnaire. | ROADMAP R1.1 backlog |
| **E7** | Database restore drill, run on the clock with the steps recorded as they actually happened. | 004 first, 014 second, monthly after | ROADMAP 004, 014 |
| **E8** | Runbooks: M-Pesa outage, webhook failure backlog, WhatsApp outage, database restore, credential leak. Each written by causing the failure in staging, not from imagination. | 013 (credential leak), 014 (the set) | ROADMAP 014; 013 requirements |
| **E9** | Per-organization feature flags gating every surface that might need switching off during the pilot, flippable without a deploy. | 012 | ROADMAP 012; SERVICE-TOPOLOGY `billing-svc` |
| **E10** | Public versioned API and API keys: scopes, per-key rate limits, published OpenAPI, key rotation. | 013 | ROADMAP 013; SERVICE-TOPOLOGY |
| **E11** | Monorepo toolchain and dependency hygiene: pnpm + Turborepo, TypeScript strict, ESLint, Prettier, Husky, Renovate on a weekly schedule. | 001 | ROADMAP 001; 001 requirements |
| **E12** | Data Protection Act tooling: data subject access export, deletion with ledger-retention carve-outs, retention schedules per data class. | 013 | ROADMAP 013 |
| **E13** | SLO alerting: webhook failure rate, `pg-boss` queue age, error rate, reconciliation rate. Paged to WhatsApp and SMS. Definitions written in 004, wired in 014. | 014 | ROADMAP 004, 014 |
| **E14** | The Africa-first posture written down with the international scale path: what triggers a second region and what changes when it happens. | 015 | ROADMAP 015; QUESTIONS assumption |
| **E15** | Cloud cost budgets and anomaly alerts. | 014 | ROADMAP 014 |
| **E16** | Accessibility audit, WCAG 2.1 AA. | **Deferred to R1.1 for product surfaces only (D-70).** Trigger: first institutional or government client. **Marketing routes are not deferred** — they gate on `@axe-core/playwright` at zero serious or critical violations from the marketing track. | ROADMAP R1.1 backlog; D-70 |
| **E17** | ADRs complete under `.docs/adr/` for every hard-to-reverse decision. Files are written for hard-to-reverse decisions only. | 001 folder and first ADRs, 015 completion | ROADMAP 001, 015; ARCHITECTURE; DECISIONS |
| **E18** | **Automated delivery pipeline.** Merge to `main` builds, tests and deploys to the `staging` namespace with no human step; production deploys through the same pipeline behind a manual approval gate. Evidenced by a commit reaching staging unattended, and by the gate blocking an unapproved production deploy. **Recovered by elimination, not from source notes — see D-55.** | 001 (`001/blueprint.md` P4) | ROADMAP 001 exit criterion; D-55 |
| **E19** | SaaS usage counters recorded from Sprint 012 even though pilot invoicing is done by hand. Explicitly **accepted debt**. | 012 | ROADMAP 012 |
| **E20** | **VOID.** Was the Drizzle ORM item; superseded by D-03 (Prisma 7). | — | DECISIONS D-03; RECONCILIATION item 3 |
| **E21** | Performance budgets in CI. | **Deferred to R1.1 for product surfaces only (D-70).** Trigger: resident page p75 LCP exceeds 2.5s on 3G. **Marketing routes are not deferred** — `@lhci/cli` asserts LCP < 2.0s, CLS < 0.05, INP < 200ms, first-party JS < 120 KB gz and total weight < 900 KB on a throttled 4G profile from the marketing track. | ROADMAP R1.1 backlog; D-70 |
| **E22** | Anonymised staging seed: mock listings, every user role, transaction history. Production-shaped and production-sized. | 004 | ROADMAP 004; 004 requirements |

Automated SaaS metering is also deferred to R1.1 (trigger: more than five paying
organizations), and multi-region database likewise (trigger: expansion outside
East Africa). Those are the deferred halves of E19 and E14, not separate rows.

---

## 1a. The D-34 gate list, and where each gate is enforced

D-34 names eight gates. The count was never really in dispute; **where they are
enforced was** (D-65). `ROADMAP.md` and every Sprint 002 file described them as
"structural in `charts/service`", which is true of five and impossible for three:
a Helm chart cannot scan an image, cannot make a worker shut down gracefully, and
does not own a namespace. The acceptance checkbox needs a home per row, not one
box against a chart.

| # | Gate | Enforced by | Evidence |
|---|---|---|---|
| 1 | Readiness and liveness probes | `charts/service` | Chart refuses to render without them |
| 2 | CPU and memory requests **and** limits | `charts/service` | As above |
| 3 | PodDisruptionBudget, 2+ replicas for `web` and `gateway` | `charts/service` | As above |
| 4 | Default-deny NetworkPolicy with an explicit allow list | `charts/service` | As above |
| 5 | Non-root with a read-only root filesystem | `charts/service` | As above |
| 6 | Image vulnerability scanning, blocking on high and critical | **CI workflow** | A failing scan blocks the merge |
| 7 | Graceful worker shutdown | **`packages/chassis`** | Chassis contract test; a worker that drops in-flight work fails it |
| 8 | Per-namespace resource quotas | **Namespace manifests** (OpenTofu / Helm) | `kubectl get resourcequota` in both namespaces |

Rows 1–5 are the ones D-34's "by construction" promise applies to: a Deployment
that omits any of them must not be *renderable*. Rows 6–8 are enforced, just not
by the chart, and each has its own evidence.

**Sprint 002 pays rows 1–7. Row 8 is paid with the namespaces**, which exist from
Sprint 001 — so if Sprint 001 created them without quotas, that is a Sprint 002
gap and not a Sprint 013 discovery. Sprint 013 verifies all eight are live in
`production` rather than only in the chart.

---

## 2. Go-live gate

Sprint 016 step 4 is a go/no-go against this checklist. That means **the eighteen
paid rows above must be evidenced**, not asserted.

E18 was undefined until D-55 recovered it by elimination, which had made it an
un-evidenceable row in an eighteen-row gate. It is now defined and its evidence
is the cheapest in the list — a commit that reached staging on its own. Note the
provenance difference: twenty-one of these rows are harvested from the place the
code is used; E18 is reconstructed from the gap it left. If the round-2 source
notes contradict it, supersede D-55 rather than quietly editing this row.

**Do not retire a row to tidy the list.** The count is load-bearing: `STATE.md`
justifies sixteen weeks instead of twelve on the grounds that eighteen of
twenty-two items are paid before go-live. Dropping E18 would have made it
seventeen of twenty-one and quietly weakened the argument for Phase 4.

---

## 3. The other series — retired, decoder kept

**These codes no longer appear in the pack.** D-56 replaced them with the
decision numbers they had already been promoted to (§4 has the mapping). This
table is kept so that an old ticket, commit message or meeting note citing a bare
code can still be read.

| Series | What it was | Now |
|---|---|---|
| **A1–A10** | Round-2 technical answers (stack choices). | D-01 – D-10 |
| **B1–B12** | Round-2 frontend answers. | D-16 – D-27 |
| **C1–C11** | Round-2 infrastructure answers: Cloudflare and WAF (C1, C2), staging/production namespaces (C3), manual production approval gate (C4), OpenTofu (C5), External Secrets against AWS Secrets Manager (C6), pod-security gates (C7), worker scaling for rent days (C8), observability and alerting (C9), backups plus PITR plus nightly encrypted cross-region dump (C10), region (C11). | D-28 – D-38 |
| **D1–D10** (pack sense) | Round-2 product answers: the 95% match gate (D1), the 500-unit rent run (D2), the 50/second callback burst (D3), caretakers online-only (D4), one assignee per conversation (D5), reversal rules (D6), live landlord figures (D7), viewings (D8), self-serve import (D9), notification preferences (D10). | D-39 – D-48 |
| **G1–G5** | Governance answers: pack committed (G1), one-week sprints (G2), how a sprint runs (G3), branch protection (G4), GitHub Project and issue templates (G5). | D-49 – D-53 |
| **F1–F5** (pack sense) | Field work, no decision equivalent: caretaker device audit (F1), grid requirements (F2), partner sample files (F3), usability tests (F4), Swahili (F5). | **Spell out inline** |
| **G7, G9–G14** | Loose product facts, no decision equivalent: documents collected manually (G7), recurring maintenance jobs (G9), caretaker basic-phone flow (G10), eTIMS integrator (G11), compliance certificate storage (G12), email only for statements (G14). | **Spell out inline** |
| **D1–D20, F1–F5, A/B/C/G/H/J** (PRD sense) | Round-1 questionnaire answers, PRD founder tensions, PRD decisions log. Different meanings from the pack senses above — that was the collision. | `DQ-` / `PRD-` prefixed, inside `PRD.md` only |
| **D-01 … D-70** | **Decisions**, hyphenated. The namespace everything else folded into. It ran to D-56 when D-56 was written; it grows, so cite the prefix and not the range. | unchanged |

---

## 4. RESOLVED: the code collision, and the legacy index

`RECONCILIATION.md` item 12 fixed an ADR numbering collision. There was a second
of the same class — `PRD.md` and the pack used the same bare codes for different
things, so `D7` meant "WhatsApp is primary" in one file and "landlord figures
read live" in another. Logged as **Q15**, **resolved by D-56**.

**The resolution was a substitution, not a renumber.** Every round-2 answer code
had already been promoted to a numbered decision in `DECISIONS.md`; the pack was
simply still citing the draft labels. So each code was replaced with the decision
number it already was — 194 citations across 44 files.

| Legacy | Now | Legacy | Now |
|---|---|---|---|
| A1–A10 | **D-01 – D-10**, in order | D1–D10 | **D-39 – D-48**, in order |
| B1 | D-16 | B9 | D-24 |
| B2 / B8 | D-23 / D-17 — a pair; which is which was undetermined in the pack | B10 | D-25 |
| B3 | D-18 | B11 | D-26 |
| B4 | D-19 | B12 | D-27 |
| B5 | D-20 | C1, C2 | D-28, D-29 |
| B6 | D-21 | C3–C11 | **D-30 – D-38**, in order |
| B7 | D-22 | G1–G5 | **D-49 – D-53**, in order |

**What keeps its own namespace, because each is already unique:**

- **`E1`–`E22`** — this checklist. A checklist with a go-live gate, not a
  decision, so it has no `D-nn` equivalent and needs none. It is now the only
  bare letter-code in the pack, which is what makes it unambiguous.
- **`D-nn`** decisions (D-01–D-70 today), **`R-nn`** risks (R-01–R-09),
  **`Qn`** questions (Q1–Q22), **`ADR-nnn`** onwards. Cite the prefix, never the
  range — the ranges move and the prefixes do not.
- **`F1`–`F5`** (pack sense) and **`G7`, `G9`–`G14`** have no decision
  equivalents — they are field-work tasks and loose product facts. Spell these
  out inline rather than citing a bare code. Roughly a dozen citations.
- **`PRD.md` keeps its own codes, prefixed.** Its codes cite the round-1
  discovery questionnaire (`DQ-`) or its own founder tensions and decisions log
  (`PRD-`). They are provenance to a source document, not decisions — and the
  PRD had its *own* internal collision, using `D2` for both a questionnaire
  answer and a decisions-log row.
- **Sprint blueprints must not use bare letter task IDs.** `001/blueprint.md`
  used `A1`–`A5` / `B1`–`B5` as local task IDs — a third collision on the same
  spellings. They are now `M1`–`M5` (measurement) and `P1`–`P5` (plumbing).

**Standing rule.** The only bare letter-code permitted in the pack is an
`E`-number from §1. Everything else carries its namespace: `D-`, `R-`, `Q`,
`ADR-`, `DQ-`, `PRD-`. A bare code never crosses a document boundary, and a local
task ID never reuses a namespace letter.
