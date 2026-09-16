import { expect, test } from '@playwright/test'

/**
 * Acceptance criteria 4 and 5, and the one test on this track that had to be
 * written before the thing it tests.
 *
 * Written red, before the hero exists, so that it fails because the hero is
 * missing rather than passing because the assertion was shaped around whatever
 * got built. If the call to action ends up below the fold, the fix is to cut
 * sub-copy — never to move the call to action or to loosen the viewport.
 *
 * The four elements are marked with `data-fold` rather than found by text,
 * because a copy change must not silently disable the check.
 */

const PHONE = { width: 390, height: 844 }

test.describe('above the fold at 390x844', () => {
  test.use({ viewport: PHONE })

  const REQUIRED = ['h1', 'subhead', 'cta', 'risk-reversal'] as const

  for (const name of REQUIRED) {
    test(`the ${name} is fully visible without scrolling`, async ({ page }) => {
      await page.goto('/')
      const element = page.locator(`[data-fold="${name}"]`)

      await expect(
        element,
        `No element marked data-fold="${name}" on /. The hero must mark all four.`,
      ).toHaveCount(1)

      const box = await element.boundingBox()
      expect(box, `data-fold="${name}" is present but not rendered`).not.toBeNull()
      if (!box) return

      // The whole element, not just its top edge: a call to action whose label
      // is cut in half is not above the fold.
      expect(
        box.y + box.height,
        `data-fold="${name}" ends at ${String(Math.round(box.y + box.height))}px, below the 844px fold`,
      ).toBeLessThanOrEqual(PHONE.height)
    })
  }
})

/**
 * Acceptance criterion 5. The page is walked in viewport-height steps and the
 * primary calls to action intersecting each step are counted. `data-cta` is set
 * by the Button primitive's `primary` variant and by nothing else, so a section
 * cannot opt itself in.
 *
 * The header and the mobile drawer deliberately carry `secondary` CTAs: both
 * are fixed, so a primary marker in either would intersect every step.
 */
for (const viewport of [
  { name: '390', width: 390, height: 844 },
  { name: '1440', width: 1440, height: 900 },
]) {
  test(`exactly one primary CTA per viewport at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/')

    const pageHeight = await page.evaluate(() => document.body.scrollHeight)
    const ctas = page.locator('[data-cta="primary"]')
    const count = await ctas.count()
    expect(count, 'The landing page must carry at least one primary CTA').toBeGreaterThan(0)

    const boxes: { y: number; height: number }[] = []
    for (let i = 0; i < count; i++) {
      const box = await ctas.nth(i).boundingBox()
      if (box) boxes.push({ y: box.y, height: box.height })
    }

    const offenders: string[] = []
    for (let top = 0; top < pageHeight; top += viewport.height) {
      const bottom = top + viewport.height
      const intersecting = boxes.filter((b) => b.y < bottom && b.y + b.height > top).length
      if (intersecting > 1) {
        offenders.push(`${String(top)}-${String(bottom)}px: ${String(intersecting)} primary CTAs`)
      }
    }

    expect(offenders).toEqual([])
  })
}

/**
 * The inverted-band budget. At most two `brand-900` bands on the landing page —
 * a third is a failure, not a style note, because the band is what gives the
 * two deep dives their weight and a page of them gives none of them any.
 */
test('at most two inverted bands on the landing page', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-tone="inverted"]')).toHaveCount(2)
})

/** No horizontal scroll at phone width. */
test('no horizontal scroll at 390', async ({ page }) => {
  await page.setViewportSize(PHONE)
  await page.goto('/')
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
})
