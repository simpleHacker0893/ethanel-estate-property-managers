# DECISIONS

House rules. Inherited by every sprint, not re-litigated. To change one, write a
superseding entry — do not edit history.

A bare code in parentheses — `(A3)`, `(B1)` — is the **round-2 answer this
decision came from**. It is provenance, not a cross-reference, and this file is
the only place such a code still appears: D-56 replaced every other citation of
them in the pack with the decision number. The mapping is `READINESS.md` §4.

`ADR` in the last column means E17 requires a full record under `.docs/adr/`,
because the decision is hard to reverse. Those are due by Sprint 015.

## Architecture

| # | Decision | Exercised | ADR |
|---|---|---|---|
| D-01 | Fine-grained microservices: 11 services, 15 Deployments. Full topology in `SERVICE-TOPOLOGY.md`. **Superseded by D-54.** | 002+ | ADR-001 |
| D-02 | Server Actions for UI; versioned internal REST between services; OpenAPI generated from zod in `packages/contracts`. | 002 | ADR-003 |
| D-03 | Prisma 7 (A3). Supersedes the earlier Drizzle option; E20 is void. | 002 | ADR-004 |
| D-04 | `pg-boss` on Postgres for all background work. Valkey is cache only and may be lost without data loss. | 002 | ADR-005 |
| D-05 | ElastiCache Valkey for Next.js cache, rate limits, one-time codes, short-lived session data. Nothing durable. | 002 | — |
| D-06 | Search is Postgres full-text plus `pg_trgm`. No separate search engine in the pilot. | 011 | — |
| D-07 | UUIDv7 for every primary key, generated in the application. | 002 | ADR-006 |
| D-08 | Money is `bigint` minor units, KES, end to end. No float touches money code. | 005 | ADR-007 |
| D-09 | Inboxes and boards poll every 20–60s. No websockets in the pilot. | 009 | — |
| D-10 | PDFs render from HTML through headless Chromium (Playwright) in an isolated `docs-worker`. | 006 | — |
| D-11 | One Neon project, one schema per service, one role per schema. No cross-schema joins or foreign keys. | 002 | ADR-008 |
| D-12 | Tenancy is `organization_id` plus Postgres RLS. Application filtering is ergonomics; RLS is the control. | 002 | ADR-009 |
| D-13 | Cross-service consistency is transactional outbox plus `pg-boss`. No distributed transactions. | 005 | ADR-010 |
| D-14 | All inbound webhooks terminate at `gateway`, which verifies, persists and returns 200. Matching is always async. | 007 | ADR-011 |
| D-15 | Unmatched payments post to a suspense account immediately and sit in a manual match queue. Money is never held outside the ledger. | 007 | — |
| D-67 | **ADR-012 resolved: reporting is a read-model service.** A `reporting` schema fed **only** by outbox events, materialising `rpt_*` tables with a replay path. Rejected: composition in `web` (cannot sort or group server-side across five services, which §7.4 requires above 5,000 rows) and read-only subscriptions onto other schemas (re-creates the coupling D-11 exists to prevent). Decided in **Sprint 002, not Sprint 004**, so the schema is created with the other nine rather than retrofitted.<br><br>**This makes it twelve logical services and ten schemas, and leaves D-54's four Deployments untouched** — `reporting-svc` is hosted in `web` for reads and `worker` for projections. That is the point D-54 was making: under it, a new service costs a package, a schema and a role, so pulling this decision two sprints forward costs nothing. | 002 | ADR-012 |

## Frontend

