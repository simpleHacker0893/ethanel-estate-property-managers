import type { StandardPageContent } from '../types'

import { about } from './about'
import { contact } from './contact'
import { find } from './find'
import { cookies } from './legal-cookies'
import { dataProcessing } from './legal-data-processing'
import { privacy } from './legal-privacy'
import { terms } from './legal-terms'
import { platform } from './platform'
import { pricing } from './pricing'
import { resources } from './resources'
import { security } from './security'
import { landAndPlotSellers } from './solutions-land-and-plot-sellers'
import { landlords } from './solutions-landlords'
import { lettingAgencies } from './solutions-letting-agencies'
import { residentsAndCaretakers } from './solutions-residents-and-caretakers'
import { status } from './status'

/**
 * Every standard page, keyed by the manifest path it answers on.
 *
 * Keyed by path rather than by a slug of its own, because the path is what the
 * router hands us and what the route manifest already calls it. A second
 * identifier would need a mapping, and a mapping is a thing that can be wrong.
 *
 * `tests/content/pages.test.ts` asserts that this record covers exactly the set
 * of manifest routes that are not the home page, the demo path or a feature
 * page — so a route added to the manifest without a page here fails a unit
 * test, and a page written for a route that does not exist fails the same one.
 * That matters because the failure this replaces was silent: the nav linked
 * every manifest route whether or not anything served it.
 */
export const pages: Record<string, StandardPageContent> = {
  '/platform': platform,
  '/pricing': pricing,
  '/security': security,
  '/find': find,
  '/solutions/letting-agencies': lettingAgencies,
  '/solutions/landlords': landlords,
  '/solutions/land-and-plot-sellers': landAndPlotSellers,
  '/solutions/residents-and-caretakers': residentsAndCaretakers,
  '/about': about,
  '/contact': contact,
  '/resources': resources,
  '/status': status,
  '/legal/privacy': privacy,
  '/legal/terms': terms,
  '/legal/data-processing': dataProcessing,
  '/legal/cookies': cookies,
}

export function standardPageSlugs(): string[] {
  return Object.keys(pages)
}

export function getStandardPage(path: string): StandardPageContent | undefined {
  return pages[path]
}
