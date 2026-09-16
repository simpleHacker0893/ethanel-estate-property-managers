# Spec · Track — The public marketing site

**Authorised by D-68 · Track, not a sprint · Status: partially built**

> **This file is the GitHub issue body, held here because `gh` is not installed.**
> Publish as an issue titled **"Track · The public marketing site"**, labelled
> `ready-for-agent`, per `PLAYBOOK.md` §B. The acceptance section below is the
> exit criteria from `./acceptance.md` verbatim. Readiness items are written out
> in full rather than as bare codes (Q15 / D-56).

---

## Problem Statement

A sceptical agency owner in Nairobi hears about Ethanel, opens it on a handset on
Safaricom LTE, and there is nothing there. `apps/web` serves a Next.js starter
page. There is no way to find out what the product does, no way to judge whether
it can be trusted with rent, and no way to ask for a demo.

The owner's actual question is narrow and they will not read far to get it
answered: **does rent collect and reconcile itself, and does my money ever sit in
Ethanel's hands?** Everything else — repairs, the marketplace, plots — is
secondary to that. They are also, reasonably, suspicious: they have been sold
property software before, and a page full of claims with no numbers behind them
reads as a reason to close the tab.

Two further problems sit behind the public one.

**The project has no brand.** Nothing in twenty-eight planning documents
specifies a colour, a typeface or a tone of voice. `ROADMAP.md` scheduled a
"Tailwind v4 token set" as a Sprint 003 deliverable, which means the first person
to build a screen would have had to invent one under time pressure, and the rent
roll would inherit whatever they picked.

**And the honest version of the story is the persuasive one, but only if the
numbers survive contact with the pack.** The defensible claims already exist —
500 units invoiced in under two minutes, 50 callbacks a second with zero loss,
95% of rent payments matched without a human, rent settling to the agency's own
client account. A marketing page that rounds those off, drops a denominator, or
adds an invented testimonial destroys exactly the credibility it was built to
create.

## Solution

A complete public marketing site served by `apps/web` from an isolated
`(marketing)` route group: a landing page, ten feature pages, four solutions
pages, a pricing preview, a security page, a demo request flow, and the legal and
resource stubs that stop nav items 404ing.

From the owner's side: one screen that says rent collects and reconciles itself
against a double-entry ledger, with the reconciliation order shown as it actually
runs — account reference, then payer phone on file, then exact amount against
open invoices, then a review queue — and the real nine-account chart of accounts
rather than a decorative diagram. Every performance number appears with the
bound that makes it true, including the 95% auto-match figure carrying its
denominator (rent and charge payments against open invoices, deposits and plot
instalments excluded). Availability is stated honestly: the marketplace is a
later sprint, and the land features sit in a sprint that is a designated slip
absorber and may not ship at all, so both say so.

Two answers are given prominence because they are the two that decide deals:
**Ethanel never holds rent** — it settles to the organization's own client
account — and a scoped risk-reversal offer, that a pilot partner runs one full
rent cycle alongside their existing spreadsheet before switching, and if the two
sets of books disagree they do not go live.

Asking for a demo is five fields, on the page, with a Kenyan mobile number and no
required email address, because in this market WhatsApp is the channel and a
required email costs more leads than the address is worth.

And the site carries the project's first brand artifact: one `@theme` token block
in `packages/ui`, built for data density rather than for a hero image, which
Sprint 003 inherits instead of re-deciding and Sprint 011 re-derives per
organization for storefronts.

## User Stories

**The prospect — an agency owner evaluating Ethanel**

