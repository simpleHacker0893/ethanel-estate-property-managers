# QUESTIONS

Business facts the plan needs and does not have. Nothing here may be invented by
a Builder. Each carries the sprint that stops if it is still open.

Ranked by how much they block.

---

**Q1 · What is the money-reversal approval threshold?** — blocks Sprint 005
D-44 says an accountant reverses with a reason, and an admin approves above a
threshold. The threshold is an amount in KES, and it may differ per organization
or scale with portfolio size. Also: can an entry from a closed period be
reversed, and by whom?
*Needed by:* start of Sprint 005 (week 5).

**Q2 · What are the agency's fee terms?** — blocks Sprint 005
**Split into two halves of different kinds** (D-58, D-64). They need different
answers, and only one of them stops the sprint.

**Q2a — when is commission recognised, on invoice or on collection? BLOCKING.**
This is not a value, it is a ledger shape: on-invoice posts commission income at
invoice time, on-collection posts it at payment time. Different entries, at
different moments, and no column in `management_agreements` encodes the choice.
Sprint 005 cannot be built both ways and have the choice made later. **This is
the single highest-value unknown in the pack.**

**Q2b — the rates, VAT, and who bears M-Pesa charges. NOT blocking.**
Percentage of rent collected, percentage invoiced, flat fee per unit or a mix is
`fee_type` + `fee_rate` + `fee_base` **per management agreement, versioned by
effective date** (D-58) — so the mechanism is buildable before the values are
known, per D-64. Still needed: whether VAT applies to commission and at what
rate (the `VAT payable` account exists either way), and who bears the M-Pesa
charge — resident, landlord or agency.

*Needed by:* **Q2a by week 2**, not week 5 — it is the one fact that can stop a
sprint dead, so it belongs in the week-1 partner meeting. Q2b by the start of
Sprint 005 (week 5).

*Ask it as:* "give me three signed management agreements, including one you have
renegotiated" — not "what is your fee". The fee model is per agreement, so a
single answer would be the wrong shape of answer.

**Q3 · How are residents identified on an M-Pesa payment today?** — blocks Sprint 007
Account number format per partner, whether it is per unit or per resident,
whether it is reused after a move-out, and what proportion of residents currently
type it correctly. The answer sets the ceiling on the D-39 auto-match rate before
any matching code is written.
*Needed by:* Sprint 001, from the partner statements.

**Q4 · What is the landlord remittance cycle?** — blocks Sprint 010
**Narrowed by D-58.** Two of the four original parts are already modelled and are
no longer questions: the payout day is `management_agreements.remittance_day`,
and "one payment per landlord or one per property" is decided by the same table's
nullable `property_id` — the agreement's grain, not a per-payout policy choice.

Still open, and genuinely business facts:

- **Gross or net** of repairs and commission. This is the part that shapes the
  statement and the `landlord payable` postings.
- Does a payout ever trigger on a **threshold or on request** rather than the
  agreed day — i.e. is `remittance_day` an intention or a rule?
- Does the client account hold a **float**, and is there a **statutory limit** on
  how long rent may be held? That last part is a lawyer question, like Q6.

*Needed by:* start of Sprint 010 (week 10).

**Q5 · What are the deposit rules in practice?** — blocks Sprint 003
Months held, whether it sits in a separate account, what can be deducted at
move-out, the notice period, and how long a refund may take. Deposits are a
liability on the ledger and the model has to match what the leases actually say.
*Needed by:* start of Sprint 003 (week 3).

**Q6 · Is Ethanel registered as a data controller under the Kenya Data
Protection Act, and what are the retention rules?** — blocks Sprint 013
Registration status with the ODPC, whether the partner agencies are controllers
or processors relative to Ethanel, and how long financial records must be kept
against a resident's right to erasure.
*Needed by:* week 4, so Sprint 013 is scoped correctly. This is a lawyer
question, not an engineering one.

**Q7 · What are the pricing tiers?** — blocks Sprint 012
`billing-svc` prices by units, properties and features. The actual bands, prices
and which features gate which tier are unset. Is there a minimum, a setup fee, an
annual discount? What does a land-selling company pay, given it has plots rather
than units under management?
*Needed by:* start of Sprint 012 (week 12).

