import type { MetadataRoute } from 'next'

import { BASE_URL, sitemapRoutes } from '../content/marketing/routes'

/**
 * `/sitemap.xml`, generated from the route manifest.
 *
 * `sitemapRoutes` already encodes the two exclusions — `devOnly` routes and any
 * route whose manifest row sets `sitemap: false` — so this file has no policy
 * of its own. That is the point: the manifest is where a route's existence, its
 * nav placement and its crawlability are decided together, and a sitemap with
 * its own list would be a third place to forget one.
 *
 * No `lastModified`. `cacheComponents` forbids reading the clock during
 * prerender, and a build-frozen timestamp is worse than none: it tells crawlers
 * every page changed at deploy time, which is false for all of them and trains
 * the crawler to ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((path) => ({
    url: `${BASE_URL}${path === '/' ? '' : path}`,
  }))
}
