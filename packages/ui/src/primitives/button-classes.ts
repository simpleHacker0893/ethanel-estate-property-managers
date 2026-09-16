import { cn } from '../cn.ts'

/**
 * The button's class computation, kept apart from its markup.
 *
 * Two reasons. It is pure — a variant in, a class string out — so it is unit
 * testable without a DOM or a JSX transform, and `cn.test.ts` pins the merge
 * behaviour that a silent tailwind-merge misconfiguration would break. And the
 * `data-cta` marker that acceptance row 5 counts is decided here, in one
 * function, rather than by whoever writes a section.
 *
 * Variants map to verified contrast pairs (see `../contrast.test.ts`):
 *   primary   accent-500 fill + brand-900 ink ..... 6.12:1
 *   secondary brand-500 fill + white ink .......... 5.00:1
 *   quiet     surface + sand-800 ink, sand-200 rule (decoration)
 *   inverted  white fill + brand-900 ink, for use inside a brand-900 band
 */

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'inverted'
export type ButtonSize = 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold ' +
  // The 44x44 touch floor is a requirement, so it is in the base and not in a
  // variant that a caller could pick around.
  'min-h-[var(--spacing-touch)] ' +
  'transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out-soft)] ' +
  'disabled:cursor-not-allowed disabled:opacity-55'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-cta-fill text-cta-ink hover:bg-cta-fill-hover',
  secondary: 'bg-brand-500 text-sand-0 hover:bg-brand-600',
  quiet: 'border-line bg-surface text-ink hover:bg-surface-sunken border',
  inverted: 'bg-accent-band-ink text-accent-band hover:bg-sand-200',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'text-body-sm px-4',
  lg: 'text-body px-6 py-3',
}

export function buttonClassName(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className)
}

/**
 * Set on the primary variant only, and read by the acceptance-row-5 scan that
 * counts how many primary calls to action intersect each 844px scroll step.
 */
export function ctaMarker(variant: ButtonVariant): { 'data-cta'?: 'primary' } {
  return variant === 'primary' ? { 'data-cta': 'primary' } : {}
}
