import type { AssetRow } from './types'

/**
 * DEBT-10, made into a list someone can shoot from.
 *
 * No photography exists and no launch-film brief exists. Every image slot on
 * the site therefore renders a watermarked placeholder, and every placeholder
 * has a row here naming the shot it owes, at the aspect ratio the layout
 * reserves — so the shoot has a brief and the layout does not move when the
 * real frames land.
 *
 * The placeholders are generated SVG rather than files on disk. That is a
 * deliberate choice against the 900 KB page-weight budget: a stand-in JPEG
 * costs real bytes to say "this is not the real image", and a slot that is
 * cheap to leave empty is a slot nobody rushes to fill with a stock photo.
 */
export const assetManifest: readonly AssetRow[] = [
  {
    id: 'hero-portrait',
    usedOn: '/ — S2 hero',
    owes: 'An agency owner at a desk in Nairobi with a handset in hand, mid-morning window light, laptop showing a rent roll out of focus behind. Landscape, room for the headline to overlap on desktop.',
    width: 1200,
    height: 900,
    alt: 'Placeholder for the hero photograph',
  },
  {
    id: 'reconciliation-queue',
    usedOn: '/ — S9 reconciliation deep dive',
    owes: 'Screen capture of the manual match queue with two unmatched payments and one being allocated. Real UI, taken once Sprint 007 ships; not a mockup.',
    width: 1440,
    height: 960,
    alt: 'Placeholder for a screenshot of the manual match queue',
  },
  {
    id: 'landlord-statement',
    usedOn: '/features/landlord-statements',
    owes: 'Screen capture of a landlord statement with its last-updated stamp visible (D-45). Figures must be from seeded demo data and labelled as such.',
    width: 1440,
    height: 960,
    alt: 'Placeholder for a screenshot of a landlord statement',
  },
  {
    id: 'caretaker-handset',
    usedOn: '/solutions/residents-and-caretakers',
    owes: 'A caretaker photographing a repair on a basic handset, outdoors at a walk-up block. Portrait, shot to survive heavy compression.',
    width: 900,
    height: 1200,
    alt: 'Placeholder for the caretaker photograph',
  },
  {
    id: 'plot-site',
    usedOn: '/features/land-plots-and-instalments',
    owes: 'A surveyed plot with beacons visible, Kiambu or Machakos. Only shoot this if Sprint 012 is confirmed — the page says the feature may not ship.',
    width: 1200,
    height: 800,
    alt: 'Placeholder for the plot photograph',
  },
  {
    id: 'find-map',
    usedOn: '/find — search shell',
    owes: 'A flat static map tile of the search area. Static image, never a map library on this route (D-26, and the JS budget).',
    width: 1200,
    height: 675,
    alt: 'Placeholder for the static map image',
  },
  {
    id: 'demo-walkthrough',
    usedOn: '/demo/thanks',
    owes: 'The two-minute walkthrough film. No brief exists yet; the slot is present and empty rather than filled with a stock loop.',
    width: 1280,
    height: 720,
    alt: 'Placeholder for the product walkthrough film',
  },
  {
    id: 'og-default',
    usedOn: 'Open Graph fallback for every route',
    owes: 'Nothing photographic — the OG image is generated from one next/og template in Phase 5. This row exists so the slot is accounted for.',
    width: 1200,
    height: 630,
    alt: 'Generated Open Graph image',
  },
]

export function assetById(id: string): AssetRow | undefined {
  return assetManifest.find((row) => row.id === id)
}
