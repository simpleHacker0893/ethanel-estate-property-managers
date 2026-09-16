# Marketing site blueprint

**Authorised by D-68 · Track, not a sprint**

> This file exists so the Builder makes **no product decisions**. Where a section
> cannot be filled without inventing a business fact, that fact is in
> `../../QUESTIONS.md` as Q20–Q22 and the mechanism ships without the value
> (D-64).

## Objective

`apps/web` serves a complete public marketing site from an isolated route group,
graded against `acceptance.md`, making no claim that cannot be traced to
`DECISIONS.md`.

## Files to review first

- `../../AGENTS.md` — the vocabulary table is binding on every line of copy
- `../../DECISIONS.md` — D-16…D-27 (frontend), D-68, D-69, D-70
- `../../DOMAIN.md` §3 (vocabulary), §4 (the nine accounts and the reconciliation
  order) — the landing page's S5, S7 and S8 are written from §4, not from
  imagination
- `../../ARCHITECTURE.md` §5.1 (the tree), §5.2 (the service table every feature
  bullet must trace to), §5.4 (caching)
- `./requirements.md`, `./acceptance.md`

## Where things live

**No `src/` directory.** House layout, `ARCHITECTURE.md` §5.1.

```
apps/web/
├─ app/
│  ├─ (marketing)/
│  │  ├─ layout.tsx          # own layout; imports nothing authenticated
│  │  ├─ marketing.css       # marketing-only overrides, no raw hex
│  │  ├─ page.tsx            # S2..S17
│  │  ├─ _sections/          # one component per section, props from content/
│  │  ├─ _components/        # ProofBar, RoleSwitcher, DemoForm, FaqAccordion
│  │  ├─ features/<slug>/    # ten pages, one shared template
│  │  ├─ solutions/<slug>/   # four pages
│  │  ├─ demo/               # + demo/thanks
│  │  ├─ find/               # shell, params from packages/contracts
│  │  ├─ legal/<slug>/       # four stubs, "in review" banner
│  │  └─ kitchen-sink/       # dev-only, excluded from sitemap and from prod
│  ├─ sitemap.ts             # from the route manifest, never a hand-list
│  └─ robots.ts
├─ content/marketing/        # typed modules: home.ts, features/*.ts, faq.ts,
│                            # nav.ts, asset-manifest.ts, routes.ts
└─ proxy.ts                  # (marketing) is public; it is not matched
packages/ui/
├─ theme.css                 # the ONE @theme block (see below)
└─ src/                      # Container, Section, Prose, Kes, shadcn primitives
```

**The token layer is in `packages/ui/theme.css`, not in the route group.** This
is a deliberate deviation from the source brief. **D-27** requires the same scale
to be re-derived per organization from a supplied logo and accent colour for
storefronts in Sprint 011; tokens scoped to `(marketing)` would have to be moved
then, and a move is how a second source of truth gets created. One `@theme`
block, and `grep -rE '#[0-9a-fA-F]{6}'` outside it returns nothing.

## Service boundaries touched

| Service | Schema | Change |
|---|---|---|
| `web` | — | new `(marketing)` route group, public, no auth |
| none | — | **no schema is touched.** No RLS policy, no migration, no ledger read |

`(marketing)` reads nothing and writes nothing except the `LeadSink` below. A
pull request that makes it import from an authenticated route group or from a
service package is rejected.

## Schema changes

**None.** That is the point of the boundary. The `/demo` lead has no home yet —
see Q22 — and inventing one in someone else's schema would be the exact defect
R-01's second tripwire names.

## API contracts added

In `packages/contracts`, so the form and the eventual API share one definition
(D-02, D-22):

- `demoRequest` — `name`, `agencyName`, `whatsapp` (E.164, `+254` default),
  `unitsUnderManagement` (`under_50` | `50_150` | `150_500` | `500_plus`),
  `currentSystem` (`spreadsheet` | `other_system` | `paper` | `mix`), `email`
  **optional**, plus the attribution block.
