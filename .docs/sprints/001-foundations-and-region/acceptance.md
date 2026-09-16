# Sprint 001 Acceptance — Ground truth and the pipeline

**Phase 0 — Platform · Week 1 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | A commit on main is running in the staging namespace with no manual step. | Push a trivial commit to `main`; watch the Actions run reach the `staging` namespace. `kubectl -n staging rollout status` plus the run URL. Zero approvals, zero manual steps. | | ☐ |
| 2 | The Neon region is decided from measured numbers and recorded in ADR-002. | `.docs/adr/ADR-002.md` exists, contains p50 and p95 per region measured on a Safaricom mobile connection, and names the chosen region. | | ☐ |
| 3 | Partner sample files are committed as anonymised fixtures. | `ls fixtures/partners/` shows all four files from `FILE_INVENTORY.md` §1, anonymised. `git log` shows them committed. `graphify query` returns content from them. | | ☐ |
| 4 | The caretaker constraints document exists and names specific devices. | The constraints document exists and **names specific device models**, screen sizes, and cost per MB. A reviewer can hold a Sprint 008 screen to a stated KB budget using it. | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

## Readiness items paid

Codes are the roadmap/readiness sense. See `../../READINESS.md` §4 for why
that distinction matters.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| **D-32** | OpenTofu for all infrastructure: VPC, EKS Auto Mode, ECR, Neon, Secrets Manager, External Secrets, Cloudflare zone | | ☐ |
| **D-38** | The region, decided from measured numbers | | ☐ |
| **E11** | Monorepo toolchain and dependency hygiene, Renovate weekly | | ☐ |
| **E17** | ADRs under `.docs/adr/` for every hard-to-reverse decision (folder + first ADRs) | | ☐ |
| **E18** | **Automated delivery pipeline** (defined by D-55, closing Q14): merge to `main` builds, tests and deploys to `staging` with no human step; production goes through the same pipeline behind a manual approval gate. Evidence is a commit that reached staging unattended, plus the gate blocking an unapproved production deploy. | Pipeline authored and its five structural D-34 gates unit-proven (`helm unittest`), but **not paid** — no cluster exists to reach. Recorded as **DEBT-07**. | ☐ |
| **D-49** | The `.docs/` pack committed | | ☐ |
| **D-52** | Trunk-based branch protection with required PR checks | | ☐ |
| **D-53** | GitHub Project and issue templates | | ☐ |

## Boundary check

```bash
graphify update .
graphify god-nodes --top 15
```

An unplanned hub in a schema-per-service architecture is a boundary leak, and
it is R-01's second tripwire.

| Question | Answer |
|---|---|
| New god nodes this week | |
| Intentional | |

## Outcome

- **Passed:**
- **Did not pass:**
- **Moved, and to where:**

Anything that moved is reflected in `../../STATE.md`, and in `../../RISKS.md`
or `../../QUESTIONS.md` if this week changed either.
