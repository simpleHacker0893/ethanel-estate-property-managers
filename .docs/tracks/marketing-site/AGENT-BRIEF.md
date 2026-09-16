# Agent brief · The public marketing site

**Read this first, and read it completely, before writing a line.**

This is the distillation of every constraint that binds a page on this track —
pulled from `DECISIONS.md`, `DOMAIN.md`, `SERVICE-TOPOLOGY.md`, `AGENTS.md`,
`QUESTIONS.md`, `RISKS.md`, `ROADMAP.md` and the track's own `requirements.md`,
`blueprint.md`, `acceptance.md` and `spec.md`. Roughly four thousand lines of
planning pack, compressed to the rules that actually change what you type.

If you follow this file you will not need to open the others. If something here
seems wrong, say so in your report — do not quietly work around it.

---

## 1. What this site is, in one paragraph

Ethanel is multi-tenant SaaS for Kenyan letting and property management firms:
rentals, home and plot sales, resident payments over M-Pesa, WhatsApp as the
customer channel. The site's single job is to convince a sceptical Nairobi
agency owner, on a handset on Safaricom LTE, that **rent collects and reconciles
itself against a double-entry ledger** — and to get them to book a demo, without
making one claim that cannot be traced to the pack.

The reader has been sold property software before. A page full of claims with no
numbers behind them reads as a reason to close the tab. Understatement with a
citation beats enthusiasm.

---

## 2. The five rules that get broken first

**1. Never invent a business fact.** No customer, no logo, no testimonial, no
rating, no units-under-management figure, no price, no founding date, no team
size, no "trusted by" anything (D-68). There are no pilot partners yet. If a
number is not in §4 below, it does not go on the site. A plausible invented
number is the most expensive thing you can produce here, because it will be
built on.

**2. Never write "tenant".** Not for a person — a person is a **resident**. Not
in the multi-tenancy sense either; D-60 reserves that word for the SaaS boundary
and it never appears on a public page. "Tenancy lifecycle" is **lease
lifecycle**. A vitest fails on `\btenants?\b` anywhere under
`content/marketing/`, so this is enforced, not requested.

**3. Only four numbers are publishable**, each as a *design target the platform
holds itself to*, each with the bound that makes it true, each linked to
`/security`, and **never** as a result a customer gets. They are in §4.

**4. Tense on operational practice.** Nothing is running yet. Sprint 004
schedules the *first* restore drill; Sprint 007 is when the auto-match rate is
first instrumented. Write the commitment ("we restore-drill monthly"), not the
routine ("we have restored monthly for two years"). Present perfect is a lie
here.

**5. Availability is stated, always.** Every capability carries `available`,
`sprint` or `may-not-ship`. The marketplace is Sprint 011. Land, plots and
`billing-svc` are Sprint 012, **and Sprint 012 is a designated slip absorber
that may not ship at all** — those pages say so rather than selling week 12 as
live.

---

## 3. Vocabulary — binding on every line of copy

| Use | Never |
|---|---|
| organization | tenant, account, company |
| resident | tenant, occupant |
| landlord | owner, property owner |
| caretaker | janitor, super, maintenance staff |
| unit | apartment, rental, property (a property *contains* units) |
| plot | land parcel, lot |
| repair request | complaint, ticket, issue (what a resident raises) |
| work order | ticket, job (what staff dispatch in response) |
| posting | transaction, entry (an *entry* has *lines*; a posting is the act) |
| management agreement | contract, mandate |
| lease lifecycle | tenancy lifecycle |
| lease party | co-tenant, occupant |
| lease receivable | resident receivable |
| allocation | matching, correction (attributing a payment — **not** a reversal) |
| reversal | correction, adjustment (undoes an entry, mandatory reason) |
| prospect / lead | a **prospect** is the person, a **lead** is the record |
| agency | firm, company (when addressing the customer) |

**Forbidden words, anywhere:** revolutionary, seamless, cutting-edge, one-stop
solution, empower, unlock, supercharge, game-changing, effortless.

