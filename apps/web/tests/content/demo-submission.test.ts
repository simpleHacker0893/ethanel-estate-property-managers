import { describe, expect, it, vi } from 'vitest'

import type { CapturedLead, LeadSink } from '@ethanel/contracts'

import { submitDemoRequest } from '../../lib/demo-submission'
import { createRateLimiter } from '../../lib/rate-limit'

/**
 * The four behaviours the blueprint names for the demo Server Action, tested
 * against a fake sink — no server, no browser, no database.
 *
 * Follows the style `packages/contracts/src/marketing/demo-request.test.ts`
 * established: one valid fixture, table-driven cases around the boundary, and a
 * failure asserted to carry a *message* rather than a bare failure.
 */

const VALID = {
  name: 'Wanjiru Kamau',
  agencyName: 'Riverside Property Managers',
  whatsapp: '+254712345678',
  unitsUnderManagement: '50_150',
  currentSystem: 'spreadsheet',
  email: '',
  companyWebsite: '',
}

const NOW = new Date('2026-09-16T09:00:00.000Z')

function fakeSink(): LeadSink & { captured: CapturedLead[] } {
  const captured: CapturedLead[] = []
  return {
    captured,
    capture(lead) {
      captured.push(lead)
      return Promise.resolve()
    },
  }
}

function deps(sink: LeadSink) {
  return {
    sink,
    rateLimiter: createRateLimiter({ limit: 5, windowSeconds: 3600 }),
    now: () => NOW,
    newId: () => '0192f0a1-0000-7000-8000-000000000001',
  }
}

const context = { ip: '41.90.1.1', attribution: {} }

describe('a valid submission', () => {
  it('reaches the sink exactly once', async () => {
    const sink = fakeSink()
    const result = await submitDemoRequest(VALID, context, deps(sink))

    expect(result).toEqual({ status: 'ok' })
    expect(sink.captured).toHaveLength(1)
  })

  it('carries the attribution into the record intact', async () => {
    const sink = fakeSink()
    await submitDemoRequest(
      VALID,
      {
        ip: '41.90.1.1',
        attribution: { gclid: 'test123', utm_source: 'google', firstSeenAt: NOW.toISOString() },
      },
      deps(sink),
    )

    // Acceptance row 8: the click id has to survive from first landing to the
    // lead record, or the whole server-side conversion path is decorative.
    expect(sink.captured[0]?.attribution).toMatchObject({
      gclid: 'test123',
      utm_source: 'google',
    })
  })

  it('stamps an id and a received time', async () => {
    const sink = fakeSink()
    await submitDemoRequest(VALID, context, deps(sink))
    expect(sink.captured[0]?.id).toBe('0192f0a1-0000-7000-8000-000000000001')
    expect(sink.captured[0]?.receivedAt).toBe(NOW.toISOString())
  })

  it('normalises a Kenyan number written with spaces', async () => {
    const sink = fakeSink()
    const result = await submitDemoRequest(
      { ...VALID, whatsapp: '+254 712 345 678' },
      context,
      deps(sink),
    )
    expect(result.status).toBe('ok')
    expect(sink.captured[0]?.whatsapp).toBe('+254712345678')
  })
})

