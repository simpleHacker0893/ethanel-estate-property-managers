# Execution plan · The public marketing site

**Written:** 16 September 2026
**Governs:** `.docs/tracks/marketing-site/` tickets 01–16.

This file is the resume point. A session that picks this track up reads this
file and `AGENT-BRIEF.md`, and nothing else, before it starts work.

---

## Why this plan exists

The master prompt asks for the whole marketing site in five phase gates. The
track's `PLAYBOOK.md` says one ticket per session, `/clear` between every one.
Both are right, and they disagree only about the unit of work. The resolution:

- **The phase gate is the review unit.** One reviewable batch per phase, matching
  the master prompt §10 and D-52. The operator reviews every diff (D-51).
- **The ticket is the commit unit.** Each ticket in a phase is its own commit
  with its own red-first test, so the ticket graph stays the real dependency
  record.
- **The subagent is the context unit.** Each ticket-sized slice goes to a fresh
  subagent with a tight brief. That is the `/clear`-between-tickets rule honoured
  in the shape this environment actually has, and it is what keeps quality from
  degrading across a long run.

### The one thing that makes this work

`AGENT-BRIEF.md` — a distillation of every binding constraint from
`DECISIONS.md`, `ROADMAP.md`, `QUESTIONS.md`, `RISKS.md`, `DOMAIN.md` and
`SERVICE-TOPOLOGY.md`. Every subagent reads it first. Without it each agent
re-derives the constraints and they drift; with it they cannot.

---

## Deviation from the plan as written: one branch, not seven

The plan called for one short-lived branch and one PR per phase. **This session
was instructed to develop and push all work on `claude/sharp-galileo-vughkn`**,
and that instruction is explicit and overriding. So:

- All phases land as separate commits on that one branch.
- The **commit** is the review unit here rather than the PR. Each phase's commit
  message carries what the phase PR body would have carried, including the
  deviations it books.
- D-52 (trunk-based, short-lived branches, PR per change) is unaffected as a
  house rule; this is a constraint of the execution environment, recorded rather
  than silently absorbed.

---

## Operator decisions taken on 16 September

| # | Decision | Consequence |
|---|---|---|
| 1 | **The master prompt's palette wins** over ticket 02's. | `packages/ui/theme.css` re-derived: brand `#2c7d5d`, accent `#d98e2b`, sand neutrals. Ticket 02's contrast table replaced by the verified table, which is now a vitest. |
| 2 | **Four font families, six files.** | Schibsted Grotesk 600/700, Public Sans 400/600, Newsreader 300 italic, IBM Plex Mono 500. Overrides the requirements' two-family budget row; `requirements.md` amended to say so. |
| 3 | **Q23 closes at 150 KB, warn → error.** | Recorded as **D-71**. `lighthouserc.json` budget moved and the assertion hardened in the same commit. |
| 4 | **Whole site, split across subagents and sessions.** | This plan. |

### The palette's contrast, recomputed and verified

All fourteen ratios in the operator's table were recomputed from the token values
on 16 September and **every one matches to two decimal places**, including the
two findings the master prompt's table does not cover:

- **`sand-200` on white is 1.27:1** — fine for a card border, which is
  decoration. Not fine for an input border.
- **`sand-400` on white is 2.73:1** — also under WCAG 1.4.11's 3:1 floor.

So the rule is: **form control borders use `sand-500` or darker; card borders may
use `sand-200`.** That is why `--line` and `--line-control` are two tokens rather
than one. It is in the brief and demonstrated in `/kitchen-sink`.

The table lives in `packages/ui/src/contrast.ts` and is asserted by
`packages/ui/src/contrast.test.ts`, which recomputes every pair from `theme.css`
so the table cannot rot away from the tokens.

---

## Repository facts that override the master prompt

| Prompt says | Repo actually has | Resolution |
|---|---|---|
| `apps/web/src/app/(marketing)/` | `apps/web/app/(marketing)/` — no `src` | Repo layout. All paths drop `src/`. |
| Tokens in `(marketing)/theme.css` | `packages/ui/theme.css` | Stays in `packages/ui` (D-27). |
| "use whatever major version `package.json` has" | `next@16.3.5` | Keep. D-16 pins the Active LTS *line*. |
| Trace bullets to `ARCHITECTURE.md` | `ARCHITECTURE.md` is stale | Trace to `SERVICE-TOPOLOGY.md` — twelve services (D-67). |
| `/features/*` traces to "twelve services" | `Capability.service` union exists | Use the existing type. |

