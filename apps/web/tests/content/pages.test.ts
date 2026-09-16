import { describe, expect, it } from 'vitest'

import { getStandardPage, standardPageSlugs } from '../../content/marketing/pages'
import { routeFor, routes } from '../../content/marketing/routes'
import type { PageBlock, StandardPageContent } from '../../content/marketing/types'

/**
 * The data-level rules for the sixteen standard pages.
 *
 * These run in vitest rather than in a browser because every one of them is a
 * property of the content, not of the render — and a rule checked against data
 * fails in milliseconds on the module that broke it, instead of as a screenshot
 * diff on a page that happens to display it.
 *
 * The bar here is set by what has already gone wrong on this track twice: a
 * rule written in a docstring and enforced nowhere (the 120-character
 * capability limit), and a set of meta descriptions that all truncated in a
 * search result because nothing measured them. Every constraint the brief
 * states about these pages is asserted below or it is not a constraint.
 */

const THE_RISK_REVERSAL =
  'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.'

/**
 * `/security` is the only page allowed to print a design target, because it is
 * the only page that prints the denominator the target is true inside of
 * (D-39 as bounded by D-66). Everywhere else links here instead.
 */
const MAY_STATE_A_TARGET = '/security'

function pageFor(slug: string): StandardPageContent {
  const page = getStandardPage(slug)
  if (!page) throw new Error(`no page registered for ${slug}`)
  return page
}

function allText(page: StandardPageContent): string {
  const fromBlock = (block: PageBlock): string[] => {
    const heading = [block.heading.eyebrow ?? '', block.heading.title, block.heading.lede ?? '']
    if (block.kind === 'prose') return [...heading, ...block.paragraphs]
    if (block.kind === 'list') return [...heading, ...block.items.flatMap((i) => [i.title, i.body])]
    if (block.kind === 'steps')
      return [...heading, ...block.steps.flatMap((s) => [s.title, s.body, s.source ?? ''])]
    return [...heading, ...block.rows.flatMap((r) => [r.label, r.value])]
  }

  return [
    page.meta.title,
    page.meta.description,
    page.banner ?? '',
    page.hero.eyebrow ?? '',
    page.hero.h1,
    page.hero.lede,
    ...page.blocks.flatMap(fromBlock),
    page.cta.heading.title,
    page.cta.heading.lede ?? '',
    page.cta.reassurance,
  ].join('\n')
}

describe('the standard page registry', () => {
  it('covers every manifest route that is not the home page, the demo path or a feature page', () => {
    const owed = routes
      .filter((route) => !route.devOnly)
      .map((route) => route.path)
      .filter((path) => path !== '/' && !path.startsWith('/demo') && !path.startsWith('/features/'))

    expect([...standardPageSlugs()].sort()).toEqual(owed.sort())
  })

  it('has no page whose slug is missing from the route manifest', () => {
    for (const slug of standardPageSlugs()) {
      expect(routeFor(slug), `${slug} is not a route`).toBeDefined()
    }
  })
})

describe.each(standardPageSlugs())('%s', (slug) => {
  const page = pageFor(slug)

  it('declares the slug it is registered under', () => {
    expect(page.slug).toBe(slug)
  })

  it('has a meta description that survives a search result', () => {
    // Under ~70 characters wastes the snippet; over 160 truncates mid-sentence.
    // Ten feature pages shipped at 190–230 before anything measured them.
    expect(page.meta.description.length).toBeGreaterThan(70)
    expect(page.meta.description.length).toBeLessThanOrEqual(160)
  })

  it('fills the hero', () => {
    expect(page.hero.h1.length).toBeGreaterThan(10)
    expect(page.hero.lede.length).toBeGreaterThan(40)
  })

  it('carries at least three blocks in at least two shapes', () => {
    expect(page.blocks.length).toBeGreaterThanOrEqual(3)
    expect(new Set(page.blocks.map((block) => block.kind)).size).toBeGreaterThanOrEqual(2)
  })

  it('closes with the risk reversal, byte for byte', () => {
    // Quoted from the track brief and scoped to pilot partners on purpose.
    // Published unscoped it turns a one-off pilot gate into a standing
    // commercial offer, which is not what was decided.
    expect(page.cta.reassurance).toBe(THE_RISK_REVERSAL)
  })

  it('links only to routes that exist', () => {
    const hrefs = [
      page.cta.primaryCta.href,
      ...page.blocks.flatMap((block) => (block.links ?? []).map((link) => link.href)),
    ]
    for (const href of hrefs) {
      expect(routeFor(href), `${slug} links to ${href}, which is not a route`).toBeDefined()
    }
  })

  it('never prints a bare internal path in copy', () => {
    // Body copy is plain strings with no link parsing, so a path written into a
    // sentence — "set out on /security" — renders as unclickable text that
    // reads like a broken link. Every page shipped at least one before this
    // fired. Cross-references belong in `links`, where the href is structured
    // data this suite can resolve against the manifest.
    const bare = allText(page).match(/(?:^|\s)\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*/g) ?? []
    expect(bare, `${slug} prints bare paths in copy: ${bare.join(', ')}`).toEqual([])
  })

  it('states no percentage outside /security', () => {
    if (slug === MAY_STATE_A_TARGET) return
    expect(allText(page)).not.toMatch(/\d\s?%|\bper cent\b/i)
  })

  it('never says "tenant", in either sense', () => {
    expect(allText(page)).not.toMatch(/\btenants?\b/i)
  })

  it('claims nothing as generally available', () => {
    // Nothing has shipped and no agency is live. The words below are the ones
    // that turn a scheduled capability into a claim.
    expect(allText(page)).not.toMatch(
      /\b(?:generally available|now available|already live|in production today)\b/i,
    )
  })
})

describe('the legal stubs', () => {
  const legal = standardPageSlugs().filter((slug) => slug.startsWith('/legal/'))

  it('are the four the manifest names', () => {
    expect(legal.length).toBe(4)
  })

  it.each(legal)('%s says on its own face that it is in review', (slug) => {
    // DEBT-09 and Q6: no advocate has reviewed these. A stub that does not
    // announce itself is indistinguishable from policy someone can rely on.
    const page = pageFor(slug)
    expect(page.banner, `${slug} has no in-review banner`).toBeDefined()
    expect((page.banner ?? '').length).toBeGreaterThan(30)
  })
})

describe('pages that are not stubs', () => {
  it('do not carry an in-review banner', () => {
    for (const slug of standardPageSlugs()) {
      if (slug.startsWith('/legal/')) continue
      expect(pageFor(slug).banner, `${slug} should not have a banner`).toBeUndefined()
    }
  })
})
