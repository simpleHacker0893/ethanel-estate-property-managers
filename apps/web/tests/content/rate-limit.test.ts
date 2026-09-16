import { describe, expect, it } from 'vitest'

import { clientIpFrom, createRateLimiter } from '../../lib/rate-limit'

describe('the per-IP fixed window', () => {
  const build = () => createRateLimiter({ limit: 3, windowSeconds: 60 })

  it('allows up to the limit and then stops', () => {
    const limiter = build()
    const start = 1_000_000
    expect(limiter.check('1.2.3.4', start).allowed).toBe(true)
    expect(limiter.check('1.2.3.4', start + 1).allowed).toBe(true)
    expect(limiter.check('1.2.3.4', start + 2).allowed).toBe(true)
    expect(limiter.check('1.2.3.4', start + 3).allowed).toBe(false)
  })

  it('reports how long to wait, in whole seconds', () => {
    const limiter = build()
    const start = 1_000_000
    for (let i = 0; i < 4; i++) limiter.check('1.2.3.4', start + i)
    const blocked = limiter.check('1.2.3.4', start + 20_000)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBe(40)
  })

  it('opens a fresh window once the old one has passed', () => {
    const limiter = build()
    const start = 1_000_000
    for (let i = 0; i < 5; i++) limiter.check('1.2.3.4', start + i)
    expect(limiter.check('1.2.3.4', start + 60_000).allowed).toBe(true)
  })

  it('counts each address separately', () => {
    const limiter = build()
    const start = 1_000_000
    for (let i = 0; i < 4; i++) limiter.check('1.2.3.4', start + i)
    expect(limiter.check('5.6.7.8', start + 5).allowed).toBe(true)
  })

  it('bounds its memory rather than becoming the outage', () => {
    const limiter = createRateLimiter({ limit: 1, windowSeconds: 60, maxKeys: 10 })
    for (let i = 0; i < 50; i++) {
      expect(limiter.check(`10.0.0.${String(i)}`, 1_000_000).allowed).toBe(true)
    }
  })
})

describe('finding the client address behind Cloudflare and a load balancer', () => {
  it('prefers cf-connecting-ip', () => {
    const headers = new Headers({
      'cf-connecting-ip': '41.90.1.1',
      'x-forwarded-for': '10.0.0.1, 172.16.0.1',
    })
    expect(clientIpFrom(headers)).toBe('41.90.1.1')
  })

  it('falls back to the FIRST x-forwarded-for entry, not the last', () => {
    // Reading the last entry keys the limit on our own load balancer, which
    // rate-limits every visitor as one.
    const headers = new Headers({ 'x-forwarded-for': '41.90.1.1, 10.0.0.1, 172.16.0.1' })
    expect(clientIpFrom(headers)).toBe('41.90.1.1')
  })

  it('buckets together rather than skipping the limit when no header is present', () => {
    expect(clientIpFrom(new Headers())).toBe('unknown')
  })
})
