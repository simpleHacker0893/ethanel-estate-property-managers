import { appendFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import type { CapturedLead, LeadSink } from '@ethanel/contracts'

/**
 * The only `LeadSink` implementation that ships. **DEBT-08.**
 *
 * It appends one JSON object per line to a file and writes a structured log
 * line. There is no database yet, and Q22 — which boundary owns a *sales* lead —
 * is open, so the seam exists precisely so that answering it is a new
 * implementation rather than a migration.
 *
 * The temptation this seam is built to resist: `listing-svc` owns a `leads`
 * table that is nearby and column-compatible. Taking it would be a chassis
 * defect rather than a shortcut, and it would pollute the marketplace funnel's
 * own metrics. Note the harder problem underneath — a sales lead belongs to no
 * organization, so it is the first record in the system that the tenancy column
 * cannot scope. That is a policy question, not a table question.
 */

const LEAD_FILE = process.env.LEAD_SINK_PATH ?? join(process.cwd(), '.data', 'demo-leads.jsonl')

/**
 * Where the server-side conversion event goes is **Q21, open**: Meta
 * Conversions API, Google Ads offline conversions and TikTok Events API each
 * need their own credential and their own event name, and we do not yet know
 * which platforms are live.
 *
 * Until then it logs. The click identifiers are captured and stored from day
 * one regardless, so answering late costs the optimisation signal and not the
 * data.
 */
async function dispatchConversion(lead: CapturedLead): Promise<void> {
  // TODO(Q21): replace with the real destination once the live platforms are known.
  const attribution = lead.attribution
  console.info(
    JSON.stringify({
      event: 'marketing.demo_request.conversion',
      leadId: lead.id,
      // Click ids only. No name, no number: a conversion event does not need
      // personal data to attribute a click, and sending it anyway is how a
      // marketing pixel becomes a data-protection problem.
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      ttclid: attribution.ttclid,
      msclkid: attribution.msclkid,
      utm_source: attribution.utm_source,
      utm_campaign: attribution.utm_campaign,
      destination: 'unset — QUESTIONS.md Q21',
    }),
  )
  return Promise.resolve()
}

export function createFileLeadSink(path: string = LEAD_FILE): LeadSink {
  return {
    async capture(lead: CapturedLead): Promise<void> {
      await mkdir(dirname(path), { recursive: true })
      await appendFile(path, `${JSON.stringify(lead)}\n`, 'utf8')

      console.info(
        JSON.stringify({
          event: 'marketing.demo_request.captured',
          leadId: lead.id,
          receivedAt: lead.receivedAt,
          unitsUnderManagement: lead.unitsUnderManagement,
          currentSystem: lead.currentSystem,
          hasEmail: Boolean(lead.email),
        }),
      )

      /**
       * The conversion dispatch happens here, inside the sink, and is
       * explicitly non-fatal.
       *
       * A failed capture loses a customer. A failed conversion event loses an
       * optimisation signal. Enforcing that asymmetry here rather than in the
       * caller is the whole reason this is one port and not two: a caller
       * cannot then accidentally make a lead depend on an ad platform being
       * reachable.
       */
      try {
        await dispatchConversion(lead)
      } catch (error) {
        console.warn(
          JSON.stringify({
            event: 'marketing.demo_request.conversion_failed',
            leadId: lead.id,
            reason: error instanceof Error ? error.message : 'unknown',
          }),
        )
      }
    },
  }
}

export const leadSink: LeadSink = createFileLeadSink()
