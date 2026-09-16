import { expect, test, type Page } from '@playwright/test'

import { FEATURE_SLUGS } from '../../content/marketing/routes'

/**
 * The feature-page template, asserted once so that all ten pages inherit the
 * assertion.
 *
 * Ten pages on one template is only worth anything if the template is the thing
 * under test. Everything here is a property of `_sections/feature-page.tsx`
 * rather than of the copy in any one module, so a ninth page cannot quietly
 * acquire a second `<h1>`, drop an availability label, or grow a second
 * `brand-900` band.
 *
 * It runs against all ten slugs, read from the route manifest rather than
 * listed here — so an eleventh feature page is covered by these assertions
 * before anyone remembers to add it, and a page that renders a different shape
 * fails at the slug that broke rather than somewhere downstream.
 */

test.describe.configure({ mode: 'parallel' })

for (const slug of FEATURE_SLUGS) {
  featurePageTests(`/features/${slug}`)
}

function featurePageTests(PAGE: string) {
  test.describe(PAGE, () => {
    test('has exactly one h1, and skips no heading level', async ({ page }) => {
      await page.goto(PAGE)

      const levels = await page
        .locator('main :is(h1,h2,h3,h4,h5,h6)')
        .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName.slice(1))))

      expect(levels.filter((l) => l === 1)).toHaveLength(1)
      expect(levels[0], 'The first heading in main must be the h1').toBe(1)

      // A jump from h2 straight to h4 is invisible to a sighted reader and
      // disorienting to anyone navigating by heading.
      for (let i = 1; i < levels.length; i++) {
        const previous = levels[i - 1] ?? 1
        const current = levels[i] ?? 1
        expect(
          current,
          `Heading level jumped from h${String(previous)} to h${String(current)}`,
        ).toBeLessThanOrEqual(previous + 1)
      }
    })

    test('every capability carries an availability label and a service trace', async ({ page }) => {
      await page.goto(PAGE)

      const capabilities = page.locator('[data-capability]')
      const count = await capabilities.count()
      // Acceptance row 7's other half. The type already refuses to compile a
      // capability with no service or no availability; this is what proves the
      // declared values reach the screen, because a type nobody renders protects
      // nothing.
      expect(count).toBeGreaterThan(0)
      expect(await page.locator('[data-capability] [data-availability]').count()).toBe(count)
      expect(await page.locator('[data-capability] [data-service]').count()).toBe(count)
    })

    test('claims nothing as available — no sprint has shipped', async ({ page }) => {
      await page.goto(PAGE)
      // The honest `available` set is "things a visitor can verify by using the
      // public site", and no capability on a feature page is one of those. A page
      // that starts claiming otherwise is inventing a business fact, which is the
      // single most expensive defect on this track.
      expect(await page.locator('[data-availability="available"]').count()).toBe(0)
    })

    test('spends at most one inverted band', async ({ page }) => {
      await page.goto(PAGE)
      // The band is the target block, so a page carrying one of the four
      // publishable numbers has exactly one and the other six have none. That
      // is the intended asymmetry rather than an oversight: a `brand-900` band
      // is the loudest thing on the page, and only a page with something
      // measurable to say has earned it.
      expect(await page.locator('[data-tone="inverted"]').count()).toBeLessThanOrEqual(1)
    })

    for (const [label, width, height] of [
      ['mobile', 390, 844],
      ['desktop', 1440, 900],
    ] as const) {
      test(`does not scroll horizontally at ${label}`, async ({ page }) => {
        await page.setViewportSize({ width, height })
        await page.goto(PAGE)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overflow).toBeLessThanOrEqual(0)
      })

      test(`shows at most one primary call to action per screenful at ${label}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height })
        await page.goto(PAGE)

        const counts = await countPrimaryCtasPerStep(page, height)
        // The same rule acceptance row 5 applies to `/`: two primary calls to
        // action on the page — the hero and the closing band — but never two
        // competing inside one screenful.
        expect(Math.max(...counts)).toBeLessThanOrEqual(1)
        expect(counts.reduce((a, b) => a + b, 0)).toBeGreaterThanOrEqual(1)
      })
    }
  })
}

/**
 * Walks the page in viewport-height steps and counts the `data-cta="primary"`
 * elements whose box intersects each step.
 *
 * Counted from measured geometry rather than from scroll position, because a
 * sticky header or a lazily-revealed band makes "what is on screen after
 * scrolling" a different question from "what lies in this band of the
 * document", and it is the second one the rule is about.
 */
async function countPrimaryCtasPerStep(page: Page, step: number): Promise<number[]> {
  return page.evaluate((stepHeight) => {
    const boxes = [...document.querySelectorAll('[data-cta="primary"]')].map((el) => {
      const rect = el.getBoundingClientRect()
      const top = rect.top + window.scrollY
      return { top, bottom: top + rect.height }
    })
    const pageHeight = document.documentElement.scrollHeight
    const counts: number[] = []
    for (let top = 0; top < pageHeight; top += stepHeight) {
      const bottom = top + stepHeight
      counts.push(boxes.filter((b) => b.bottom > top && b.top < bottom).length)
    }
    return counts
  }, step)
}
