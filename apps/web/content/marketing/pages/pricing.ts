import type { StandardPageContent } from '../types'

/**
 * `/pricing` — a pricing page with no price on it, on purpose.
 *
 * Q7 is open: the tier table is not decided. The tempting move is to publish an
 * illustrative figure "just so the page has something", and that move is the
 * one thing this page may not make. A number on a pricing page is read as a
 * quote, gets screenshotted into a landlord's WhatsApp group, and becomes the
 * anchor every later conversation argues against. An example price is not
 * softer than a real one; it is a real one that nobody inside the company has
 * agreed to. So the page ships the part that is actually settled — the shape of
 * the charge — and routes the number itself to a conversation.
 *
 * What is settled is the basis: the charge scales with units under management,
 * and it does not scale with the people around those units. That distinction is
 * the one an agency owner is really testing for when they open this page. They
 * have been quoted per-seat before, watched the bill climb as they onboarded
 * caretakers and landlords, and learned to add users grudgingly. Saying plainly
 * that residents, landlords and caretakers are not billable, and that Ethanel
 * takes no share of the rent it never holds, answers the fear behind the
 * question even while the figure is missing.
 *
 * What this page deliberately refuses to say: any figure, in any currency, in
 * any unit — no tier count, no band, no "from", no "typically", no range, and
 * no free-trial length. It refuses to describe billing as something that runs
 * today, because `billing` is scheduled for Sprint 012 and Sprint 012 is the
 * designated slip absorber that may not ship at all. It refuses to restate the
 * design targets that would make the value case; those are bounded numbers and
 * they live on `/security`, which this page links to instead.
 *
 * The honest consequence of all that is a short page. A short page that can be
 * defended line by line is worth more here than a long one that cannot.
 */
