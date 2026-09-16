import { expect, test } from '@playwright/test'

import { crawlableRoutes, routes } from '../../content/marketing/routes'

/**
 * The link crawl: every route the manifest names answers 200, and nothing else
 * does.
 *
 * This test exists because the site shipped three phases with a dead
 * navigation and nothing noticed. The header and footer are generated from the
 * route manifest, so every route listed there was linked from the chrome on
 * every page — while only `/`, `/demo` and `/features/*` had been built. The
 * other eighteen links 404'd. The manifest even documents the invariant it was
 * breaking (`v1.1-stub`: "a titled placeholder that exists so a nav item does
 * not 404"), and `crawlableRoutes` was sitting here, correctly computed and
 * called by nothing, under the comment "every route the link crawl must find a
 * 200 on". The rule was written down three times and enforced zero times.
 *
 * The negative half matters as much as the positive half. A catch-all route
 * serves the unbuilt paths, and the cheap way to write one answers 200 for
 * every URL on the internet — which would make the positive assertion below
 * pass unconditionally and turn a typo in an `href` into a soft 404 that no
 * crawl can see. Partial prerendering makes that failure easy to reach by
 * accident: it commits the response status before the dynamic render, so a
 * `notFound()` streamed into an already-sent 200 renders "not found" under a
 * success status. Asserting the 404s is what holds that shut.
 */

test('every route in the manifest answers 200', async ({ page }) => {
  const failures: string[] = []

  for (const path of crawlableRoutes) {
    const response = await page.goto(path)
    const status = response?.status()
    if (status !== 200) failures.push(`${path} -> ${String(status)}`)
  }

  expect(failures, `manifest routes that did not answer 200:\n${failures.join('\n')}`).toEqual([])
})

test('every link in the site chrome resolves', async ({ page }) => {
  await page.goto('/')

  // The chrome is identical on every page, so one page exercises all of it.
  // Relative, non-anchor hrefs only: mailto and external links are not ours.
  const hrefs = await page.evaluate(() =>
    [...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')))]
      .filter((href): href is string => href !== null && !href.startsWith('/_next'))
      .sort(),
  )

  expect(hrefs.length).toBeGreaterThan(20)

  const failures: string[] = []
  for (const href of hrefs) {
    const response = await page.goto(href)
    const status = response?.status()
    if (status !== 200) failures.push(`${href} -> ${String(status)}`)
  }

  expect(failures, `links in the chrome that did not resolve:\n${failures.join('\n')}`).toEqual([])
})

test('a path the manifest does not name is a real 404', async ({ page }) => {
  const unknown = ['/nope', '/pricing-typo', '/solutions/not-a-thing', '/legal/nonsense', '/a/b/c']

  const failures: string[] = []
  for (const path of unknown) {
    const response = await page.goto(path)
    const status = response?.status()
    if (status !== 404) failures.push(`${path} -> ${String(status)} (expected 404)`)
  }

  expect(failures, `soft 404s — unknown paths answering success:\n${failures.join('\n')}`).toEqual(
    [],
  )
})

test('development-only routes are not reachable in a production build', async ({ page }) => {
  const devOnly = routes.filter((route) => route.devOnly)
  expect(devOnly.length).toBeGreaterThan(0)

  for (const route of devOnly) {
    const response = await page.goto(route.path)
    expect(response?.status(), `${route.path} should not be served`).toBe(404)
  }
})
