import type { HomeContent } from '../types'

import { landBand, marketplaceBand } from './bands'
import { deepDives } from './deep-dives'
import { faq } from './faq'
import { featureGrid } from './feature-grid'
import { finalCta } from './final-cta'
import { hero } from './hero'
import { howItWorks } from './how-it-works'
import { pricingPreview } from './pricing-preview'
import { problem } from './problem'
import { proofBar } from './proof-bar'
import { roleSwitcher } from './role-switcher'
import { security } from './security'

/**
 * The landing page's copy, composed from one module per section.
 *
 * Split this way because the sections were written in parallel and the split is
 * the seam that let them be: a section's copy is one file with one owner, and
 * this file is the only place that knows the page has an order. `HomeContent`
 * is what stops the pieces drifting — a section whose module does not satisfy
 * its slice of the type does not compile.
 */
export const home: HomeContent = {
  locale: 'en-KE',
  meta: {
    title: 'Ethanel — property management for Kenyan letting agencies',
    description:
      'Rent collects and reconciles itself against a double-entry ledger. Residents pay over M-Pesa, payments post as they arrive, and rent settles to your own client account — never to ours.',
  },
  hero,
  proofBar,
  problem,
  howItWorks,
  featureGrid,
  deepDives,
  roleSwitcher,
  marketplaceBand,
  landBand,
  security,
  pricingPreview,
  faq,
  finalCta,
}