**Q8 · Who is the first pilot partner, and how many units?** — blocks Sprint 015
Sprint 016 migrates one partner for real and runs a parallel rent cycle. Which
one, how many units, what does their current system look like, and have they
agreed to the parallel run?
*Needed by:* end of Sprint 010 (week 10), so the import work in Sprint 015 is
built against their real export.

**Q9 · What penalty applies to late rent?** — blocks Sprint 006
Flat or percentage, from which day, compounding or not, waivable by whom, and
whether it differs per lease. Affects the invoice model and the arrears ageing.
*Needed by:* start of Sprint 006 (week 6).

**Q10 · How is water billed?** — blocks Sprint 006
Meter reading per unit, a flat charge, or a share of the building's bill. If
metered: who reads, how often, what happens to a missed reading, and is there a
standing charge. Drives the `ops-svc` reading capture in Sprint 008 as well.
*Needed by:* start of Sprint 006 (week 6).

**Q11 · Is a WhatsApp one-time code accepted as the phone verification gate?** — **ANSWERED, D-63**
**Accepted as built.** WhatsApp authentication template, SMS fallback, hashed
code, five attempts per hour (PRD M1-02, `ARCHITECTURE.md` §6.1). The design was
never the problem — it was never formally accepted, and `identity-svc` builds the
gate in Sprint 002.

Three things the acceptance settles that the question also asked:

- **A resident who changes number re-verifies.** The old `verified_phones` row is
  closed, not repointed, because it is the link behind payments and chats.
- **A manual re-link is `org:owner` or `org:admin` only**, and is written to the
  audit log. Nobody at caretaker or agent level can re-point an identity at a
  phone number.
- **One standard, no prospect tier** (D-59). `DOMAIN.md` §2 permits exactly one
  linking mechanism, so a weaker gate for prospects would be a second one. This
  has a cost worth naming: it puts a verification step in front of the
  marketplace lead capture that Q12 and Q7 depend on.

**The gate does not wait on Meta.** WhatsApp Business verification has a
multi-week tail owned by a third party (R-05) and had not been started as of
week 0. If it is not through by Sprint 002, the gate ships SMS-only and WhatsApp
is enabled behind it later.

**Q12 · When is a caretaker's or agent's phone number revealed on a listing?** — blocks Sprint 011
PRD-F4. Public numbers attract scams, bypass lead tracking and break
per-lead billing (Q7). The recommendation is a tracked "Request viewing" button
with the number revealed only after a verified prospect submits a request.

**"Verified prospect" is now defined** — D-59: a prospect who has passed the same
D-63 gate as a resident. That makes the recommendation more expensive than it
reads, because it puts a one-time code in front of the enquiry. Answer it knowing
the friction is real and deliberate. Needs
a yes or no, plus: is the number ever shown to an unverified prospect, and does
the agency get to override this per listing?
*Needed by:* start of Sprint 011 (week 11).

**Q13 · How is Ethanel's dual role disclosed?** — blocks Sprint 011
PRD-F5. Ethanel sells software to agencies and manages its own portfolio.
Agencies will ask whether Ethanel sees their data or ranks its own listings
higher. The recommendation is that Ethanel's management arm is an ordinary
organization with no special access, marketplace ranking rules are published and
identical for all, and the whole arrangement is disclosed in the terms. Needs
confirmation, and the wording needs to exist before a storefront is public.
*Needed by:* start of Sprint 011 (week 11); the terms wording before Sprint 016.

**Q16 · Do any landlords take rent directly, and is commission still charged on it?** — blocks Sprint 005
`DOMAIN.md` §4 says funds go to "organization client accounts **or landlord
accounts**" (PRD-G2), but `client account` is glossed as the organization's own
bank account and no ledger account models the landlord-direct path. Rent that
never transits the agency still earns commission and still has to appear on a
statement. If the answer is yes, a tenth account — **landlord-direct cash** —
joins the D-61 chart of accounts, and the commission posting has a second shape.
Deliberately **not** built on speculation.
*Needed by:* start of Sprint 005 (week 5). Ask it in the week-1 meeting, next to Q2.

