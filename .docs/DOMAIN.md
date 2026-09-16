# DOMAIN

The client's world: who is involved, what the words mean, and the business rules
that are already settled. This is the glossary's home. `AGENTS.md` carries the
short enforcement table — which word to use instead of which generic one — and
this file says what each word actually means.

**Nothing here may be invented.** Every rule below is cited to where it was
decided. Anything the plan needs and does not have is in `QUESTIONS.md`, never
guessed into this file. §8 lists what is deliberately still blank.

**This file wins on vocabulary and on the chart of accounts.** Where
`ARCHITECTURE.md` or `PRD.md` names the same thing differently, they defer here
(D-61). Where a term below differs from a column name in `ARCHITECTURE.md` §7,
the term is what to use in prose and the column is what to use in SQL — §4 lists
the two pairs that differ and why.

---

## 1. The business

Multi-tenant SaaS for Kenyan letting and property management firms: rentals, home
and plot sales, resident payments over M-Pesa, WhatsApp as the customer channel.
Land-selling companies are also served and charged for what they market (PRD-D2,
PRD sense). Built solo with agent assistance.

The pilot targets the Nairobi metro. Mombasa, Nakuru and Nanyuki are Release 1.1,
triggered by a second agency going live in the Nairobi metro (ROADMAP R1.1).

**Goal:** the first paying agency collects rent through Ethanel at the end of
Sprint 016, and its books agree with the spreadsheet it was keeping before.

Ethanel also manages its own portfolio as an ordinary organization with no
special access (PRD-D3). How that dual role is disclosed is **Q13, open**.

**"Agency" and "organization" are not synonyms.** An *agency* is a business in
the world. An *organization* is the Ethanel record that represents it, and the
boundary its data sits inside. Prose about the client's world may say agency;
anything about data, permissions or scope says organization.

---

## 2. Actors

| Actor | Organization member? | What they do |
|---|---|---|
| **Organization** | — | The agency or firm. The tenancy boundary. `organization_id` is the Clerk organization id and sits on every tenant-scoped table. |
| **Agency staff** | Yes | Roles from `org:owner` down to `org:caretaker`. The permission matrix is PRD §4.2, with property-level assignment scoping. |
| **Caretaker** | Yes | Tasks, photo updates, meter readings, petty costs, showing units. Phones are a mix of smartphones and basic phones (PRD-G10). |
| **Landlord** | **No** | Owns properties. Places them under management by a management agreement. Reads statements, arrears, repairs spend, occupancy, remittance history. |
| **Resident** | **No** | A party to a lease, occupying a unit. Pays rent, raises repair requests, reads receipts and lease documents. |
| **Prospect** | **No** | Enquiring about a listing; not yet a resident or a buyer. Books viewings and submits viewing requests (ARCHITECTURE §6.1, `viewings`, `leads`). |
| **Buyer** | **No** | Purchasing a plot or a house under a sale transaction with milestones. Sprint 012 / Release 1.1. |
| **Platform admin** | — | Ethanel staff. `platform_admins` in the `identity` schema. |

