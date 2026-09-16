import { cn } from '@ethanel/ui'

import { assetById } from '../../../content/marketing/asset-manifest'

/**
 * The DEBT-10 placeholder, rendered.
 *
 * It reserves the exact aspect ratio the real frame will occupy, so nothing
 * reflows when photography lands — which is also what keeps CLS under the 0.05
 * budget without a fixed-height hack.
 *
 * It renders as inline SVG with a visible caption naming the shot it owes.
 * Three reasons for that shape rather than a stand-in JPEG: it costs no network
 * bytes against the 900 KB budget, it cannot be mistaken for finished work in a
 * screenshot review, and the manifest row is on the screen where the person who
 * has to commission the shoot will actually see it.
 *
 * The plate it draws is a ledger motif — a tinted field, a ruled grid and rows
 * of varying length — rather than the flat diagonal hatch it used to be. The
 * hatch was honest and unreadable: a page with three of them looked unfinished
 * in a way that made the whole site look unfinished. This still cannot pass for
 * a photograph, still carries the slot id as a watermark and still prints the
 * brief underneath, so nothing about the honesty changed; only the dead space
 * did.
 *
 * Row lengths come from a hash of the slot id, not from `Math.random`. Two
 * reasons, and the second is the real one: every slot gets a different plate,
 * and the plate is identical on the server and in the browser, so it cannot
 * produce a hydration mismatch.
 */

/** FNV-1a, 32-bit. Small, stable, and enough to vary a row length. */
function hash(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

const ROWS = 7

export function PlaceholderImage({ id, className }: { id: string; className?: string }) {
  const asset = assetById(id)
  if (!asset) {
    throw new Error(`No asset-manifest row for "${id}". Add one before reserving the slot.`)
  }

  const plateId = `plate-${asset.id}`
  const gridId = `grid-${asset.id}`
  const seed = hash(asset.id)

  // The rows sit in the middle two-thirds of the plate, inset from both edges.
  const inset = asset.width * 0.12
  const usable = asset.width - inset * 2
  const top = asset.height * 0.3
  const step = (asset.height * 0.42) / ROWS
  const barHeight = Math.max(6, step * 0.42)

  return (
    <figure className={cn('m-0', className)}>
      <div
        className="border-line relative overflow-hidden rounded-lg border"
        style={{ aspectRatio: `${String(asset.width)} / ${String(asset.height)}` }}
      >
        <svg
          role="img"
          aria-label={asset.alt}
          viewBox={`0 0 ${String(asset.width)} ${String(asset.height)}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id={plateId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--field-plate-a)" />
              <stop offset="100%" stopColor="var(--field-plate-b)" />
            </linearGradient>
            <pattern id={gridId} width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0 H0 V64" fill="none" stroke="var(--line)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill={`url(#${plateId})`} />
          <rect width="100%" height="100%" fill={`url(#${gridId})`} opacity="0.5" />

          {Array.from({ length: ROWS }, (_, row) => {
            // 38%–100% of the usable width, stepped so rows read as a column of
            // figures rather than as noise.
            const fraction = 0.38 + ((seed >> (row * 3)) % 9) / 13
            const y = top + row * step

            return (
              <g key={row}>
                <rect
                  x={inset}
                  y={y}
                  width={usable * fraction}
                  height={barHeight}
                  rx={barHeight / 2}
                  fill="var(--ink)"
                  opacity={row === 0 ? 0.28 : 0.14}
                />
                {/* The right-hand column: the amount each row would carry. */}
                <rect
                  x={inset + usable * 0.86}
                  y={y}
                  width={usable * 0.14}
                  height={barHeight}
                  rx={barHeight / 2}
                  fill="var(--ink)"
                  opacity={0.1}
                />
              </g>
            )
          })}
        </svg>

        <span className="text-caption bg-surface/90 text-ink-muted absolute top-2 left-2 rounded-full px-2.5 py-0.5 font-semibold">
          {asset.id}
        </span>
      </div>
      <figcaption className="text-caption text-ink-quiet mt-2">{asset.owes}</figcaption>
    </figure>
  )
}
