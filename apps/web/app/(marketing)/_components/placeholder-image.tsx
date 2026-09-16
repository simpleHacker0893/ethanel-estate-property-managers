import { cn } from '@ethanel/ui'

import { assetById } from '../../../content/marketing/asset-manifest'

/**
 * The DEBT-10 placeholder, rendered.
 *
 * It reserves the exact aspect ratio the real frame will occupy, so nothing
 * reflows when photography lands — which is also what keeps CLS under the 0.05
 * budget without a fixed-height hack.
 *
 * It renders as inline SVG with a diagonal hatch and a visible caption naming
 * the shot it owes. Three reasons for that shape rather than a stand-in JPEG:
 * it costs no network bytes against the 900 KB budget, it cannot be mistaken
 * for finished work in a screenshot review, and the manifest row is on the
 * screen where the person who has to commission the shoot will actually see it.
 */
export function PlaceholderImage({ id, className }: { id: string; className?: string }) {
  const asset = assetById(id)
  if (!asset) {
    throw new Error(`No asset-manifest row for "${id}". Add one before reserving the slot.`)
  }

  const hatchId = `hatch-${asset.id}`

  return (
    <figure className={cn('m-0', className)}>
      <div
        className="border-line-control relative overflow-hidden rounded-lg border border-dashed"
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
            <pattern
              id={hatchId}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="16" height="16" fill="var(--surface-sunken)" />
              <line x1="0" y1="0" x2="0" y2="16" stroke="var(--line)" strokeWidth="6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${hatchId})`} />
        </svg>
        <span className="text-caption bg-surface/90 text-ink-muted absolute top-2 left-2 rounded-full px-2.5 py-0.5 font-semibold">
          {asset.id}
        </span>
      </div>
      <figcaption className="text-caption text-ink-quiet mt-2">{asset.owes}</figcaption>
    </figure>
  )
}