export const pricing: StandardPageContent = {
  slug: '/pricing',

  meta: {
    title: 'Pricing: the model now, the tier table when it is decided',
    description:
      'How Ethanel is priced — charged against units under management, never per resident, landlord or caretaker, and never a share of rent. Ask for a pilot quote.',
  },

  hero: {
    eyebrow: 'Pricing',
    h1: 'The pricing model, published before the price is',
    lede: 'We have settled what you would be charged for and what you would not. We have not settled the figure, and we would rather leave it blank than print one we have not agreed to.',
  },

  blocks: [
    // TODO(pricing): Q7 — the tier table is not decided. When it is, a facts
    // block of tiers (tier name -> what is included -> the per-unit charge)
    // lands directly beneath "What the charge scales with", and the "Why there
    // is no number here yet" prose block below is deleted rather than edited.
    // Nothing else on this page changes: the basis, the exclusions and the
    // pilot-quote path are settled and survive the tier decision. Until Q7
    // closes, no figure, no currency, no band and no example belongs in this
    // file — an illustrative price is a published price.
    {
      kind: 'prose',
      links: [{ label: 'How we bound every number', href: '/security' }],
      heading: {
        eyebrow: 'The basis',
        title: 'What the charge scales with',
        lede: 'One meter, and it is the one an agency already counts.',
      },
      paragraphs: [
        'Ethanel is charged against units under management — the units on your management agreements, the same count you already reconcile your own fees against. It is the only number in the arrangement that moves, which means you can work out what a new block does to your bill before you sign the agreement for it.',
        'A unit counts while it is under management, whether or not it is occupied that cycle. We would rather bill a vacant unit than build a discount that gives an agency a reason to take units off the books and quietly out of the ledger. An arrangement that rewards incomplete data is an arrangement that destroys the reconciliation it was sold to deliver.',
        'Plots are their own inventory rather than units, and plot sales are governed by the listing and billing work scheduled for Sprint 012 — a sprint explicitly designated to absorb slippage, and which may not ship. Until that lands, plot inventory is out of scope for any arrangement we would quote you, and we will say so rather than sell week twelve as though it were certain.',
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'The exclusions',
        title: 'What is not billable, stated so you can plan around it',
        lede: 'These are the lines agencies have been burned on before, so each one is written as a commitment rather than a footnote.',
      },
      rows: [
        {
          label: 'Residents are not billable',
          value:
            'A resident portal login, a WhatsApp conversation and a repair request raised by a resident add nothing to what you pay. The messaging and ops work scheduled for Sprints 008 and 009 is not metered per person.',
        },
        {
          label: 'Landlords are not billable',
          value:
            'Giving a landlord read access to their own statements, drawn live from the ledger by reporting, does not add a chargeable seat. An agency that hides statements from landlords to keep a bill down is an agency losing the account.',
        },
        {
          label: 'Caretakers and staff are not billable',
          value:
            'Caretaker accounts and internal staff seats are not counted. Caretakers are online-only in the pilot, on deliberately low-data screens, and adding them should be a decision about operations rather than about cost.',
        },
        {
          label: 'Rent is not shared',
          value:
            'Ethanel takes no cut of collected rent and no share of your commission, for the structural reason set out on the security page: funds settle to your own client account and Ethanel is never in the money path.',
        },
        {
          label: 'Your own data import is not chargeable',
          value:
            'Organizations import their own data self-serve, with a dry run, a row-level validation report and a rollback. There is no onboarding fee attached to a job you run yourself.',
        },
        {
          label: 'Postings and entries are not metered',
          value:
            'Invoices raised, payments matched, reversals and allocations posted by money and payments are not counted against you. Metering the ledger would punish the agency that keeps the most complete books.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'The path',
        title: 'How a pilot quote gets put together',
        lede: 'While Q7 is open this is the only way to get a figure, and it is a conversation rather than a form.',
      },
      steps: [
        {
          title: 'You tell us the unit count and the shape of the portfolio',
          body: 'How many units sit under management agreements today, how they split across properties and landlords, and whether any of it is plot inventory rather than units. The count is the basis, so the quote starts there.',
          source: 'units under management',
        },
        {
          title: 'We scope the quote to capabilities with a sprint against them',
          body: 'Nothing on this site has shipped. A quote therefore names which scheduled capabilities the pilot depends on — the ledger and rent runs in Sprints 005 and 006, payments and reconciliation in Sprint 007 — so you can see what you would be waiting for.',
          source: 'Sprints 005–007',
        },
        {
          title: 'We run one rent cycle in parallel before anything is switched',
          body: 'A pilot is graded against your existing spreadsheet, not against a demo. The two sets of books are compared at the end of the cycle, and disagreement is a reason to stop rather than a defect to log.',
          source: 'the pilot gate',
        },
        {
          title: 'The commercial terms are agreed in writing, per organization',
          body: 'Self-serve plans, usage counters and per-organization feature flags belong to billing, which is scheduled for Sprint 012 and may not ship. Pilot terms therefore sit in a signed agreement rather than in a plan picker.',
          source: 'Sprint 012, may not ship',
        },
      ],
    },
    {
      kind: 'prose',
      heading: {
        eyebrow: 'The gap, named',
        title: 'Why there is no number here yet',
      },
      paragraphs: [
        'The tier table is an open question inside the company. We know the basis and we know the exclusions; we do not yet know where the bands sit or how many there are. Publishing a figure now would mean either revising it in public later or defending a number chosen to fill a gap on a web page.',
        'An illustrative price is not a smaller commitment than a real one. It gets quoted back in negotiation, forwarded to landlords and compared against competitors as though it were final, and nothing about the word "from" prevents any of that.',
        'So this page carries the model and a route to a human, and it will carry the table the day the table is decided. If you need a figure before then, ask for a pilot quote and you will get one that somebody has signed their name to.',
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Get a quote against your actual unit count',
      lede: 'Bring the number of units under management and the questions your landlords ask about custody. Both are better answered in a conversation than on a page with a blank where the price goes.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
