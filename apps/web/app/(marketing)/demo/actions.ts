'use server'

import { cookies, headers } from 'next/headers'

import {
  ATTRIBUTION_COOKIE,
  isWithinWindow,
  parseAttributionCookie,
} from '../../../lib/attribution'
import { submitDemoRequest, type SubmitResult } from '../../../lib/demo-submission'
import { leadSink } from '../../../lib/lead-sink'
import { clientIpFrom, demoRateLimiter } from '../../../lib/rate-limit'
import { uuidv7 } from '../../../lib/uuid'

/**
 * The only write path in the `(marketing)` route group.
 *
 * Everything this file does is read the request — the attribution cookie and
 * the client address — and hand it to `submitDemoRequest`, which holds the
 * decisions and is unit tested against a fake sink. Keeping the two apart is
 * what makes "a filled honeypot never reaches the sink" a test rather than a
 * claim.
 */
export async function requestDemo(
  _previous: SubmitResult | null,
  formData: FormData,
): Promise<SubmitResult> {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()])

  const stored = parseAttributionCookie(cookieStore.get(ATTRIBUTION_COOKIE)?.value)
  // Outside the 90-day window the click is no longer the reason this person is
  // here, and sending a stale identifier to an ad platform is worse than
  // sending none: it credits a click that did not cause the conversion.
  const attribution = isWithinWindow(stored, new Date()) ? stored : {}

  const raw = Object.fromEntries(formData.entries())

  return submitDemoRequest(
    raw,
    { ip: clientIpFrom(headerList), attribution },
    {
      sink: leadSink,
      rateLimiter: demoRateLimiter,
      now: () => new Date(),
      newId: () => uuidv7(),
    },
  )
}
