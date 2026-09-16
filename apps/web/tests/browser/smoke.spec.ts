import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Ticket 01: prove the harness reaches the running web app and that the
// accessibility scanner is live with zero serious or critical violations
// against whatever exists today. As routes grow, the scanned set grows with
// them (acceptance criterion 3 names /, /demo, /pricing and one feature page).

test('the site responds', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
})

for (const path of ['/']) {
  test(`axe: no serious or critical violations on ${path}`, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    )
    const summary = blocking.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
    }))
    expect(summary).toEqual([])
  })
}
