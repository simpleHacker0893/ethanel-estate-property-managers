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

### Phase 3 · Features (tickets 10–11)

The eight-block template proven on `/features/rent-collection` — the hardest
page, because it is where overstatement is most tempting — then the nine others.
Every bullet traces to a service or it is deleted.

### Phase 4 · The rest of the site (tickets 12–13)

`/pricing` (model only), `/security`, `/platform`, `/about` (`TODO(Q13)`),
`/contact` (email only until Q20), four `/solutions/*`, `/find`, four
`/legal/*` stubs with the in-review banner, `/resources` and `/status`.

### Phase 5 · Metadata and structured data (ticket 14)

`generateMetadata` per route, `next/og` images from one template, JSON-LD,
`sitemap.ts` and `robots.ts` from the route manifest, `hreflang` scaffolding.
The `Organization` JSON-LD **omits `address`** until Q20 is answered.

### Phase 6 · Verification (tickets 15–16)

Link crawl, axe gate, Lighthouse at 150 KB, geometry assertions, dark-mode
screenshots, content-truth grep, stray-hex grep. Then `acceptance.md`'s evidence
column filled from actual output, the Outcome section written, `STATE.md`
updated in place, and the conversion self-audit.

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
| 1 · Landing page | in progress |
| 2 · Demo flow | not started |
| 3 · Features | not started |
| 4 · Pages | not started |
| 5 · SEO | not started |
| 6 · Verification | not started |

Update this table at the end of every phase. It is the only place a fresh
session looks to find out where the track is.