**The identity model is the part that surprises people.** Membership is optional.
Landlords, residents, prospects and buyers are **not** organization members, so
their RLS policies must span organizations — **four** actor classes, not two
(ARCHITECTURE §6.1: "landlords, residents and prospects use Ethanel without
belonging to an organization").

A Google identity is linked to payments, chats, leases and leads through **one**
mechanism: `verified_phones` (`user_id`, `e164` unique per verified user,
`verified_at`, opt-in), and verification is required before any of those links
are made (ARCHITECTURE §4 identity tables, ADR-018).

**The gate is accepted as designed (D-63, closing Q11):** a WhatsApp one-time
code with SMS fallback, hashed, five attempts per hour. There is **one**
verification standard and no weaker tier for prospects — a *verified prospect* is
a prospect who has passed this same gate. A resident who changes number
re-verifies; a manual re-link is an `org:owner` or `org:admin` action and is
written to the audit log.

---

## 3. Vocabulary

Use the left column. The `Avoid` column is not a style preference — each rejected
word is either already taken elsewhere in this pack, or hides a distinction that
costs money.

### The portfolio

| Term | Meaning | Avoid |
|---|---|---|
| **organization** | The agency or firm that subscribes. The tenancy boundary. | tenant, account, company, workspace |
| **landlord** | The owner of one or more properties. | owner, property owner, client |
| **management agreement** | The agreement by which a landlord places a property, or a whole portfolio, under an organization's management. Carries the fee type, rate and basis and the remittance day, and is **versioned by effective date** (`management_agreements`). This is the grain the agency's economics live at — not the organization (D-58). | contract, mandate, letting agreement |
| **property** | A building or site. A property **contains** units. | — |
| **unit** | One lettable space. `units.code` is also the M-Pesa account reference and is unique per property. Types: flat, bedsitter, house, shop, office, godown (PRD M2-04). | apartment, rental, property |
| **plot** | A land parcel in a subdivision. | lot, land parcel |
| **occupancy** | The proportion of a property's units under an active lease at a point in time. | vacancy rate — that is the complement; say which you mean |

### Letting

| Term | Meaning | Avoid |
|---|---|---|
| **lease** | The agreement binding **one or more parties** to a unit. Has parties, a term, a rent, a billing day, a deposit and a penalty rule. A lease attaches to a unit, never to a single person (`leases.unit_id`; parties hang off `lease_parties`). | tenancy agreement |
| **lease party** | A resident named on a lease. A lease may have several (`lease_parties`). | co-tenant, occupant |
| **resident** | A person who is a party to a lease. | tenant, user, occupier |
| **lease lifecycle** | move-in, renewal, notice, move-out. The events are `lease.activated` and `lease.ended`. | **tenancy lifecycle** — "tenancy" is reserved (D-60) |
| **tenancy** | **Reserved for the SaaS sense only:** the `organization_id` + RLS boundary (ADR-009). Never the lease sense. | — |
| **caretaker** | On-site staff. | janitor, super, maintenance staff |
| **repair request** | What a **resident** raises. | complaint, ticket, issue |
| **work order** | What **staff dispatch** in response to a repair request. | ticket, job |

### Market

| Term | Meaning | Avoid |
|---|---|---|
| **prospect** | A person enquiring about a listing, not yet a resident or a buyer. The *person*. | lead — that is the record; customer |
| **lead** | The pipeline **record** tracking a prospect's interest in a listing (`leads`, `lead_events`). | enquiry, prospect |
| **qualified lead** | A lead meeting the billing definition in PRD §9.4, stamped at `leads.qualified_at`. | — |
| **verified prospect** | A prospect who has passed the §2 phone-verification gate. The same standard as a resident, not a weaker one (D-59). | — |
| **buyer** | A person purchasing a plot or a house under a sale transaction. | client, purchaser |

### Money

| Term | Meaning | Avoid |
|---|---|---|
| **posting** | The **act** of writing to the ledger. An *entry* has *lines*. | transaction; entry — an entry is the thing, not the act |
| **journal entry** | An immutable double-entry record. Lines carry `account_id`, `debit`, `credit`. | — |
| **allocation** | The act of attributing a received payment to one or more invoices (`payment_allocations`). **An allocation is not a correction** — nothing was wrong, the money simply arrived unlabelled — so it carries no reason and is not subject to the Q1 approval threshold (D-62). | matching (loosely), reversal, correction |
| **reversal** | A new entry that undoes a prior entry, with a **mandatory reason**. Above a threshold an admin approves (D-44; the threshold is **Q1, open**). | correction, adjustment, edit |
| **suspense** | The ledger account an unattributed payment posts to on arrival (D-15). Money in the ledger, not yet attributed. | holding account, unallocated |
| **client account** | The organization's own bank account that rent lands in. Not Ethanel's. | trust account |
| **lease receivable** | The ledger account for rent and charges owed under a lease. Keyed to the **lease**, because the debt is the lease's (D-57, ADR-023). | **resident receivable** — rejected; it implies the wrong key |

`ops-svc` drafts once said "complaints" where the PRD says "repair requests".
`AGENTS.md` resolves it: **repair request** is what a resident raises,
**work order** is what staff dispatch. "Complaint" is a rejected alias.

---

## 4. Money rules — settled

- **Rent never touches Ethanel.** Funds go to organization client accounts or
  landlord accounts (PRD-G2). "Ethanel never holds rent" is a compliance
  constraint, and it is what the client-account cash account exists to model.
  Whether any landlord takes rent **directly**, and whether commission is still
  charged on it, is **Q16, open** — and it is the one thing that adds a tenth
  account to the list below.
- **Money is `bigint` minor units, KES.** No float and no decimal string anywhere
  near a money path, including in tests.
- **`money-svc` is the only writer of ledger truth.**
- **Double entry, enforced.** `sum(debit) = sum(credit)` per entry, append-only
  (ARCHITECTURE `journal_entries` / `journal_lines`).
- **Postings are immutable.** A correction is a new entry with a reason, never an
  `UPDATE`. An accountant reverses with a reason; above a threshold an admin
  approves (PRD-D6). **The threshold is Q1, open, and it blocks Sprint 005.**
- **An allocation is not a reversal.** The routine path — a suspense payment being
  attributed — and the exceptional path must not be describable in the same
  words, because D-39 expects the manual match queue to carry up to 5% of all
  payments. See §3 Money (D-62).
- **Primary keys are UUIDv7**, generated in the application.

### The chart of accounts — one list, per organization

Pinned here by **D-61**; `ARCHITECTURE.md`'s `ledger_accounts` note defers to it.
Nine accounts:

| Account | Type | Notes |
|---|---|---|
| **lease receivable** | asset | Keyed to the lease, not the resident (D-57) |
| **deposit liability** | liability | Deposits held are a liability, never income |
| **landlord payable** | liability | What the organization owes a landlord |
| **agency commission income** | income | Recognition timing is the open half of **Q2** |
| **VAT payable** | liability | Applicability and rate are **Q2, open** |
| **repairs expense** | expense | |
| **client account cash** | asset | The organization's own bank account |
| **cash in transit** | asset | Settled at M-Pesa, not yet in the client account |
| **suspense** | asset | Unattributed payments on arrival (D-15) |

A tenth — **landlord-direct cash** — is added if **Q16** comes back yes. It is
not built on speculation.

Two names differ from `ARCHITECTURE.md` §7 deliberately: the `ledger_accounts`
note says "resident receivable" and "agency fee income". The prose terms above
are the ones to use; the rename is D-57 and D-61.

### Where the agency's economics live

**Per management agreement, versioned by effective date** — not per organization
(D-58). `management_agreements` already carries `fee_type`, `fee_rate`,
`fee_base` and `remittance_day`, with a nullable `property_id` so one agreement
may cover a single property or a whole landlord relationship. That nullable
column is also what settles Q4's "one payment per landlord or one per property":
the agreement's grain decides it structurally, rather than it being a policy
choice made per payout.

Two consequences, and they pull in opposite directions:

- **The fee rates are configuration, not a blocker.** Q2's "percentage of rent,
  flat fee per unit, or a mix" is `fee_type` + `fee_rate` + `fee_base`, set per
  agreement. The mechanism is buildable before the values are known (D-64).
- **Commission recognition timing is not configuration.** Recognising on invoice
  versus on collection posts a *different entry at a different moment*, and no
  column encodes the choice. **This is the only part of Q2 that stops Sprint 005.**

Because agreements are versioned, a fee rate can change mid-lease. What happens
to an invoice already raised under the old rate is **Q18, open**.

### Reconciliation order — the algorithm behind the 95% bar

From ARCHITECTURE §9.1 and PRD M4-05, in order:

1. Account reference (`units.code`)
2. Payer phone on file (`verified_phones`)
3. Exact amount match against open invoices
4. Review queue

**Oldest invoice first. Overpayment becomes a credit.** `payments.provider_ref`
is unique, which with `units.code` is most of the answer to **Q3**.

**Step 2 resolves to a lease, not to a person.** A lease may have several parties
with several verified phones, and there is only one `units.code` per unit. That
is harmless precisely because the receivable is the lease's (D-57): two parties
paying separately allocate against the same invoice, and nothing needs to decide
which of them "owns" the arrears.

**Unmatched payments post to suspense immediately** (D-15) and wait in a manual
match queue. They are money in the ledger from the moment they arrive, just not
yet attributed. That is what makes the 95% bar a measurement rather than a cliff.

**What the 95% is measured over (D-66, which supersedes D-39's silence):** rent
and charge payments against open invoices. **Deposits and plot instalments are
excluded from the denominator.** A plot has no account reference — `plots` carries
a `label`, not a `code` — so plot instalments reach the review queue by
construction, and Sprint 012 is a designated slip absorber that may not ship at
all. Letting either class into the denominator would let deferred work move a
go/no-go number. A plot's payment reference is **Q19, open**.

The D-39 auto-match rate is instrumented from the first payment in Sprint 007, so
the number is on a dashboard in week 7 rather than discovered in week 15.

---

## 5. Letting rules — settled

**Repair lifecycle** (PRD M6-03), the only permitted states:

```
New -> Triaged -> Assigned -> In progress -> Awaiting approval
    -> Awaiting resident confirmation -> Closed
```

plus `Rejected` and `Duplicate`. SLA by urgency, with breach alerts.

**Lease lifecycle:** move-in, renewal, notice, move-out. Deposits held are a
liability, not income. Called *lease* lifecycle and not tenancy lifecycle,
because "tenancy" is reserved for the SaaS boundary (D-60) — the events already
agree: `lease.activated`, `lease.ended`.

**A lease's parties are co-liable for the whole rent.** The receivable is the
lease's, so a party leaving mid-term is a change to `lease_parties` — and the old
row is **closed, never deleted**, because deleting it would silently rewrite who
owed what while the postings behind it are immutable (D-57, ADR-023). Whether the
partners' real leases in fact make parties jointly and severally liable is
**Q17, open**, and answerable from the signed lease Sprint 001 collects.

**Messaging:** one assignee per conversation, everyone else read-only. Two staff
must not be able to reply to the same conversation, and that is enforced by the
data model rather than the UI. Financial notices are mandatory and cannot be
turned off; everything else is per-event-group and per-channel. WhatsApp primary,
SMS fallback, email for documents.

**Landlord figures are never cached** (D-45 / PRD-D20). Every landlord-facing and
dashboard figure reads live from the ledger with a visible "last updated" stamp.
A five-minute TTL on a figure someone acts on is not a cache, it is a wrong
answer with a shelf life. Report *read models* are a different thing and are now
settled: a `reporting` service fed only by outbox events (D-67, ADR-012).

---

## 6. Constraints that shape the product

- **Caretaker devices.** Mixed smartphones and basic phones. Online-only in the
  pilot; offline mode is Release 1.1, triggered by a caretaker reporting a failed
  task submission twice. The device and data constraints document from Sprint 001
  is the spec the Sprint 008 UI is graded against — not taste.
- **eTIMS** is reachable only through a KRA-certified integrator (PRD-D13, PRD-G11).
  Certification has a lead time owned by someone else; treat it as a Sprint 001
  enquiry, not a Sprint 013 discovery.
- **Search** is Postgres full-text plus `pg_trgm`. No OpenSearch, no Typesense.
- **The public storefront is the only surface permitted to use Cache Components /
  `use cache`** — the only page where staleness costs nobody money.
- **Data Protection Act** obligations are real: subject access export, deletion
  with ledger-retention carve-outs, retention schedules per data class.
  Registration status is **Q6, open**.

---

## 7. How a business fact gets in here

Recorded because it is the rule a Builder breaks first (D-64).

A fact the plan needs and does not have goes in `QUESTIONS.md` — never into this
file as a plausible number. When a sprint opens and its blocking fact is still
open:

- **Build the mechanism, defer the value.** Model it as per-organization or
  per-agreement configuration with an `ASSUMPTION:` marker at the call site, and
  leave the default unset. Q9's penalty rule, Q10's water basis and Q5's deposit
  terms are all of this kind — the system is multi-tenant by construction, so the
  mechanism is identical whatever the value turns out to be.
- **Except where the fact changes the ledger's shape.** Then the sprint stops and
  the roadmap re-orders. There is exactly one of these today: **Q2's commission
  recognition timing**, because on-invoice and on-collection are different
  entries at different moments, not different values of one entry.
- **Never a named guess.** `AGENTS.md`: a plausible invented number is the most
  expensive thing you can produce here, because it will be built on.

---

## 8. Deliberately blank

These are business facts the plan needs and does not have. They live in
`QUESTIONS.md` with the sprint each one stops. **Do not fill them in here.**

| Missing | Blocks |
|---|---|
| Commission recognition timing — on invoice or on collection (**Q2**, the blocking half) | Sprint 005 — the highest-value unknown in the pack |
| Fee rates, VAT treatment, who bears M-Pesa charges (**Q2**, the configurable half) | Sprint 005's values, not its shape |
| Reversal approval threshold (**Q1**) | Sprint 005 |
| How residents are identified on an M-Pesa payment today (**Q3**) | Sprint 007 |
| Landlord remittance: gross or net, and the payment grain (**Q4**) | Sprint 010 |
| Deposit rules (**Q5**) | Sprint 003 |
| Data controller registration (**Q6**) | Sprint 013 |
| Pricing bands (**Q7**) | Sprint 012 |
| Late-rent penalty (**Q9**) | Sprint 006 |
| How water is billed (**Q10**) | Sprint 006 |
| Do any landlords take rent directly (**Q16**) | Sprint 005 — adds a tenth ledger account |
| Are lease parties jointly and severally liable in the real leases (**Q17**) | Sprint 003 |
| Does a fee rate change mid-lease, and what happens to raised invoices (**Q18**) | Sprint 005 |
| A plot's payment reference (**Q19**) | Sprint 012 |

**The pricing tables in PRD §9.2 and §9.3 are explicitly hypotheses, not
decisions** (PRD §14 note). They do not answer Q7 and must not be metered
against as though they were settled.