- `listingSearchParams` — the `nuqs` parser names for `/find`. Defined here, now,
  so Sprint 011's `listing-svc` inherits the vocabulary instead of coining a
  second one. Marked `ASSUMPTION:` where a filter's shape is not yet settled.
- `LeadSink` — one method, `capture(lead)`. **No default implementation is
  chosen.** The only implementation that ships appends to a file and a structured
  log. Q22 answers this; DEBT-08 records it.

  **One port, not two — operator-confirmed.** The Server Action calls
  `capture(lead)` and nothing else. The server-side conversion dispatch (Q21)
  happens **inside** the sink implementation and is explicitly non-fatal. The two
  operations have different failure semantics: a failed capture loses a customer,
  a failed conversion event loses only an optimisation signal — so the sink is
  where that asymmetry is enforced, because a caller cannot then accidentally
  make a lead depend on an ad platform being reachable. Test surface is one fake.

## Jobs

**None.** No `pg-boss` queue, no worker. Everything is request-time or build-time.

## UI surfaces

| Route | Rendering | Notes |
|---|---|---|
| `/` and all static marketing pages | Static, or ISR with `use cache` | Permitted by **D-69**. No money figure appears on any of them |
| `/demo` | Server Component + Server Action | The action is the only write path in the group |
| `/find` | Server Component, params via `nuqs` | Shell only. **No MapLibre JS** — a static map image; the library would eat the entire JS budget for a decorative element |
| `/kitchen-sink` | dev-only | Not in the sitemap, not built in production |

Stated budget per screen: the `/` numbers in `requirements.md`. Every other
marketing route inherits them.

## Vertical slices

Each one is demoable on its own and sized to one fresh context window.
Prefactoring is sequenced first.

1. **Tokens and primitives, with `/kitchen-sink` proving them.** Every token,
   type style and component state on one page, including the five ochre contrast
   pairs with their computed ratios rendered on screen. *Sequenced first —
   everything else consumes it.*
2. **Shell:** header with the Radix mega menu, mobile drawer, footer, skip link,
   `next-intl` wiring, the content-module types. Renders at 390 / 768 / 1440.
3. **Hero (S2) and proof bar (S3)**, with the above-the-fold Playwright
   assertion red first, then green.
4. **S4–S6** — the problem, how it works, the feature grid.
5. **S7–S9** — the three deep dives, including the one `brand-900` inverted band.
6. **S10–S12** — role switcher (tab state in the URL), marketplace band, land band.
7. **S13–S17** — security, pricing preview, FAQ with JSON-LD, final CTA, footer.
8. **`/demo` + `/demo/thanks`**, including attribution capture and the
   server-side conversion event — dispatched **inside** the single `LeadSink`
   implementation, not as a second port (Q21; see "API contracts added").
9. **The feature-page template, then the ten pages off it.** The template is its
   own slice; the ten pages are mechanical once it exists.
10. **`/pricing`, `/security`, `/platform`, `/about`, `/contact`.**
11. **`/solutions/*`, `/find` shell, `/legal/*` stubs.**
12. **Metadata, OG, JSON-LD, sitemap, robots** across the site.
13. **The gates:** Playwright, axe, lhci, link crawl, and the written self-audit.

## TDD seams — where red-before-green is mandatory

Three, and they are the ones that fail silently if written after the fact:

- **The above-the-fold assertion at 390×844.** Write it before the hero exists so
  it goes red for the right reason. If the CTA falls below the fold, sub-copy is
  cut — never the CTA.
- **The "no invented proof" grep, as a test.** Asserts the content modules contain
  no price pattern, no testimonial key, no logo path, and no occurrence of
  "tenant". A reviewer will not catch a re-introduced price in six months; a test
  will.
- **`demoRequest` validation.** Each failure path asserted before the form
  renders, because "never a red border without a text message" is a requirement
  and not a nicety.

## Copy rules — non-negotiable

