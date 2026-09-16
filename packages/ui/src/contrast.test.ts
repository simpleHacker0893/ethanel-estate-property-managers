import { describe, expect, it } from 'vitest'

import {
  CONTRAST_PAIRS,
  computePairs,
  contrastRatio,
  loadThemeColours,
  verdictFor,
} from './contrast.ts'

/**
 * The contrast table, committed as a test that recomputes every pair from the
 * token values so the table cannot rot away from the tokens.
 *
 * Operator decision 1 (16 September 2026) re-derived the palette; this is what
 * makes that decision checkable rather than asserted. If someone nudges a hex
 * in theme.css, the pair that moved is named in the failure.
 */

const colours = loadThemeColours()

describe('the ratio function itself', () => {
  it('is 21:1 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
  })

  it('is 1:1 for a colour against itself', () => {
    expect(contrastRatio('#2c7d5d', '#2c7d5d')).toBeCloseTo(1, 10)
  })

  it('is symmetric — order of arguments does not change the answer', () => {
    expect(contrastRatio('#0c241b', '#d98e2b')).toBeCloseTo(contrastRatio('#d98e2b', '#0c241b'), 10)
  })
})

describe('every verified pair still computes to the value in the table', () => {
  for (const pair of computePairs(colours)) {
    it(`${pair.name} is ${pair.expected.toFixed(2)}:1`, () => {
      expect(pair.ratio).toBeCloseTo(pair.expected, 2)
    })
  }
})

describe('the rules the table encodes', () => {
  const pairs = computePairs(colours)
  const byName = new Map(pairs.map((p) => [p.name, p]))

  it('agrees with its own verdicts — no pair is labelled better than it computes', () => {
    for (const pair of pairs) {
      expect({ name: pair.name, verdict: verdictFor(pair.ratio) }).toEqual({
        name: pair.name,
        verdict: pair.verdict,
      })
    }
  })

  it('keeps accent-500 forbidden as text on white and as a carrier of white text', () => {
    // Both directions are the same computation; both are asserted so that
    // "ochre text" and "white on ochre" each fail loudly if reintroduced.
    expect(byName.get('accent-500 text on white')?.ratio).toBeLessThan(4.5)
    expect(byName.get('white text on accent-500')?.ratio).toBeLessThan(4.5)
  })

  it('pins the primary CTA pair at the 6.12:1 the blueprint names', () => {
    expect(byName.get('brand-900 ink on accent-500 fill')?.ratio).toBeCloseTo(6.12, 2)
  })

  it('clears the 3:1 UI floor for the focus ring in both schemes', () => {
    expect(byName.get('brand-500 focus ring on white')?.ratio).toBeGreaterThanOrEqual(3)
    expect(byName.get('brand-400 focus ring on sand-950')?.ratio).toBeGreaterThanOrEqual(3)
  })

  /**
   * The finding the master prompt's table does not cover, and the reason
   * `--line` and `--line-control` are two tokens rather than one: a card border
   * is decoration and may be sand-200, but a form control border is the only
   * means of identifying the control, so WCAG 1.4.11 applies and it must clear
   * 3:1. sand-500 is the floor that does.
   */
  describe('form control borders use sand-500 or darker; card borders may use sand-200', () => {
    const white = colours.get('sand-0')

    it('sand-200 fails the 3:1 control floor, so it is a card border only', () => {
      expect(contrastRatio(colours.get('sand-200') ?? '', white ?? '')).toBeLessThan(3)
    })

    it('sand-400 also fails it, which is the non-obvious half', () => {
      expect(contrastRatio(colours.get('sand-400') ?? '', white ?? '')).toBeLessThan(3)
    })

    it('sand-500 clears it, and is therefore the floor', () => {
      expect(contrastRatio(colours.get('sand-500') ?? '', white ?? '')).toBeGreaterThanOrEqual(3)
    })
  })
})

describe('the test is not vacuously green', () => {
  it('parsed a full palette out of theme.css', () => {
    // Three ramps plus the inline semantic layer; the ramps alone are 32 steps.
    expect(colours.size).toBeGreaterThanOrEqual(32)
  })

  it('covers every pair in the table', () => {
    expect(computePairs(colours)).toHaveLength(CONTRAST_PAIRS.length)
  })

  it('fails when a token moves — a nudged accent-500 breaks the CTA pair', () => {
    const nudged = new Map(colours)
    nudged.set('accent-500', '#ffffff')
    const cta = computePairs(nudged).find((p) => p.name === 'brand-900 ink on accent-500 fill')
    expect(cta?.ratio).not.toBeCloseTo(6.12, 2)
  })
})