| # | Decision | Exercised |
|---|---|---|
| D-16 | Next.js pinned to the Active LTS line; security releases applied within 7 days (B1). | 001 |
| D-17 | Server Components for pages; TanStack Query inside grids and live panels. | 003 |
| D-18 | Cache Components / `use cache` on the marketplace, storefronts and reference data only — never where a stale figure costs money. | 011 |
| D-19 | shadcn/ui + Radix + Tailwind CSS v4. | 003 |
| D-20 | AG Grid Community now; Enterprise licence when a pivot is asked for in a usability test. | 004 |
| D-21 | Recharts via shadcn charts. | 004 |
| D-22 | React Hook Form + zod, schemas shared with the API contracts. | 003 |
| D-23 | URL state via nuqs plus TanStack Query. No global store. | 003 |
| D-24 | Serwist PWA: precache the shell and static assets. No offline data in the pilot. | 010 |
| D-25 | `next-intl` from day one, English only at launch. Swahili in R1.1. | 003 |
| D-26 | MapLibre GL for 2D; CesiumJS on demand only, never on the resident path. | 011 |
| D-27 | Storefronts use the Ethanel theme with the organization's logo and accent colour. | 011 |

## Platform

| # | Decision | Exercised |
|---|---|---|
| D-28 | Traffic enters through an AWS load balancer managed by EKS Auto Mode. | 001 |
| D-29 | Cloudflare for DNS, WAF and CDN in front of the load balancer; CloudFront for media only. | 001 |
| D-30 | One cluster, `staging` and `production` namespaces. | 001 |
| D-31 | GitHub Actions + Helm, manual approval gate on production. | 001 |
| D-32 | OpenTofu with community AWS modules. | 001 |
| D-33 | External Secrets Operator against AWS Secrets Manager. | 001 |
| D-34 | Go-live gates, all enforced by the Helm library chart or CI: readiness and liveness probes; CPU and memory requests and limits; PodDisruptionBudgets with 2+ replicas for `web` and `gateway`; default-deny NetworkPolicies; non-root with read-only root filesystem; image vulnerability scanning in CI; graceful worker shutdown; per-namespace resource quotas. | 002, verified 013 |
| D-35 | HPA for `web` and `gateway`; fixed worker replicas scaled up manually before rent days. | 014 |
| D-36 | Sentry + CloudWatch Container Insights + uptime checks, alerting to WhatsApp and SMS. | 004 |
| D-37 | Neon PITR, nightly encrypted dump to S3 in a second region, restore drill monthly. | 004 |
| D-38 | Region chosen by measured Nairobi latency in Sprint 001. Africa-first; international scale path recorded, not built. | 001 |
| D-65 | **D-34's eight gates have three enforcement homes, and only five of them can be structural in `charts/service`.** The count was already settled at eight; the live defect was the *home*. Image vulnerability scanning is a CI step, graceful worker shutdown is a `packages/chassis` behaviour, and per-namespace resource quotas are a namespace manifest — a Helm chart cannot render any of the three, so "all eight gates, by construction in `charts/service`" was never achievable. The row-by-row table is `READINESS.md` §1a, and the Sprint 002 acceptance checkbox is split to match it. | 002 |

## Product rules

| # | Decision | Exercised |
|---|---|---|
| D-39 | Go-live blocks below 95% of payments matched with no human action, measured on real partner data. | 007 instrumented, 015 gated |
| D-40 | Invoice runs support 500 units in under 2 minutes, idempotent and resumable. | 006 |
| D-41 | Webhook ingress survives 50 callbacks/second for 10 minutes with zero loss. | 007 |
| D-42 | Caretakers are online-only in the pilot; low-data screens and client-side image compression. | 008 |
| D-43 | One assignee per WhatsApp conversation; everyone else read-only. | 009 |
| D-44 | Accountants reverse money entries with a mandatory reason; above a threshold an admin approves. Threshold open — Q1. | 005 |
| D-45 | Landlord portal figures are read live from the ledger with a "last updated" stamp. Never a cached summary. | 010 |
| D-46 | Viewings: the agent starts a WhatsApp video call; a Google Meet link only after the prospect is verified. | 011 |
| D-47 | Organizations import their own data, self-serve, with dry run, a row-level validation report and rollback. | 015 |
| D-48 | Notification preferences are per event group per channel; financial notices are mandatory and cannot be disabled. | 009 |
| D-63 | **The phone-verification gate is accepted as designed** (closes Q11): WhatsApp one-time code, SMS fallback, hashed, five attempts per hour. One standard for every non-member actor — no weaker tier for prospects. A number change requires re-verification; a manual re-link is `org:owner` or `org:admin` only and is written to the audit log. If WhatsApp Business verification (R-05) is not through by Sprint 002, the gate ships SMS-only and WhatsApp is enabled later — the gate does not wait on Meta. | 002 |

