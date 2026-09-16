import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cn } from '../cn.ts'

/**
 * Layout primitives. They live in `packages/ui` rather than in the marketing
 * route group because Sprint 003's rent roll and Sprint 011's storefronts
 * inherit them — the same reason the token block does (D-27).
 *
 * The rule these encode: nothing outside this file sets a page gutter, a
 * section's vertical rhythm, or a reading measure by hand. If a section needs
 * different spacing, it gets a variant here, so the rhythm stays one decision
 * in one place.
 */

/** The page gutter and the maximum content width, in one place. */
export function Container({
  className,
  width = 'default',
  children,
  ...rest
}: ComponentPropsWithoutRef<'div'> & { width?: 'default' | 'wide' | 'narrow' }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6',
        width === 'narrow' && 'max-w-3xl',
        width === 'default' && 'max-w-6xl',
        width === 'wide' && 'max-w-7xl',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * Vertical rhythm — 64px on a handset, 84px at tablet, 104px at desktop — and
 * the alternating background rule.
 *
 * `tone` is the only way a section sets its background, which is what keeps the
 * inverted-band budget countable: the landing page may carry at most two
 * `inverted` sections, and a Playwright assertion counts them.
 */
export type SectionTone = 'default' | 'raised' | 'sunken' | 'inverted'

export function Section({
  className,
  tone = 'default',
  rhythm = 'default',
  children,
  as: Tag = 'section',
  ...rest
}: ComponentPropsWithoutRef<'section'> & {
  tone?: SectionTone
  rhythm?: 'default' | 'tight'
  as?: ElementType
}) {
  return (
    <Tag
      data-tone={tone}
      className={cn(
        rhythm === 'default'
          ? 'py-[var(--space-section-sm)] md:py-[var(--space-section-md)] lg:py-[var(--space-section-lg)]'
          : 'py-10 md:py-12',
        tone === 'default' && 'bg-surface text-ink',
        tone === 'raised' && 'bg-surface-raised text-ink',
        // The decorative field rides on `tone` rather than on a separate prop.
        // Depth is a property of what the band already is, so binding it here
        // means every existing section gets it without an edit, and no page can
        // end up with a sunken band that forgot its texture.
        tone === 'sunken' && 'field field-grid bg-surface-sunken text-ink',
        tone === 'inverted' && 'field field-band bg-accent-band text-accent-band-ink',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * A reading column capped at 68ch. Long-form copy goes through this or it gets
 * a 120-character line on a 1440px viewport.
 */
export function Prose({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('max-w-[var(--measure)]', className)} {...rest}>
      {children}
    </div>
  )
}

/**
 * The small tracked label above a heading. It is presentational, so it is never
 * a heading element — a screen reader gets one heading per section, not two.
 */
export function Eyebrow({ className, children, ...rest }: ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={cn('text-caption text-ink-quiet font-semibold tracking-wide uppercase', className)}
      {...rest}
    >
      {children}
    </p>
  )
}

/**
 * `surface` is the default card. `inherit` is the one to use inside a
 * `Section tone="inverted"`.
 *
 * The distinction exists because the default hard-codes `bg-surface`, which on
 * an inverted band renders a white card that has inherited white ink — invisible
 * text, and a failure no unit test catches. Giving it a name here means each
 * section does not have to reinvent the same `cn` override, and the override
 * cannot be forgotten quietly.
 */
export type CardTone = 'surface' | 'inherit'

export function Card({
  className,
  tone = 'surface',
  children,
  ...rest
}: ComponentPropsWithoutRef<'div'> & { tone?: CardTone; children?: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-lg border p-5',
        // sand-200 at 1.27:1 is permitted here: a card border is decoration,
        // not the only means of identifying a control (WCAG 1.4.11). A form
        // control border uses --line-control instead. See contrast.test.ts.
        tone === 'surface' && 'border-line bg-surface',
        // Takes the band's own ink and a border drawn from the band's accent,
        // so the card reads as a division of the band rather than a hole in it.
        tone === 'inherit' && 'border-accent-band-quiet/40 bg-transparent',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