**Already built and not to be rebuilt** (tickets 01–03 landed on `main`):
Playwright + axe + Lighthouse harness; the marketing route group, layout, header,
drawer, footer, skip link; `content/marketing/routes.ts` and `types.ts`; the
no-invented-proof vitest; the ESLint import zone and the copy rule.
`packages/contracts/src/marketing/` already holds the `/demo` zod schema and the
attribution schema — Phase 2 consumes them, it does not write them.

---

## Defects found while executing, and fixed

Recorded because each one was an enforcement mechanism that was not enforcing.

| Found | What was actually wrong | Fixed in |
|---|---|---|
| Acceptance row 12's lint rule | The selector was a JS string, so `'\s'` was `'s'` and the regex matched nonsense. **It never fired on a single line of prose.** | Phase 0 |
| Tailwind source scanning | `packages/ui` was outside the scan root, so every class in the primitives was dropped — the primary CTA had no fill and an inverted `Section` was not inverted. | Phase 0 |
| `tailwind-merge` configuration | A custom `--text-*` step is classified as a text *colour* by default, so `cn('text-sand-0', 'text-body-sm')` dropped the colour. Shipped the header CTA at 3.33:1; caught by the axe gate, not by review. | Phase 0 |
| Header layout | The mobile trigger rendered in its own block below the header bar rather than in it. | Phase 0 |
| `Capability.description`'s 120-character rule | `types.ts` said it was "checked by the proof test". It was not checked anywhere. Ten pages were written to a rule nothing applied. | Phase 3 |
| The axe gate's scanned set | `smoke.spec.ts` scanned `/` and nothing else, in one colour scheme. Acceptance row 3 names four routes and row 11 names dark mode; neither was enforced. | Phase 3 |
| Every meta description on the site | All ten feature descriptions ran 190–230 characters and truncated mid-sentence in a search result. | Phase 3 |
| The entire site navigation | The header and footer are generated from the route manifest, so all 28 routes were linked from every page while only `/`, `/demo` and `/features/*` were built. **Eighteen links 404'd**, including every item under Solutions, Company and Legal. The manifest documents the invariant it was breaking — `v1.1-stub` is defined as "a titled placeholder that exists so a nav item does not 404" — and `crawlableRoutes` sat correctly computed and called by nothing under the comment "every route the link crawl must find a 200 on". Written down three times, enforced zero times. | Phase 3.1 |
| `buildFooterColumns` | Kept a second copy of the footer group list and of the filter-and-sort, while `footerGroups` and `footerEntriesFor` sat unused beside the manifest they describe. Two implementations of one rule, in the place where divergence is least visible. | Phase 3.1 |
| Partial prerendering vs `notFound()` | PPR commits the response status before the dynamic render, so a `notFound()` streamed into an already-sent shell renders "not found" under a **200**. The first catch-all shipped exactly that: a soft 404 on every unknown path, invisible to a link crawl and indexable. `generateStaticParams` is what makes the 404 real. | Phase 3.1 |
| `PageBlock` had no link field | Every page that referenced another wrote the path into a sentence — "set out on /security" — which renders as unclickable text that reads like a broken link. Two independent reviewers flagged it. Blocks now carry structured links whose hrefs resolve against the manifest, and a test bans bare internal paths in copy; it found three more the first pass missed. | Phase 4 |
| The `/security` draft itself | Said "a single-tenant bug and a cross-tenant leak". `\btenants?\b` is forbidden site-wide (D-60) and the hyphen is a word boundary, so the page stating the rules broke one. | Phase 4 |
| **The JS budget (D-71)** | **The gate fails.** 271,587 bytes of JavaScript over the wire against a 150 KB (153,600) budget — 1.77x over. Total page weight is fine at ~463 KB against 900 KB. Worse than the overage: the figure is byte-identical across `/`, `/pricing`, `/security`, `/features/rent-collection` and `/demo`, so the client components are not route-split — a legal stub ships the same bundle as the demo form. Not fixed; see below. | Phase 6 |
| `/security` on a feature page | `marketplace-and-viewings` linked to nine routes and not to the one where the design targets are explained. Caught by the new content test on its first run. | Phase 3 |

---

## The phases

### Phase 0 · Foundation reset — **DONE**

Not delegated: every later agent depends on these tokens and primitives being
right, so a subagent getting them subtly wrong is the one failure this plan
cannot absorb.

