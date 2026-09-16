import type { StandardPageContent } from '../types'

/**
 * `/solutions/landlords` — written for the agency's client, not for the
 * agency's buyer.
 *
 * A landlord does not choose this platform and is not being sold it. They are
 * being handed it by the firm that manages their building, which makes their
 * question different from every other page on this site: not "will this save my
 * agency time" but "does this make it harder or easier for something to go
 * wrong with my money". The page answers in that order.
 *
 * Custody is first, at length, and repeated from `/security` on purpose.
 * "Where does my rent actually sit" is the first question a landlord asks an
 * agency, and it is the question that decides whether the agency can adopt
 * anything at all. The answer is that Ethanel never holds rent: funds settle to
 * the client account the organization already runs, and the two ledger accounts
 * that model the path — cash in transit and client account cash — exist because
 * that boundary is real. A reader arriving here from a search result has not
 * seen the home page, so it is stated in full rather than linked to.
 *
 * What the page deliberately refuses:
 *
 *   - Setting the landlord against their agency. It would be easy to write copy
 *     implying that agencies need watching. It would also poison the sale, and
 *     it is not what we believe: the agency is the customer and the landlord is
 *     the beneficiary of the same record.
 *   - Any figure. Statement freshness is one of the four publishable design
 *     targets and it is stated here as a property — read at the moment you open
 *     it, with a last-updated stamp — while the target and its bound stay on
 *     `/security`.
 *   - Dates a landlord could plan around. Remittance timing is set by the
 *     management agreement with the agency, not by us, and inventing a
 *     settlement day here would be inventing a term of somebody else's
 *     contract.
 *   - Present-tense capability. The landlord portal is Sprint 010 and the
 *     statements underneath it are Sprint 006. Neither has shipped.
 */
