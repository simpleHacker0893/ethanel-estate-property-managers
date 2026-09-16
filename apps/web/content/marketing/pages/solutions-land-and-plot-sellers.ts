import type { StandardPageContent } from '../types'

/**
 * `/solutions/land-and-plot-sellers` — the page most likely to be read as a
 * promise, and therefore the one written hardest against being one.
 *
 * Plot inventory, subdivisions, instalment schedules and the SaaS billing that
 * sits beside them are Sprint 012 work. Sprint 012 is the designated slip
 * absorber in our plan: it exists so that when the ledger, the payments rail or
 * reconciliation run long — and some of them will — the delay lands somewhere
 * that is not the core. That means this is the work that gets cut, and it may
 * not ship at all.
 *
 * So the uncertainty is not a badge in a corner. It is in the eyebrow, in the
 * h1, in the lede and in the first block, because a reader who never hovers
 * anything must still close this tab knowing that the land side is an intent
 * and not a product. A badge is something you hover; a sentence is something
 * you read.
 *
 * The phrase this page refuses is "coming soon", which converts an uncertainty
 * into a promise without anyone having decided to make one. It also refuses a
 * date, a beta list and an order of precedence between land customers, all of
 * which would be ways of implying a commitment while appearing to withhold one.
 *
 * Two boundaries kept straight, because a land seller reading this deserves to
 * know which half is which. The ledger, the payment rail and reconciliation are
 * genuinely scheduled — Sprints 005 to 007 — and they are what a plot business
 * would eventually rest on. Plot inventory and instalment schedules are not.
 * And the automatic attribution order starts at the account reference on a unit,
 * which a plot does not carry, so plot instalments are excluded from the
 * automatic-match measurement by construction rather than by omission; the
 * bound is stated on `/security` and not restated here.
 *
 * Nothing about plot economics appears anywhere on this page: no price, no
 * deposit shape, no schedule length, no parcel size. None of it is settled, and
 * an illustration would be read as a specification.
 */
