import type { StandardPageContent } from '../types'

/**
 * `/solutions/letting-agencies` — the only one of the four solutions pages
 * written for the person who signs the management agreement and pays for the
 * platform. Everything about its register follows from that.
 *
 * The reader manages buildings they do not own. Their exposure is not that the
 * software is slow; it is that a landlord asks where a payment went and the
 * answer takes two days and a spreadsheet. So the page is organised around
 * proving the books rather than around features: the rent cycle is laid out in
 * the order it is designed to run, the reconciliation order is stated as the
 * fixed sequence it is, and suspense is described as a ledger position rather
 * than as an error state, because that is the detail an agency principal
 * recognises as written by someone who has done month end.
 *
 * What the page deliberately refuses:
 *
 *   - Numbers. Three of the four publishable design targets are about exactly
 *     this audience, and every one of them is only true inside a denominator.
 *     A solutions page that prints the figure and not its bound is publishing a
 *     different figure, so the figures stay on `/security` and this page points
 *     at it. One place to correct, no chance of two pages disagreeing.
 *   - The present tense about operational capability. No sprint has shipped and
 *     no agency is running on this. Every capability below is named with the
 *     sprint that schedules it, which is the difference between a commitment
 *     and a claim.
 *   - Time saved, effort removed, or any other improvement expressed as a
 *     comparison against a spreadsheet nobody measured. The honest comparison
 *     offered instead is the pilot one in the closing line: run a cycle on both
 *     and see whether the books agree.
 *   - Any customer, logo, rating, price or units-under-management figure. There
 *     are no pilot partners yet and inventing one would be the most expensive
 *     sentence on this site, because it would be built on.
 */
