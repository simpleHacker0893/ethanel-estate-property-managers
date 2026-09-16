import { describe, expect, it } from 'vitest'

import { cn } from './cn.ts'
import { buttonClassName } from './primitives/button-classes.ts'

/**
 * Pins the tailwind-merge configuration, because the failure it prevents is
 * silent: an unconfigured merge treats `text-body-sm` as a text colour, drops
 * the colour it was combined with, and ships a contrast violation that only a
 * browser-based accessibility scan will catch.
 */
describe('cn keeps a text colour and a type step from colliding', () => {
  it('keeps both when they arrive in separate arguments', () => {
    const result = cn('bg-brand-500 text-sand-0', 'text-body-sm')
    expect(result).toContain('text-sand-0')
    expect(result).toContain('text-body-sm')
  })

  it('keeps both for every step in the scale', () => {
    for (const step of [
      'text-display',
      'text-h1',
      'text-h2',
      'text-h3',
      'text-h4',
      'text-body-lg',
      'text-body',
      'text-body-sm',
      'text-caption',
      'text-data',
    ]) {
      expect(cn('text-ink', step).split(' ').sort()).toEqual(['text-ink', step].sort())
    }
  })

  it('still resolves a genuine conflict — the last colour wins', () => {
    expect(cn('text-ink', 'text-ink-muted')).toBe('text-ink-muted')
  })

  it('still resolves a genuine conflict — the last type step wins', () => {
    expect(cn('text-body', 'text-body-sm')).toBe('text-body-sm')
  })
})

describe('the secondary button keeps its white ink', () => {
  /**
   * The regression this file exists for. `buttonClassName('secondary')` merges
   * `text-sand-0` from the variant with `text-body-sm` from the size; losing the
   * former renders sand-800 on brand-500 at 3.33:1, under the 4.5:1 AA floor.
   */
  it('carries text-sand-0 and the size step together', () => {
    const result = buttonClassName('secondary', 'md', 'ml-2')
    expect(result).toContain('text-sand-0')
    expect(result).toContain('text-body-sm')
  })

  it('marks the primary variant and only the primary variant', () => {
    expect(buttonClassName('primary')).toContain('bg-cta-fill')
    expect(buttonClassName('primary')).toContain('text-cta-ink')
  })
})
