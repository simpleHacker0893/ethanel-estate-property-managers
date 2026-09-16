import { FEATURE_SLUGS, type FeatureSlug } from '../routes'
import type { FeaturePageContent } from '../types'

import { arrearsAndCreditControl } from './arrears-and-credit-control'
import { documentsAndSigning } from './documents-and-signing'
import { invoicingAndRentRuns } from './invoicing-and-rent-runs'
import { landPlotsAndInstalments } from './land-plots-and-instalments'
import { landlordStatements } from './landlord-statements'
import { marketplaceAndViewings } from './marketplace-and-viewings'
import { reconciliation } from './reconciliation'
import { rentCollection } from './rent-collection'
import { repairsAndWorkOrders } from './repairs-and-work-orders'
import { whatsappAndNotifications } from './whatsapp-and-notifications'

/**
 * The feature-page registry: slug in, content out.
 *
 * `app/(marketing)/features/[slug]` is one route rendering one template, so
 * this map is the only place a feature page comes into existence. Adding a page
 * is adding a module and a row here — there is no component to write, which is
 * ticket 11's "no page introduces a new component" made structural rather than
 * remembered.
 *
 * The type is a **total** `Record<FeatureSlug, …>` and not a `Partial`, which
 * is the point of this file. `FEATURE_SLUGS` in `routes.ts` is what the mega
 * menu, the footer and the sitemap render from; this map is what the route
 * renders from; and the total type is what makes those two the same set. A slug
 * added to the manifest without a content module is a compile error here, not a
 * 404 that a link crawl finds three phases later.
 */
export const featurePages: Record<FeatureSlug, FeaturePageContent> = {
  'rent-collection': rentCollection,
  reconciliation: reconciliation,
  'invoicing-and-rent-runs': invoicingAndRentRuns,
  'landlord-statements': landlordStatements,
  'arrears-and-credit-control': arrearsAndCreditControl,
  'repairs-and-work-orders': repairsAndWorkOrders,
  'whatsapp-and-notifications': whatsappAndNotifications,
  'documents-and-signing': documentsAndSigning,
  'marketplace-and-viewings': marketplaceAndViewings,
  'land-plots-and-instalments': landPlotsAndInstalments,
}

/**
 * The slugs `generateStaticParams` builds — read from the manifest rather than
 * from `Object.keys`, so the pages are prerendered in the order the navigation
 * lists them and the manifest stays the single source it claims to be.
 */
export function builtFeatureSlugs(): FeatureSlug[] {
  return [...FEATURE_SLUGS]
}

export function getFeaturePage(slug: string): FeaturePageContent | undefined {
  return featurePages[slug as FeatureSlug]
}
