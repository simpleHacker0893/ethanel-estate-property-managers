import { describe, expect, it } from 'vitest'
import { demoRequestSchema, demoSubmissionSchema } from './demo-request.ts'

const valid = {
  name: 'Njeri Wanjiru',
  agencyName: 'Riverside Property Management',
  whatsapp: '+254712345678',
  unitsUnderManagement: '150_500',
  currentSystem: 'spreadsheet',
} as const

describe('demoRequestSchema', () => {
  it('accepts a complete request without an email', () => {
    expect(demoRequestSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts an empty email, because the field is optional', () => {
    expect(demoRequestSchema.safeParse({ ...valid, email: '' }).success).toBe(true)
  })

  it.each([
    ['+254 712 345 678', true],
    ['+254-712-345678', true],
    ['+254112345678', true],
    ['0712345678', false],
    ['+254812345678', false],
    ['+25471234567', false],
    ['+1 555 0100', false],
  ])('normalises or rejects %s', (whatsapp, ok) => {
    expect(demoRequestSchema.safeParse({ ...valid, whatsapp }).success).toBe(ok)
  })

  it('strips separators so the stored number is E.164', () => {
    const parsed = demoRequestSchema.parse({ ...valid, whatsapp: '+254 (712) 345-678' })
    expect(parsed.whatsapp).toBe('+254712345678')
  })

  it.each(['name', 'agencyName', 'whatsapp', 'unitsUnderManagement', 'currentSystem'] as const)(
    'reports a message, never a bare failure, for a missing %s',
    (field) => {
      const { [field]: _omitted, ...rest } = valid
      const result = demoRequestSchema.safeParse(rest)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message.length).toBeGreaterThan(0)
      }
    },
  )
})

describe('demoSubmissionSchema', () => {
  it('rejects a filled honeypot', () => {
    const result = demoSubmissionSchema.safeParse({ ...valid, companyWebsite: 'http://spam.test' })
    expect(result.success).toBe(false)
  })

  it('defaults attribution to an empty object when nothing was captured', () => {
    expect(demoSubmissionSchema.parse(valid).attribution).toEqual({})
  })

  it('carries a click id through to the record', () => {
    const parsed = demoSubmissionSchema.parse({
      ...valid,
      attribution: { gclid: 'test123', utm_source: 'google' },
    })
    expect(parsed.attribution.gclid).toBe('test123')
  })
})
