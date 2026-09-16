# Marketing site acceptance

**Authorised by D-68 · Track, not a sprint · Status: in progress**

> The exit criteria from `./requirements.md`, restated **verbatim** as checks
> anyone could run, each with the command or the click path.

**Rule:** "the ticket is closed" is not evidence. Evidence is test output, a
command someone else can rerun, or a screenshot path. See `../../VALIDATION.md`.

## Exit criteria

| # | Criterion (verbatim) | How to verify | Evidence | Pass |
|---|---|---|---|---|
| 1 | Every nav and footer link resolves; the crawl finds zero 404s. | `pnpm exec playwright test link-crawl` — walks `nav.ts` and the footer manifest, asserts 200 on each | | ☐ |
| 2 | `/` meets the LCP and first-party JS budgets on the throttled mobile profile. | `pnpm exec lhci autorun` with the `requirements.md` budget table as assertions. LCP under 2.0s, hard fail over 2.5s; first-party JS under 120 KB gz | | ☐ |
| 3 | Zero serious or critical axe violations on `/`, `/demo`, `/pricing` and one feature page. | `pnpm exec playwright test a11y` using `@axe-core/playwright`; assert the serious and critical arrays are empty | | ☐ |
| 4 | The H1, sub-headline, primary CTA and the risk-reversal line are all above the fold at 390×844. | `pnpm exec playwright test above-fold` — bounding box of each of the four elements has `y + height <= 844` at that viewport | | ☐ |
| 5 | Exactly one primary CTA per viewport on `/`. | Scroll `/` at 390 and 1440 in 844px steps; assert at most one `data-cta="primary"` intersects each step | | ☐ |
| 6 | No invented customer, logo, testimonial, rating, metric or price anywhere in the diff — verified by grepping the content modules. | `pnpm exec vitest run content-truth` — the grep is a test, not a review step: no `KES \d` in marketing content, no testimonial or logo keys, no `\btenant\b` | | ☐ |
| 7 | Every feature bullet traces to a service in `ARCHITECTURE.md` §5.2, and every roadmap-dependent capability carries its availability label. | Each capability object in `content/marketing/features/*.ts` carries a required `service` field typed to the twelve service names, and a required `availability` field. A bullet with no service does not typecheck | | ☐ |
| 8 | Click ids survive from first landing to the lead record, and the conversion event fires server-side. | `pnpm exec playwright test attribution` — land on `/?gclid=test123&utm_source=x`, navigate to `/demo`, submit, assert `gclid=test123` in the captured record and that the server-side event was invoked | | ☐ |
| 9 | Copy uses *resident*, *landlord*, *organization*, *caretaker*, *agency* — and never *tenant*. | Covered by criterion 6's test | | ☐ |
| 10 | All colour, spacing, radius and type values come from tokens; a grep for stray hex codes outside the `@theme` block returns nothing. | `grep -rEn '#[0-9a-fA-F]{3,8}' apps/web packages/ui --include='*.tsx' --include='*.ts' --include='*.css' \| grep -v 'packages/ui/theme.css'` returns nothing | | ☐ |
| 11 | Dark mode renders correctly on every section. | Playwright full-page screenshots of `/` at 390 and 1440 under `colorScheme: 'dark'`, reviewed by the operator | | ☐ |
| 12 | Content lives in `apps/web/content/marketing/`, not hardcoded in components. | Each `_sections/*` component takes its copy as typed props; a lint rule rejects a string literal longer than 30 characters inside `_sections/` | | ☐ |

All of the above must pass. A track is done when this file passes, not when the
code compiles.

## Readiness items narrowed

Per D-70. These are narrowings, not payments — the deferred half stands for
product surfaces with its trigger intact.

| Code | Item | Evidence | Done |
|---|---|---|---|
| **E16** | Accessibility audit WCAG 2.1 AA — **marketing routes only**. Product surfaces keep the R1.1 deferral (trigger: first institutional or government client) | | ☐ |
| **E21** | Performance budgets in CI — **marketing routes only**. Product surfaces keep the R1.1 deferral (trigger: resident page p75 LCP over 2.5s on 3G) | | ☐ |

