import type { FinalCtaContent } from '../types'

/**
 * S16 — the closing call to action, and the one primary call to action this
 * slice is allowed to spend.
 *
 * Acceptance row 5 counts `data-cta="primary"` elements intersecting each 844px
 * scroll step and fails when two land in the same screenful, so the security,
 * pricing and FAQ sections above deliberately use quiet links. This band is
 * where the primary variant is used.
 *
 * `reassurance` carries the risk-reversal line verbatim. It is scoped to pilot
 * partners on purpose: published unscoped it converts a one-off pilot gate
 * (ROADMAP Sprint 016, VALIDATION §3) into a standing commercial offer that
 * nobody agreed to make. The other deal-deciding fact — that Ethanel never
 * holds rent — is restated in the lede, because the last thing a reader sees
 * before deciding whether to fill in a form should be the objection they came
 * with.
 */
export const finalCta: FinalCtaContent = {
  heading: {
    eyebrow: 'Next step',
    title: 'See the rent run, the match queue and the statement',
    lede: 'A walkthrough on demonstration data, labelled as demonstration data, with your questions in the middle of it. Nothing to install, and the money never moves through us.',
  },

  primaryCta: { label: 'Request a demo', href: '/demo' },

  reassurance:
    "For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don't agree, you don't go live.",
}
