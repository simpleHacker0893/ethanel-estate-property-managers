import {
  demoSubmissionSchema,
  type Attribution,
  type CapturedLead,
  type LeadSink,
} from '@ethanel/contracts'

import type { RateLimiter } from './rate-limit'

/**
 * The `/demo` submission, as a pure function over its dependencies.
 *
 * Kept out of the Server Action file on purpose: the action's job is to read
 * cookies and headers, and this one's is to decide what happens. That split is
 * what lets the four behaviours the blueprint names be tested against a fake
 * sink with no server and no browser —
 *
 *   1. a valid submission reaches the sink exactly once, attribution intact
 *   2. an invalid one never reaches it
 *   3. a filled honeypot never reaches it
 *   4. a conversion dispatch that throws does NOT fail the capture
 *
 * The fourth is enforced inside the sink rather than here, which is why there is
 * one port and not two.
 */

export type SubmitResult =
  | { status: 'ok' }
  | { status: 'invalid'; fieldErrors: Record<string, string> }
  | { status: 'rate-limited'; retryAfterSeconds: number }

export interface SubmitDeps {
  sink: LeadSink
  rateLimiter: RateLimiter
  now: () => Date
  newId: () => string
}

export interface SubmitContext {
  ip: string
  attribution: Attribution
}

export async function submitDemoRequest(
  raw: Record<string, unknown>,
  context: SubmitContext,
  deps: SubmitDeps,
): Promise<SubmitResult> {
  /**
   * The honeypot is checked before anything else, and a bot is told it
   * succeeded.
   *
   * It lives in the contract rather than in the form so the server-side check
   * cannot be forgotten — but its *response* has to be a lie, because a bot that
   * learns which field trapped it simply stops filling that field. It never
   * reaches the sink and it never consumes rate-limit budget belonging to a real
   * visitor behind the same NAT.
   */
  if (typeof raw.companyWebsite === 'string' && raw.companyWebsite.trim() !== '') {
    return { status: 'ok' }
  }

  const rate = deps.rateLimiter.check(context.ip, deps.now().getTime())
  if (!rate.allowed) {
    return { status: 'rate-limited', retryAfterSeconds: rate.retryAfterSeconds }
  }

  const parsed = demoSubmissionSchema.safeParse({ ...raw, attribution: context.attribution })
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      // First message per field. "Never a red border without a text message"
      // is a requirement, so the message — not the fact of failure — is what
      // travels back to the form.
      if (typeof field === 'string' && !(field in fieldErrors)) {
        fieldErrors[field] = issue.message
      }
    }
    return { status: 'invalid', fieldErrors }
  }

  const lead: CapturedLead = {
    ...parsed.data,
    id: deps.newId(),
    receivedAt: deps.now().toISOString(),
  }

  await deps.sink.capture(lead)
  return { status: 'ok' }
}