## Domain model

Vocabulary and ledger shape. `DOMAIN.md` is the long form; these are the rows a
sprint inherits. All six close findings from the domain-modelling pass against
`ARCHITECTURE.md` §7, where the schema and the glossary had diverged.

| # | Decision | Exercised | ADR |
|---|---|---|---|
| D-57 | **The receivable is keyed to the lease, not the resident**, and is called **`lease receivable`**. A lease's parties are co-liable for the whole rent; a party leaving mid-term closes its `lease_parties` row rather than deleting it. Every key in the money path already said lease — `leases` has no `resident_id`, `invoices` are keyed `lease_id`, `ledger_accounts` carries `lease_id?` and no `resident_id` — and only the prose said resident. | 003, 005 | ADR-023 |
| D-58 | **The agency's economics live on the management agreement, versioned by effective date — not on the organization.** `fee_type`, `fee_rate`, `fee_base` and `remittance_day` are per agreement, with a nullable `property_id` that also settles Q4's payment grain. Consequence: Q2's rates are configuration (D-64), and only its commission **recognition timing** blocks Sprint 005. | 005, 010 | — |
| D-59 | **`prospect` and `buyer` are first-class non-member actors**, so four actor classes need cross-organization RLS, not two. A **verified prospect** is one that has passed the D-63 gate — the same standard as a resident, because §2 permits exactly one linking mechanism and a weaker prospect tier would be a second. | 002, 011 | — |
| D-60 | **"Tenancy" is reserved for the SaaS boundary.** The lease sense is **`lease lifecycle`**. The events already agreed (`lease.activated`, `lease.ended`); the prose did not, and `AGENTS.md` banned "tenant" for a person while `DOMAIN.md` §5 used "tenancy lifecycle" four sections later. | all | — |
| D-61 | **One chart of accounts, pinned in `DOMAIN.md` §4; `ARCHITECTURE.md`'s `ledger_accounts` note defers to it.** Nine accounts. There were two non-matching lists — eight rows in `DOMAIN.md` against five in `ARCHITECTURE.md`, two of them the same account under different names — and Sprint 005 builds from whichever a Builder opened first. | 005 | — |
| D-62 | **An `allocation` is not a correction and not a reversal.** Attributing a suspense payment carries no reason and is not subject to the Q1 approval threshold; only a reversal is. D-39 expects the manual match queue to carry up to 5% of payments, so the routine path must not share vocabulary with the exceptional one. | 005, 007 | — |

## Delivery

| # | Decision | Exercised |
|---|---|---|
| D-49 | 120x Operating Pack lives under `.docs/` with sprint folders. | 001 |
| D-50 | One-week sprints. | all |
| D-51 | Reviewer agents run first; the operator reviews every PR diff personally. | all |
| D-52 | Trunk-based: short-lived branches, PR checks, preview environment per PR. | 001 |
| D-53 | Tasks in GitHub Issues and Projects, next to the code. | 001 |
| D-64 | **When a blocking business fact is still open on the Monday a sprint starts: build the mechanism, defer the value.** Model it as per-organization or per-agreement configuration with an `ASSUMPTION:` marker at the call site and no default. **Exception:** if the fact changes the ledger's *shape* rather than a value, the sprint stops and the roadmap re-orders. Exactly one qualifies today — Q2's commission recognition timing. A named guess remains forbidden (`AGENTS.md`). Written up in `DOMAIN.md` §7. | all |

## Superseding entries

Written, not edited in. Each says what changed and why, so the reversal is on the record.

