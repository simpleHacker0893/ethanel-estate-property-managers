# Track · The public marketing site

**Authorised by D-68 · Status: in progress · Not in the sixteen-sprint sequence**

> This track exists because D-68 reversed two written positions:
> `ARCHITECTURE.md`'s Scope row (*"Landing page out of scope"*) and `PRD.md` §3's
> non-goal (*"Public marketing landing page (deferred)"*). Read D-68 before this
> file — it says what the reversal does and does not license.

## Goal

A sceptical Nairobi agency owner lands on `/` from a phone on Safaricom LTE,
understands in one screen that rent collects and reconciles itself against a
double-entry ledger, and books a demo — without the site making a single claim
that cannot be defended from `DECISIONS.md`.

## Services touched

- `web` — a new `(marketing)` route group. **No domain service.** The route group
  imports from no authenticated surface and reads no schema.
- `packages/ui` — the token layer and layout primitives.
- `packages/contracts` — the `/demo` form schema and the `/find` search params.

## In scope

- **Design system.** Tailwind v4 `@theme` token block in `packages/ui` — brand
  green, ochre accent, warm neutrals, the fluid `clamp()` type scale, radius and
  motion tokens. Light-first, `prefers-color-scheme: dark` supported by token
  redefinition, no manual toggle. This is the **first brand artifact the project
  has** — `ROADMAP.md` Sprint 003 had the "Tailwind v4 token set" as a future
  deliverable and nothing in the pack specified a colour, a typeface or a tone of
  voice. Sprint 003 inherits this rather than re-deciding it.
- **The landing page**, S2–S17: hero (dual door), pending proof bar, the problem
  in the customer's words, how it works, a ten-card feature grid, three deep
  dives, a role switcher with tab state in the URL (`nuqs`, D-23), a marketplace
  band, a land band, security and trust, a pricing preview, FAQ with `FAQPage`
  JSON-LD, final CTA band, footer.
- **`/demo` and `/demo/thanks`.** Five fields maximum, form on the page, zod from
  `packages/contracts` (D-22), inline validation on blur, honeypot, per-IP rate
  limit, Server Action submit. Click-id and `utm_*` capture into a first-party
  90-day `SameSite=Lax` cookie on first landing, carried into the lead record,
  conversion event fired server-side.
- **Ten `/features/*` pages** on one shared template, plus `/platform`,
  `/pricing`, `/security`, `/about`, `/contact`.
- **Four `/solutions/*` pages** and a `/find` shell whose URL parameter names are
  defined in `packages/contracts` so Sprint 011's `listing-svc` inherits them.
- **Four `/legal/*` stubs**, `/resources` stub, `/status` stub — so no nav item
  404s.
- **SEO and metadata.** `generateMetadata` per route, `next/og` images from one
  template, `app/sitemap.ts` and `app/robots.ts` generated from a route manifest,
  `Organization` / `SoftwareApplication` / `FAQPage` / `BreadcrumbList` JSON-LD,
  `hreflang` for `en-KE` with `sw-KE` reserved (D-25).
- **Accessibility and performance as merge gates**, scoped to marketing routes
  per D-70: `@axe-core/playwright` at zero serious or critical on `/`, `/demo`,
  `/pricing` and one feature page; `@lhci/cli` on the budgets below.
- **Playwright coverage**: nav on mobile and desktop, the `/demo` happy path and
  each validation failure, every nav and footer link returns 200, and the
  above-the-fold assertion at 390×844.

## Out of scope

- Any authenticated surface. The route group may not import from `(org)`,
  `(resident)`, `(landlord)`, `(caretaker)` or `(admin)`.
- Any schema, any RLS policy, any ledger read. Nothing here touches money.
- Real listing data. `/find` is a shell against demo data; the marketplace is
  Sprint 011 and `listing-svc` does not exist.
- The per-organization storefront (D-27). That is Sprint 011. This track only
  places the token layer where Sprint 011 can derive from it.