export const landlords: StandardPageContent = {
  slug: '/solutions/landlords',

  meta: {
    title: 'Ethanel for landlords: custody, statements and the ledger behind them',
    description:
      'Your rent settles to your agency’s own client account, never to Ethanel. Here is what that means, and what a statement read from a ledger shows.',
  },

  hero: {
    eyebrow: 'Landlords',
    h1: 'Where your rent sits, and what your statement is made of',
    lede: 'Your agency chooses its software. You live with the consequences at month end. This page is the plain version of what Ethanel does with your money — starting with the fact that it never holds any of it — and what is scheduled when, because nothing here has shipped.',
  },

  blocks: [
    {
      kind: 'prose',
      links: [{ label: 'How we bound every number', href: '/security' }],
      heading: {
        eyebrow: 'Custody',
        title: 'Ethanel never holds your rent',
        lede: 'This is the first question, so it is the first answer.',
      },
      paragraphs: [
        'A resident pays over M-Pesa. Those funds settle into the bank account your agency already runs for client money — the account your rent has always been expected to sit in. Ethanel opens no account of its own, takes no float and sweeps no balance. There is no Ethanel-controlled place for your rent to be, which means there is nothing for anyone here to hold on to, delay or lose.',
        'What Ethanel holds is the record. Two accounts in the ledger describe where the money has got to: cash in transit is money that has settled at M-Pesa but has not yet landed in the client account, and client account cash is money that has. When the bank credit arrives, the balance moves from the first to the second and an entry records the move. So "the rent has been paid" and "the rent has reached the client account" are two different statements, and the record can tell you which one is true today.',
        'Your remittance timing is a term of your management agreement with your agency. It is not something this platform sets, and we are not going to print a settlement day here that your agency never agreed to. What the platform is being built to do is make the agreement checkable: what came in, what was deducted, under what authority, and what is left.',
        'The bounds behind that — including the exact denominators for every design target published anywhere on this site — are on the security page.',
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Straight answers',
        title: 'The four questions landlords actually ask',
        lede: 'Answered as the design commits to answering them, with the sprint that schedules each.',
      },
      rows: [
        {
          label: 'Where is my rent right now?',
          value:
            'In your agency’s client account, or in transit to it, and the ledger says which. Never with Ethanel. The client account cash and cash in transit accounts exist to model exactly this distinction (Sprints 005 and 007).',
        },
        {
          label: 'When do I get my statement, and what is it made of?',
          value:
            'The statement is rendered from the ledger rather than assembled by hand, so it cannot disagree with the entries behind it. Commission and VAT appear as postings that trace back to the entry that made them. Statement and document rendering is Sprint 006; the portal you read them in is Sprint 010.',
        },
        {
          label: 'Can I trust the figures on it?',
          value:
            'Figures are read from the ledger at the moment you open them and carry a last-updated stamp, rather than being a cached summary from the last time someone ran a report. If a figure is stale, the page says when it was taken instead of implying it is current.',
        },
        {
          label: 'What happens to a deposit?',
          value:
            'A deposit held is a liability, not income. It sits in the deposit liability account for the whole lease lifecycle — move-in, renewal, notice, move-out — and never quietly becomes a month of rent that has already been counted.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'The path',
        title: 'From a resident’s payment to your remittance',
        lede: 'Five stages, each one leaving an entry behind it.',
      },
      steps: [
        {
          title: 'The invoice is raised against the lease',
          body: 'Not against the resident and not against the unit. The receivable belongs to the lease, so where a lease has two parties paying separately, both payments settle the same invoice rather than creating two versions of what is owed.',
          source: 'money · Sprint 005',
        },
        {
          title: 'The payment arrives and is attributed',
          body: 'Account reference first, then the payer phone on file, then an exact amount against open invoices, oldest first. An overpayment becomes a credit against the next invoice rather than a figure somebody has to remember.',
          source: 'payments · Sprint 007',
        },
        {
          title: 'Anything unattributed is still in the books',
          body: 'A payment that cannot be matched posts to suspense on arrival and waits in a queue for a person to allocate it. This matters to you because it means an odd payment is never money that went missing; it is money recorded in the wrong place on purpose, visible, with someone required to move it.',
          source: 'payments · Sprint 007',
        },
        {
          title: 'Deductions post as they are incurred',
          body: 'Repairs expense posts against the property when the work order closes, with the vendor named. Agency commission income and VAT payable post as entries. Nothing is a line typed into a statement on the last day of the month.',
          source: 'ops and money · Sprints 006 and 008',
        },
        {
          title: 'Your statement renders what is already there',
          body: 'Because every stage above posted an entry, the statement is a document made from the record rather than a summary made alongside it. If you query a single figure, the answer is the entry, not a reconstruction.',
          source: 'docs · Sprint 006',
        },
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'Limits',
        title: 'What this page is not claiming',
        lede: 'Said here rather than discovered later.',
      },
      items: [
        {
          title: 'Nothing here has shipped',
          body: 'No sprint is complete, no agency is running on this, and no landlord has yet read a statement out of it. Every capability above is named with the sprint that schedules it precisely so that this sentence and the rest of the page cannot drift apart.',
        },
        {
          title: 'We are not your supplier',
          body: 'Your agency holds the management agreement and the relationship. Ethanel is the system they keep the record in. If a figure looks wrong, your agency is still who you ask, and the point of the design is that they can answer you without guessing.',
        },
        {
          title: 'A ledger does not make an agency honest',
          body: 'It makes a mistake visible and a correction traceable. Postings are immutable and a reversal carries a mandatory reason, so what changed and why is on the record. That is a smaller claim than trust, and it is the one we can actually support.',
        },
        {
          title: 'Reading your own figures is Sprint 010',
          body: 'Until the landlord portal is built, statements reach you the way your agency sends them. The ledger underneath is Sprints 005 and 006; the place you log into and read it for yourself comes later, and describing that order plainly is the whole point of this page.',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Send this to whoever manages your building',
      lede: 'Agencies book the demo, and the questions worth bringing to it are the ones on this page.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
