# Reconciliation — CLOSED 15 September 2026

`.docs/ARCHITECTURE.md` and `.docs/PRD.md` predated the round 2 scoping answers.
This file listed where they disagreed with `DECISIONS.md`, and what they held
that the new pack was missing.

**All thirteen contradictions are resolved.** Both documents were edited in place
and are now at v1.2. Nothing in the repo contradicts `DECISIONS.md`.

Two items remain open and are tracked elsewhere, not here: **ADR-012**, the
reporting read model (§"What this created", below), and the **pull-forward list**
at the bottom, which was deliberately not actioned.

## The one that needed a decision

`ARCHITECTURE.md` §1.1 and ADR-001 said, in so many words:

> "Modular monolith first. One Next.js 16 application and one worker service
> share a typed domain layer." … "Modular monolith (web + worker) over
> microservices for Release 1."

with §13 defining the extraction path. Three deployables, deliberately, with a
documented trigger for splitting later. The round 2 answer (answer A1, now D-01, then the
fine-grained option) was **11 services and 15 Deployments from day one** — a
reversal of a considered prior decision rather than a refinement of it.

**Resolved as a third option: the boundaries stand, the pod count does not.**
Recorded as **D-54**, superseding D-01, and as the rewritten **ADR-001**. Eleven
services, each owning one schema, one role and one contract — exactly as
`SERVICE-TOPOLOGY.md` specified — hosted in four Deployments (`web`, `gateway`,
`worker`, `docs-worker`), with split triggers in `ARCHITECTURE.md` §13.1.

The reasoning, in short: the boundaries were never the risk, the pod count was.
Fifteen Deployments at `min 2` is thirty pods of floor, fifteen rollout steps and
fifteen places for a partial deploy to hide, carried by one person against
RISKS R-01. Four costs none of the boundary discipline, because nothing joins
across a schema line and every call already goes through a contract — which is
what `SERVICE-TOPOLOGY.md` §2 promised in the first place. Sprint 002's chassis
is still built in full; it is what makes a later split a `values.yaml`.

The roadmap stays at sixteen one-week sprints. The margin D-54 frees in Sprint
002 goes to Sprint 007 and Phase 4, not to an earlier date.

## Contradictions — all resolved

| # | Old document said | Round 2 decision | Resolution |
|---|---|---|---|
| 1 | Modular monolith, 3 deployables (ARCH §1.1, §4, ADR-001) | D-01: 11 services, 15 Deployments | **D-54**: 11 boundaries, 4 Deployments. ARCH §1.1, §4, §13.1 and ADR-001 rewritten; `SERVICE-TOPOLOGY.md` §1 re-tabled with a "hosted in" column; RISKS R-01 downgraded and given a second tripwire |
| 2 | 15 *modules* (ARCH §5.2) | 11 services | **Module→service map written** into ARCH §5.2. `costs`→`ops-svc`; `landlord-accounting`→`money-svc`; `signatures`→`docs-svc`; `tax`→`money-svc`; `platform`→`identity-svc`. `reporting` is deliberately unowned — see ADR-012 below |
| 3 | Drizzle ORM (ARCH §1.7, §7.1, `packages/db/`) | D-03: Prisma 7 | ARCH §1.7, §5.1 and §7.1 edited. E20 void |
| 4 | BullMQ on a dedicated Redis, 7 queues, `noeviction`, two Redis clusters (ARCH §8.1, §5.4, ADR-006) | D-04/D-05: pg-boss on Postgres, one Valkey, cache only | ARCH §8.1–8.3 and §5.4 rewritten; a `docs` queue added for the isolated Chromium worker. Old ADR-006 void |
| 5 | Shared schema with RLS, cross-module joins in `reporting`, materialised `rpt_*` tables (ARCH §7, ADR-003, PRD-D5) | D-11: schema per service, no cross-schema joins | ARCH §7.1–7.2 rewritten, old ADR-003 superseded by ADR-008/ADR-009, PRD-D5 corrected. **The `rpt_*` design is suspended, not adopted** — ADR-012 below |
| 6 | Webhooks live in `web` (`app/api/webhooks/…`) (ARCH §4, §5.1) | D-14: all webhooks terminate at `gateway` | ARCH §4, §5.1, §9.1, §9.2, §9.8 edited; the M-Pesa sequence diagram redrawn through `gateway` |
| 7 | Dashboard aggregates cached in Redis, 5-min TTL (ARCH §5.4) | D-45: landlord figures read live from the ledger, never cached | ARCH §5.4 row replaced with a "Never cached" row and the reasoning written out. PRD-D20 added |
| 8 | 3-month pilot, weeks 1–13, all partners by week 13 (PRD change log, §6.1, §13, §3) | D-50: 16 one-week sprints | PRD §3, §6.1, §6.2, §6.3 and §13 rebuilt against `ROADMAP.md`; PRD-D16 superseded. **PRD-F1 closed** by taking its own "move the pilot date to 16 weeks" option |
| 9 | Terraform (ARCH §1.7, §11.2, `infra/terraform/`) | D-32: OpenTofu | ARCH §1.7, §5.1, §11.2, §12 edited |
| 10 | Argo CD, Argo Rollouts canary, KEDA, Karpenter (ARCH §1.7, §11.1, §11.2, ADR-015) | D-31/D-35: GitHub Actions + Helm, manual gate, HPA | ARCH §11.0–11.2 rewritten. Each deferred piece now carries the trigger that pulls it forward, instead of being "after the pilot" by default. Old ADR-015 superseded — the pipeline is the decision, not a stage before GitOps |
| 11 | Full GCP alternative column (ARCH §3) | AWS only (D-28, D-29) | ARCH §3 retitled "AWS (GCP rejected)"; the column is kept explicitly as the record of what was rejected. Cloudflare and EKS Auto Mode rows added |
| 12 | ADR-001…ADR-016 numbering (ARCH §14) | `DECISIONS.md` assigns ADR-001/004/005/008 differently | **`DECISIONS.md` numbering wins.** ARCH §14 renumbered around it, with a "Was (v1.1)" column so no old reference dangles. v1.1 topics with no `DECISIONS.md` entry moved to ADR-013+ |
| 13 | "Move marketplace search to OpenSearch or Typesense" if R2 needs relevance tuning (ARCH §7.1) | D-06: no separate search engine *in the pilot* | Reworded as a deferred option to evaluate in R2, explicitly not a step on this roadmap |