---

## 4. The only four publishable numbers

Each is a **design target**, labelled as such, linked to `/security`. Never
"agencies see", never "customers get", never a percentage improvement.

| Claim | The bound that ships with it | Source |
|---|---|---|
| 500 units invoiced in under 2 minutes | idempotent and resumable; a rent run is safe to execute twice | **D-40** |
| 50 callbacks per second for 10 minutes, zero loss | webhook ingress; verified, persisted, acknowledged, never processed inline | **D-41** |
| 95% of payments matched with no human action | **measured over rent and charge payments against open invoices. Deposits and plot instalments are excluded from the denominator.** | **D-39 as bounded by D-66** |
| Landlord figures read live from the ledger, with a last-updated stamp | never a cached summary | **D-45** |

**The 95% figure without its denominator is the exact defect D-66 was written to
fix.** The `DesignTarget` type makes `bound` a required field for that reason.

**The go-live gate framing is the honest one:** 95% is a bar the product must
clear before go-live, measured on real partner data — not a result already
achieved.

---

## 5. The two answers that decide deals

Give both prominence.

**"Ethanel never holds rent."** Funds settle to the organization's own client
account. It is a compliance constraint, it is what the *client account cash*
ledger account exists to model, and it is the first question a landlord asks an
agency. This is FAQ answer 1.

**The scoped risk-reversal line**, verbatim:

> For pilot partners, we run one full rent cycle alongside your current
> spreadsheet before you switch. If the two sets of books don't agree, you don't
> go live.

It is **scoped to pilot partners** on purpose. Publishing it unscoped converts a
one-off pilot gate into a standing offer. Traceable to `ROADMAP.md` Sprint 016
and `VALIDATION.md` §3. This line must be above the fold at 390×844.

---

## 6. The domain facts pages are written from

### The reconciliation order — in this order, no other

1. **Account reference** (`units.code`)
2. **Payer phone on file** (`verified_phones`)
3. **Exact amount** against open invoices
4. **Review queue**

**Oldest invoice first. Overpayment becomes a credit.** An unmatched payment
**posts to suspense immediately** (D-15) and waits in a **manual match queue** —
it is money in the ledger from the moment it arrives, just not yet attributed.
That is what makes the 95% a measurement rather than a cliff.

Step 2 resolves to a **lease**, not to a person: a lease may have several parties
with several verified phones, and the receivable is the lease's (D-57), so two
parties paying separately allocate against the same invoice.

Attributing a suspense payment is an **allocation**. It is not a correction and
not a reversal, it carries no reason, and it is not subject to an approval
threshold (D-62). Only a reversal is.

### The chart of accounts — nine, exactly these, these names

| Account | Type |
|---|---|
| lease receivable | asset |
| deposit liability | liability |
| landlord payable | liability |
| agency commission income | income |
| VAT payable | liability |
| repairs expense | expense |
| client account cash | asset |
| cash in transit | asset |
| suspense | asset |

Pinned by **D-61**. Do not add a tenth (a *landlord-direct cash* account exists
only if Q16 comes back yes, and it has not). Do not use "resident receivable" or
"agency fee income" — those are the old names the rename replaced.

### Other settled facts you may state

- Money is held and posted in **KES**, and postings are **immutable** — a
  correction is a new entry with a reason, never an edit.
- **Double entry, enforced:** debits equal credits per entry, append-only.
- Repair lifecycle: New → Triaged → Assigned → In progress → Awaiting approval →
  Awaiting resident confirmation → Closed, plus Rejected and Duplicate.
- Lease lifecycle: move-in, renewal, notice, move-out. **Deposits held are a
  liability, not income.**
- One assignee per WhatsApp conversation, everyone else read-only.
- Financial notices are mandatory and cannot be turned off; everything else is
  per event group and per channel.
- WhatsApp primary, SMS fallback, email for documents.
- Caretakers are **online-only in the pilot**, with low-data screens.
- Organizations import their own data, self-serve, with a dry run, a row-level
  validation report and rollback.