1. As an agency owner searching for property management software in Kenya, I want Ethanel to appear with an accurate title and description, so that I can tell before clicking whether it is for my kind of business.
2. As an agency owner on a handset on Safaricom LTE, I want the landing page to be readable before it has finished loading everything, so that I do not abandon it on a slow connection.
3. As an agency owner, I want the headline, sub-headline, primary call to action and the risk-reversal line all visible without scrolling on my phone, so that I can decide whether to keep reading in one glance.
4. As an agency owner, I want to understand in one screen that rent collects and reconciles itself against a double-entry ledger, so that I know what the product actually is rather than what category it belongs to.
5. As an agency owner who has been sold software before, I want every performance claim labelled as a design target the platform holds itself to rather than as a result I will get, so that I can believe the ones that are stated.
6. As an agency owner, I want to see the 95% auto-match figure with the denominator it is measured over, so that I am not agreeing to a number that means something different in practice.
7. As an agency owner worried about my clients' money, I want it stated plainly that Ethanel never holds rent and that funds settle to my own client account, so that I can answer that question before my landlords ask it.
8. As an agency owner, I want to see the reconciliation order as it actually runs, so that I can judge whether it will work against how my residents actually pay.
9. As an agency owner whose residents often pay the wrong amount or forget the account reference, I want to see that an unmatched payment posts to suspense immediately and waits in a manual match queue, so that I understand money is never lost, only unattributed.
10. As an agency owner, I want to see the real chart of accounts, so that I can show it to my accountant instead of relaying a summary.
11. As a sceptical agency owner, I want a scoped offer to run one full rent cycle alongside my current spreadsheet before switching, so that trying Ethanel does not risk a month's collections.
12. As an agency owner, I want to know which capabilities exist today and which are scheduled, so that I am not buying a roadmap and discovering it later.
13. As an agency owner, I want each feature described in terms of what it does for my agency rather than in terms of the service that implements it, so that I do not have to read an architecture diagram.
14. As an agency owner who only cares about one thing, I want to switch the page to the view for my role, so that I can skip the parts that are about somebody else's job.
15. As an agency owner, I want the role I picked to survive a page refresh and to be shareable as a link, so that I can send my accountant straight to the part that concerns them.
16. As an agency owner, I want an indication of price or at least the pricing model, so that I can tell whether this is plausible for a business my size before I book a call.
17. As an agency owner, I want to book a demo in under a minute on a phone, so that a moment of interest is not lost to a long form.
18. As an agency owner, I want to give a WhatsApp number rather than an email address, so that I am contacted where I actually reply.
19. As an agency owner mistyping my number, I want to be told what is wrong in words next to the field, so that I am not staring at a red border with no explanation.
20. As an agency owner, I want a confirmation page that tells me what happens next and when, so that I am not left wondering whether the form worked.
21. As an agency owner, I want to reach a real WhatsApp number and a real address in the footer or nothing at all, so that a dead link does not become my first impression of the company.

**The other actors on the site**

22. As a landlord considering whether to let an agency use Ethanel, I want to see what I would get — statements, arrears, repairs spend, occupancy, remittance history — so that I can encourage my agency to adopt it.
23. As a landlord, I want to see that the figures I read come live from the ledger with a "last updated" stamp rather than from a cached summary, so that I can act on them.
24. As a resident who has been sent a link, I want to understand what Ethanel will do with my payments and my repair requests, so that I know what I am being enrolled into.
25. As a caretaker with a basic phone and metered data, I want the pages that describe my part of the product to be light, so that reading about it does not cost me a noticeable amount of airtime.
26. As the owner of a land-selling company, I want to see how plots, subdivisions and instalment sales are handled, so that I can tell whether Ethanel serves my business and not only letting agencies.
27. As the owner of a land-selling company, I want the land capabilities labelled with their real availability, so that I am not sold a sprint that may not ship.
28. As a prospect browsing the marketplace shell, I want to see how searching for a unit or a plot will work, so that I can picture the experience my own listings would get.

**Accessibility, and reaching the site at all**

29. As a screen-reader user, I want one heading per page with no skipped levels and every menu, dialog, tab and accordion built on accessible primitives, so that I can navigate the site the way I navigate any other.
30. As a keyboard-only user, I want a skip link and a visible focus ring that is never removed, so that I can tell where I am.
31. As a user with reduced-motion preferences set, I want every transform and opacity animation disabled and state changes kept instant, so that the site does not make me unwell.
32. As a user with low vision, I want every text and background pair to meet AA contrast, so that I can read the page without zooming.
33. As a user with large fingers on a small phone, I want touch targets of at least 44 by 44, so that I do not mis-tap the call to action.
34. As a user whose device is in dark mode, I want every section to render correctly without a manual toggle, so that the site respects the setting I already made.
35. As a search engine crawler, I want a sitemap and robots file generated from the route manifest, so that I index every page and no page is missed because someone forgot to add it to a hand-written list.
36. As a search engine, I want structured data for the organization, the software, the FAQ and the breadcrumbs, so that I can present the site richly — and I want no address claim at all rather than a fabricated one.
37. As a Swahili-speaking visitor in a later release, I want the site's language wiring to already exist with `sw-KE` reserved, so that translation is a content task and not a rebuild.

**The operator and the project itself**