**Minor items, also closed.** ARCH's "Next.js 16" pins now read "Active LTS line"
(D-16). `ops-svc` said "complaints" where PRD says "repair requests" — **"repair
request" wins**, added to `AGENTS.md`'s vocabulary table alongside "work order",
and corrected in `SERVICE-TOPOLOGY.md`, `ROADMAP.md` and sprints 008 and 010.
ARCH §12's "99.9% availability" now matches PRD §10's 99.5% pilot target, and
RPO ≤ 15 min / RTO ≤ 4 h are stated in ARCH for the first time. Restore drills
are monthly (D-37), not quarterly. The ARCH header's "Landlord: Njuguna Njenga"
label — a v1.1 rename artifact, since the document's author is not a landlord in
the glossary sense — now reads "Author".

Not in conflict, and left alone: money as `bigint` minor units, the
organization / resident / landlord vocabulary, RLS keyed on `organization_id`,
the transactional outbox. UUIDv7 was absent from the old schema table rather than
contradicted, and is now stated in ARCH §7.2.

## What this created: ADR-012, the reporting read model

**Still open. Due by the end of Sprint 004.** This is the one structural hole the
reconciliation opened and did not fill.

D-11 (schema per service, no cross-schema joins) and the old `reporting` module
are incompatible: the rent roll, arrears ageing and landlord statements all read
across what are now four or five service boundaries. The v1.1 answer —
materialised `rpt_*` tables built by cross-module joins — is therefore suspended,
and `reporting` has no owner in ARCH §5.2.

Three candidates are written up in `ARCHITECTURE.md` §7.4: a read-model service
fed by the outbox, per-service report endpoints composed in `web`, or a reporting
schema with read-only subscriptions. **Decide by the end of Sprint 004**, because
the ledger design in Sprint 005 depends on which one it is. Sprint 004's grid is
built against `property` and `money` endpoints only, so it does not prejudge the
answer. Added to `ROADMAP.md` Sprint 004 and to `STATE.md`.

Note that D-54 does **not** soften this. Sharing a pod does not license sharing a
schema; the per-schema roles mean Postgres still refuses the join.

## Deliberately not actioned: the pull-forward list

