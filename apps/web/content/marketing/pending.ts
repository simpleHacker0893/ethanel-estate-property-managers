import type { Cta } from './types'

/**
 * The copy for a route that the manifest lists but no page implements yet.
 *
 * This exists because the manifest makes a promise the site was not keeping.
 * `RouteStatus` is documented as "a titled placeholder that exists so a nav
 * item does not 404", but until now nothing rendered that placeholder: every
 * nav and footer link outside `/`, `/demo` and `/features/*` returned a 404.
 * The header and footer are generated from the manifest, so the dead links
 * were not a copy mistake anybody could spot in review — they were the whole
 * manifest minus the pages that happened to be built.
 *
 * The page says the route is unbuilt rather than dressing the gap up as
 * "coming soon" marketing. A reader who clicked *Pricing* wanted a number and
 * is not getting one; telling them that plainly and handing them the one route
 * that does answer questions is worth more than a countdown.
 *
 * Every string is written to work under any title in the manifest, because
 * this one module serves eighteen different routes.
 */
export interface PendingContent {
  /** Sits above the route's own title, which supplies the `h1`. */
  eyebrow: string
  lede: string
  /** Where a reader who hit a wall should go instead. */
  links: Cta[]
}

export const pending: PendingContent = {
  eyebrow: 'Not built yet',

  lede: 'This page is named in the site navigation but has not been written yet. Rather than hide the link until it is ready, the navigation shows everything the site will cover and says plainly which parts are still missing.',

  links: [
    { label: 'Request a demo', href: '/demo' },
    { label: 'See how reconciliation runs', href: '/features/reconciliation' },
    { label: 'Back to the home page', href: '/' },
  ],
}