export const landAndPlotSellers: StandardPageContent = {
  slug: '/solutions/land-and-plot-sellers',

  meta: {
    title: 'Land and plot sellers: Sprint 012, and it may not ship',
    description:
      'Plot inventory, subdivisions and instalment sales are Sprint 012 — the release our plan absorbs slippage into. It may not ship at all. Read it as intent.',
  },

  hero: {
    eyebrow: 'Land and plot sellers · Sprint 012 · may not ship',
    h1: 'The land side of Ethanel may never be built, and we are not going to sell it as though it will',
    lede: 'Plot inventory, subdivisions, instalment sales and the billing beside them are Sprint 012, the release our plan deliberately absorbs slippage into. If the sprints before it run long, this is what gets cut. Everything below is a design we are willing to be held to, not a capability you can buy.',
  },

  blocks: [
    {
      kind: 'prose',
      links: [{ label: 'How we bound every number', href: '/security' }],
      heading: {
        eyebrow: 'Read this first',
        title: 'Sprint 012 is the designated slip absorber, and it may not ship at all',
        lede: 'The rest of this page only makes sense once that is out of the way.',
      },
      paragraphs: [
        'Every plan needs somewhere for delay to go. In ours that place is Sprint 012, and land is what lives there. The ledger, invoicing, the M-Pesa rail and reconciliation are scheduled ahead of it, and if any of them takes longer than planned — which is the normal outcome of building a payments integration against somebody else’s system — Sprint 012 is the work that absorbs it. Not deferred by a week. Cut.',
        'We could have written this page without saying that. The words would have been about parcels and schedules and buyer receipts, the availability label would have sat in a badge somewhere, and a land-selling business could have read the whole thing and come away believing it was buying something. That is a specific kind of dishonesty the rest of this site is built to avoid, and it would be worst here, because a land business making a system decision on a roadmap intent has made an expensive mistake on our account.',
        'You will not find the usual softening phrase here either — the two words that turn an uncertainty into a promise while sounding cautious about it. There is no date behind them. There is no beta list either, and no queue position to hold.',
        'If land is the reason you came, the useful thing you can do with this page is judge whether the thinking below matches the problem you have. If it does, tell us — what land sellers actually need is one of the inputs to whether Sprint 012 survives at all.',
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'The design',
        title: 'The shape we would build, if it is built',
        lede: 'Written as a design, in the present tense of a drawing rather than of a product.',
      },
      steps: [
        {
          title: 'A parent parcel is subdivided into plots',
          body: 'The parcel is the thing that was bought; the plots are the things that get sold. Each plot carries its own identity and its own state, and the state has to be right, because two buyers being sold the same plot is not a data-quality problem — it is a lawsuit.',
          source: 'listing · Sprint 012 · may not ship',
        },
        {
          title: 'A plot is listed, viewed and reserved',
          body: 'A plot appears on the public storefront, a prospect books a viewing against it, and the lead is a record while the prospect is a person. A reservation moves the plot out of the sellable set rather than leaving that to whoever answers the phone next.',
          source: 'listing · Sprint 012 · may not ship',
        },
        {
          title: 'The sale is paid down on a schedule',
          body: 'Instalments post into the same double-entry journal as everything else rather than into a schedule of their own: held in KES, debits equal credits, postings immutable, a correction made as a new entry carrying a reason. A balance derived from entries is a balance you can defend years later, which is the requirement that decides this design.',
          source: 'money · Sprint 012 · may not ship',
        },
        {
          title: 'A plot payment reaches the review queue, by design',
          body: 'Automatic attribution begins with the account reference on a unit. A plot carries a label instead, so plot instalments are excluded from the automatic-match measurement and a plot payment is expected to be allocated by a person. We would rather say that than let deferred work quietly flatter a go-live measurement. The bound on that measurement is on the security page.',
          source: 'payments · Sprint 007 · the exclusion is deliberate',
        },
        {
          title: 'The buyer gets a receipt that still makes sense in five years',
          body: 'Receipts and statements are rendered from the ledger, so a document produced long after the sale says what it was for, what it paid down and what was outstanding at the time. That is the test a land document has to pass and a spreadsheet row does not.',
          source: 'docs · Sprint 012 · may not ship',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'What is real and what is not',
        title: 'Two halves, kept apart on purpose',
        lede: 'The foundations a plot business would rest on are scheduled. The plot-specific work is not.',
      },
      rows: [
        {
          label: 'Genuinely scheduled: the ledger and invoicing',
          value:
            'Sprints 005 and 006. Double entry against a fixed chart of nine accounts, immutable postings, reversals with a mandatory reason, documents rendered from the record. Scheduled is not shipped — no sprint is complete — but this work is not in the slip absorber.',
        },
        {
          label: 'Genuinely scheduled: the M-Pesa rail and reconciliation',
          value:
            'Sprint 007. Callbacks verified, persisted and acknowledged before processing; unattributed money posting to suspense on arrival and waiting in a manual match queue rather than sitting outside the books.',
        },
        {
          label: 'May not ship: plot inventory and subdivisions',
          value:
            'Sprint 012. Parent parcels, the plots they divide into, plot state and the storefront a plot is listed on.',
        },
        {
          label: 'May not ship: instalment schedules and buyer statements',
          value:
            'Sprint 012. A plot paid down over time, posting into the shared journal, with receipts and statements rendered from it.',
        },
        {
          label: 'May not ship: SaaS billing and usage counters',
          value:
            'Sprint 012. Plans, usage counters and per-organization feature flags sit in the same release, which is part of why it is the one that can move.',
        },
        {
          label: 'Not planned at all',
          value:
            'Title search, survey, transfer, land-registry integration and anything else that belongs to an advocate or a surveyor. Ethanel would hold the commercial record of a plot sale, not its legal one, and it is not a substitute for either professional.',
        },
        {
          label: 'The numbers and their bounds',
          value:
            'On the security page, with the denominator behind each one, including why plot instalments are outside the automatic-match denominator. They are engineering targets for a system in build, not results.',
        },
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'Refusals',
        title: 'What this page will not do, even though it would help us',
        lede: 'Each of these would convert an honest uncertainty into an implied commitment.',
      },
      items: [
        {
          title: 'No date',
          body: 'Not a quarter, not a month, not "after the core". Sprint 012 follows eleven sprints that have not run yet, and any date we printed would be arithmetic performed on guesses.',
        },
        {
          title: 'No waiting list',
          body: 'A list implies an order of service for a product that may not exist. If you want to be part of deciding whether it exists, that is a conversation, not a queue.',
        },
        {
          title: 'No plot economics',
          body: 'No price, no deposit shape, no schedule length, no parcel size, no illustrative example of any of them. An illustration on a public page is read as a specification, and none of this is settled.',
        },
        {
          title: 'No borrowed credibility from the rental side',
          body: 'The ledger being scheduled does not make plot inventory scheduled. Those are separate commitments and this page keeps them separate, which is why the table above has two halves rather than one list.',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Tell us what a plot business actually needs',
      lede: 'A demo walks through the rental side as it is being built. The land part of that conversation is research, and it is one of the inputs to whether Sprint 012 survives.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
