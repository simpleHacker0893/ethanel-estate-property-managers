import type { ProofBarContent } from '../types'

/**
 * S3 — the proof bar, shipped in its `pending` state.
 *
 * A proof bar normally carries logos, a units-under-management figure and a
 * rating. Ethanel has none of those, because no agency has gone live, and
 * D-68 forbids inventing any of them. A row of grey rectangles captioned
 * "trusted by leading agencies" is the single most expensive thing this file
 * could contain: it is unverifiable, a sceptical reader has seen it before,
 * and the next page written would be built on top of it.
 *
 * So the bar carries the only proof that exists — the four publishable numbers,
 * each a design target the platform holds itself to, each with the bound that
 * makes it true, each traceable to a decision, and all four linked to
 * `/security` where the bounds are written out in full.
 *
 * There is no fifth number. In particular:
 *
 * - The 95% figure never appears without its denominator. A bare "95%
 *   auto-matched" is the exact defect D-66 was written to fix, which is why
 *   `bound` is a required field on `DesignTarget` rather than a nicety.
 * - None of these is phrased as a result a customer gets. Sprint 007 is when
 *   the auto-match rate is first instrumented at all; until then 95% is a bar
 *   the product must clear before go-live on real partner data, and the
 *   pending note says that in those words.
 */
export const proofBar: ProofBarContent = {
  title: 'Design targets, not customer results',

  pendingNote:
    'No agency has gone live on Ethanel yet, so there are no customer results to show here and nothing has been measured in production. Until there are, this bar carries the engineering targets the platform must clear before go-live, measured on real partner data.',

  href: '/security',
  hrefLabel: 'How we measure these',

  targets: [
    {
      claim: '500 units invoiced in under 2 minutes',
      bound: 'Idempotent and resumable: a rent run is safe to execute twice.',
      source: 'D-40',
    },
    {
      claim: '50 callbacks a second for 10 minutes, zero loss',
      bound: 'Webhook ingress: verified, persisted and acknowledged, never processed inline.',
      source: 'D-41',
    },
    {
      claim: '95% of payments matched with no human action',
      bound:
        'Measured over rent and charge payments against open invoices. Deposits and plot instalments are excluded from the denominator.',
      source: 'D-39, bounded by D-66',
    },
    {
      claim: 'Landlord figures read live from the ledger, with a last-updated stamp',
      bound: 'Never a cached summary.',
      source: 'D-45',
    },
  ],
}