`ARCHITECTURE.md` and `PRD.md` hold a great deal of domain detail the sprint pack
lacks, and the right home for most of it is a `DOMAIN.md` that does not yet
exist. **Creating it was considered and deferred** — the two source documents
remain in the repo and remain the reference, so nothing is lost, but the material
is not yet in the just-in-time form a sprint blueprint wants.

Highest value first, with the sprint that will need it:

- **The reconciliation order** (ARCH §9.1, PRD M4-05): account reference → payer
  phone on file → exact amount match on open invoices → review queue; oldest
  invoice first; overpayment as credit. **This is the algorithm behind D-39's 95%
  bar.** Now stated in ARCH §9.1 as part of conflict 6's edit — the one
  pull-forward item that did land. → Sprint 007.
- **Permission matrix** (PRD §4.2): 9 roles × 13 capabilities with
  Full/Read/Assigned/Own semantics, the Clerk role list `org:owner … org:caretaker`,
  and property-level assignment scoping. **Blocks sprints 002 and 003.**
- **Identity model** (ARCH §6.1): membership is optional; landlords and residents
  are *not* organization members (`landlord_contacts`, `lease_parties`);
  `verified_phones` is the only link between a Google identity and
  payments/chats/leases; landlord and resident RLS policies must span
  organizations. Load-bearing for `identity-svc` and for D-12.
- **RLS pooler gotcha** (ARCH §6.2): Neon's pooled connections run in transaction
  mode, so session variables must be set with `SET LOCAL`, and the app role must
  not have `BYPASSRLS`. → Sprint 002 chassis, or the RLS hook silently does nothing.
- **Ledger posting examples** (ARCH §7.3): five debit/credit pairs — invoice,
  match, repair recharge, management fee, remittance — and the
  `sum(debit) = sum(credit)` constraint. Most of Sprint 005's homework already
  done, and it partially answers Q2.
- **Core schema** (ARCH §7.2): ~40 tables with key columns. `units.code` is the
  M-Pesa account reference and `payments.provider_ref` is unique — that is the
  answer to **Q3**, and it is now called out explicitly in ARCH §7.2. The tables
  still need splitting across the nine schemas under D-11.
- **Thresholds and SLOs** (PRD §10, ARCH §12): now aligned between the two
  documents, including the RPO and RTO the pack lacked. → Sprint 004's SLO
  definitions, Sprint 014's alerting.
- **Approval thresholds** (PRD M5-03): "approval thresholds per property and per
  landlord" — the *shape* of **Q1**, if not the number.
- **M-Pesa operational detail** (ARCH §9.1): the STK sweeper that queries
  transaction status after 5 minutes with no callback; per-organization
  credentials under a KMS data key; WAF restricted to Safaricom source
  addresses. → Sprint 007.
- **Repair state machine** (PRD M6-03): New → Triaged → Assigned → In progress →
  Awaiting approval → Awaiting resident confirmation → Closed, plus Rejected and
  Duplicate; SLA by urgency with breach alerts. → Sprint 008.
- **Qualified-lead definition** (PRD §9.4) and the pricing tables (§9.2, §9.3):
  four conditions including a 30-day dedupe and a 7-day invalid window. **This
  answers Q7's definition**, though not its numbers — the tables are labelled
  hypotheses. Sprint 012 builds `billing-svc`; it needs this.
- **Compliance constraints, absent from the sprint pack**: eTIMS only via a
  KRA-certified integrator (certification needs 3 qualified staff); Ardhisasa has
  no ownership API and requires owner approval; e-signature needs advocate review
  before go-live; Kenya DPA 2019; **"Ethanel never holds rent."** The eTIMS
  integrator lead time is a Sprint 001 action, not a Sprint 013 one — now in
  `STATE.md`'s pre-Sprint-001 list.
- **Cost caps** (PRD §10, ARCH §9.5): `map_sessions` hard monthly cap under the
  provider free allowance; under USD 100/month for maps. D-26 names CesiumJS and
  carries no cap; ARCH §9.5 does, and is the reference until D-26 is amended.

**Founder tensions PRD-F1–PRD-F5** (PRD §0): PRD-F1 closed by the 16-sprint plan, PRD-F2 by
D-28/D-31. **PRD-F3, PRD-F4 and PRD-F5 are now carried in `QUESTIONS.md` as Q11, Q12 and
Q13**, so they sit with the other open business facts instead of only in the PRD.
Q11 blocks Sprint 002 and is two weeks out.
