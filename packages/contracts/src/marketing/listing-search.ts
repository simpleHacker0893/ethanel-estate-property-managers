import { z } from 'zod'

/**
 * The `/find` search parameter names, defined here and now so Sprint 011's
 * `listing-svc` inherits this vocabulary instead of coining a second one.
 *
 * `/find` ships as a shell against demo data — the marketplace is Sprint 011 and
 * `listing-svc` does not exist. What it does establish is the URL contract, and
 * a URL contract is expensive to change once anyone has linked to it.
 *
 * Every filter whose shape is not settled carries an `ASSUMPTION:` marker. Those
 * are the ones Sprint 011 should expect to argue with.
 */

/** A listing is a unit to let, a house for sale, or a plot for sale. */
export const LISTING_KINDS = ['unit', 'house', 'plot'] as const
export type ListingKind = (typeof LISTING_KINDS)[number]

export const LISTING_INTENTS = ['rent', 'buy'] as const
export type ListingIntent = (typeof LISTING_INTENTS)[number]

/**
 * ASSUMPTION: sort options are guessed from what a prospect would want, not from
 * a settled product decision. `newest` is the only one that is certainly
 * implementable on day one; the price sorts depend on how a plot instalment
 * price is modelled, which is Q19-adjacent.
 */
export const LISTING_SORTS = ['newest', 'price_asc', 'price_desc'] as const
export type ListingSort = (typeof LISTING_SORTS)[number]

export const listingSearchParamsSchema = z.object({
  /** Free text. Postgres full-text plus pg_trgm (D-06) — no search engine. */
  q: z.string().trim().max(120).optional(),
  kind: z.enum(LISTING_KINDS).optional(),
  intent: z.enum(LISTING_INTENTS).optional(),
  /**
   * ASSUMPTION: a place name rather than a geocoded point. A bounding box or a
   * radius needs a map, and D-26 keeps map libraries off this path, so the
   * pilot filter is textual.
   */
  area: z.string().trim().max(80).optional(),
  /** Bedrooms. Not applicable to a plot, which is why it is optional. */
  beds: z.coerce.number().int().min(0).max(20).optional(),
  /**
   * Money is bigint minor units, KES, end to end (D-08) — including here. A URL
   * carries it as a decimal string of minor units, never a float.
   */
  minPrice: z.coerce.bigint().nonnegative().optional(),
  maxPrice: z.coerce.bigint().nonnegative().optional(),
  sort: z.enum(LISTING_SORTS).default('newest'),
  page: z.coerce.number().int().min(1).max(500).default(1),
})

export type ListingSearchParams = z.infer<typeof listingSearchParamsSchema>

/**
 * The parameter names as literal strings, so `nuqs` parsers on `/find` and the
 * eventual `listing-svc` query builder cannot drift apart by a typo.
 */
export const LISTING_SEARCH_KEYS = {
  q: 'q',
  kind: 'kind',
  intent: 'intent',
  area: 'area',
  beds: 'beds',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
  sort: 'sort',
  page: 'page',
} as const satisfies Record<keyof ListingSearchParams, string>
