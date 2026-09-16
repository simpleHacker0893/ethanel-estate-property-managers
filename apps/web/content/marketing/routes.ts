/**
 * The single source for marketing navigation, the sitemap and robots. Every
 * public route is declared here or it does not exist — the header mega menu,
 * the mobile drawer, the footer, the link crawl and `app/sitemap.ts` all read
 * this file, which is what makes "no nav item 404s" enforceable by walking the
 * manifest rather than by remembering.
 *
 * `dev-only` routes render outside production and are excluded from navigation
 * and the sitemap.
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

export type NavGroup = 'product' | 'solutions' | 'company'
export type FooterGroup = NavGroup | 'legal'

/**
 * What a route actually is today.
 *   v1         — a real page with real content
 *   v1.1-stub  — a titled placeholder that exists so a nav item does not 404,
 *                and which says so on the page. `/legal/*` (DEBT-09),
 *                `/resources` and `/status`.
 */
export type RouteStatus = 'v1' | 'v1.1-stub'

export interface RouteEntry {
  path: string
  title: string
  /** Short label for nav, where the full title is too long for a menu row. */
  navLabel?: string
  status: RouteStatus
  /** Appears in the header mega menu under its group, in a named column. */
  nav?: { group: NavGroup; column?: string; order: number }
  /** Appears in the footer under its column. */
  footer?: { group: FooterGroup; order: number }
  sitemap: boolean
  devOnly?: boolean
}

/**
 * The ten feature pages, in the order they appear in the mega menu. Each one
 * is named for what it does for an agency, not for the service that implements
 * it — the service trace lives in the capability objects, where the type system
 * can enforce it.
 */
export const FEATURE_SLUGS = [
  'rent-collection',
  'reconciliation',
  'invoicing-and-rent-runs',
  'landlord-statements',
  'arrears-and-credit-control',
  'repairs-and-work-orders',
  'whatsapp-and-notifications',
  'documents-and-signing',
  'marketplace-and-viewings',
  'land-plots-and-instalments',
] as const

export type FeatureSlug = (typeof FEATURE_SLUGS)[number]

export const SOLUTION_SLUGS = [
  'letting-agencies',
  'landlords',
  'land-and-plot-sellers',
  'residents-and-caretakers',
] as const

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number]

const featureRoutes: RouteEntry[] = [
  { slug: 'rent-collection', title: 'Rent collection' },
  { slug: 'reconciliation', title: 'Reconciliation' },
  { slug: 'invoicing-and-rent-runs', title: 'Invoicing and rent runs' },
  { slug: 'landlord-statements', title: 'Landlord statements and remittance' },
  { slug: 'arrears-and-credit-control', title: 'Arrears and credit control' },
  { slug: 'repairs-and-work-orders', title: 'Repairs and work orders' },
  { slug: 'whatsapp-and-notifications', title: 'WhatsApp and notifications' },
  { slug: 'documents-and-signing', title: 'Documents and signing' },
  { slug: 'marketplace-and-viewings', title: 'Marketplace and viewings' },
  { slug: 'land-plots-and-instalments', title: 'Land, plots and instalments' },
].map((entry, index) => ({
  path: `/features/${entry.slug}`,
  title: entry.title,
  status: 'v1' as const,
  nav: { group: 'product' as const, column: 'Capabilities', order: index + 1 },
  // Only the first four capabilities earn a footer row; the footer is a
  // wayfinding aid, not a second sitemap.
  ...(index < 4 ? { footer: { group: 'product' as const, order: index + 2 } } : {}),
  sitemap: true,
}))

const solutionRoutes: RouteEntry[] = [
  { slug: 'letting-agencies', title: 'Letting and management agencies' },
  { slug: 'landlords', title: 'Landlords' },
  { slug: 'land-and-plot-sellers', title: 'Land and plot sellers' },
  { slug: 'residents-and-caretakers', title: 'Residents and caretakers' },
].map((entry, index) => ({
  path: `/solutions/${entry.slug}`,
  title: entry.title,
  status: 'v1' as const,
  nav: { group: 'solutions' as const, order: index + 1 },
  footer: { group: 'solutions' as const, order: index + 1 },
  sitemap: true,
}))

const legalRoutes: RouteEntry[] = [
  { slug: 'privacy', title: 'Privacy notice' },
  { slug: 'terms', title: 'Terms of service' },
  { slug: 'data-processing', title: 'Data processing addendum' },
  { slug: 'cookies', title: 'Cookie notice' },
].map((entry, index) => ({
  path: `/legal/${entry.slug}`,
  title: entry.title,
  // DEBT-09: advocate review is owed and Q6 is open. These are titled stubs
  // with a visible "in review" banner, which is the honest shape — an invented
  // privacy policy is worse than no privacy policy.
  status: 'v1.1-stub' as const,
  footer: { group: 'legal' as const, order: index + 1 },
  sitemap: true,
}))

