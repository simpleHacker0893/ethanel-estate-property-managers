/**
 * Per-IP rate limiting for the `/demo` Server Action.
 *
 * **In-process, fixed-window, and deliberately so.** D-05 puts rate limits in
 * Valkey, and there is no Valkey — there is no cluster at all. An in-process
 * counter is wrong in exactly one way that matters: with `web` at two replicas
 * it allows twice the configured rate, and it resets on deploy.
 *
 * That is acceptable here and nowhere else. What this protects is a form with
 * no database behind it whose worst case is junk in an append-only file; the
 * honeypot in the contract catches the naive bots, and this catches the rest
 * well enough that nobody can trivially fill the disk. When Sprint 002 lands the
 * chassis, this moves to Valkey and becomes exact.
 *
 * Nothing durable lives here, so losing it costs latency and never data —
 * which is the test D-04 sets for anything cache-shaped.
 */

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

export interface RateLimiter {
  check(key: string, now?: number): RateLimitResult
}

export function createRateLimiter({
  limit,
  windowSeconds,
  maxKeys = 10_000,
}: {
  limit: number
  windowSeconds: number
  /** Bounds memory: a flood of unique IPs must not become the outage. */
  maxKeys?: number
}): RateLimiter {
  const windowMs = windowSeconds * 1000
  const hits = new Map<string, { count: number; windowStart: number }>()

  return {
    check(key: string, now: number = Date.now()): RateLimitResult {
      const existing = hits.get(key)

      if (!existing || now - existing.windowStart >= windowMs) {
        if (hits.size >= maxKeys) {
          // Drop the whole table rather than walk it. This is a fixed-window
          // counter over a marketing form, and an eviction policy that costs
          // more than the thing it protects is not worth having.
          hits.clear()
        }
        hits.set(key, { count: 1, windowStart: now })
        return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 }
      }

      existing.count += 1
      const elapsed = now - existing.windowStart
      const retryAfterSeconds = Math.ceil((windowMs - elapsed) / 1000)

      if (existing.count > limit) {
        return { allowed: false, remaining: 0, retryAfterSeconds }
      }
      return { allowed: true, remaining: limit - existing.count, retryAfterSeconds }
    },
  }
}

/**
 * Five submissions per IP per hour. A real agency owner submits once; five is
 * generous enough that a shared office NAT or a genuine correction does not hit
 * it, and low enough that scripted abuse stops being worth the effort.
 */
export const demoRateLimiter = createRateLimiter({ limit: 5, windowSeconds: 3600 })

/**
 * The client IP behind Cloudflare and an AWS load balancer (D-28, D-29).
 *
 * `cf-connecting-ip` is set by Cloudflare and is the trustworthy one here
 * because all traffic enters through it. `x-forwarded-for` is taken as a
 * fallback and only its FIRST entry — the rest are proxies, and reading the
 * last entry is the classic way a rate limit ends up keyed on your own load
 * balancer.
 */
export function clientIpFrom(headers: Headers): string {
  const cloudflare = headers.get('cf-connecting-ip')?.trim()
  if (cloudflare) return cloudflare

  const forwarded = headers.get('x-forwarded-for')
  const first = forwarded?.split(',')[0]?.trim()
  if (first) return first

  // No header at all: bucket everything together rather than skipping the
  // limit. Failing closed is the right default for an unauthenticated write.
  return 'unknown'
}
