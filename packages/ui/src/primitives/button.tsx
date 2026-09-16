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