describe('an invalid submission never reaches the sink', () => {
  const cases: [string, Record<string, unknown>, string][] = [
    ['a missing name', { ...VALID, name: '' }, 'name'],
    ['a missing agency', { ...VALID, agencyName: '' }, 'agencyName'],
    ['a non-Kenyan number', { ...VALID, whatsapp: '+447700900000' }, 'whatsapp'],
    ['a malformed number', { ...VALID, whatsapp: '0712345678' }, 'whatsapp'],
    ['an unset units band', { ...VALID, unitsUnderManagement: '' }, 'unitsUnderManagement'],
    ['an unset current system', { ...VALID, currentSystem: '' }, 'currentSystem'],
    ['a malformed email', { ...VALID, email: 'not-an-address' }, 'email'],
  ]

  for (const [label, input, field] of cases) {
    it(`rejects ${label}, with a message on ${field}`, async () => {
      const sink = fakeSink()
      const result = await submitDemoRequest(input, context, deps(sink))

      expect(sink.captured).toHaveLength(0)
      expect(result.status).toBe('invalid')
      if (result.status !== 'invalid') return

      // "Never a red border without a text message" is a requirement, so the
      // message is what is asserted, not the mere presence of a failure.
      expect(result.fieldErrors[field]).toBeTruthy()
      expect(result.fieldErrors[field]?.length).toBeGreaterThan(8)
    })
  }

  it('accepts an omitted email, because email is deliberately optional', async () => {
    const sink = fakeSink()
    const { email: _email, ...withoutEmail } = VALID
    const result = await submitDemoRequest(withoutEmail, context, deps(sink))
    expect(result).toEqual({ status: 'ok' })
    expect(sink.captured).toHaveLength(1)
  })
})

describe('the honeypot', () => {
  it('never reaches the sink', async () => {
    const sink = fakeSink()
    await submitDemoRequest(
      { ...VALID, companyWebsite: 'http://spam.example' },
      context,
      deps(sink),
    )
    expect(sink.captured).toHaveLength(0)
  })

  it('tells the bot it succeeded, so it does not learn which field trapped it', async () => {
    const sink = fakeSink()
    const result = await submitDemoRequest(
      { ...VALID, companyWebsite: 'http://spam.example' },
      context,
      deps(sink),
    )
    expect(result).toEqual({ status: 'ok' })
  })

  it('does not spend the rate-limit budget of a real visitor behind the same address', async () => {
    const sink = fakeSink()
    const d = deps(sink)
    for (let i = 0; i < 20; i++) {
      await submitDemoRequest({ ...VALID, companyWebsite: 'x' }, context, d)
    }
    // A genuine submission from that address still gets through.
    const result = await submitDemoRequest(VALID, context, d)
    expect(result).toEqual({ status: 'ok' })
    expect(sink.captured).toHaveLength(1)
  })
})

describe('rate limiting', () => {
  it('stops the sixth submission from one address within the hour', async () => {
    const sink = fakeSink()
    const d = deps(sink)
    for (let i = 0; i < 5; i++) {
      expect((await submitDemoRequest(VALID, context, d)).status).toBe('ok')
    }
    const sixth = await submitDemoRequest(VALID, context, d)
    expect(sixth.status).toBe('rate-limited')
    expect(sink.captured).toHaveLength(5)
  })

  it('does not stop a different address', async () => {
    const sink = fakeSink()
    const d = deps(sink)
    for (let i = 0; i < 6; i++) await submitDemoRequest(VALID, context, d)
    const other = await submitDemoRequest(VALID, { ...context, ip: '41.90.9.9' }, d)
    expect(other).toEqual({ status: 'ok' })
  })
})

describe('a conversion dispatch that throws does not fail the capture', () => {
  it('still reports success when the sink swallows its own conversion failure', async () => {
    // This is the asymmetry the single-port design exists to enforce: a failed
    // capture loses a customer, a failed conversion event loses an optimisation
    // signal. The sink owns that distinction, so a sink that handles its own
    // dispatch failure keeps the lead.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const captured: CapturedLead[] = []
    const sinkWithFlakyConversion: LeadSink = {
      async capture(lead) {
        captured.push(lead)
        try {
          await Promise.reject(new Error('Meta CAPI unreachable'))
        } catch {
          console.warn('conversion failed')
        }
      },
    }

    const result = await submitDemoRequest(VALID, context, deps(sinkWithFlakyConversion))
    expect(result).toEqual({ status: 'ok' })
    expect(captured).toHaveLength(1)
    warn.mockRestore()
  })

  it('does report failure when the CAPTURE itself throws — that loses a customer', async () => {
    const brokenSink: LeadSink = {
      capture: () => Promise.reject(new Error('disk full')),
    }
    await expect(submitDemoRequest(VALID, context, deps(brokenSink))).rejects.toThrow('disk full')
  })
})