- A blog. `/resources` is a stub — an empty blog reads worse than no blog.
- Autoplaying hero video, a live MapLibre map on `/`, a third-party chat widget
  on first paint, a carousel library, an icon font.

## Depends on

- The monorepo toolchain (Sprint 001 P1, E11) and `apps/web` existing.
- Nothing else. It does not depend on the cluster, the chassis or any schema.

## Readiness items paid or narrowed

- **E16** — narrowed by D-70. Marketing routes gate on axe-core; product
  surfaces keep the R1.1 deferral and its trigger.
- **E21** — narrowed by D-70. Marketing routes gate on `@lhci/cli` budgets;
  product surfaces keep the R1.1 deferral and its trigger.

## Blocked by

| Question | Blocks | Ships anyway as |
|---|---|---|
| **Q20** | footer contact line, `Organization` JSON-LD `address` | email-only footer; `address` omitted rather than invented |
| **Q21** | the server-side conversion event's destination | click ids captured and stored from day one; nothing is lost by answering late |
| **Q22** | `/demo` lead persistence | a `LeadSink` seam writing to an append-only file — **DEBT-08** |
| **Q7** | a price on `/pricing` | the pricing *model*, a pilot-quote path, and a `TODO(pricing)` comment |
| **Q13** | the dual-role disclosure on `/about` and in the terms | `/about` ships with a `TODO(Q13)` where the paragraph goes |
| **Q6** | real legal text | four titled stubs with an "in review" banner — **DEBT-09** |

## Performance budgets

Graded on a throttled 4G profile, not on a laptop.

| Metric | Budget |
|---|---|
| LCP, mobile 4G, on `/` | under 2.0s; hard fail over 2.5s |
| CLS | under 0.05 |
| INP | under 200ms |
| First-party JS on `/` | under 150 KB gzipped (**D-71**, closing Q23; was 120 KB) |
| Total page weight on `/` | under 900 KB including the hero image |
| Font families on `/` | **4 families / 6 files** — operator decision, 16 September 2026, superseding the 2-family row. `next/font/google`, `latin` subset, `display: swap`, one or two weights each. Six single-weight files is a smaller download than two families at four weights, which is the shape this row was written to prevent. |

## Exit criteria

- Every nav and footer link resolves; the crawl finds zero 404s.
- `/` meets the LCP and first-party JS budgets on the throttled mobile profile.
- Zero serious or critical axe violations on `/`, `/demo`, `/pricing` and one
  feature page.
- The H1, sub-headline, primary CTA and the risk-reversal line are all above the
  fold at 390×844.
- Exactly one primary CTA per viewport on `/`.
- No invented customer, logo, testimonial, rating, metric or price anywhere in
  the diff — verified by grepping the content modules.
- Every feature bullet traces to a service in `ARCHITECTURE.md` §5.2, and every
  roadmap-dependent capability carries its availability label.
- Click ids survive from first landing to the lead record, and the conversion
  event fires server-side.
- Copy uses *resident*, *landlord*, *organization*, *caretaker*, *agency* — and
  never *tenant*.
- All colour, spacing, radius and type values come from tokens; a grep for stray
  hex codes outside the `@theme` block returns nothing.
- Dark mode renders correctly on every section.
- Content lives in `apps/web/content/marketing/`, not hardcoded in components.

## Decisions this track may not re-open

See `../../DECISIONS.md`, and in particular D-16 (Next.js on the Active LTS
line), D-19 (shadcn/ui + Radix + Tailwind v4), D-22, D-23, D-25, D-26 (no
CesiumJS here, and no MapLibre JS on `/`), D-68, D-69, D-70. If one of them is
wrong, write a superseding decision and say so out loud — do not work around it
quietly.

## Notes

_What surprised you goes here, and then into `../../RISKS.md` or
`../../DECISIONS.md` if it outlives the track._
