# Ethanel — agent instructions

Multi-tenant SaaS for Kenyan letting and property management firms. Rentals,
home and plot sales, resident payments over M-Pesa, WhatsApp as the customer
channel. Built solo with agent assistance.

## Read before you start

1. `.docs/STATE.md` — where the project is right now.
2. `.docs/DECISIONS.md` — house rules. Inherited, not re-litigated. Read the
   superseding entries at the bottom too; D-54 changes what D-01 says.
3. `.docs/SERVICE-TOPOLOGY.md` — what runs and why.
4. `.docs/sprints/<current>/requirements.md`, then `blueprint.md` and
   `acceptance.md` in the same folder.
5. If you are on a **track** rather than a sprint, the same three files under
   `.docs/tracks/<track>/`. A track is graded exactly like a sprint and inherits
   every decision; `.docs/tracks/README.md` says what it is and is not.

`.docs/ARCHITECTURE.md` (v1.2) and `.docs/PRD.md` (v1.2) are the long-form
product and system documents and are reconciled with the above — where an older
copy of either disagrees, these four files win.

## Vocabulary — use these words, not generic ones

| Use | Not |
|---|---|
| organization | tenant, account, company |
| resident | tenant (never — "tenant" means the SaaS sense only, and we avoid it) |
| landlord | owner, property owner |
| caretaker | janitor, super, maintenance staff |
| unit | apartment, rental, property (a property *contains* units) |
| plot | land parcel, lot |
| repair request | complaint, ticket, issue (what a resident raises) |
| work order | ticket, job (what staff dispatch in response) |
| posting | transaction, entry (an *entry* has *lines*; a posting is the act) |
| management agreement | contract, mandate (it carries the fee terms and the remittance day, versioned by effective date — D-58) |
| lease lifecycle | tenancy lifecycle ("tenancy" is the SaaS boundary only — D-60) |
| lease party | co-tenant, occupant (a lease has *parties*, often more than one) |
| lease receivable | resident receivable (the debt is the lease's — D-57, ADR-023) |
| allocation | matching, correction (attributing a payment; **not** a reversal — D-62) |
| reversal | correction, adjustment (undoes an entry, mandatory reason, threshold is Q1) |
| prospect / lead | a **prospect** is the person, a **lead** is the record — D-59 |

`organization_id` is the Clerk organization id, and it is on every tenant-scoped
table.

## Non-negotiable engineering rules

- **Money is `bigint` minor units, KES.** No float, no decimal string, anywhere
  near a money path. `money-svc` is the only writer of ledger truth.
- **Postings are immutable.** Corrections are new entries with a reason. Never
  an UPDATE.
- **Every tenant-scoped table needs an RLS policy and a cross-organization
  test.** CI enforces both. A table without them does not merge.
- **No cross-schema joins or foreign keys.** A service reads another service's
  data through that service's contract in `packages/contracts` — never by
  reaching into its schema. Several services share a Deployment today (ADR-001),
  so the callee is often in-process. **That changes nothing.** Each service
  connects as its own role and Postgres will refuse the cross-boundary read
  anyway; working around a contract because the callee is "right there" is a
  chassis defect, not a shortcut.
- **Webhooks are verified, persisted and acknowledged — never processed inline.**
  All inbound webhooks terminate at `gateway`.
- **Nothing durable lives in Valkey.** Losing the cache must cost latency, never
  data. Background work is `pg-boss` on Postgres.
- **Primary keys are UUIDv7**, generated in the application.
- **Jobs are idempotent and resumable.** A rent run must be safe to execute twice.
- TypeScript strict. No `any` in a public interface. Coverage floor on the
  domain packages.

## Never invent a business fact

If a threshold, fee, rate, notice period or approval rule is not written down in
`DECISIONS.md` or the sprint's `requirements.md`, it goes in `.docs/QUESTIONS.md`
or is marked `ASSUMPTION:` inline in the code. A plausible invented number is the
most expensive thing you can produce here, because it will be built on.

## Workflow

Trunk-based. Short-lived branch, PR with preview environment, all checks green.
Reviewer agents run first; the operator reviews every diff personally before
merge. Tasks live in GitHub Issues and Projects.

A sprint is done when `acceptance.md` passes, not when the code compiles.

## Knowledge graph

This project has a graphify knowledge graph at `graphify-out/`.

- **A graph exists, and it is documents only.** The post-commit hook built it on
  16 September 2026: 981 nodes, 884 edges, 98 communities — all of it `.docs/`,
  because no code exists yet. It was extracted AST-only and cost nothing, which
  is what made the cost objection in `STATE.md` moot. Query it for *where is X
  stated* across the pack. Do not expect it to answer anything about code until
  Sprint 001 lands and `graphify update .` has run over real source.
- Once it exists: before answering any architecture, file-relationship or
  "where is X used" question, query the graph rather than grepping the tree first.
- Before editing `packages/chassis`, `charts/service`, or anything under
  `services/money-svc`, run `graphify affected "<symbol>" --depth 3` and put the
  blast radius in the PR description.
- After changing code in a session, run `graphify update .`. AST only, no API cost.
- `.prisma` files are invisible to the graph. Commit `prisma/migrations/**` so the
  schema lands via the SQL extractor.
