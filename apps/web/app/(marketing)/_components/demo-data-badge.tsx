import { cn } from '@ethanel/ui'

/**
 * Marks anything on screen that is not real: the placeholder imagery booked as
 * DEBT-10, and the sample rows on `/find`, which runs against demo data because
 * `listing-svc` is Sprint 011.
 *
 * It is a visible badge rather than a subtle watermark deliberately. The whole
 * argument the site makes is that its numbers are bounded and its availability
 * is stated; sample data presented without a label would undercut that in the
 * one place a sceptical reader is most likely to zoom in.
 */
export function DemoDataBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'text-caption border-line-control bg-surface/90 text-ink-muted inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold',
        className,
      )}
    >
      <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <circle cx="6" cy="6" r="5" fillOpacity="0.25" />
        <circle cx="6" cy="6" r="2" />
      </svg>
      {label}
    </span>
  )
}
