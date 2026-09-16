import { describe, expect, it } from 'vitest'

import {
  LISTING_SEARCH_KEYS,
  listingSearchParamsSchema,
  type ListingSearchParams,
} from './listing-search.ts'

/**
 * Behavioural throughout, in the style `demo-request.test.ts` established: parse
 * and inspect the result, never the schema's internals.
 *
 * What is worth testing here is narrow but real — these names become a public
 * URL contract that Sprint 011 inherits, and the money bound is the one place a
 * float could get near a price.
 */

const EMPTY_QUERY = {}

describe('listing search params', () => {
  it('defaults to newest, page one, with no filters', () => {
    const parsed = listingSearchParamsSchema.parse(EMPTY_QUERY)
    expect(parsed).toEqual({ sort: 'newest', page: 1 })
  })

  it('reads a full query the way a URL delivers it — all strings', () => {
    const parsed = listingSearchParamsSchema.parse({
      q: 'two bedroom',
      kind: 'unit',
      intent: 'rent',
      area: 'Kilimani',
      beds: '2',
      minPrice: '2500000',
      maxPrice: '7500000',
      sort: 'price_asc',
      page: '3',
    })
    expect(parsed.beds).toBe(2)
    expect(parsed.page).toBe(3)
    expect(parsed.kind).toBe('unit')
  })

  describe('money stays in bigint minor units (D-08)', () => {
    it('parses a price to a bigint, not a number', () => {
      const parsed = listingSearchParamsSchema.parse({ minPrice: '4500000' })
      expect(typeof parsed.minPrice).toBe('bigint')
      expect(parsed.minPrice).toBe(4_500_000n)
    })

    it('rejects a decimal price rather than rounding it', () => {
      // A float reaching a money path is the failure D-08 exists to prevent, so
      // "45000.50" must fail loudly rather than arrive as 45000 or 45001.
      expect(listingSearchParamsSchema.safeParse({ minPrice: '45000.50' }).success).toBe(false)
    })

    it('rejects a negative price', () => {
      expect(listingSearchParamsSchema.safeParse({ maxPrice: '-1' }).success).toBe(false)
    })
  })

  describe('closed sets reject anything outside them', () => {
    const cases: [keyof ListingSearchParams, string][] = [
      ['kind', 'mansion'],
      ['intent', 'lease'],
      ['sort', 'cheapest'],
    ]
    for (const [key, value] of cases) {
      it(`rejects ${key}=${value}`, () => {
        expect(listingSearchParamsSchema.safeParse({ [key]: value }).success).toBe(false)
      })
    }
  })

  it('bounds the page so a crawler cannot walk to page 10,000', () => {
    expect(listingSearchParamsSchema.safeParse({ page: '501' }).success).toBe(false)
    expect(listingSearchParamsSchema.safeParse({ page: '0' }).success).toBe(false)
  })

  it('publishes every parameter name as a literal, so nothing drifts by typo', () => {
    const fromSchema = Object.keys(listingSearchParamsSchema.shape).sort()
    expect(Object.keys(LISTING_SEARCH_KEYS).sort()).toEqual(fromSchema)
    for (const [key, value] of Object.entries(LISTING_SEARCH_KEYS)) {
      expect(value).toBe(key)
    }
  })
})