38. As the operator, I want no invented customer, logo, testimonial, rating, metric or price anywhere in the site, and I want that enforced by a test rather than by my own review, so that a price cannot quietly reappear in six months.
39. As the operator, I want every feature bullet to fail to typecheck unless it names the service that implements it and its availability, so that the site cannot drift ahead of the architecture.
40. As the operator, I want copy to use *resident*, *landlord*, *organization*, *caretaker* and *agency* and never *tenant*, enforced by the same test, so that the public vocabulary matches the domain glossary.
41. As the operator, I want the marketing route group unable to import from any authenticated surface or service package, so that a public page can never become a way into tenant data.
42. As the operator, I want no schema, no row-level security policy and no ledger read in this track, so that nothing here can touch money.
43. As the operator, I want accessibility and performance to block a merge on marketing routes from the first commit, so that I am not retrofitting them into a finished site.
44. As the operator, I want the performance numbers measured on a throttled mobile profile rather than on a laptop, so that the budget reflects the connection my customers are on.
45. As the operator, I want a demo lead written through a seam with no database behind it, so that answering the question of which boundary owns a sales lead is a new implementation rather than a migration.
46. As the operator, I want the advertising click identifiers captured from first landing and carried into the lead record even before I know which ad platforms are live, so that answering that late costs me the optimisation signal and not the data.
47. As the operator, I want the legal pages to be visibly marked as in review rather than filled with plausible text, so that an unreviewed privacy policy is never mistaken for a reviewed one.
48. As a Builder agent picking up a ticket on this track, I want the content to live in typed modules rather than inside components, so that I can change copy without reading JSX.
49. As the Builder of Sprint 003, I want the design tokens to already exist and to be built for data density, so that I inherit a scale rather than inventing one while building a rent roll.
50. As the Builder of Sprint 011, I want the marketplace search parameter names defined in the shared contracts package now, so that `listing-svc` inherits the vocabulary instead of coining a second one.

## Implementation Decisions

**Boundary.** One new route group in the `web` service, public, no authentication.
**No schema is touched** — no migration, no row-level security policy, no ledger
read. The route group may not import from the organization, resident, landlord,
caretaker or admin route groups, nor from any service package. This is the
decision the whole track rests on, and it is checked mechanically rather than by
review.

**No jobs.** No `pg-boss` queue and no worker. Everything is request-time or
build-time.

**Rendering.** Static or incremental with `use cache`, permitted on marketing
routes by D-69 because no money figure appears on any of them. The demo page is a
Server Component with a Server Action, and that action is the only write path in
the group. The marketplace shell is a Server Component reading its parameters
through `nuqs`; it uses a static map image rather than a map library, because the
library would consume the entire JavaScript budget for a decorative element.

**The token layer lives in `packages/ui`, not in the route group.** Deliberate
deviation from the obvious placement: storefronts in Sprint 011 must re-derive
the same scale per organization from a supplied logo and accent colour, so tokens
scoped to marketing would have to move, and a move is how a second source of
truth is created. One `@theme` block, light-first, dark supported by token
redefinition with no manual toggle. Every colour, spacing, radius, type and
motion value comes from it; a search for hex codes anywhere else returns nothing.

**Already built, and not to be rebuilt.** The demo request and attribution
contracts exist in `packages/contracts` with unit tests: a five-field request
schema with an optional email, a Kenyan mobile matcher that normalises separators
to E.164 and deliberately rejects general international numbers, a submission
schema that carries the attribution block and puts the honeypot **in the contract
rather than in the form** so the server-side check cannot be forgotten, and the
attribution schema with its cookie name and ninety-day window. `packages/ui`
holds the agreed home for the tokens and a class-merge helper. The token *values*
are not written yet — that is the first slice.

**Contracts to add.** The marketplace search parameter names, defined now so
Sprint 011 inherits them, marked as assumptions where a filter's shape is not yet
settled. And one outbound port for the demo submission.

**One outbound port, not two.** The demo Server Action calls a single sink:

```ts
interface LeadSink {
  capture(lead: DemoSubmission): Promise<void>
}
```

The server-side conversion dispatch happens **inside** the sink implementation,
not as a second port the action calls — operator-confirmed, and the blueprint is
amended so the Builder inherits it. Two reasons. It keeps the action's test
surface to one fake. And the two operations have different failure semantics — a
failed lead capture loses a customer, a failed conversion event loses only an
optimisation signal — so the conversion dispatch is explicitly non-fatal inside
the sink, where a caller cannot accidentally make a lead depend on an ad
platform being reachable. The only implementation that ships appends to a file
and a structured log; which boundary owns a sales lead is open (Q22), and this
is booked as DEBT-08.