- **Vocabulary** is `AGENTS.md`'s table. **resident**, never "tenant" for a
  person, and never "tenant" in the multi-tenancy sense on a public page at all
  (D-60 reserves it for the SaaS boundary).
- **Only these performance claims**, each labelled as a design target the
  platform holds itself to, linked to `/security`, never as a customer result:
  D-40 (500 units invoiced under 2 minutes), D-41 (50 callbacks/second for ten
  minutes, zero loss), **D-39 as bounded by D-66** — the 95% auto-match gate,
  *measured over rent and charge payments against open invoices, with deposits
  and plot instalments excluded*. The denominator ships with the number; a bare
  95% is the exact defect D-66 was written to fix.
- **S5 step 2 uses the real reconciliation order** (`DOMAIN.md` §4): account
  reference `units.code` → payer phone on file → exact amount against open
  invoices → review queue. Oldest invoice first, overpayment becomes a credit,
  unmatched posts to **suspense immediately** (D-15) — money in the ledger from
  arrival, just not yet attributed.
- **S8 shows the real nine-account chart** (D-61), not an invented one.
- **"Ethanel never holds rent"** — rent settles to the agency's own client
  account. This is the answer to FAQ 1 and it is one of the two answers that
  decide deals.
- **The risk-reversal line ships scoped:** *"For pilot partners, we run one full
  rent cycle alongside your current spreadsheet before you switch. If the two
  sets of books don't agree, you don't go live."* Traceable to `ROADMAP.md`
  Sprint 016 and `VALIDATION.md` §3. It is scoped because publishing it unscoped
  converts a one-off pilot gate into a standing offer.
- **Availability honesty.** Marketplace is Sprint 011. Land and `billing-svc` are
  Sprint 012, and Sprint 012 is a **designated slip absorber that may not ship at
  all** — so those two feature pages say so rather than selling week 12 as live.
- **Forbidden words**: revolutionary, seamless, cutting-edge, one-stop solution,
  empower.

## Accessibility — AA by construction

Contrast pairs are pre-computed and used exactly as given. Ochre is **never**
text on white and **never** carries white text; the primary CTA is an ochre fill
with `brand-900` ink at 6.12:1. Radix for every menu, dialog, tab and accordion —
nothing hand-rolled. Visible focus ring, 2px `brand-500` at 2px offset, never
removed. Touch targets 44×44 minimum. One `<h1>` per page, no skipped levels.
`prefers-reduced-motion: reduce` disables every transform and opacity animation
and keeps state changes instant.

## Dependency policy

No new npm dependency without asking the operator first, and each one is
justified against the 120 KB first-party JS budget before it is added.

**Approved so far (all `devDependencies`, zero browser bytes):** `playwright`,
`@axe-core/playwright`, `@lhci/cli`. They are what make six of the twelve
acceptance criteria evidenceable and D-70's two gates real rather than
aspirational — criteria 1, 4, 5, 8 and 11 need a browser, 3 needs the
accessibility scanner, 2 needs the budget runner. Nothing else is approved. Animation
is CSS and Tailwind. Native platform first: `@starting-style`, `<details>` where
a disclosure will do, `input type="search"` over a hand-built combobox. Icons are
inline SVG or tree-shaken `lucide-react` — never an icon font.

## Risks this track could realise

- **R-01's second tripwire.** The `/demo` lead has no home (Q22). The temptation
  is `listing.leads` because the table is nearby. Taking it would be a chassis
  defect, not a shortcut. The `LeadSink` seam exists so the answer is a new
  implementation and not a migration.
- **DEBT-05's trigger, early.** If `/` cannot meet LCP under 2.0s on a throttled
  4G profile with a static hero, that is evidence about the whole stack on
  Kenyan mobile, not just about this page. Report the number rather than tuning
  the profile.
- **The brand becomes load-bearing by accident.** Sprint 003 was scheduled to
  decide the token set. It will now inherit this one. That is cheaper than
  deciding twice, but it means a token chosen for a marketing hero is about to
  style a rent roll — so the scale is built for data density, not just for a
  landing page.
