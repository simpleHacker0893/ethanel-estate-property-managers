import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_SECONDS,
  attributionSchema,
  type Attribution,
} from '@ethanel/contracts'

/**
 * Attribution capture, kept deliberately small and free of Next imports so it
 * can be unit tested without a request.
 *
 * The rule the shape follows: **first touch wins.** A visitor who arrives on a
 * Google ad, reads for a week and comes back directly should still be
 * attributed to that ad, so an existing cookie is never overwritten by a later
 * landing — only filled in where it is empty. Last-touch would quietly
 * re-attribute every considered purchase to whoever ran the final retargeting
 * ad, which on a 90-day window is most of them.
 */

/** The parameters worth carrying. Anything else is noise in a lead record. */
const CLICK_IDS = ['gclid', 'fbclid', 'ttclid', 'msclkid'] as const
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export const ATTRIBUTION_KEYS = [...CLICK_IDS, ...UTM_KEYS] as const

export function hasAttributionParams(params: URLSearchParams): boolean {
  return ATTRIBUTION_KEYS.some((key) => (params.get(key) ?? '').trim().length > 0)
}

/**
 * The referrer worth recording, or `undefined`.
 *
 * Two things are dropped. **Our own pages**, because that is the previous page
 * and not a source — compared against the `Host` header the browser actually
 * sent rather than against `url.origin`, since behind a proxy (or simply on
 * `127.0.0.1` versus `localhost`) those are different strings, and comparing
 * the wrong pair stamps a self-referrer into every organic lead. And **anything
 * that will not parse as a URL**, because a referrer is only useful if you can
 * tell where it came from, and storing an unparseable one puts junk in the
 * record for a field nobody can then query.
 */
function externalReferrer(referrer: string, url: URL, selfHost: string | null): string | undefined {
  let host: string
  try {
    host = new URL(referrer).host
  } catch {
    return undefined
  }
  if (host === '' || host === selfHost || host === url.host) return undefined
  return referrer
}

/**
 * Builds the attribution block from a landing URL. Returns `undefined` when
 * there is nothing worth recording, so a caller can skip setting a cookie on a
 * plain organic visit rather than storing an empty object on every request.
 */
export function readAttributionFromUrl(
  url: URL,
  referrer: string | null,
  now: Date,
  selfHost: string | null = null,
): Attribution | undefined {
  const params = url.searchParams
  if (!hasAttributionParams(params) && !referrer) return undefined

  const candidate: Record<string, string> = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim()
    if (value) candidate[key] = value
  }

  const external = referrer ? externalReferrer(referrer, url, selfHost) : undefined
  if (external) candidate.referrer = external

  if (Object.keys(candidate).length === 0) return undefined

  candidate.firstSeenAt = now.toISOString()

  const parsed = attributionSchema.safeParse(candidate)
  // A malformed or over-long parameter is dropped rather than failing the page:
  // a visitor's landing must never break because an ad platform appended
  // something unexpected.
  return parsed.success ? parsed.data : undefined
}

/**
 * First touch wins: existing keys are kept, and only gaps are filled. The
 * original `firstSeenAt` is preserved, because it is what the 90-day window is
 * measured from.
 */
export function mergeAttribution(existing: Attribution, incoming: Attribution): Attribution {
  return { ...incoming, ...existing }
}

export function parseAttributionCookie(raw: string | undefined): Attribution {
  if (!raw) return {}
  try {
    const parsed = attributionSchema.safeParse(JSON.parse(decodeURIComponent(raw)))
    return parsed.success ? parsed.data : {}
  } catch {
    // A tampered or truncated cookie is not worth a 500. Treat it as absent.
    return {}
  }
}

export function serialiseAttributionCookie(attribution: Attribution): string {
  return encodeURIComponent(JSON.stringify(attribution))
}

/** Has the 90-day window (D-64-style config, fixed by the contract) expired? */
export function isWithinWindow(attribution: Attribution, now: Date): boolean {
  if (!attribution.firstSeenAt) return true
  const first = Date.parse(attribution.firstSeenAt)
  if (Number.isNaN(first)) return true
  return (now.getTime() - first) / 1000 <= ATTRIBUTION_MAX_AGE_SECONDS
}

export { ATTRIBUTION_COOKIE, ATTRIBUTION_MAX_AGE_SECONDS }
export type { Attribution }
