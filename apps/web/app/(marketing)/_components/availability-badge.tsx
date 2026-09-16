import { cn } from '@ethanel/ui'

import type { Availability } from '../../../content/marketing/types'

/**
 * The honesty label, rendered.
 *
 * `Capability.availability` already makes a bullet fail to typecheck unless it
 * declares what it is (acceptance row 7). This is the other half: the declared
 * value has to reach the screen, because a type that nobody renders protects
 * nothing.
 *
 * The three words are chosen so a sceptical reader cannot mistake one for
 * another. "Scheduled" is not "available"; "planned" is not "scheduled". D-68
 * licenses describing the roadmap, not selling it.
 */

const LABELS: Record<Availability, string> = {
  available: 'Available',
  sprint: 'Scheduled',
  'may-not-ship': 'Planned',
}

const TONES: Record<Availability, string> = {
  // brand-900 on accent-300 is 9.72:1; brand-900 on brand-100 and sand-800 on
  // sand-100 are both well over AA. See packages/ui/src/contrast.test.ts.
  available: 'bg-brand-100 text-brand-900',
  sprint: 'bg-accent-quiet text-cta-ink',
  'may-not-ship': 'border-line-control text-ink-muted border border-dashed',
}

export function AvailabilityBadge({
  availability,
  sprint,
  className,
}: {
  availability: Availability
  /**
   * Explicitly `| undefined` rather than a bare optional.
   *
   * The repo runs `exactOptionalPropertyTypes`, and `Capability`'s discriminated
   * union gives `capability.sprint` the type `string | undefined`. With a bare
   * `sprint?: string` every caller has to write
   * `{...(x.sprint === undefined ? {} : { sprint: x.sprint })}` just to forward
   * a value straight through — which three separate slices independently
   * discovered and worked around. Widening here fixes it once.
   */
  sprint?: string | undefined
  className?: string | undefined
}) {
  const label = LABELS[availability]
  return (
    <span
      // The gate for the on-screen half of acceptance row 7. The type makes an
      // unlabelled capability fail to compile; this makes an unrendered label
      // countable from a browser test, so neither half can go quietly missing.
      data-availability={availability}
      className={cn(
        'text-caption inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold',
        TONES[availability],
        className,
      )}
    >
      {label}
      {sprint ? <span className="font-normal opacity-90">{sprint}</span> : null}
    </span>
  )
}
