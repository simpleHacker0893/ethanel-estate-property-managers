import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/**
 * Acceptance criterion 3 (the merge gate of D-70) and criterion 11.
 *
 * Criterion 3 names `/`, `/demo`, `/pricing` and one feature page. `/pricing`
 * arrives with the trust pages and is added to `SCANNED` then; the rest are
 * here. `/demo/thanks` is scanned too because it is the one page a converted
 * visitor actually lands on and it would otherwise never be looked at again.
 *
 * Every route is scanned in **both colour schemes**, which is criterion 11 made
 * enforceable. Dark mode is automatic token redefinition with no toggle, so the
 * failure mode is not a missing switch — it is a pair whose contrast was only
 * ever checked in one scheme. `packages/ui/src/contrast.test.ts` proves the
 * token pairs; this proves the pairs that actually reached the page.
 */

const SCANNED = ['/', '/demo', '/demo/thanks', '/features/rent-collection'] as const
const SCHEMES = ['light', 'dark'] as const

test('the site responds', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
})

for (const path of SCANNED) {
  for (const scheme of SCHEMES) {
    test(`axe: no serious or critical violations on ${path} in ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme })
      await page.goto(path)
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      const blocking = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      )
      // The node targets are in the failure message on purpose: an axe id alone
      // ("color-contrast") costs a re-run to locate.
      const summary = blocking.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target.join(' ')),
      }))
      expect(summary).toEqual([])
    })
  }
}