### The twelve services — every feature bullet names one

`web`, `gateway`, `identity`, `property`, `listing`, `money`, `payments`,
`messaging`, `ops`, `docs`, `billing`, `reporting`.

This is the `ServiceName` union in `content/marketing/types.ts`. **A bullet with
no service does not typecheck.** Do not widen the union.

Rough ownership, so you pick the right one:

- **property** — landlords, management agreements, properties, units, leases,
  residents, lease lifecycle, deposits held, inspections, caretaker assignment
- **money** — chart of accounts, journal, invoices, rent schedules, credit
  notes, receipts, statements, reversals, arrears, landlord remittance
- **payments** — M-Pesa Daraja, callbacks, reconciliation engine, suspense, the
  manual match queue
- **messaging** — WhatsApp, the conversation inbox, notification preferences
- **ops** — repair requests, work orders, caretaker tasks, expenses, vendors
- **docs** — lease/receipt/statement rendering, signature requests
- **listing** — marketplace listings, plot inventory and subdivisions,
  storefronts, viewings, marketplace leads, search
- **billing** — SaaS plans, usage counters, per-organization feature flags
- **reporting** — read models, exports, saved views
- **identity** — organizations, users, memberships, roles, permissions, audit log
- **gateway** — the public REST API and all inbound webhooks
- **web** — the Next.js app itself

---

## 7. Availability, by capability area

| Area | Availability | Label |
|---|---|---|
| Ledger, invoicing, rent runs, statements | `sprint` | Sprint 005–006 |
| Payments, reconciliation, suspense, match queue | `sprint` | Sprint 007 |
| Repairs and work orders | `sprint` | Sprint 008 |
| WhatsApp and notifications | `sprint` | Sprint 009 |
| Resident and landlord portals | `sprint` | Sprint 010 |
| Marketplace, viewings, storefronts | `sprint` | Sprint 011 |
| Land, plots, instalments, SaaS billing | `may-not-ship` | Sprint 012 |
| Documents and signing | `sprint` | Sprint 006 |
| Reporting read models and exports | `sprint` | Sprint 004 |

**Nothing on this site is `available` yet except the site itself.** No sprint has
shipped. If you are tempted to mark something `available`, you are about to
invent a business fact. The only honest `available` values are things a visitor
can verify by using the public site.

---

## 8. What is open, and how it ships anyway (D-64)

Build the mechanism, defer the value. Never guess the value.

| Question | What ships |
|---|---|
| **Q20** — real WhatsApp number and Nairobi address | Footer renders **email only** and says the rest is not there yet. `Organization` JSON-LD **omits `address`** — a fabricated address is a schema.org claim search engines index. |
| **Q21** — which ad platforms are live | Click ids captured and stored from day one; the conversion event fires into a logging seam **inside the LeadSink**. |
| **Q22** — which boundary owns a sales lead | `/demo` writes through a `LeadSink` seam to an append-only file. **DEBT-08.** Do **not** put it in `listing.leads` — that is a chassis defect, not a shortcut, and it pollutes the marketplace funnel's metrics. |
| **Q7** — pricing tiers | `/pricing` shows the **model** and a pilot-quote path. `TODO(pricing)` where the number goes. **No number, not even an example.** |
| **Q13** — dual-role disclosure | `/about` ships with a visible marked gap and `TODO(Q13)`. |
| **Q6** — data-controller registration | Four `/legal/*` pages are titled stubs with a visible "in review" banner. **DEBT-09.** An invented privacy policy is worse than an honest stub. |
| **DEBT-10** | All imagery is a placeholder with an `asset-manifest.ts` row naming the shot it owes. |

---

## 9. Where code goes