**Content as typed data, not as markup.** Every section takes its copy as typed
props from content modules. This is what makes three separate acceptance criteria
cheap: the no-invented-proof check becomes a test over plain objects, the
content-not-in-components rule becomes a lint rule rejecting long string literals
inside section components, and the traceability rule becomes a **type error**
rather than a test, because a capability is declared as:

```ts
type Capability = {
  label: string
  service: ServiceName        // union of the twelve services
  availability: 'available' | 'sprint' | 'may-not-ship'
}
```

A bullet with no service does not compile. `ServiceName` is the twelve logical
services of D-67, and the availability field is what forces the marketplace and
land pages to state their real status.

**Route manifest as the single source for navigation, sitemap and robots.** The
sitemap and robots files are generated from the manifest, never hand-listed,
which is what makes "no nav item 404s" enforceable by crawling the manifest
rather than by remembering.

**Shipping without values, per D-64.** The mechanism ships and the value is
deferred: the pricing page carries the pricing model and a pilot-quote path with
no price (Q7); the about page carries a marked gap where the dual-role disclosure
goes (Q13); the footer renders email only and the organization structured data
omits the address rather than inventing one (Q20); the conversion event's
destination is unset behind the sink (Q21); the four legal pages are titled stubs
with a visible "in review" banner (Q6, DEBT-09); all imagery is a watermarked
placeholder with a manifest row (DEBT-10).

**Dependency policy.** No new npm dependency without the operator's approval, each
justified against the first-party JavaScript budget. Animation is CSS and
Tailwind. Native platform first — a disclosure element where one will do, a
search input over a hand-built combobox. Icons are inline or tree-shaken, never
an icon font.

**Sequencing.** Tokens and primitives first, proven on a development-only kitchen
sink page that renders every token, type style and component state including the
accent contrast pairs with their computed ratios on screen. Then the shell, then
the landing page sections in groups, then the demo flow, then the feature
template followed by the ten pages off it, then the remaining pages, then
metadata and structured data, then the gates.

## Testing Decisions

**What makes a good test here.** It asserts what a visitor or a crawler can
observe — text, geometry, status codes, contrast, the shape of a captured record
— and never how a component is built. No test should name a component's internal
state, a class name, or a hook. Three of the acceptance criteria are deliberately
*not* tests: traceability is a type error, content-not-in-components is a lint
rule, and dark mode is an operator-reviewed screenshot, because each is cheaper
and more durable in that form than as an assertion.

**Prior art, and the pattern to follow.** `packages/contracts/src/marketing/demo-request.test.ts`
is the model for every schema test on this track: a single valid fixture, table-driven
cases for the normalise-or-reject boundary, a case per field asserting that a
failure carries a *message* rather than a bare failure, and separate assertions
that the honeypot rejects and that a click identifier survives into the record.
It is behavioural throughout — it parses and inspects the result, never the
schema's internals. Extend it rather than starting a new style.

**Four seams, and what each one covers.**

1. **The shared contracts package, unit-tested.** The highest seam available and
   already in place. Validation, normalisation, the honeypot and attribution
   pass-through are all pure functions over plain objects — no DOM, no server, no
   browser. The new marketplace parameter parsers are tested here too.
2. **Content modules, as typed data.** A test over the content objects asserts no
   price pattern, no testimonial or logo keys, and no occurrence of "tenant"
   anywhere in the copy. Written before the sections consume it, because a
   reviewer will not catch a re-introduced price in six months and a test will.
3. **The lead sink, faked.** The demo Server Action is tested against a fake sink:
   a valid submission reaches the sink exactly once with the attribution intact,
   an invalid one never reaches it, a filled honeypot never reaches it, and a
   conversion dispatch that throws does **not** fail the capture.
4. **A browser suite.** Unavoidable for the six criteria that are about geometry,
   contrast, reachability and end-to-end attribution: the above-the-fold
   assertion at 390×844, the one-primary-call-to-action-per-viewport scan, the
   navigation and footer link crawl, the accessibility scan at zero serious or
   critical violations, the landing-to-demo attribution journey, and the dark-mode
   screenshots. Performance budgets are asserted by a separate runner on a
   throttled profile.

**Red before green is mandatory on two of these**, because they fail silently when
written afterwards: the above-the-fold assertion, written before the hero exists
so it goes red for the right reason — and if the call to action falls below the
fold, the sub-copy is cut, never the call to action — and the no-invented-proof
test. The third mandatory seam named in the blueprint, demo request validation,
is already written and green.

