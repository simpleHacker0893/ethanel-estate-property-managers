/**
 * The single source for marketing navigation, and later for the sitemap and
 * robots files (ticket 03). Every public route is declared here or it does not
 * exist. `dev-only` routes render outside production and are excluded from
 * navigation and the sitemap.
 */

export const BASE_URL = 'https://ethanel.co.ke'

export type Locale = 'en-KE' | 'sw-KE'

/**
 * D-25: next-intl from day one, English only at launch, Swahili in R1.1.
 * Full i18n routing is exercised in Sprint 003; until then `en-KE` is active,
 * `sw-KE` is reserved, and shell strings go through this dictionary so that
 * translation is a content task and not a rebuild.
 */
export const locales: Locale[] = ['en-KE', 'sw-KE']
export const activeLocale: Locale = 'en-KE'

export const localeLabels: Record<Locale, string> = {
  'en-KE': 'English (Kenya)',
  'sw-KE': 'Kiswahili',
}

export interface RouteEntry {
  path: string
  title: string
  /** Appears in the header mega menu under its group. */
  nav?: { group: 'product' | 'solutions' | 'company'; order: number }
  /** Appears in the footer under its column. */
  footer?: { group: 'product' | 'solutions' | 'company' | 'legal'; order: number }
  sitemap: boolean
  devOnly?: boolean
}

export const routes: readonly RouteEntry[] = [
  { path: '/', title: 'Home', sitemap: true },
  // Ticket 04-08 build the landing page; 10-11 the feature pages;
  // 12-13 the trust, company, solutions and legal pages. Routes are added
  // here as those slices land.
  { path: '/demo', title: 'Request a demo', sitemap: true },
  { path: '/pricing', title: 'Pricing', sitemap: true },
  {
    path: '/kitchen-sink',
    title: 'Kitchen sink (development only)',
    sitemap: false,
    devOnly: true,
  },
]

export const navGroups: readonly {
  id: 'product' | 'solutions' | 'company'
  label: string
}[] = [
  { id: 'product', label: 'Product' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'company', label: 'Company' },
]

/** Routes for the sitemap, in manifest order. */
export const sitemapRoutes: readonly string[] = routes.filter((r) => r.sitemap).map((r) => r.path)
