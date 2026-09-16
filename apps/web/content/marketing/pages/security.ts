import type { StandardPageContent } from '../types'

/**
 * `/security` — the page every design target on the site links back to.
 *
 * That link is the reason this page exists in the shape it does. Four numbers
 * are publishable anywhere on the site, and each one is only true inside a
 * bound: 95% auto-matched is 95% *of rent and charge payments against open
 * invoices*, with deposits and plot instalments excluded (D-39 as bounded by
 * D-66). A page that prints the number and not the denominator is printing a
 * different number. So the bounds live here, in one table, and every other page
 * points at it rather than restating it — one place to correct when a target
 * moves, and no chance of two pages disagreeing about what 95% counts.
 *
 * The tense rules are load-bearing here more than anywhere else. Nothing has
 * shipped, no agency is live, and no restore drill has been run — Sprint 004
 * schedules the first one. Every line therefore states a commitment or a
 * design, never a routine. "We test restores quarterly" would be a lie told in
 * the present tense; "the first restore drill is scheduled for Sprint 004" is
 * the same intent and true.
 *
 * Custody is repeated from the landing page on purpose. It is the question that
 * decides the deal, and a reader who arrives here from a search result has not
 * seen the home page.
 */
export const security: StandardPageContent = {
  slug: '/security',

  meta: {
    title: 'Security, custody and the bounds on every number we publish',
    description:
      'Where rent actually sits, what the append-only ledger guarantees, and the exact denominator behind each design target Ethanel publishes.',
  },

  hero: {
    eyebrow: 'Trust',
    h1: 'Where the money sits, and what our numbers actually mean',
    lede: 'Ethanel is not in the money path: rent settles to your own client account. This page states that plainly, and states the bound on every figure published anywhere else on this site.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'Custody of funds',
        title: 'Ethanel never holds rent',
        lede: 'The first question a landlord asks an agency has a short answer.',
      },
      paragraphs: [
        'A resident pays over M-Pesa. The funds settle to the bank account your organization already runs for client money — the account your landlords expect their rent to sit in. Ethanel opens no account, takes no float and sweeps no balance.',
        'What Ethanel holds is the record. Two ledger accounts model the path the money takes: cash in transit is money that has settled at M-Pesa but has not yet reached the client account, and client account cash is money that has. When the bank credit lands, the balance moves from the first to the second and an entry records it.',
        'That separation is why the custody answer is a matter of architecture rather than of policy. There is no Ethanel-controlled account for rent to sit in, so there is no balance for anyone to sweep, freeze or lose.',
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Design targets',
        title: 'The four numbers, and the denominator each one counts',
        lede: 'These are engineering targets for a system still in build. None is a customer result, because there is no customer yet.',
      },
      rows: [
        {
          label: '95% auto-matched',
          value:
            'Of rent and charge payments matched against open invoices. Deposits and plot instalments are excluded from the denominator, because both settle against a schedule rather than an invoice and would flatter the figure.',
        },
        {
          label: '500 units invoiced in under two minutes',
          value:
            'One rent run across 500 units, measured from the run starting to the last invoice being posted to the ledger.',
        },
        {
          label: '50 callbacks per second, sustained for ten minutes, with zero loss',
          value:
            'M-Pesa payment callbacks accepted, persisted and acknowledged. Zero loss is the target that matters; throughput without it is not a number worth publishing.',
        },
        {
          label: 'Landlord figures read live from the ledger',
          value:
            'Statement balances are read at request time and carry a last-updated stamp, rather than being cached and served stale.',
        },
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The record',
        title: 'What the ledger guarantees',
        lede: 'Double-entry and append-only are the two properties everything else on this site rests on.',
      },
      items: [
        {
          title: 'Entries are never edited',
          body: 'A posting that was wrong is corrected by a reversal that is itself an entry. The original stays. What happened and what was later decided about it are both on the record.',
        },
        {
          title: 'Every entry balances',
          body: 'Debits equal credits on every transaction, against a fixed chart of nine accounts. A run that cannot balance does not post.',
        },
        {
          title: 'An allocation is not a reversal',
          body: 'Moving a payment to the right lease and undoing a payment are different operations with different entries, so the audit trail can tell a correction from a refund.',
        },
        {
          title: 'The receivable belongs to the lease',
          body: 'Not to the resident and not to the unit. A lease ending does not orphan what is still owed under it.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'Operational practice',
        title: 'What is committed, and when it starts',
        lede: 'Written as commitments with dates, because a routine nobody has run yet is not a routine.',
      },
      steps: [
        {
          title: 'Backups are continuous from the first deployment',
          body: 'Point-in-time recovery is a property of the database tier rather than a job somebody remembers to schedule.',
          source: 'from first deploy',
        },
        {
          title: 'The first restore drill is scheduled for Sprint 004',
          body: 'A backup nobody has restored is a hypothesis. The drill restores to a fresh environment and reconciles the ledger against the source.',
          source: 'Sprint 004',
        },
        {
          title: 'Access to production data is scoped per organization',
          body: 'Every query carries the organization it belongs to. A bug inside one organization and a leak across organizations are different classes of failure, and the boundary is enforced in the data layer rather than in the application.',
          source: 'by construction',
        },
      ],
    },
    {
      kind: 'prose',
      heading: {
        eyebrow: 'What is not here yet',
        title: 'The gaps, stated rather than omitted',
      },
      paragraphs: [
        'There is no completed third-party penetration test, because the system is not yet deployed for one to be run against. There is no SOC 2 or ISO 27001 report, and this page will not imply one by listing controls in the shape of an audit.',
        'Our data-controller registration and the legal notices that depend on it are still in review. The four pages under Legal say so on their own faces rather than shipping placeholder policy text that reads as though it had been settled.',
        'If you are evaluating Ethanel for a pilot, ask for the current state directly. A dated honest answer is more use to you than a page that ages badly.',
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Bring the questions your landlords actually ask',
      lede: 'A demo is a better place to interrogate custody and the ledger than a page is.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