export const routes: readonly RouteEntry[] = [
  { path: '/', title: 'Home', status: 'v1', sitemap: true },

  // ------------------------------------------------------------- product ---
  {
    path: '/platform',
    title: 'The platform',
    status: 'v1',
    nav: { group: 'product', column: 'Overview', order: 1 },
    footer: { group: 'product', order: 1 },
    sitemap: true,
  },
  ...featureRoutes,
  {
    path: '/pricing',
    title: 'Pricing',
    status: 'v1',
    nav: { group: 'product', column: 'Overview', order: 2 },
    footer: { group: 'product', order: 6 },
    sitemap: true,
  },
  {
    path: '/security',
    title: 'Security and reliability',
    navLabel: 'Security',
    status: 'v1',
    nav: { group: 'product', column: 'Overview', order: 3 },
    footer: { group: 'product', order: 7 },
    sitemap: true,
  },
  {
    path: '/find',
    title: 'Find a home or a plot',
    navLabel: 'Find a home',
    status: 'v1',
    nav: { group: 'product', column: 'Overview', order: 4 },
    footer: { group: 'product', order: 8 },
    sitemap: true,
  },

  // ----------------------------------------------------------- solutions ---
  ...solutionRoutes,

  // ------------------------------------------------------------- company ---
  {
    path: '/about',
    title: 'About Ethanel',
    navLabel: 'About',
    status: 'v1',
    nav: { group: 'company', order: 1 },
    footer: { group: 'company', order: 1 },
    sitemap: true,
  },
  {
    path: '/contact',
    title: 'Contact',
    status: 'v1',
    nav: { group: 'company', order: 2 },
    footer: { group: 'company', order: 2 },
    sitemap: true,
  },
  {
    path: '/resources',
    title: 'Resources',
    status: 'v1.1-stub',
    nav: { group: 'company', order: 3 },
    footer: { group: 'company', order: 3 },
    sitemap: true,
  },
  {
    path: '/status',
    title: 'Service status',
    navLabel: 'Status',
    status: 'v1.1-stub',
    nav: { group: 'company', order: 4 },
    footer: { group: 'company', order: 4 },
    sitemap: true,
  },

  // ---------------------------------------------------------- conversion ---
  { path: '/demo', title: 'Request a demo', status: 'v1', sitemap: true },
  // The confirmation page is reachable only by submitting the form. It stays
  // out of the sitemap so a crawler does not index a thank-you as a landing
  // page, which is the classic way a conversion count becomes fiction.
  { path: '/demo/thanks', title: 'Thanks — what happens next', status: 'v1', sitemap: false },

  // --------------------------------------------------------------- legal ---
  ...legalRoutes,

  // ----------------------------------------------------------------- dev ---
  {
    path: '/kitchen-sink',
    title: 'Kitchen sink (development only)',
    status: 'v1',
    sitemap: false,
    devOnly: true,
  },
]

export const navGroups: readonly { id: NavGroup; label: string }[] = [
  { id: 'product', label: 'Product' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'company', label: 'Company' },
]

export const footerGroups: readonly { id: FooterGroup; label: string }[] = [
  { id: 'product', label: 'Product' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'company', label: 'Company' },
  { id: 'legal', label: 'Legal' },
]

/** What a nav row shows: the short label where one exists, else the title. */
export function navLabelFor(entry: RouteEntry): string {
  return entry.navLabel ?? entry.title
}

/** The routes in one header mega-menu group, grouped by column, in order. */
export function navColumnsFor(group: NavGroup): { column: string; entries: RouteEntry[] }[] {
  const entries = routes
    .filter((r) => r.nav?.group === group && !r.devOnly)
    .sort((a, b) => (a.nav?.order ?? 0) - (b.nav?.order ?? 0))

  const columns: { column: string; entries: RouteEntry[] }[] = []
  for (const entry of entries) {
    const name = entry.nav?.column ?? ''
    const existing = columns.find((c) => c.column === name)
    if (existing) existing.entries.push(entry)
    else columns.push({ column: name, entries: [entry] })
  }
  return columns
}

/** The routes in one footer column, in order. */
export function footerEntriesFor(group: FooterGroup): RouteEntry[] {
  return routes
    .filter((r) => r.footer?.group === group && !r.devOnly)
    .sort((a, b) => (a.footer?.order ?? 0) - (b.footer?.order ?? 0))
}

export function routeFor(path: string): RouteEntry | undefined {
  return routes.find((r) => r.path === path)
}

/** Routes for the sitemap, in manifest order. */
export const sitemapRoutes: readonly string[] = routes
  .filter((r) => r.sitemap && !r.devOnly)
  .map((r) => r.path)

/** Every route the link crawl must find a 200 on. */
export const crawlableRoutes: readonly string[] = routes
  .filter((r) => !r.devOnly && r.path !== '/demo/thanks')
  .map((r) => r.path)
