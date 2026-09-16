import type { MetadataRoute } from 'next'

import { BASE_URL } from '../content/marketing/routes'

/**
 * `/robots.txt`, generated rather than kept as a static file.
 *
 * Two rules and both are deliberate. `/kitchen-sink` is development-only and
 * already 404s in production, but a crawler that followed a stale link would
 * still spend budget finding that out. `/demo/thanks` is excluded for a
 * different reason: it is the page a converted visitor lands on, and a crawler
 * that reaches it gets counted by anyone measuring conversions from pageviews.
 * That is how a conversion number becomes fiction, so the exclusion here
 * matches `sitemap: false` on the same route in the manifest.
 *
 * Nothing else is disallowed. The stub pages carry their own `noindex`, which
 * is the right tool: a disallowed page cannot be crawled and therefore cannot
 * be seen to be `noindex`, so blocking it here would leave it eligible to be
 * indexed from an inbound link alone.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/kitchen-sink', '/demo/thanks'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
