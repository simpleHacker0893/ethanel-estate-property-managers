import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * The no-invented-proof guard (ticket 03; acceptance rows 6 and 9).
 *
 * Written BEFORE any marketing copy exists, so it guards from the first line.
 * It runs over every file under content/marketing and fails when it finds:
 *   - a price (money figures are a Q7/D-64 forbidden zone; even an example
 *     price on a public page reads as a quote),
 *   - a testimonial or customer logo key (D-68: nothing invented, and real
 *     testimonials need written consent we do not have yet),
 *   - the word "tenant" (vocabulary: residents are residents; "tenant" exists
 *     only in the SaaS-boundary sense of D-60 and never on the marketing site).
 *
 * The checker is exercised against known-bad fixtures at the bottom, so the
 * suite cannot go green by the rules silently never firing.
 */

const CONTENT_DIR = join(__dirname, '..', '..', 'content', 'marketing')

function listFiles(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...listFiles(full))
    else if (/\.(ts|tsx)$/.test(name)) out.push(full)
  }
  return out
}

export const PRICE_PATTERNS: RegExp[] = [
  /\bKES\s?\d/i,
  /\bKSh\.?\s?\d/i,
  /\bKshs\.?\s?\d/i,
  /\d[\d,]*\s?(?:\/|per\s)\s?month/i,
  /\d[\d,]*\/mo\b/i,
  /\bprice(?:d)?\s?(?:at|:)\s?\d/i,
]

export const FORBIDDEN_WORD_PATTERNS: RegExp[] = [
  // "tenant" is reserved for the SaaS sense (D-60); a person is a resident.
  /\btenants?\b/i,
]

export const FORBIDDEN_KEYS: string[] = [
  'testimonial',
  'testimonials',
  'quote',
  'quotes',
  'logo',
  'logos',
  'customerLogo',
  'clientLogo',
  'reviews',
]

export interface Violation {
  file: string
  line: number
  rule: string
  snippet: string
}

export function checkSource(source: string, file: string): Violation[] {
  const violations: Violation[] = []
  const lines = source.split(/\r?\n/)
  lines.forEach((text, index) => {
    const lineNo = index + 1
    const withoutComment = text.replace(/\/\/.*$/, '')
    for (const rule of PRICE_PATTERNS) {
      if (rule.test(withoutComment)) {
        violations.push({ file, line: lineNo, rule: 'price', snippet: text.trim() })
      }
    }
    for (const rule of FORBIDDEN_WORD_PATTERNS) {
      if (rule.test(withoutComment)) {
        violations.push({ file, line: lineNo, rule: 'forbidden-word', snippet: text.trim() })
      }
    }
    for (const key of FORBIDDEN_KEYS) {
      if (new RegExp(`\\b${key}\\b\\s*:`).test(withoutComment)) {
        violations.push({ file, line: lineNo, rule: 'forbidden-key', snippet: text.trim() })
      }
    }
  })
  return violations
}

describe('no invented proof in marketing content', () => {
  const files = listFiles(CONTENT_DIR).filter((f) => !f.endsWith('types.ts'))

  it('finds content files to guard (the guard is not vacuously green)', () => {
    // routes.ts exists from ticket 03; as sections land this grows.
    expect(files.length).toBeGreaterThanOrEqual(1)
  })

  for (const file of files) {
    const rel = file.slice(file.indexOf('content')) || file
    it(`no invented proof in ${rel}`, () => {
      const violations = checkSource(readFileSync(file, 'utf8'), rel)
      expect(violations).toEqual([])
    })
  }
})

describe('the proof guard itself detects violations', () => {
  it('flags a price', () => {
    expect(checkSource(`const x = { note: 'KES 12,500 per unit' }`, 'f.ts')).toEqual([
      expect.objectContaining({ rule: 'price' }),
    ])
  })

  it('flags a testimonial key', () => {
    expect(checkSource(`const page = { testimonial: 'best tool ever' }`, 'f.ts')).toEqual([
      expect.objectContaining({ rule: 'forbidden-key' }),
    ])
  })

  it('flags the word tenant', () => {
    expect(checkSource(`const copy = 'Each tenant gets a portal'`, 'f.ts')).toEqual([
      expect.objectContaining({ rule: 'forbidden-word' }),
    ])
  })

  it('does not flag innocent copy', () => {
    expect(checkSource(`const copy = 'Residents pay over M-Pesa'`, 'f.ts')).toEqual([])
  })
})
