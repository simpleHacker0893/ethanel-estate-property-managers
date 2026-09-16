# Sprint 002 Acceptance — The chassis and tenancy

**Phase 0 — Platform · Week 2 of 16 · Status: not started**

> Written from `requirements.md`. The exit criteria below are **verbatim** —
> not paraphrased and not softened. Fill the evidence column as the week runs.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | Scaffolding a brand new service - schema, role, contract, job handlers, loaded by an existing Deployment - and getting it to staging takes under one day. If it does not, this sprint is not done - see RISKS R-01 tripwire. | Scaffold a throwaway service and time it end to end: schema, role, contract, job handlers, loaded by an existing Deployment, running in `staging`. Record the wall-clock. Over one day means R-01 has fired. | | ☐ |
| 2 | Moving a service into its own Deployment has been done once, to prove D-54's split path is a values.yaml and a connection string rather than a claim. | The `values.yaml` diff and connection string change that moved one service to its own Deployment, plus the successful rollout. Done, not claimed. | | ☐ |
| 3 | A user signs in with Google, lands in their organization, and is provably unable to reach another organization's data via API or direct query. | Sign in with Google as org A. Then attempt org B's data two ways: through the API, and by direct query as the application role. Both must fail. Paste both outputs. | | ☐ |
| 4 | A pull request adding a tenant-scoped table without an RLS policy fails CI. | Open a PR adding a tenant-scoped table with no RLS policy. CI must reject it. Paste the failing check. Also prove the RLS no-op test goes red when the hook is broken deliberately. | | ☐ |

All of the above must pass. A sprint is done when this file passes, not when
the code compiles.

## Readiness items paid

Codes are the roadmap/readiness sense. See `../../READINESS.md` §4 for why
that distinction matters.

| Code | Item | Evidence | Paid |
|---|---|---|---|
| **D-34** rows 1–5 | Structural in `charts/service` — the chart must not render without them: probes; CPU and memory requests *and* limits; PodDisruptionBudgets with 2+ replicas for `web` and `gateway`; default-deny NetworkPolicies; non-root with read-only root filesystem | | ☐ |
| **D-34** row 6 | Image vulnerability scanning blocking on high and critical **in CI**, not in the chart | | ☐ |
| **D-34** row 7 | Graceful worker shutdown, enforced by a `packages/chassis` contract test | | ☐ |
| **D-34** row 8 | Per-namespace resource quotas live in both namespaces (`kubectl get resourcequota`). Paid with the namespaces, which exist from Sprint 001 — if 001 created them without quotas, that is a gap here, not a Sprint 013 discovery | | ☐ |
| **E3** | Cross-organization test harness; a tenant-scoped table without an RLS policy fails CI (harness) | | ☐ |

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
