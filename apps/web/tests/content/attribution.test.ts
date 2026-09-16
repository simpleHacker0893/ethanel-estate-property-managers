import { describe, expect, it } from 'vitest'

import {
  isWithinWindow,
  mergeAttribution,
  parseAttributionCookie,
  readAttributionFromUrl,
  serialiseAttributionCookie,
} from '../../lib/attribution'

/**
 * Acceptance row 8's first half, at the cheapest seam that can prove it: a click
 * identifier captured on first landing has to survive into the lead record.
 *
 * The browser test proves the whole journey; these prove the rules that journey
 * depends on, including the two that are easy to get backwards — first touch
 * winning over last touch, and an internal referrer not counting as attribution.
 */

const NOW = new Date('2026-09-16T09:00:00.000Z')
const landing = (search: string) => new URL(`https://ethanel.co.ke/${search}`)

describe('reading attribution off a landing URL', () => {
  it('captures a click id and the utm block', () => {
    const result = readAttributionFromUrl(
      landing('?gclid=test123&utm_source=google&utm_campaign=rent'),
      null,
      NOW,
    )
    expect(result).toMatchObject({
      gclid: 'test123',
      utm_source: 'google',
      utm_campaign: 'rent',
      firstSeenAt: NOW.toISOString(),
    })
  })

  it('captures every click id the contract names', () => {
    const result = readAttributionFromUrl(
      landing('?gclid=g&fbclid=f&ttclid=t&msclkid=m'),
      null,
      NOW,
    )
    expect(result).toMatchObject({ gclid: 'g', fbclid: 'f', ttclid: 't', msclkid: 'm' })
  })

  it('records nothing for a plain organic landing', () => {
    expect(readAttributionFromUrl(landing(''), null, NOW)).toBeUndefined()
  })

  it('ignores an empty parameter rather than storing a blank', () => {
    expect(readAttributionFromUrl(landing('?gclid=&utm_source='), null, NOW)).toBeUndefined()
  })

  it('records an external referrer', () => {
    const result = readAttributionFromUrl(landing(''), 'https://news.example/article', NOW)
    expect(result?.referrer).toBe('https://news.example/article')
  })

  it('does not record an internal referrer — that is the previous page, not a source', () => {
    expect(
      readAttributionFromUrl(landing(''), 'https://ethanel.co.ke/pricing', NOW),
    ).toBeUndefined()
  })

  it('still recognises its own pages when the framework origin and the Host header differ', () => {
    // The browser test caught this: behind a proxy, or simply on 127.0.0.1
    // versus localhost, the framework's origin is not the host the browser
    // used, and every internal navigation was being stamped into the record as
    // an external referrer.
    const url = new URL('http://localhost:3000/demo')
    expect(
      readAttributionFromUrl(url, 'http://127.0.0.1:3000/demo', NOW, '127.0.0.1:3000'),
    ).toBeUndefined()
  })

  it('records a genuinely external referrer even when a Host header is given', () => {
    const url = new URL('http://localhost:3000/')
    const result = readAttributionFromUrl(url, 'https://news.example/x', NOW, '127.0.0.1:3000')
    expect(result?.referrer).toBe('https://news.example/x')
  })

  it('ignores an unparseable referrer rather than throwing', () => {
    expect(readAttributionFromUrl(landing(''), 'not a url', NOW, 'ethanel.co.ke')).toBeUndefined()
  })

  it('drops an over-long parameter instead of failing the landing', () => {
    // An ad platform appending something unexpected must never break a page.
    const result = readAttributionFromUrl(landing(`?gclid=${'x'.repeat(600)}`), null, NOW)
    expect(result).toBeUndefined()
  })
})

describe('first touch wins', () => {
  it('keeps the original source when a later visit carries a different one', () => {
    const first = { gclid: 'first-click', utm_source: 'google', firstSeenAt: NOW.toISOString() }
    const second = {
      fbclid: 'later-click',
      utm_source: 'facebook',
      firstSeenAt: '2026-10-01T00:00:00.000Z',
    }
    const merged = mergeAttribution(first, second)

    expect(merged.gclid).toBe('first-click')
    expect(merged.utm_source).toBe('google')
    expect(merged.firstSeenAt).toBe(NOW.toISOString())
  })

  it('still fills in a field the first visit did not carry', () => {
    const merged = mergeAttribution({ gclid: 'g' }, { utm_medium: 'cpc' })
    expect(merged).toEqual({ gclid: 'g', utm_medium: 'cpc' })
  })
})

describe('the cookie round-trips, and survives being mangled', () => {
  it('round-trips an attribution block', () => {
    const attribution = { gclid: 'test123', utm_source: 'google', firstSeenAt: NOW.toISOString() }
    expect(parseAttributionCookie(serialiseAttributionCookie(attribution))).toEqual(attribution)
  })

  it('treats a missing cookie as empty', () => {
    expect(parseAttributionCookie(undefined)).toEqual({})
  })

  it('treats a truncated or tampered cookie as empty rather than throwing', () => {
    // A 500 on the demo page because someone edited a cookie would lose a lead.
    expect(parseAttributionCookie('%7Bnot-json')).toEqual({})
    expect(parseAttributionCookie('null')).toEqual({})
  })
})

describe('the 90-day window', () => {
  it('accepts a click from yesterday', () => {
    expect(isWithinWindow({ firstSeenAt: '2026-09-15T09:00:00.000Z' }, NOW)).toBe(true)
  })

  it('rejects a click from four months ago', () => {
    expect(isWithinWindow({ firstSeenAt: '2026-05-01T09:00:00.000Z' }, NOW)).toBe(false)
  })

  it('accepts a block with no timestamp rather than discarding the click id', () => {
    expect(isWithinWindow({ gclid: 'g' }, NOW)).toBe(true)
  })
})
