import type { ComponentPropsWithoutRef } from 'react'

import {
  buttonClassName,
  ctaMarker,
  type ButtonSize,
  type ButtonVariant,
} from './button-classes.ts'

/**
 * The button and the button-shaped link. The class computation and the
 * `data-cta` marker live in `./button-classes.ts` so they can be unit tested
 * without a JSX transform; this file is markup only.
 */

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<'button'>, 'className'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, size, className)}
      {...ctaMarker(variant)}
      {...rest}
    >
      {children}
    </button>
  )
}

/**
 * A link that looks like a button. Separate from `Button` on purpose: a thing
 * that navigates is an anchor and a thing that acts is a button, and collapsing
 * the two is how a keyboard and screen-reader user loses the ability to tell
 * them apart.
 *
 * Marketing routes mostly want `next/link` instead, and reach the same classes
 * through `buttonClassName` — which keeps `packages/ui` free of a dependency on
 * Next.
 */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<'a'>, 'className'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return (
    <a className={buttonClassName(variant, size, className)} {...ctaMarker(variant)} {...rest}>
      {children}
    </a>
  )
}
