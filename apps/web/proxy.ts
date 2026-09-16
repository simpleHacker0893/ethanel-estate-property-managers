import { NextResponse, type NextRequest } from 'next/server'

import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_SECONDS,
  mergeAttribution,
  parseAttributionCookie,
  readAttributionFromUrl,
} from './lib/attribution'

/**
 * Attribution capture on **first landing**, which is the only place it can
 * happen — by the time a visitor reaches `/demo` the click identifiers are long
 * gone from the URL.
 *
 * Next 16 calls this file `proxy.ts` (it was `middleware.ts`). It writes a
 * first-party, `SameSite=Lax`, 90-day cookie and does nothing else: no
 * authentication, no redirects, no rewrites. The `(marketing)` group is public
 * and is not gated here.
 *
 * First touch wins — an existing cookie is filled in, never overwritten. See
 * `lib/attribution.ts` for why.
 *
 * The matcher excludes every static path so this does not run on asset
 * requests, where it would cost latency for nothing.
 */
export function proxy(request: NextRequest): NextResponse {
  const response = NextResponse.next()

  const incoming = readAttributionFromUrl(
    request.nextUrl,
    request.headers.get('referer'),
    new Date(),
    request.headers.get('host'),
  )
  if (!incoming) return response

  const existing = parseAttributionCookie(request.cookies.get(ATTRIBUTION_COOKIE)?.value)
  const merged = mergeAttribution(existing, incoming)

  response.cookies.set({
    name: ATTRIBUTION_COOKIE,
    value: encodeURIComponent(JSON.stringify(merged)),
    maxAge: ATTRIBUTION_MAX_AGE_SECONDS,
    sameSite: 'lax',
    // First-party and readable by the Server Action only. There is no
    // browser-side tracking here at all, which is the point: browser-only
    // attribution under-reports badly on iOS, so the identifier travels with
    // the request and the conversion fires server-side.
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)'],
}
