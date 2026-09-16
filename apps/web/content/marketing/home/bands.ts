import type { BandContent } from '../types'

/**
 * S11 and S12 — the two bands that describe work nobody can use yet.
 *
 * They exist because the alternative is worse. A landing page that shows only
 * the ledger reads as if the marketplace and the land side do not exist; a
 * landing page that shows them without a date reads as if they do. Both bands
 * therefore carry per-point availability labels *and* a band-level
 * `availabilityNote`, because a badge in a card is easy to scroll past and the
 * note is not.
 *
 * The difference between the two notes is the whole point of this file.
 *
 * The marketplace is *scheduled*: Sprint 011 is in the plan and the note says
 * it is not available today.
 *
 * Land is *not*. Sprint 012 is the designated slip absorber. If Sprints 004 to
 * 011 run long, Sprint 012 is what gets cut, and a land-selling company being
 * shown this page must be able to read that off the page rather than infer it.
 * So the note says "may not ship at all" in those words. It deliberately does
 * not say "coming soon", which is the phrase that converts an uncertainty into
 * a promise without anyone having decided to make one.
 *
 * D-26: no map library on `/`. A live map here would be decorative and would
 * spend the entire first-party JS budget on decoration, so the marketplace band
 * is described in words and cards.
 */

export const marketplaceBand: BandContent = {
  heading: {
    eyebrow: 'Sprint 011',
    title: 'Listings, storefronts and viewings',
    lede: 'The units you manage, published to the public site from the same record the lease is written against — so a listing is never a second copy of the truth that someone has to remember to update.',
  },
  points: [
    {
      label: 'Listings for the units you manage',
      service: 'listing',
      availability: 'sprint',
      sprint: 'Sprint 011',
      description: 'One listing per unit, drawn from the record the lease is written against.',
    },
    {
      label: 'An agency storefront',
      service: 'listing',
      availability: 'sprint',
      sprint: 'Sprint 011',
      description: 'Your own page on the public site, showing the units you are currently letting.',
    },
    {
      label: 'Viewing requests and marketplace leads',
      service: 'listing',
      availability: 'sprint',
      sprint: 'Sprint 011',
      description: 'A prospect asks for a viewing; the lead is the record that request leaves.',
    },
    {
      label: 'Search on the public site',
      service: 'listing',
      availability: 'sprint',
      sprint: 'Sprint 011',
      description: 'Filters held in the URL, so a search you ran is a link you can send on.',
    },
  ],
  cta: {
    label: 'Read how the marketplace is planned',
    href: '/features/marketplace-and-viewings',
  },
  availabilityNote:
    'None of this is available today. The marketplace is scheduled for Sprint 011 and no sprint has shipped yet, so what exists of it right now is this description of it.',
}

export const landBand: BandContent = {
  heading: {
    eyebrow: 'Sprint 012',
    title: 'Plots, subdivisions and instalment sales',
    lede: 'Selling land is a different transaction from letting a unit: a parcel gets subdivided, a buyer pays down a balance over months, and the receipt has to survive being asked about years later.',
  },
  points: [
    {
      label: 'Plot inventory and subdivisions',
      service: 'listing',
      availability: 'may-not-ship',
      sprint: 'Sprint 012',
      description: 'A parent parcel, the plots it is divided into, and the state each plot is in.',
    },
    {
      label: 'Instalment sale schedules',
      service: 'money',
      availability: 'may-not-ship',
      sprint: 'Sprint 012',
      description:
        'A plot paid down over time. Plot instalments are excluded from the auto-match denominator.',
    },
    {
      label: 'Plot listings and viewings',
      service: 'listing',
      availability: 'may-not-ship',
      sprint: 'Sprint 012',
      description: 'A plot listed on the public site, and a viewing booked against it.',
    },
    {
      label: 'Buyer receipts and statements',
      service: 'docs',
      availability: 'may-not-ship',
      sprint: 'Sprint 012',
      description: 'Rendered from the ledger, held in KES, with every posting immutable.',
    },
  ],
  cta: {
    label: 'Read where land and plots stand',
    href: '/features/land-plots-and-instalments',
  },
  availabilityNote:
    'Read this plainly: Sprint 012 is the release our plan absorbs slippage into. If the sprints before it run late, this is the work that gets cut, and these features may not ship at all. We are not asking anyone to buy on them. If land is the reason you are here, say so when you book a demo and we will tell you where Sprint 012 actually stands before you decide anything.',
}