## Debt this track books, deliberately

| Row | What is not done | Recorded in |
|---|---|---|
| **DEBT-08** | `/demo` writes to a file, not a database. Q22 is open | `DECISIONS.md` |
| **DEBT-09** | The four `/legal/*` pages are stubs. Q6 open, advocate review owed | `DECISIONS.md` |
| **DEBT-10** | All imagery is a watermarked placeholder with a manifest row | `DECISIONS.md` |

Plus, shipped without a value per D-64: no price on `/pricing` (**Q7**), no
disclosure paragraph on `/about` (**Q13**), no footer number or address
(**Q20**), no conversion-event destination (**Q21**).

## Permanent gates still green

Every gate from `../../VALIDATION.md` §2 that existed before this track must
still pass. A track that breaks an earlier gate is not done.

| Gate | Green |
|---|---|
| TypeScript strict, no `any` in a public interface | ☐ |
| Image vulnerability scan, blocking on high and critical | ☐ |
| D-34 pod-security gates (the chart still renders) | ☐ |
| Cross-organization isolation (E3) — not applicable, no schema touched | n/a |

## Boundary check

```bash
graphify update .
graphify god-nodes --top 15
```

The specific question for this track: **does anything under `(marketing)` reach
into an authenticated route group or a service package?** It must not. A path
from `(marketing)` to `(org)`, `(resident)`, `(landlord)`, `(caretaker)`,
`(admin)` or `packages/services/*` is a boundary leak.

**Two guards, because one of them cannot answer yet.**

**1 — An ESLint import zone. This is what enforces the boundary today.** Added in
ticket 03, it fails the build the moment anything under `(marketing)` imports
from an authenticated route group or a service package — at the commit, not at
review, and with no dependency on the graph.

**2 — The graph path query, kept for when it can answer.**

```bash
graphify update .
graphify god-nodes --top 15
graphify path "(marketing)" "packages/services"   # expect: no path
```

> **Read this result carefully during this track.** Measured 16 September 2026, it
> returns "no directed path" — and it would return that even if the boundary were
> being violated, because **neither endpoint exists yet**: there is no
> `(marketing)` route group built, `packages/services/*` is Sprint 002, and
> `(org)`, `(resident)`, `(landlord)`, `(caretaker)` and `(admin)` are all
> unbuilt too. The query also warns that its target match is ambiguous, which is
> what fuzzy-matching an absent name looks like. **A pass here is vacuous until
> Sprint 002.** It is retained because it becomes real evidence then, and because
> it catches a class of leak an import rule cannot — a path through a shared
> module rather than a direct import.

**God-node baseline, measured 16 September 2026** (1,449 nodes, 1,341 edges,
after code extraction): the most connected node is `compilerOptions` at 24
edges, which is a `tsconfig` artifact rather than a real hub, and every entry
below it is a planning document. **There is no source-code god node**, because
the code is still small. That is the number the row below compares against.

| Question | Answer |
|---|---|
| New god nodes | |
| Intentional | |
| ESLint import zone green | |
| Any path from `(marketing)` to an authenticated surface | |

## Conversion self-audit

Written at the end of the track, in this exact format. **We have no traffic**, so
the Verdict ranks by first-principles friction and says so rather than implying
measurement. Cap the fix list at seven.

### Verdict

_One paragraph. What this page does well, what it costs in conversion, and the
confidence level given zero traffic._

### Fix now

_At most seven, ordered by expected impact per hour of work._

### Test, don't guess

_Changes that are plausible either way and should not be argued about without
data. Name the test._

### Not a problem

_Things that look like problems and are not, with the reason. This section exists
so the next reader does not re-raise them._

### Could not check

_Anything the audit could not assess, and why — including everything that depends
on Q6, Q7, Q13, Q20, Q21 and Q22._

## Outcome

- **Passed:**
- **Did not pass:**
- **Moved, and to where:**

Anything that moved is reflected in `../../STATE.md`, and in `../../RISKS.md` or
`../../QUESTIONS.md` if this track changed either.