Tokens re-derived with the semantic indirection layer kept; contrast table
committed as a vitest; type scale to the prompt's numbers; six font files wired
through `next/font/google`; route manifest expanded from 4 entries to the full
information architecture; primitives (`Container`, `Section`, `Prose`, `Button`,
`Card`, `Eyebrow`, `AvailabilityBadge`, `DemoDataBadge`, `PlaceholderImage`,
`ProofBar` pending); `next-intl` wired server-only; Q23 closed as D-71;
`asset-manifest.ts`; `/kitchen-sink` re-rendered.

**Gate met:** kitchen-sink and header screenshots at 390 / 768 / 1440, light and
dark; build green; eslint clean; 62 unit tests; axe zero serious or critical.

### Phase 1 · The landing page (tickets 04–08)

Content-first in every case: typed copy lands in `content/marketing/home/*`
before the section that renders it, because the lint rule rejects prose in
`_sections/`.

| Agent | Sections | Ticket |
|---|---|---|
| A1 | S2 hero, S3 proof bar | 04 |
| A2 | S4 problem, S5 how it works, S6 feature grid | 05 |
| A3 | S7–S9 the three deep dives | 06 |
| A4 | S10 role switcher, S11 marketplace band, S12 land band | 07 |
| A5 | S13 security, S14 pricing preview, S15 FAQ, S16 final CTA | 08 |

Assembled centrally. The red-first above-the-fold test
(`tests/browser/above-fold.spec.ts`) was written before the hero existed and
confirmed red for the right reason — four missing `data-fold` markers.

**Gate:** full-page screenshots at 390 and 1440, light and dark; Lighthouse
mobile run; three H1 options presented for the operator to choose.

### Phase 2 · The conversion path (ticket 09)

`/demo` and `/demo/thanks`. Five fields, email optional, inline blur validation
from the existing contracts, trust elements beside the button, honeypot and
per-IP rate limiting, Server Action writing through the `LeadSink` seam
(DEBT-08), attribution cookie carried into the record, conversion event fired
server-side **inside the sink** and explicitly non-fatal.

**Gate:** `/demo` on mobile, and the attribution test proving `gclid` survives
from first landing to the lead record.

### Phase 3 · Features (tickets 10–11) — **DONE**

The eight-block template proven on `/features/rent-collection` — the hardest
page, because it is where overstatement is most tempting — then the nine others,
three agents taking three pages each against the finished template. Every bullet
traces to a service or it is deleted.

**Ten pages, one route.** `app/(marketing)/features/[slug]` resolves a slug
through `content/marketing/features/index.ts` and renders
`_sections/feature-page.tsx`. There is no per-page component, so ticket 11's "no
page introduces a new component" is structural rather than remembered, and
`generateMetadata` lives in the route so nine pages inherited their metadata
instead of repeating it. `generateStaticParams` prerenders all ten; the build
shows ten static HTML files. The obvious `dynamicParams = false` is unavailable —
`cacheComponents` rejects that segment config — so `notFound()` is what closes
the route to a slug the registry does not name.

**The registry is a total `Record<FeatureSlug, FeaturePageContent>`,** which is
what makes the manifest and the pages the same set: a slug in `FEATURE_SLUGS`
with no content module is a compile error, not a 404 found three phases later.

**Number allocation.** The four publishable numbers are spread one per page —
D-41 on rent collection, D-39-as-bounded-by-D-66 on reconciliation, D-40 on
invoicing, D-45 on landlord statements — and the other six pages carry none.
`tests/content/features.test.ts` enforces that: a design target on a page not on
the allow-list fails, and so does a percentage written anywhere outside a target.

**Honesty.** Nothing on any page is `available`; a browser test counts
`[data-availability="available"]` and requires zero. The land page splits
`may-not-ship` (the five Sprint 012 items) from `sprint` (the ledger and payment
rail underneath them) rather than blanket-labelling, and says the slip-absorber
fact in the eyebrow, the h1, the subhead and the first paragraph of the job
block — a reader learns it without hovering anything.

**Gate met:** `/features/rent-collection` reviewed at 390 and 1440 in both
colour schemes, screenshots in `.artifacts/phase-3/`; build green with all ten
prerendered; eslint clean; **273 unit tests** (37 ui, 28 contracts, 208 web);
**202 Playwright tests**, including the template's structural assertions run
against all ten slugs at both viewports; axe zero serious or critical on `/`,
`/demo`, `/demo/thanks` and `/features/rent-collection` in **both** colour
schemes.

