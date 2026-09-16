import { existsSync, readFileSync, rmSync } from 'node:fs'
import { expect, test } from '@playwright/test'

import { LEAD_SINK_PATH } from '../../playwright.config'

/**
 * Acceptance row 8, end to end: **a click identifier has to survive from first
 * landing to the lead record**, and the conversion event has to fire
 * server-side.
 *
 * This is the one criterion that cannot be proved at a lower seam. The unit
 * tests prove that the merge rules are right and that the action passes
 * attribution through; only a browser can prove that the cookie is actually set
 * on the landing page, survives a navigation to `/demo`, and reaches the Server
 * Action — which is a chain of four separate mechanisms, any one of which can
 * be wired up wrong while every unit test stays green.
 *
 * It reads the captured lead back off disk because that is genuinely where it
 * goes while DEBT-08 stands. When Q22 is answered and the sink writes to a
 * database, this file changes and nothing else does — which is the point of the
 * seam.
 */

function readCapturedLeads(): Record<string, unknown>[] {
  if (!existsSync(LEAD_SINK_PATH)) return []
  return readFileSync(LEAD_SINK_PATH, 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => JSON.parse(line) as Record<string, unknown>)
}

test.describe('attribution survives from first landing to the lead record', () => {
  test.beforeAll(() => {
    rmSync(LEAD_SINK_PATH, { force: true })
  })

  test('a gclid captured on / reaches the record submitted from /demo', async ({ page }) => {
    const agencyName = `Attribution Test ${String(Date.now())}`

    // 1. First landing, carrying an ad click.
    await page.goto('/?gclid=test123&utm_source=google&utm_campaign=rent-collection')

    // The cookie is httpOnly, so the browser cannot read it and neither can a
    // tracking script — which is the design. Assert it exists via the context.
    const cookies = await page.context().cookies()
    const attribution = cookies.find((c) => c.name === 'eth_attr')
    expect(attribution, 'No eth_attr cookie was set on first landing').toBeDefined()
    expect(attribution?.httpOnly, 'The attribution cookie must be httpOnly').toBe(true)
    expect(attribution?.sameSite).toBe('Lax')

    // 2. Navigate to the form the way a visitor would — the click identifier is
    //    long gone from the URL by this point, which is the whole problem.
    await page.goto('/demo')
    expect(page.url()).not.toContain('gclid')

    // 3. Submit.
    await page.getByLabel('Your name').fill('Wanjiru Kamau')
    await page.getByLabel('Agency name').fill(agencyName)
    await page.getByLabel('WhatsApp number').fill('+254712345678')
    await page.getByLabel('Units under management').selectOption('50_150')
    await page.getByLabel('What you use today').selectOption('spreadsheet')
    await page.getByRole('button', { name: 'Request a demo' }).click()

    // 4. The record carries the click identifier from step 1.
    await expect
      .poll(() => readCapturedLeads().find((lead) => lead.agencyName === agencyName), {
        message: 'The submission never reached the lead sink',
        timeout: 10_000,
      })
      .toBeDefined()

    const lead = readCapturedLeads().find((row) => row.agencyName === agencyName)
    expect(lead?.attribution).toMatchObject({
      gclid: 'test123',
      utm_source: 'google',
      utm_campaign: 'rent-collection',
    })
    expect(lead?.whatsapp).toBe('+254712345678')
    expect(lead?.id, 'Every lead carries a UUIDv7 generated in the application').toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    )
  })

  test('first touch wins — a later visit does not overwrite the original source', async ({
    page,
  }) => {
    await page.goto('/?gclid=first-click&utm_source=google')
    await page.goto('/?fbclid=later-click&utm_source=facebook')
    await page.goto('/demo')

    const agencyName = `First Touch ${String(Date.now())}`
    await page.getByLabel('Your name').fill('Otieno Odhiambo')
    await page.getByLabel('Agency name').fill(agencyName)
    await page.getByLabel('WhatsApp number').fill('+254733222111')
    await page.getByLabel('Units under management').selectOption('under_50')
    await page.getByLabel('What you use today').selectOption('paper')
    await page.getByRole('button', { name: 'Request a demo' }).click()

    await expect
      .poll(() => readCapturedLeads().find((row) => row.agencyName === agencyName), {
        timeout: 10_000,
      })
      .toBeDefined()

    const lead = readCapturedLeads().find((row) => row.agencyName === agencyName)
    // Re-attributing a considered purchase to the last retargeting ad that
    // touched it is the default most analytics gets wrong.
    expect(lead?.attribution).toMatchObject({ gclid: 'first-click', utm_source: 'google' })
  })
})

test.describe('the form refuses bad input without losing the visitor', () => {
  test('shows a message, not just a red border, and does not submit', async ({ page }) => {
    await page.goto('/demo')
    const before = readCapturedLeads().length

    await page.getByLabel('WhatsApp number').fill('0712345678')
    await page.getByLabel('Your name').click()

    // A requirement in its own right: never a red border without a text message.
    const field = page.getByLabel('WhatsApp number')
    await expect(field).toHaveAttribute('aria-invalid', 'true')
    await expect(page.getByText(/Kenyan mobile number/i)).toBeVisible()

    await page.getByRole('button', { name: 'Request a demo' }).click()
    await page.waitForTimeout(500)
    expect(readCapturedLeads()).toHaveLength(before)
  })

  test('the honeypot is not reachable by keyboard or by a screen reader', async ({ page }) => {
    await page.goto('/demo')
    const honeypot = page.locator('input[name="companyWebsite"]')
    await expect(honeypot).toHaveCount(1)
    await expect(honeypot).toHaveAttribute('tabindex', '-1')
    // Hidden from the accessibility tree by its aria-hidden wrapper, which is
    // what a role query respects — a label query does not.
    await expect(page.getByRole('textbox', { name: 'Company website' })).toHaveCount(0)
  })
})
