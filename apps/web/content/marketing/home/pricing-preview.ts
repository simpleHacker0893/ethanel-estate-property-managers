import type { PricingPreviewContent } from '../types'

/**
 * S14 — the pricing preview, and the section most likely to grow a number that
 * nobody decided on.
 *
 * Q7 is open: the tiers are not set. D-64 says build the mechanism and defer
 * the value, so this section ships the pricing *model* and a pilot path, and no
 * figure at all — not a range, not a "from", not an illustrative example. An
 * example price on a public page is read as a quotation by every visitor who
 * sees it, and the first pilot conversation then starts from a number that was
 * invented to fill a layout.
 *
 * The gap is marked rather than hidden, so the thing that closes it is a
 * decision and not a rediscovery. A vitest greps this directory for price
 * patterns, which is the backstop for the same rule.
 */
export const pricingPreview: PricingPreviewContent = {
  heading: {
    eyebrow: 'Pricing',
    title: 'Priced per unit under management',
    lede: 'The shape of the pricing is settled. The numbers are not, and we would rather show you the model than publish a figure we would have to take back.',
  },

  // TODO(pricing): Q7 — the per-unit tier table goes here once the tiers are
  // agreed with the first pilot partners. Until then this array carries the
  // model only. Adding a figure to any string below, including an illustrative
  // one, breaks the content-truth test and D-64 along with it.
  model: [
    'You pay for each unit under management, so what you pay tracks the size of the portfolio you actually manage.',
    'Billing is monthly, to the organization rather than to each member of staff. Adding a colleague does not change the bill.',
    'Your tier depends on how many units you manage and which capabilities you switch on, so an agency running rent collection alone is not priced like one running repairs, documents and the marketplace too.',
    'Pilot partners are priced individually while the tiers are being settled, against the portfolio and the capabilities in front of us.',
  ],

  note: 'We are setting the tiers with our first pilot partners, which is why there is no figure on this page yet. Tell us the size of your portfolio and what you need it to do, and you will get a pilot price in writing with the assumptions it rests on.',

  cta: { label: 'Ask about a pilot', href: '/demo' },
}