```
apps/web/
├─ app/(marketing)/
│  ├─ _sections/        one component per landing section; NO prose in JSX
│  ├─ _components/      ProofBar, AvailabilityBadge, DemoDataBadge, PlaceholderImage,
│  │                    RoleSwitcher, DemoForm, FaqAccordion
│  ├─ _shell/           header, desktop-nav, mobile-nav, footer, strings, nav-data
│  ├─ features/<slug>/  ten pages on one template
│  ├─ solutions/<slug>/ four pages
│  ├─ demo/ , demo/thanks/
│  ├─ find/ , legal/<slug>/ , kitchen-sink/
├─ content/marketing/   typed copy modules — routes.ts, types.ts, home.ts,
│                       features/*.ts, asset-manifest.ts
packages/ui/            theme.css (the ONE @theme block), primitives, contrast
packages/contracts/     zod schemas shared with the eventual API
```

**There is no `src/` directory.** House layout.

**Content lives in `content/marketing/`, never in a component.** An ESLint rule
rejects a JSX text run of six or more words inside `_sections/`. Sections take
typed props and render them.

**The `(marketing)` group may import from `@ethanel/ui` and `@ethanel/contracts`
and nothing else.** No authenticated route group, no service package, no schema,
no ledger read. An ESLint import zone fails the build on a violation.

---

## 10. Design system — use it, do not extend it

**Every colour, spacing, radius, type and motion value comes from
`packages/ui/theme.css`.** A grep for a hex code anywhere else must return
nothing. That is acceptance row 10 and it is checked.

### Semantic tokens (use these, not raw palette steps)

`bg-surface` `bg-surface-raised` `bg-surface-sunken` · `text-ink`
`text-ink-muted` `text-ink-quiet` · `border-line` (cards) `border-line-control`
(form controls) · `bg-cta-fill` `text-cta-ink` · `text-accent-text` ·
`bg-accent-band` `text-accent-band-ink` `text-accent-band-quiet`

### The colour rules, and they are not negotiable

- **Ochre is never text on white** (accent-500 on white is 2.67:1) and **never
  carries white text** (also 2.67:1). Both are forbidden pairs.
- **The primary CTA is always the `accent-500` fill with `brand-900` ink** —
  6.12:1. Use `<Button variant="primary">`, which sets it and the
  `data-cta="primary"` marker for you.
- **Ochre text on white is `accent-700` only** — `text-accent-text`, 5.98:1.
- **Form control borders use `--line-control` (sand-500) or darker.** `sand-200`
  is 1.27:1 and `sand-400` is 2.73:1; both fail WCAG 1.4.11's 3:1 floor for a
  boundary that is the only means of identifying a control. `sand-200` is fine
  for a **card** border, which is decoration.
- **Inside a `brand-900` band the accent is `accent-300`**, never `accent-500`.
- Focus ring: 2px at 2px offset, **never removed**. Already global.
- Touch targets: 44×44 minimum — `min-h-[var(--spacing-touch)]`. The `Button`
  primitive already has it.

Run `/kitchen-sink` in dev to see every token, state and computed ratio.

### Primitives — use them instead of hand-rolling

From `@ethanel/ui`: `Container`, `Section` (tones: `default` `raised` `sunken`
`inverted`; sets the 64/84/104 rhythm), `Prose` (caps the 68ch measure),
`Eyebrow`, `Card`, `Button`, `ButtonLink`, `buttonClassName`.

From `_components/`: `AvailabilityBadge`, `DemoDataBadge`, `PlaceholderImage`,
`ProofBar`.

**Do not set vertical section padding, page gutters or reading measure by hand.**

### Type

`text-display` `text-h1`…`text-h4` `text-body-lg` `text-body` `text-body-sm`
`text-caption` `text-data`. Headings take `font-display` and a weight.
`text-data` is tabular-numeral and is what money and codes render in.

---

## 11. Accessibility — AA by construction, and it is a merge gate

- **One `<h1>` per page. No skipped heading levels.** `Eyebrow` is a `<p>`, not
  a heading, for exactly this reason.
- **Radix for every menu, dialog, tab and accordion.** Nothing hand-rolled.
  Native platform first where it will do: `<details>` for a disclosure,
  `input type="search"` over a hand-built combobox.