### Phase 4 · The rest of the site (tickets 12–13)

`/pricing` (model only), `/security`, `/platform`, `/about` (`TODO(Q13)`),
`/contact` (email only until Q20), four `/solutions/*`, `/find`, four
`/legal/*` stubs with the in-review banner, `/resources` and `/status`.

### Phase 5 · Metadata and structured data (ticket 14)

`generateMetadata` per route, `next/og` images from one template, JSON-LD,
`sitemap.ts` and `robots.ts` from the route manifest, `hreflang` scaffolding.
The `Organization` JSON-LD **omits `address`** until Q20 is answered.

### Phase 6 · Verification (tickets 15–16) — **partial**

Green: the link crawl (`routes.spec.ts` — every manifest route answers 200,
every chrome link resolves, unknown paths are real 404s, dev-only routes are
unreachable), the axe gate across one page of each template shape in both
colour schemes, the geometry assertions, the content-truth greps and the
contrast proof.

**Failing: the JavaScript budget.** Measured at 271,587 bytes over the wire
against D-71's 150 KB, on every route. Lighthouse itself cannot run in the
build container — Chrome refuses to launch as root without `--no-sandbox` and
lhci does not propagate the flag — so the figure was taken from the CDP
network log instead, which is the same quantity `resource-summary:script:size`
asserts on.

Two things are true and only one of them is a bug:

1. The client components are **not route-split**. The byte count is identical
   on a legal stub and on `/demo`, so the mega menu, the mobile drawer, the
   role switcher and the demo form all sit in chunks every page loads. A page
   with no interactive element should not ship the demo form.
2. Next 16 and React 19 have a floor of their own, and 150 KB was set without
   measuring it. Removing Radix's `NavigationMenu` in favour of a CSS-only
   disclosure is the largest single lever available, but it is a real design
   change — Radix is there because focus management, `aria`, escape and
   outside-click are each something a hand-rolled menu gets wrong (D-19).

Neither is fixed here. The budget is left failing and recorded rather than
quietly raised: a budget edited to match the measurement is not a budget.

Still owed: `acceptance.md`'s evidence column filled from actual output, the
Outcome section, and the conversion self-audit.

---

## What the site may and may not say

Full rules in `AGENT-BRIEF.md`. The four that get violated first:

1. **No invented anything** — customer, logo, testimonial, rating, units figure
   or price (D-68). The proof bar ships `pending`.
2. **Only four numbers are publishable**, as design targets, with a `/security`
   link, never as customer results: 500 units invoiced under 2 minutes (D-40);
   50 callbacks/second for 10 minutes with zero loss (D-41); 95% auto-matched
   **over rent and charge payments against open invoices, deposits and plot
   instalments excluded** (D-39 as bounded by D-66); landlord figures read live
   from the ledger with a last-updated stamp (D-45).
3. **Tense on operational practice.** Sprint 004 schedules the *first* restore
   drill. Write the commitment, not the routine.
4. **Never "tenant"**, in either sense.

## Open questions that shape pages rather than block them

| Q | Effect on the build |
|---|---|
| Q20 · WhatsApp number and Nairobi address | Footer renders email only; JSON-LD omits `address`. **Needs the operator.** |
| Q21 · Which ad platforms are live | Conversion event fires into a logging seam. |
| Q22 · Which boundary owns a sales lead | `/demo` writes to `LeadSink` (a file), DEBT-08. |
| Q7 · Pricing tiers | `/pricing` shows the model and a pilot-quote path. |
| Q13 · Dual-role disclosure | `/about` ships with a marked gap. |
| Q6 · Data-controller registration | `/legal/*` are stubs with the in-review banner. |

## Progress

| Phase | Status |
|---|---|
| 0 · Foundation | **done** — commit `381c3e0` |
| 1 · Landing page | **done** — commit `03c5d29` |
| 2 · Demo flow | **done** — commit `03c5d29` |
| 3 · Features | **done** — ten pages on one template |
| 4 · Pages | **done** — sixteen pages on one template |
| 5 · SEO | **done** — sitemap, robots, JSON-LD, OG cards, per-page metadata |
| 6 · Verification | **partial** — link crawl, axe and geometry green; **JS budget fails** |

Update this table at the end of every phase. It is the only place a fresh
session looks to find out where the track is.