| # | Decision | Supersedes | Exercised | ADR |
|---|---|---|---|---|
| D-54 | **Eleven logical services, four Deployments.** The eleven service boundaries in `SERVICE-TOPOLOGY.md` stand exactly as written — each owns one Postgres schema, one database role and one contract in `packages/contracts`. They are *hosted* in four Deployments (`web`, `gateway`, `worker`, `docs-worker`) rather than fifteen, and a service moves to its own Deployment when it meets one of the triggers in `ARCHITECTURE.md` §13.1.<br><br>**Why.** D-01 reversed a considered prior decision (v1.1 ADR-001, modular monolith with a documented extraction path) and the reversal was never argued — it arrived as the fine-grained end of answer A1. Reviewing both: the *boundaries* were never the risk, the *pod count* was. Fifteen Deployments at `min 2` is thirty pods of floor, fifteen rollout steps, fifteen PodDisruptionBudgets and fifteen places for a partial deploy to hide, carried by one person against RISKS R-01 — the highest-likelihood risk in the register. Four Deployments costs none of the boundary discipline: because no query crosses a schema line and every call already goes through a contract, splitting one out later is a `values.yaml` and a connection string, which is precisely what `SERVICE-TOPOLOGY.md` §2 promised. Sprint 002's chassis is still built in full — it is the thing that makes the later split cheap. | D-01 | 002+ | ADR-001 |
| D-66 | **D-39's 95% is measured over rent and charge payments against open invoices. Deposits and plot instalments are excluded from the denominator.**<br><br>**Why.** D-39 names a go-live gate and never said what it divides by, which left the gate's value to whoever wrote the query in week 15. Two classes had to come out. A **plot instalment** cannot auto-match by construction: reconciliation step 1 is `units.code` and `plots` carries a `label`, not a code, so every plot payment reaches the review queue — and Sprint 012, which builds them, is a designated slip absorber that may not ship at all. Including them would let deferred work move a go/no-go number. A **deposit** is a liability arriving once at move-in against no open invoice, so it fails step 3 by definition. Neither exclusion weakens the bar: what D-39 exists to measure is whether routine rent collection needs a human, and that is exactly what is left. A plot's own payment reference is Q19. | D-39 | 007 instrumented, 015 gated | — |
| D-68 | **The public marketing site is in scope**, built under `apps/web/app/(marketing)/` and governed by `.docs/tracks/marketing-site/` rather than by a seventeenth sprint.<br><br>**What this reverses.** `ARCHITECTURE.md`'s Scope row read "Landing page out of scope" and `PRD.md` §3 listed "Public marketing landing page (deferred)" as a non-goal for *all* releases. Those were considered positions, not oversights, and they are now reversed rather than quietly ignored.<br><br>**Why a track and not a sprint.** `STATE.md` justifies sixteen weeks over twelve on the arithmetic that eighteen of twenty-two readiness items are paid before go-live, and `READINESS.md` §2 says in terms: *"Do not retire a row to tidy the list. The count is load-bearing."* A seventeenth sprint folder would move a count that forty-four files cite. A track carries `requirements.md`, `blueprint.md` and `acceptance.md` in the same format and is graded the same way — `acceptance.md` passes or the track is not done — without touching the sequence.<br><br>**What it does not license.** Nothing on the site may be invented: no customer, logo, testimonial, rating, units-under-management figure or price. The defensible engineering numbers — D-40, D-41, D-39 as bounded by D-66, D-45 — may be stated as design targets the platform holds itself to, with a link to `/security`, and never as results customers get. Vocabulary is `AGENTS.md`'s: **resident**, never "tenant". | `ARCHITECTURE.md` §Scope, `PRD.md` §3 | marketing track | — |
| D-69 | **D-18 extends to marketing routes.** Cache Components / `use cache` is permitted on `(marketing)`.<br><br>**Why.** D-18 permits it on *"the marketplace, storefronts and reference data only — never where a stale figure costs money"*, and `ROADMAP.md` Sprint 011 calls the storefront *"the only surface using Cache Components"*. A marketing page carries no money figure at all, so it passes D-18's own test; it was excluded only because it did not exist when D-18 was written. This is an extension of the existing rule, not a second rule.<br><br>**D-45 is untouched.** Nothing on a marketing route reads the ledger, so the prohibition on caching a figure someone acts on is unaffected. Every marketing page is static or ISR, and the operative test stays exactly as D-18 phrased it: `use cache` is permitted where a page can be stale without someone losing money. | D-18 (extends) | marketing track | — |
| D-70 | **DEBT-04 and DEBT-05 are narrowed to product surfaces. Marketing routes gate on accessibility and performance from the first commit.**<br><br>• `@axe-core/playwright` blocks a merge on any **serious or critical** violation on `/`, `/demo`, `/pricing` and one feature page.<br>• `@lhci/cli` asserts the marketing budgets: LCP under 2.0s, CLS under 0.05, INP under 200ms, first-party JS under 120 KB gzipped, total page weight under 900 KB, on a throttled 4G profile.<br><br>**Why narrow rather than reverse.** E16 and E21 were deferred for a real reason: auditing eleven services' worth of authenticated UI is Release 1.1 work, and each carries a written trigger. The marketing site has no such excuse — it is static HTML and it is the first thing a sceptical agency owner loads on a Safaricom handset. A CI step now is cheap; a retrofit is a rebuild.<br><br>**The product-surface triggers do not move.** DEBT-04 still repays on the first institutional or government client; DEBT-05 still repays when the resident page p75 LCP exceeds 2.5s on 3G. `READINESS.md` E16 and E21 and `VALIDATION.md` §5 are amended to carry the scope, so all three places that record the exception agree. | DEBT-04, DEBT-05 | marketing track | — |
| D-71 | **The first-party JavaScript budget on `/` is 150 KB gzipped, and the Lighthouse assertion is a hard error.** Closes **Q23**.<br><br>**Why the number moved.** D-70 set the budget at 120 KB. Measured on 16 September 2026 against the deployed placeholder — one static Server Component page with **zero** first-party client code — Next.js 16.3.5 ships 135.9 KB of script transfer, all of it React 19 plus the App Router runtime. The budget could not be met by deleting first-party code because there was none to delete. A gate that cannot be passed by doing the right thing is not a gate; it is a permanently yellow check that people learn to ignore.<br><br>**Why not the other two options.** Accepting the miss and leaving CI yellow trains everyone to skip a red square, which costs more than the 30 KB. Moving marketing routes off the Next runtime is a far larger decision than a budget row and would re-open D-16 and D-69 to save bytes we have not yet proven we need.<br><br>**What keeps it honest.** 150 KB is roughly 14 KB of headroom over the measured framework floor, so the gate still fails the moment first-party client JavaScript becomes significant — which is exactly what it exists to catch on a Safaricom handset. The assertion flips from `warn` to `error` **in the same commit** as the number, per Q23's own terms, so the budget is never both relaxed and unenforced. Every other D-70 budget is unchanged: LCP under 2.0s, CLS under 0.05, INP under 200ms, total page weight under 900 KB.<br><br>**The standing evidence stays on the record.** That a framework floor consumed the entire original budget is a fact about this stack on Kenyan mobile, not about this page, and it is what DEBT-05's trigger will be read against. | D-70 (the 120 KB row only) | marketing track | — |

