import { z } from 'zod'

/**
 * Captured on first landing into a first-party SameSite=Lax cookie and carried
 * into the lead record on submit. Browser-only tracking under-reports badly on
 * iOS, and an ad platform cannot optimise without the click id reaching the
 * record -- so the conversion event fires server-side from the Server Action.
 *
 * Which platforms are actually live, and therefore where that event goes, is
 * QUESTIONS.md Q21. The ids are captured and stored regardless: answering late
 * costs the optimisation signal, not the data.
 */
export const attributionSchema = z.object({
  fbclid: z.string().max(512).optional(),
  gclid: z.string().max(512).optional(),
  ttclid: z.string().max(512).optional(),
  msclkid: z.string().max(512).optional(),
  utm_source: z.string().max(256).optional(),
  utm_medium: z.string().max(256).optional(),
  utm_campaign: z.string().max(256).optional(),
  utm_term: z.string().max(256).optional(),
  utm_content: z.string().max(256).optional(),
  referrer: z.string().max(2048).optional(),
  /** When the visitor first landed, so a 90-day window can be enforced server-side. */
  firstSeenAt: z.iso.datetime().optional(),
})

export type Attribution = z.infer<typeof attributionSchema>

export const ATTRIBUTION_COOKIE = 'eth_attr'
export const ATTRIBUTION_MAX_AGE_SECONDS = 90 * 24 * 60 * 60