**Q17 · Are lease parties jointly and severally liable in the partners' real leases?** — blocks Sprint 003
D-57 keys the receivable to the lease and treats parties as co-liable for the
whole rent, which is the only model the schema supports — `leases` has no
`resident_id` and `invoices` are keyed `lease_id`. That is an engineering
decision made on the schema's evidence, **not** a reading of Kenyan letting
practice. Confirm it against the signed lease Sprint 001 collects: does the
document make each party liable for the whole rent, or for a share? If shares are
real, `lease_parties` needs a split column and the arrears ageing changes.
*Needed by:* start of Sprint 003 (week 3). Answerable from the Sprint 001 lease
fixture, so it costs nothing extra to ask.

**Q18 · Does a management agreement's fee rate change mid-lease, and what happens to invoices already raised?** — blocks Sprint 005
`management_agreements` is **versioned by effective date**, which asserts that fee
terms change during a relationship — but nothing says what a version change does
to an invoice already raised, or to commission already recognised, under the old
rate. Re-recognise, leave alone, or post a difference? With immutable postings
this has to be decided before the first commission entry exists.
*Needed by:* start of Sprint 005 (week 5).

**Q19 · What is a plot's payment reference?** — blocks Sprint 012
`units.code` is the M-Pesa account reference and reconciliation step 1 matches on
it. `plots` carries a `label`, not a `code`, so a buyer paying an instalment by
paybill matches on nothing and reaches the review queue by construction. D-66
excludes plot instalments from the D-39 denominator so this cannot corrupt the
go-live gate, but Sprint 012 still has to collect the money. How do land-selling
companies reference instalment payments today?
*Needed by:* start of Sprint 012 (week 12), or whenever Sprint 012 is pulled
forward. Logged so it is not discovered during the sprint.

**Q20 · What is the real WhatsApp business number and the Nairobi address?** — blocks the marketing track
The footer carries a click-to-chat link and a physical line, and the site-wide
`Organization` JSON-LD carries `address` and `areaServed`. Both are facts about
the business, not copy. A placeholder number in a `wa.me` link is worse than no
link: it either 404s or reaches a stranger. A fabricated address in structured
data is a schema.org claim search engines will index.
*Needed by:* before the footer ships (marketing track, Track 6). Until then the
footer renders email only and the JSON-LD omits `address` rather than guessing.

**Q21 · Which ad platforms are live, and where does the conversion event go?** — blocks the marketing track
`/demo` captures `fbclid`, `gclid`, `ttclid`, `msclkid`, `utm_*` and referrer on
first landing into a first-party 90-day cookie and carries them into the lead
record. That half works regardless. What it cannot do is *send* the conversion:
firing server-side needs a destination — Meta Conversions API, Google Ads
offline conversions, TikTok Events API — each with its own credential and its
own event name.
Browser-only tracking under-reports badly on iOS and the platform cannot optimise
without the click id reaching the record, which is why this is worth answering
before spend starts rather than after.
*Needed by:* before the first paid campaign. The click ids are captured and
stored from day one, so nothing is lost by answering late — only the
optimisation signal is.

**Q22 · Which service boundary owns a *sales* lead?** — blocks `/demo` persistence
`listing-svc` owns `leads` and `lead_events`, and `DOMAIN.md` §3 defines a
**lead** as *"the pipeline record tracking a prospect's interest in a listing"*.
A `/demo` submission is not that. It is a prospective **customer organization** —
an agency evaluating Ethanel itself — which has no listing, no
`organization_id` (it is not an organization yet) and no place in the marketplace
pipeline. Parking it in `listing.leads` because the table happens to be nearby is
exactly the chassis defect R-01's second tripwire names.
Three candidates, none chosen: a column-compatible extension of `listing.leads`
with a null `listing_id` (cheapest, and it pollutes the marketplace funnel's own
metrics); a new table in `billing` next to `plans` and `subscriptions`, on the
grounds that a sales lead is the pre-history of a subscription; or a thirteenth
service. Note the RLS question underneath it: a sales lead belongs to **no**
organization, so it is the first record in the system that `organization_id`
cannot scope — which is a policy question, not a table question.
*Needed by:* whenever Sprint 002's schemas land. Until then `/demo` writes
through a `LeadSink` seam to an append-only file, recorded as **DEBT-08**. The
seam exists precisely so this answer is a new implementation and not a migration.

