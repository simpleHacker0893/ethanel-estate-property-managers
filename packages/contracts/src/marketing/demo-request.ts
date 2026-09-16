import { z } from 'zod'
import { attributionSchema } from './attribution.ts'

/**
 * Five fields, maximum. Everything else is collected on the call.
 *
 * Email is deliberately optional: in this market WhatsApp is the real channel,
 * and a required email field costs more leads than the address is worth.
 */

export const UNITS_BANDS = ['under_50', '50_150', '150_500', '500_plus'] as const
export const CURRENT_SYSTEMS = ['spreadsheet', 'other_system', 'paper', 'mix'] as const

export type UnitsBand = (typeof UNITS_BANDS)[number]
export type CurrentSystem = (typeof CURRENT_SYSTEMS)[number]

/**
 * Kenyan mobile numbers in E.164. Safaricom, Airtel and Telkom prefixes all sit
 * under +2547xx and +2541xx; the form defaults to +254 and uses inputmode="tel".
 * Deliberately not a general international matcher -- this form is for Kenyan
 * agencies, and a loose pattern lets a typo through as a valid-looking number.
 */
const kenyanMsisdn = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()-]/g, ''))
  .pipe(
    z
      .string()
      .regex(/^\+254[17]\d{8}$/, 'Enter a Kenyan mobile number, for example +254 712 345 678'),
  )

export const demoRequestSchema = z.object({
  name: z.string().trim().min(2, 'Tell us your name').max(120),
  agencyName: z.string().trim().min(2, 'Tell us the name of your agency').max(160),
  whatsapp: kenyanMsisdn,
  unitsUnderManagement: z.enum(UNITS_BANDS, {
    error: 'Pick the range closest to the units you manage',
  }),
  currentSystem: z.enum(CURRENT_SYSTEMS, { error: 'Pick what you use today' }),
  email: z.union([z.literal(''), z.email('That does not look like an email address')]).optional(),
})

export type DemoRequest = z.infer<typeof demoRequestSchema>

/**
 * What actually reaches the sink: the form, plus attribution, plus a honeypot
 * that must be empty. The honeypot is part of the contract rather than a detail
 * of the form so the server-side check cannot be forgotten.
 */
export const demoSubmissionSchema = demoRequestSchema.extend({
  attribution: attributionSchema.default({}),
  /** Hidden, off-screen, never labelled. A filled value is a bot. */
  companyWebsite: z.literal('').optional(),
})

export type DemoSubmission = z.infer<typeof demoSubmissionSchema>
