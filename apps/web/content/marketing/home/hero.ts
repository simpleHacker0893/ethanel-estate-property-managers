import type { HeroContent } from '../types'

/**
 * S2 — the hero, and the only place on the site where four elements have to
 * survive a hard geometric constraint: H1, sub-headline, primary call to action
 * and the risk-reversal line all sit above the fold at 390x844 under a 64px
 * sticky header (acceptance row 4). Everything here is written to that budget —
 * a short headline, a single-sentence subhead, and a risk-reversal line that
 * reads at `text-body-sm`.
 *
 * Three copy constraints bind every string in this file:
 *
 * 1. No business fact is invented (D-68). The headline claims a mechanism, not
 *    a result: no agency is live, so nothing here says what an agency "sees" or
 *    "gets". The only numbers on the landing page are the four in the proof bar,
 *    and none of them is repeated here without its bound.
 * 2. The risk-reversal line is quoted verbatim from the track brief and is
 *    scoped to pilot partners on purpose. Published unscoped it turns a one-off
 *    pilot gate (ROADMAP Sprint 016, VALIDATION §3) into a standing commercial
 *    offer, which is not what was decided.
 * 3. The second door is honest about Sprint 012 being a designated slip
 *    absorber. Land, plots and instalments may not ship at all, and the door
 *    that leads there says so before the reader clicks it rather than after.
 *
 * "Ethanel never holds rent" is the other answer that decides deals, so it is
 * in the subhead rather than only in the FAQ: funds settle to the
 * organization's own client account, which is what the *client account cash*
 * ledger account exists to model.
 */
export const hero: HeroContent = {
  h1: 'Rent that reconciles itself against a double-entry ledger',

  subhead:
    'Ethanel is letting and property management software for Kenyan agencies: M-Pesa payments post and match against an append-only ledger, and the money settles to your own client account, never to ours.',

  riskReversal:
    "For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don't agree, you don't go live.",

  primaryCta: { label: 'Request a demo', href: '/demo' },

  // Deliberately not `variant="primary"`: acceptance row 5 counts exactly one
  // `data-cta="primary"` element per 844px scroll step, and the hero spends it
  // on the demo request.
  secondaryCta: { label: 'See how reconciliation runs', href: '/features/reconciliation' },

  doors: [
    {
      label: 'For letting and management agencies',
      href: '/solutions/letting-agencies',
      description:
        'Rent runs, M-Pesa reconciliation, repairs and landlord statements for an agency that manages buildings it does not own.',
    },
    {
      label: 'For land and plot sellers',
      href: '/solutions/land-and-plot-sellers',
      description:
        'Plot inventory, subdivisions and instalment schedules. Scheduled for Sprint 012, which is the slip absorber and may not ship — the page says so.',
    },
  ],
}