- Every section that is not introduced by a heading gets `aria-labelledby`.
- Decorative SVG gets `aria-hidden="true"`; meaningful SVG gets `role="img"` and
  an `aria-label`.
- `prefers-reduced-motion: reduce` kills every transform and opacity animation.
  Already global — do not add JS-driven animation that escapes it.
- Dark mode is automatic via token redefinition. **No manual toggle.** Every
  section must render correctly in both.
- **Zero serious or critical axe violations** on `/`, `/demo`, `/pricing` and one
  feature page. This blocks a merge (D-70).

---

## 12. Performance — budgets, not aspirations

Graded on a **throttled 4G profile**, not a laptop.

| Metric | Budget |
|---|---|
| LCP on `/` | under 2.0s; hard fail over 2.5s |
| CLS | under 0.05 |
| INP | under 200ms |
| First-party JS on `/` | **under 150 KB gzipped** (D-71, closing Q23) |
| Total page weight on `/` | under 900 KB |

The 150 KB is roughly 14 KB over the measured Next.js framework floor, so the
budget still fails the moment real client JavaScript appears. **Treat every
`'use client'` as spending money.**

- No autoplaying hero video. No map library on `/` (D-26) — a static image.
- No third-party chat widget on first paint. No carousel library. No icon font.
- Animation is CSS and Tailwind. Icons are inline SVG.
- **No new npm dependency without asking the operator**, justified against the
  JS budget. Approved so far and nothing else: `playwright`,
  `@axe-core/playwright`, `@lhci/cli` — all devDependencies, zero browser bytes.
- Reserve image aspect ratios (`PlaceholderImage` does) so CLS stays flat.

---

## 13. Rendering

- Marketing pages are **static or ISR**; `use cache` is permitted (D-69) because
  no money figure appears on any of them.
- `/demo` is a Server Component with a Server Action — **the only write path in
  the group.**
- `/find` is a Server Component reading params through `nuqs` (D-23).
- URL state via `nuqs`. **No global store.** The role switcher's tab lives in the
  URL so it survives a refresh and is shareable.
- Forms use React Hook Form + zod with the schema from `packages/contracts`
  (D-22). **Never a red border without a text message next to the field.**

---

## 14. How your work is graded

The twelve acceptance criteria, and what each one actually checks:

1. Every nav and footer link resolves — the crawl walks the route manifest.
2. `/` meets LCP and the JS budget on the throttled mobile profile.
3. Zero serious/critical axe violations on `/`, `/demo`, `/pricing`, one feature page.
4. H1, sub-headline, primary CTA **and the risk-reversal line** all above the
   fold at 390×844. **If something must fall below, cut sub-copy — never the CTA.**
5. **Exactly one primary CTA per viewport on `/`** — the page is scrolled in
   844px steps and `data-cta="primary"` elements intersecting each step are
   counted. Use `variant="primary"` once per screenful; header and drawer CTAs
   are deliberately `secondary`.
6. No invented customer, logo, testimonial, rating, metric or price — a vitest
   greps the content modules.
7. Every feature bullet names a service and carries an availability label — a
   **type error**, not a test.
8. Click ids survive from first landing to the lead record; the conversion event
   fires server-side.
9. Vocabulary — covered by criterion 6's test.
10. No stray hex codes outside the `@theme` block.
11. Dark mode renders correctly on every section.
12. Content lives in `content/marketing/`, not in components — a lint rule.

**At most two `brand-900` inverted bands on the landing page.** A third is a test
failure, not a style note.

---

## 15. Your report

When you finish a slice, report:

- Files added or changed, and why each one exists.
- Which constraints in this brief bit, and what you did about it.
- Anything you could not do without inventing a fact — name the fact.
- Anything in this brief that turned out to be wrong or under-specified.

Do not report a slice as done if `pnpm build`, `pnpm exec eslint .` or the
content-truth vitest fails.