**Q23 · The 120 KB first-party JS budget is under the Next.js floor — relax, re-platform, or hold?** — **ANSWERED, D-71**
`requirements.md` (marketing track) budgets "first-party JS on `/` under
120 KB gzipped". Measured 16 September 2026 on the deployed placeholder — a
single static server-component page with **zero** first-party client code —
Next.js 16.3.5 (Turbopack, cacheComponents on) ships **135.9 KB** of script
transfer (Lighthouse `resource-summary:script`, third-party = 0, so the figure
is all framework baseline: React 19 + App Router runtime). The budget cannot be
met by deleting first-party code, because there is none to delete; it is the
framework floor.
Three ways out, none chosen: relax the budget to ~150 KB (cheapest, and it
weakens a gate that exists to protect Kenyan 4G handsets); accept the miss and
record it as standing stack evidence (the budget stays, CI stays yellow on that
one assertion); or move marketing routes off the Next runtime — a D-69-adjacent
decision far beyond this track. The assertion currently runs as a **warning**
so CI stays green while this is open; it is not silently deleted.
**Answered 16 September 2026 — relax to 150 KB and enforce it (D-71).** The
budget could not be met by deleting first-party code because there was none to
delete, and a gate nobody can pass by doing the right thing stops being read.
150 KB leaves roughly 14 KB over the measured framework floor, so the assertion
still fails the moment first-party client JavaScript becomes significant. Per
this question's own terms the assertion flipped from `warn` to `error` in the
same commit as the number, so the budget was never both relaxed and unenforced.
That a framework floor consumed the whole original budget stays on the record as
evidence about the stack on Kenyan mobile.

**Q14 · What is readiness item E18?** — **ANSWERED, D-55**
E18 is the **automated delivery pipeline**: merge to `main` builds, tests and
deploys to `staging` with no human step, with production behind a manual approval
gate. Paid by Sprint 001 (`001/blueprint.md` P4), and the cheapest evidence in
the checklist — a commit that reached staging on its own.

**Recovered by elimination, not from the source notes.** Mapping Sprint 001's
scope against its other codes leaves the pipeline as the only substantial
deliverable with no code attached, and it is the sprint's headline exit
criterion. Retiring the code instead would have broken the 18-of-22 arithmetic
that justifies Phase 4. **If the round-2 notes say otherwise, supersede D-55.**

**Q15 · Which C/D/E/F/G namespace wins?** — **ANSWERED, D-56**
The **`D-nn` decision numbers**, and the fix was a substitution rather than a
renumber: every round-2 answer code in the pack had already been promoted to a
numbered decision in `DECISIONS.md`, so the pack was citing draft labels for
decisions that had proper numbers. 194 citations across 44 files now cite the
decision. `E1`–`E22` stays bare as the readiness checklist — the only bare
letter-code left. `PRD.md` keeps its own codes `DQ-`/`PRD-` prefixed.

Mapping table, residue and the standing rule are in `READINESS.md` §4. Three
further collisions surfaced while fixing it: the PRD used `D2` for two different
things internally, `001/blueprint.md` used `A1`–`B5` as local task IDs, and `B4`
appears in the PRD as a literal unit code.

---

## Answered, recorded elsewhere

Everything from rounds 1 and 2 is in `DECISIONS.md`. Two answers were noted as
assumptions rather than decisions, and should be confirmed:

- **CONFIRMED:** "Region africa, scale to international later" (E14) means
  `af-south-1` is preferred if the Sprint 001 latency measurement permits, and a
  second region is not built during the pilot. **"Permits" now has a number:**
  `af-south-1` wins unless its p95 is more than **50 ms worse** than the best
  alternative. Written down before the measurement, while nobody has a stake in
  the outcome — without a threshold, a result like 180 ms against 195 ms decides
  nothing and ADR-002 becomes an argument. See `001/blueprint.md` M1.
- **CONFIRMED:** D-47 "organizations self-serve imports" means Ethanel provides no
  hands-on migration service during the pilot beyond the first partner in
  Sprint 016. D-47 already puts dry run, row-level validation and rollback in
  Sprint 015, which is what makes self-serve credible rather than a cost dodge.