export const lettingAgencies: StandardPageContent = {
  slug: '/solutions/letting-agencies',

  meta: {
    title: 'Ethanel for letting and management agencies',
    description:
      'Rent runs, M-Pesa reconciliation, repairs and landlord statements posted to one append-only ledger, with the sprint that schedules each named.',
  },

  hero: {
    eyebrow: 'Letting and management agencies',
    h1: 'You are accountable for money that was never yours',
    lede: 'An agency carries the arrears conversation, the repair that went wrong and the landlord who wants to know where a payment went. Ethanel is being built so the answer is a ledger entry you can point at, not a reconstruction. Nothing here has shipped yet, and every capability below names the sprint that schedules it.',
  },

  blocks: [
    {
      kind: 'prose',
      links: [
        { label: 'Land and plot sellers', href: '/solutions/land-and-plot-sellers' },
        { label: 'How we bound every number', href: '/security' },
        { label: 'How Ethanel is priced', href: '/pricing' },
      ],
      heading: {
        eyebrow: 'The job',
        title: 'Month end is not when the rent arrives',
        lede: 'It is when every payment has been attributed to the lease that owed it and every deduction can be explained to the person it was taken from.',
      },
      paragraphs: [
        'Rent arrives over M-Pesa in the shape the payer chose. A payment comes in under a name that is not on the lease, for an amount that is not the rent, from a phone the agency has seen before but never wrote down. Two parties on one lease pay separately, on different days, and both expect their halves to land against the same invoice. None of that is unusual, and all of it has to end up in the right place before a statement can be produced.',
        'The part that hurts is not the collecting. It is the proving. A landlord asks about one payment from four months ago and the answer has to survive being checked: which invoice it was applied to, what was deducted, who authorised the deduction, and why the figure on the statement is the figure in the bank. When that answer lives in a spreadsheet, it is reconstructed rather than retrieved, and a reconstruction is only as good as whoever is doing it that morning.',
        'So the design decision underneath this page is that the ledger is the record and the statement is a rendering of it. Double entry, enforced: debits equal credits on every entry, against a fixed chart of nine accounts, held in KES. Postings are immutable. A posting that was wrong is corrected by a reversal, which is itself an entry carrying a mandatory reason, and the original stays where it was.',
        'That is also what makes an agency able to answer a landlord without opening the software in front of them. The number on the statement is derived from entries. A number that is derived can be defended. A number sitting in a field is a number somebody can have changed.',
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'The cycle',
        title: 'How a rent cycle is designed to run',
        lede: 'In this order and no other. The sequence is the product; everything else is rendering.',
      },
      steps: [
        {
          title: 'The rent run raises the invoices',
          body: 'One run across the units under management, posting lease receivable against the schedule on each lease. The run is idempotent and resumable, which is the property that matters when a connection drops halfway: executing it twice is safe, so nobody has to work out what it managed to do before it stopped.',
          source: 'money · Sprint 005',
        },
        {
          title: 'The M-Pesa callback is captured before it is understood',
          body: 'An inbound callback is verified, persisted and acknowledged, and only then processed. Nothing is handled inline on the way in, so a burst of callbacks becomes a queue rather than a set of payments that were never recorded.',
          source: 'gateway and payments · Sprint 007',
        },
        {
          title: 'The payment is attributed in a fixed order',
          body: 'Account reference on the unit first. Then the payer phone on file, which resolves to a lease and not to a person, because the receivable belongs to the lease and two parties may be paying against it. Then an exact amount against open invoices, oldest invoice first. An overpayment becomes a credit rather than a rounding conversation.',
          source: 'payments · Sprint 007',
        },
        {
          title: 'Whatever is left posts to suspense immediately',
          body: 'An unattributed payment is money in the ledger from the moment it arrives; it is simply not attributed yet. It waits in the manual match queue for a person to allocate it. An allocation is not a reversal and not a correction: it carries no reason, and it is not subject to an approval threshold. Only a reversal is.',
          source: 'payments · Sprint 007',
        },
        {
          title: 'Repairs post as expense when the work order closes',
          body: 'A resident raises a repair request; staff dispatch a work order against it. New, triaged, assigned, in progress, awaiting approval, awaiting resident confirmation, closed. Repairs expense posts against the property when the work order closes, with the vendor named, so it reaches the statement as an entry rather than as a line somebody remembered to add.',
          source: 'ops · Sprint 008',
        },
        {
          title: 'The landlord statement is rendered from the ledger',
          body: 'Agency commission income and VAT payable appear as postings that trace back to the entries that created them. Deposits held sit as a deposit liability and never as income. The statement is a document produced from the record, so it cannot disagree with the record.',
          source: 'money and docs · Sprint 006',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Availability',
        title: 'What is scheduled, and when',
        lede: 'No sprint has shipped. This table is a plan you can hold us to, not an inventory.',
      },
      rows: [
        {
          label: 'Ledger, invoicing, rent runs, statements',
          value:
            'Sprints 005 and 006. Double entry against the fixed chart of nine accounts, immutable postings, reversals with a mandatory reason, statements and receipts rendered as documents.',
        },
        {
          label: 'M-Pesa reconciliation, suspense, the manual match queue',
          value:
            'Sprint 007. The attribution order above, with everything unattributed posting to suspense on arrival rather than sitting outside the books until someone gets to it.',
        },
        {
          label: 'Repairs and work orders',
          value:
            'Sprint 008. Repair requests from residents, work orders dispatched against them, expenses and vendors, and the approval step before money is committed.',
        },
        {
          label: 'WhatsApp and notifications',
          value:
            'Sprint 009. WhatsApp as the primary channel with SMS as fallback and email for documents. One assignee per conversation; everyone else on it is read-only. Financial notices are mandatory and cannot be switched off.',
        },
        {
          label: 'Landlord and resident portals',
          value:
            'Sprint 010. Your landlords stop asking you for the statement and go and read it, which is the point at which the arrears conversation changes shape.',
        },
        {
          label: 'Marketplace, storefronts and viewings',
          value: 'Sprint 011. Listings, a public storefront per organization, and booked viewings.',
        },
        {
          label: 'Land, plots, instalments and SaaS billing',
          value:
            'Sprint 012, which is the designated slip absorber in our plan and may not ship at all. If you are here for the land side, the page for land and plot sellers says so at more length.',
        },
        {
          label: 'The bounds on every number we publish',
          value:
            'Set out on the security page, with the denominator that makes each one true. They are engineering targets for a system still in build and none of them is a customer result, so they are stated in one place rather than repeated in sales copy.',
        },
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'Straight answers',
        title: 'The things an agency owner asks in the first ten minutes',
        lede: 'Including the ones with answers we would rather you heard from us than found out later.',
      },
      items: [
        {
          title: 'Ethanel never holds your rent',
          body: 'Funds settle to the bank account your organization already runs for client money. Two ledger accounts model the path: cash in transit for money that has settled at M-Pesa but not yet reached the client account, and client account cash for money that has. There is no Ethanel-controlled balance, which is why this is architecture rather than policy. The detail is on the security page.',
        },
        {
          title: 'No agency is running on this yet',
          body: 'There are no pilot partners, no case studies and no units under management to cite. Anyone selling you property software with none of those and a wall of customer logos is showing you someone else’s. We would rather be the boring option that says so.',
        },
        {
          title: 'You import your own data',
          body: 'Self-serve, with a dry run first, a row-level validation report naming what failed and why, and a rollback. An import that cannot be undone is a decision made under pressure, and the first week is the worst time to be making one.',
        },
        {
          title: 'Corrections are entries, not edits',
          body: 'There is no screen anywhere that changes a posted figure. A reversal is a new entry with a mandatory reason and an approval threshold behind it. The trail shows what happened and what was later decided about it, which is the property an auditor is actually asking about.',
        },
        {
          title: 'Caretakers are online-only in the pilot',
          body: 'Their screens are built for a weak connection rather than an office desk, but they need one. Offline capture is not in the pilot scope and we are not going to describe it as though it were.',
        },
        {
          title: 'Pricing is not settled',
          body: 'The model is on the pricing page and there is no number on it, not even an illustrative one, because an illustrative price on a public page is read as a quotation. Pilot terms are agreed in the conversation, not inferred from a page.',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Bring your worst month end',
      lede: 'The reconciliation you would most like to see this fail on is the one worth walking through together.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
