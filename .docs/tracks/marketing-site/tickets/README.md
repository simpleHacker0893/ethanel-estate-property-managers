# Tickets · The public marketing site

Sixteen tracer-bullet tickets, in dependency order. Cut from `../spec.md` and
graded against `../acceptance.md`. Every ticket is `ready-for-agent`.

**These are GitHub issues in waiting.** `gh` is not installed, so they live here
instead; publish them in this order once it is authenticated, so each ticket's
blocking edges can reference real issue numbers. Label `ready-for-agent`, and
use the native blocking relationship rather than prose where the tracker has one.

**One ticket per session.** `/clear` between every one — each is sized to a
single fresh context window (`PLAYBOOK.md`).

| # | Ticket | Blocked by |
|---|---|---|
| [01](01-test-harness-and-live-gates.md) | Test harness and live gates | None (can start immediately) |
| [02](02-design-tokens-and-kitchen-sink.md) | Design tokens and the kitchen sink | None (can start immediately) |
| [03](03-marketing-shell-content-types-boundary.md) | Marketing shell, content types and the boundary rule | 02 |
| [04](04-hero-and-proof-bar.md) | Hero and proof bar | 01, 03 |
| [05](05-problem-how-it-works-feature-grid.md) | The problem, how it works, and the feature grid | 03 |
| [06](06-three-deep-dives.md) | Three deep dives, including the real chart of accounts | 03 |
| [07](07-role-switcher-marketplace-land.md) | Role switcher, marketplace band and land band | 03 |
| [08](08-completes-landing-page.md) | Security, pricing preview, FAQ and final call to action — completes the landing page | 04, 05, 06, 07 |
| [09](09-demo-request-flow.md) | The demo request flow | 01, 03 |
| [10](10-feature-page-template.md) | The feature page template, proven on one page | 03 |
| [11](11-nine-remaining-feature-pages.md) | The nine remaining feature pages | 10 |
| [12](12-trust-and-company-pages.md) | Pricing, security, platform, about and contact | 03 |
| [13](13-solutions-find-and-stubs.md) | Solutions pages, the marketplace shell, and the stubs | 03 |
| [14](14-metadata-og-jsonld-sitemap.md) | Metadata, Open Graph images, structured data, sitemap and robots | 11, 12, 13 |
| [15](15-final-evidence-pass.md) | Final evidence pass and acceptance sign-off | 08, 09, 14 |
| [16](16-conversion-self-audit.md) | The conversion self-audit | 15 |

## The shape of the graph

Tickets **01** and **02** are prefactors and gate everything; they can run in
parallel. **03** is the hinge — nine tickets depend on it and nothing else
depends on each other.

**05, 06, 07, 10, 12 and 13 gate only on 03**, so they can be taken in any order
or in parallel. They are deliberately *not* chained in page order, because that
would be a convention rather than a real dependency.

Two tickets wait on more than the shell for a substantive reason. **08** waits on
04 through 07 because "exactly one primary call-to-action per viewport" cannot be
asserted until every section of the landing page exists. **14** waits on 11, 12
and 13 because a sitemap generated from the route manifest is only meaningful
once the routes are real.

## Two deviations from `../blueprint.md`, both deliberate

**The gates run from ticket 01, not as a final slice.** The blueprint's slice 13
installed the test tooling, while its slice 3 required a red-first above-the-fold
assertion — which is impossible without a runner. Moving the harness first
resolves that, and it means an accessibility or budget regression fails at the
commit that causes it rather than in the last week.

**The boundary is enforced by an ESLint import zone**, added in ticket 03,
because `acceptance.md`'s graph path query has no endpoints to match until the
authenticated route groups exist in Sprint 002. The graph check stays as a second
guard for when it can answer — both, not one.