## Housekeeping decisions

Not architecture or product. Recorded because each one resolves an open question
and a later reader will otherwise wonder who changed what.

| # | Decision | Closes | ADR |
|---|---|---|---|
| D-55 | **E18 is the automated delivery pipeline.** Merge to `main` builds, tests and deploys to `staging` with no human step; production goes through the same pipeline behind a manual approval gate. Paid by Sprint 001 (`001/blueprint.md` P4).<br><br>**Provenance is weaker than the other 21 rows and that is on the record.** E18 was cited as paid by Sprint 001 in `ROADMAP.md` and `001/requirements.md` but expanded nowhere, and it was not recoverable from the pack. It is reconstructed **by elimination**: mapping Sprint 001's scope against its other codes (D-32, D-38, E11, E17, D-49, D-52, D-53, plus F1/F3 field work) leaves the delivery pipeline as the only substantial deliverable with no code attached — and it is the sprint's headline exit criterion, which would be a strange thing for a readiness checklist to omit.<br><br>**Why not retire the code instead.** The count is load-bearing: `STATE.md` justifies sixteen weeks over twelve because eighteen of twenty-two readiness items are paid before go-live. Retiring E18 gives seventeen of twenty-one and quietly weakens the case for Phase 4. If the round-2 source notes say something else, supersede this entry — do not edit `READINESS.md` quietly. | Q14 | — |
| D-56 | **One code namespace: the `D-nn` decision numbers.** Every round-2 answer code in the pack is replaced by the decision it had already been promoted to — A1–A10→D-01–D-10, B-series→D-16–D-27, C1–C11→D-28–D-38, D1–D10→D-39–D-48, G1–G5→D-49–D-53. Mapping table in `READINESS.md` §4; 194 citations across 44 files.<br><br>**`E1`–`E22` stays bare** — it is a checklist with a go-live gate, not a decision, and has no `D-nn` equivalent. It becomes the only bare letter-code in the pack. `PRD.md` keeps its own codes `DQ-`/`PRD-` prefixed, because they are provenance to the round-1 questionnaire rather than decisions.<br><br>**Why substitution and not renumbering.** Renumbering either side would have rewritten references across twenty-plus files and, if the E-series moved, broken the 18-of-22 arithmetic. The collision existed only because the pack kept citing draft labels after those answers became numbered decisions — so the fix is to stop citing the drafts. Three further collisions surfaced while doing it: `PRD.md` used `D2` for both a questionnaire answer and a decisions-log row, `001/blueprint.md` used `A1`–`B5` as local task IDs (now `M1`–`M5`/`P1`–`P5`), and `B4` appears in the PRD as a literal unit code. Hence the standing rule in `READINESS.md` §4. | Q15 | — |