**Coverage.** The repository's coverage floor targets the domain packages and does
not include this track, which is correct: a percentage over marketing components
would measure nothing worth measuring. The acceptance criteria are the gate here.

## Out of Scope

- Any authenticated surface, and any import from one.
- Any schema change, any row-level security policy, any ledger read. Nothing here
  touches money.
- Real listing data. The marketplace shell runs against demo data; the
  marketplace itself and `listing-svc` are Sprint 011.
- The per-organization storefront. That is Sprint 011; this track only places the
  token layer where Sprint 011 can derive from it.
- A blog. The resources page is a stub, because an empty blog reads worse than no
  blog.
- Autoplaying hero video, a live map library on the landing page, a third-party
  chat widget on first paint, a carousel library, an icon font.
- Deciding which boundary owns a sales lead, which platforms receive conversion
  events, the real address and number, prices, the dual-role disclosure wording,
  and the legal text. Each ships as a seam or a marked gap instead.

## Further Notes

**Three things block full acceptance and are not code.**

The browser suite, the accessibility scanner and the performance runner were **not
installed** — the repository had a unit test runner and nothing else, and six of
the twelve acceptance criteria cannot be evidenced without them. **The operator
has approved `playwright`, `@axe-core/playwright` and `@lhci/cli` as development
dependencies**, recorded in the blueprint's dependency policy. Nothing else is
approved; anything further needs asking again.

**`gh` is not installed**, so this spec could not be published to the issue
tracker and the ticket breakdown cannot create issues either. It is a hard
dependency for the rest of the workflow.

**The knowledge graph is stale in a way that matters for this track.** It contains
990 nodes and they are all planning documents and agent definitions — no source
files, although the Sprint 001 monorepo exists on disk. The boundary check in
`acceptance.md` asks for a path query from the marketing route group to the
service packages, expecting no path. That query cannot answer the question until
the graph indexes code, so re-run the update and confirm source files appear
before relying on it as evidence.

**Risks this track could realise.** If the landing page cannot meet its
largest-contentful-paint budget on a throttled mobile profile with a static hero,
that is evidence about the whole stack on Kenyan mobile rather than about this
page — report the number, do not tune the profile. And the brand becomes
load-bearing by accident: a token scale chosen for a marketing hero is about to
style a rent roll, so build it for data density.

**The temptation to avoid.** The demo lead has no home, and `listing-svc` owns a
`leads` table that is nearby and column-compatible. Taking it would be a chassis
defect rather than a shortcut, and it would pollute the marketplace funnel's own
metrics. Note the harder problem underneath: a sales lead belongs to no
organization, so it is the first record in the system that the tenancy column
cannot scope — a policy question, not a table question.

### Acceptance — verbatim from `./acceptance.md`

1. Every nav and footer link resolves; the crawl finds zero 404s.
2. `/` meets the LCP and first-party JS budgets on the throttled mobile profile.
3. Zero serious or critical axe violations on `/`, `/demo`, `/pricing` and one feature page.
4. The H1, sub-headline, primary CTA and the risk-reversal line are all above the fold at 390×844.
5. Exactly one primary CTA per viewport on `/`.
6. No invented customer, logo, testimonial, rating, metric or price anywhere in the diff — verified by grepping the content modules.
7. Every feature bullet traces to a service in `ARCHITECTURE.md` §5.2, and every roadmap-dependent capability carries its availability label.
8. Click ids survive from first landing to the lead record, and the conversion event fires server-side.
9. Copy uses *resident*, *landlord*, *organization*, *caretaker*, *agency* — and never *tenant*.
10. All colour, spacing, radius and type values come from tokens; a grep for stray hex codes outside the `@theme` block returns nothing.
11. Dark mode renders correctly on every section.
12. Content lives in `apps/web/content/marketing/`, not hardcoded in components.

A track is done when `acceptance.md` passes, not when the code compiles.

### Readiness items narrowed, written out in full

- **E16 — accessibility audit to WCAG 2.1 AA**, narrowed to marketing routes.
  Product surfaces keep their Release 1.1 deferral, triggered by the first
  institutional or government client.
- **E21 — performance budgets in continuous integration**, narrowed to marketing
  routes. Product surfaces keep their Release 1.1 deferral, triggered by the
  resident page's 75th-percentile largest-contentful-paint exceeding 2.5 seconds
  on 3G.

Both are narrowings, not payments. The deferred half stands with its trigger
intact.
