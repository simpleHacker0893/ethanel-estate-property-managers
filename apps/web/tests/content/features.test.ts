import { describe, expect, it } from 'vitest'

import { featurePages } from '../../content/marketing/features'
import { FEATURE_SLUGS, routeFor, type FeatureSlug } from '../../content/marketing/routes'
import type { Capability, FeaturePageContent } from '../../content/marketing/types'

/**
 * The ten feature pages, checked as a set.
 *
 * `proof.test.ts` reads the content modules as *text* and greps for the things
 * that must never appear. This reads them as *data* and checks the things that
 * must be true of every page — which is the cheaper seam for anything with a
 * shape, and the only seam that can compare a page against the route manifest.
 *
 * Three of these exist because a comment somewhere claimed enforcement that did
 * not exist. `types.ts` said a capability description was "checked by the proof
 * test"; it was not, and ten pages were written to a rule nothing was applying.
 * A promise of enforcement is worse than no promise, because it is believed.
 */

const PAGES = Object.entries(featurePages) as [FeatureSlug, FeaturePageContent][]

/**
 * The four publishable numbers (brief §4), and the only pages allowed to carry
 * one. A design target on an eleventh page is an invented number by definition —
 * there are four, and these are the four.
 */
const ALLOWED_TARGETS: Partial<Record<FeatureSlug, string>> = {
  reconciliation: 'D-39',
  'invoicing-and-rent-runs': 'D-40',
  'landlord-statements': 'D-45',
  'rent-collection': 'D-41',
}

/** The scoped risk-reversal line, verbatim (brief §5). */
const RISK_REVERSAL =
  'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.'

function capabilitiesOf(page: FeaturePageContent): Capability[] {
  return page.capabilities.items
}

/** Every string a visitor can read on the page, excluding the design target. */
function copyOutsideTarget(page: FeaturePageContent): string[] {
  const { target: _target, ...rest } = page
  const out: string[] = []
  const walk = (value: unknown): void => {
    if (typeof value === 'string') out.push(value)
    else if (Array.isArray(value)) value.forEach(walk)
    else if (value && typeof value === 'object') Object.values(value).forEach(walk)
  }
  walk(rest)
  return out
}

describe('the registry covers the manifest', () => {
  it('has a page for every slug the navigation offers', () => {
    // The total `Record` type already makes a missing page a compile error.
    // This is the other direction: a module registered under a slug the
    // manifest does not carry would be a page nothing links to.
    expect(PAGES.map(([slug]) => slug).sort()).toEqual([...FEATURE_SLUGS].sort())
  })

  it.each(PAGES)('%s declares its own slug', (slug, page) => {
    expect(page.slug).toBe(slug)
  })

  it.each(PAGES)('%s is registered at a real route', (slug) => {
    expect(routeFor(`/features/${slug}`)).toBeDefined()
  })
})

describe('every link on a feature page resolves', () => {
  it.each(PAGES)('%s links only to routes in the manifest', (_slug, page) => {
    const hrefs = [
      page.hero.primaryCta.href,
      page.cta.primaryCta.href,
      ...page.related.links.map((link) => link.href),
    ]
    // Acceptance row 1 at the cheapest seam there is. The Phase 6 crawl walks
    // the site; this catches the typo at the commit that introduces it.
    const broken = hrefs.filter((href) => routeFor(href) === undefined)
    expect(broken).toEqual([])
  })

  it.each(PAGES)('%s points at /security, where the design targets live', (_slug, page) => {
    // Brief §4: each publishable number is labelled as a design target and
    // linked to /security. The `DesignTarget` type carries a citation and not a
    // URL, so the link is the page's job — and it is the same link on a page
    // with no target, because the commitments are what a sceptic checks.
    expect(page.related.links.map((link) => link.href)).toContain('/security')
  })
})

describe('nothing claims to be available', () => {
  it.each(PAGES)('%s labels every capability as scheduled or planned', (_slug, page) => {
    // Brief §7: no sprint has shipped. The only honest `available` is something
    // a visitor can verify by using the public site, and no capability on a
    // feature page is one of those.
    const claimed = capabilitiesOf(page).filter((c) => c.availability === 'available')
    expect(claimed.map((c) => c.label)).toEqual([])
  })

  it.each(PAGES)('%s names a sprint wherever it is not available', (_slug, page) => {
    // The discriminated union already enforces this at compile time. The test
    // exists because a `sprint: ''` satisfies the type and says nothing.
    const unnamed = capabilitiesOf(page).filter((c) => (c.sprint ?? '').trim().length < 3)
    expect(unnamed.map((c) => c.label)).toEqual([])
  })
})

describe('the four publishable numbers, and only those', () => {
  it.each(PAGES)('%s carries a design target only if it is allowed one', (slug, page) => {
    const allowed = ALLOWED_TARGETS[slug]
    if (allowed === undefined) {
      expect(page.target, `${slug} may not carry a design target`).toBeUndefined()
      return
    }
    expect(page.target?.source).toContain(allowed)
    // D-66: the denominator is part of the shape of the claim. An empty bound
    // satisfies the type and reintroduces the exact defect it was written for.
    expect(page.target?.bound.length ?? 0).toBeGreaterThan(40)
  })

  it.each(PAGES)('%s writes no percentage outside its design target', (_slug, page) => {
    // A percentage is the cheapest invented number and the most quoted one.
    const offenders = copyOutsideTarget(page).filter((text) => /\d\s?%|\bper cent\b/i.test(text))
    expect(offenders).toEqual([])
  })
})

describe('the rules a page is written to', () => {
  it.each(PAGES)('%s keeps every capability description under 120 characters', (_slug, page) => {
    const tooLong = capabilitiesOf(page)
      .filter((c) => (c.description?.length ?? 0) > 120)
      .map((c) => `${c.label} (${String(c.description?.length)})`)
    expect(tooLong).toEqual([])
  })

  it.each(PAGES)('%s keeps its meta description inside a search result', (_slug, page) => {
    // Beyond roughly 160 characters a description is truncated mid-sentence,
    // which is a worse first impression than a shorter one that finishes.
    expect(page.meta.description.length).toBeLessThanOrEqual(160)
    expect(page.meta.description.length).toBeGreaterThan(70)
  })

  it.each(PAGES)('%s closes with the risk-reversal line, verbatim', (_slug, page) => {
    // Brief §5. It is scoped to pilot partners on purpose: publishing it
    // unscoped turns a one-off pilot gate into a standing offer.
    expect(page.cta.reassurance).toBe(RISK_REVERSAL)
  })

  it.each(PAGES)('%s says what it does not do', (_slug, page) => {
    // The block that earns the page. A page that drops it is a brochure.
    expect(page.limits.items.length).toBeGreaterThanOrEqual(3)
  })

  it.each(PAGES)('%s fills all eight blocks', (_slug, page) => {
    expect(page.hero.h1.length).toBeGreaterThan(10)
    expect(page.job.body.length).toBeGreaterThanOrEqual(2)
    expect(capabilitiesOf(page).length).toBeGreaterThanOrEqual(4)
    expect(page.mechanics.steps.length).toBeGreaterThanOrEqual(3)
    expect(page.related.links.length).toBeGreaterThanOrEqual(2)
  })
})