## Accepted debt

| # | Debt | Repaid when |
|---|---|---|
| DEBT-01 | SaaS billing is invoiced by hand during the pilot. Usage counters are recorded from Sprint 012 so the automation has history to work from. | More than 5 paying organizations |
| DEBT-02 | No pivot tables in the grid. | An accountant asks for one in a usability test |
| DEBT-03 | No offline mode for caretakers. | A caretaker reports a failed submission twice |
| DEBT-04 | No accessibility audit. | First institutional or government client |
| DEBT-05 | No performance budgets in CI. | Resident page p75 LCP exceeds 2.5s on 3G |
| DEBT-06 | No external penetration test. | More than 1,000 units under management, or a security questionnaire |
| DEBT-07 | **E18 is authored but unpaid.** The pipeline exists as code and the five structural D-34 gates are unit-proven, but E18's evidence is *"a commit reaching staging unattended"* and there is no cluster to reach. Not ticked in `READINESS.md` or `001/acceptance.md`. | The first unattended `staging` deploy runs — after AWS, Neon, Cloudflare and GitHub OIDC are provisioned and ADR-002 fixes the region. |
| DEBT-08 | **`/demo` writes leads to a file, not a database.** Validation, the attribution cookie and the server-side conversion event are complete; persistence is a `LeadSink` seam whose only implementation appends to a file and a structured log. There is no database yet, and **Q22** — which boundary owns a *sales* lead, given `listing-svc` owns marketplace leads and D-11 forbids parking it across a schema line — is open. | Sprint 002's schemas exist **and** Q22 is answered. |
| DEBT-09 | **The four `/legal/*` pages are stubs** with a visible "in review" banner. Privacy, terms, DPA and cookies are advocate work: **Q6** (controller registration) is open, **Q13**'s dual-role disclosure has to appear in the terms, and e-signature needs advocate review. An invented privacy policy is worse than an honest stub. | Advocate review completes, before go-live (Sprint 016). |
| DEBT-10 | **All marketing imagery is a watermarked placeholder**, each with an `asset-manifest.ts` row naming the shot it owes. No photography exists and no launch-film brief exists; the `/demo/thanks` walkthrough slot is present and empty. | The shoot happens. |
