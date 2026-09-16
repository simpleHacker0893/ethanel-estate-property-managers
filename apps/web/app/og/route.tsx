import { ImageResponse } from 'next/og'

/**
 * One social card template, rendered per request at `/og?title=…`.
 *
 * A dynamic route rather than a static `opengraph-image` file per page: there
 * are thirty-odd routes and their titles already live in the route manifest, so
 * a file per page would be thirty copies of one layout that drift the moment
 * the layout changes. This is the same argument as the page templates — one
 * renderer, content passed in.
 *
 * Deliberately no web font. `ImageResponse` needs font *binaries*, which means
 * fetching them at render time, and a social card that depends on a network
 * call to a font CDN fails as a blank image exactly when a link is first shared
 * and the crawler is impatient. The system stack renders instantly and always.
 *
 * The title is clamped rather than trusted. It arrives from a query string, and
 * although satori renders text as text — there is no markup to inject into —
 * an unbounded string still overflows the card and costs render time. Anything
 * past the clamp is the part nobody reads in a timeline anyway.
 *
 * No `export const runtime`. `cacheComponents` rejects that route segment
 * config outright, the same way it rejects `dynamicParams` — the build fails
 * with "not compatible with nextConfig.cacheComponents" rather than warning.
 * The default runtime renders this fine.
 */

const WIDTH = 1200
const HEIGHT = 630
const MAX_TITLE = 110

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get('title') ?? 'Ethanel'
  const title = raw.length > MAX_TITLE ? `${raw.slice(0, MAX_TITLE).trimEnd()}…` : raw

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        // The brand ramp, written as literals: this renders outside the
        // document, so no CSS custom property is in scope here.
        background: 'linear-gradient(135deg, #0F2A1D 0%, #143D28 60%, #1B5134 100%)',
        color: '#FAF9F6',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
        Ethanel
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 62,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: -1.5,
          maxWidth: 980,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26 }}>
        <div style={{ display: 'flex', width: 40, height: 4, background: '#D8A24A' }} />
        <div style={{ display: 'flex', color: '#C9D6CD' }}>
          Letting and property management for Kenyan agencies
        </div>
      </div>
    </div>,
    { width: WIDTH, height: HEIGHT },
  )
}
