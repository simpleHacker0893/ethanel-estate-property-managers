import type { FeaturePageContent } from '../types'

/**
 * `/features/landlord-statements` — D-45's page.
 *
 * The claim here is unusual for a marketing page because it is a claim about
 * what the product refuses to do: the landlord's figures are read from the
 * ledger when the page is opened, with a stamp saying when, and never served
 * from a cached summary. An overnight snapshot is the cheaper build and it is
 * the one that puts a stale number in front of the person least able to check
 * it, which is why D-45 pins it.
 *
 * The four accounts in play — landlord payable, agency commission income, VAT
 * payable, repairs expense — are named from the nine in DOMAIN.md §4, in those
 * exact words. The pre-rename names in ARCHITECTURE.md §7 do not appear here.
 *
 * Q4 (gross or net, and the payment grain) and Q2 (commission recognition
 * timing, VAT applicability and rate) are open, so the page describes the
 * mechanism and says plainly that the policy is not settled. Deposits held are
 * a liability and that is stated twice, because a landlord reading a statement
 * is the person most likely to read a deposit as money earned.
 */
export const landlordStatements: FeaturePageContent = {
  slug: 'landlord-statements',
  locale: 'en-KE',
  meta: {
    title: 'Landlord statements and remittance',
    description:
      'A landlord statement is read off the double-entry ledger when it is opened, with a last-updated stamp. Remittance clears the payable from your client account.',
  },

  hero: {
    eyebrow: 'Landlord statements and remittance',
    h1: 'The statement is a read of the ledger, not last night’s summary',
    subhead:
      'Rent collected, commission charged, VAT, repairs and what is left to pay out — computed from the journal at the moment the page is opened, and stamped with when that was.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Answering a landlord without rebuilding the month first',
      lede: 'A landlord asks two questions: what came in, and when is mine coming. Both should be answerable in the time it takes to open a page.',
    },
    body: [
      'A statement assembled by hand is assembled from the pieces — a payments export, a repairs folder, a commission calculation in a second sheet — and it is correct for exactly as long as it takes the next payment to arrive. The version the landlord is reading and the version the agency is looking at stopped agreeing some time on Tuesday.',
      'That is where the difficult conversations come from. Not from the numbers being wrong, usually, but from two people holding two snapshots taken at different moments and each believing theirs is current.',
      'Ethanel removes the snapshot. What a landlord owns and what the organization owes them are balances in the same double-entry journal that recorded the rent, and the statement is computed from those balances when it is opened. A last-updated stamp sits on the page, so the reader knows exactly how current the figure is instead of assuming.',
      'Remittance then does the obvious thing: paying the landlord moves what is owed out of the organization’s own client account and clears the landlord payable. Ethanel holds none of it at any point. Rent settles into the agency’s client account, which is where its landlords already expect their money to sit.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'Four accounts, one statement, one payout',
      lede: 'Every bullet names the service that implements it and the sprint it is scheduled for. No sprint has shipped.',
    },
    items: [
      {
        label: 'Landlord payable as a real account',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'What the organization owes a landlord is a balance in the journal, not a figure in a second sheet.',
      },
      {
        label: 'Agency commission income, posted openly',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Commission has its own account and its own line, so what was charged is visible rather than netted away.',
      },
      {
        label: 'VAT payable held separately',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Tax is its own liability and is never folded into the commission line or the rent line.',
      },
      {
        label: 'Repairs expense that ties to the work order',
        service: 'ops',
        availability: 'sprint',
        sprint: 'Sprint 008',
        description:
          'Spend on the statement traces back to the repair request and the work order it came from.',
      },
      {
        label: 'Statement documents rendered from the ledger',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'The document is produced from the journal and carries the stamp saying when it was read.',
      },
      {
        label: 'A landlord portal that reads live',
        service: 'web',
        availability: 'sprint',
        sprint: 'Sprint 010',
        description:
          'Figures are computed when the page is opened, with a last-updated stamp. Never a cached summary.',
      },
      {
        label: 'Remittance out of the client account',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 010',
        description:
          'Paying a landlord moves what is owed out of the client account and clears the payable.',
      },
      {
        label: 'Statement exports and saved views',
        service: 'reporting',
        availability: 'sprint',
        sprint: 'Sprint 004',
        description:
          'Read models behind the statement, exportable for the landlord’s own accountant.',
      },
      {
        label: 'The statement-ready notice',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description: 'A financial notice, which means it is mandatory and cannot be switched off.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'Where a month of rent actually goes',
      lede: 'Four of the nine ledger accounts do the work on this page, and the statement is a read across them.',
    },
    steps: [
      {
        title: 'Rent is owed against the lease',
        body: 'The invoice raises a lease receivable. The debt is the lease’s, not a person’s, which is what lets several parties pay separately against one invoice without anyone deciding who owns the arrears.',
        source: 'D-57',
      },
      {
        title: 'Collection splits three ways',
        body: 'When rent is collected, part of it is the landlord’s, part is agency commission income, and the tax on that commission is VAT payable. Each is a line in an entry rather than a deduction someone applied off-ledger.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'Repairs reduce what is paid out',
        body: 'Spend authorised against the property posts to repairs expense and appears on the statement next to the work order it came from, so an unexpected figure has a paper trail behind it.',
        source: 'DOMAIN.md §5',
      },
      {
        title: 'The statement is read, not built',
        body: 'Opening the statement computes it from the journal at that moment and stamps it with the time. There is no overnight job producing a summary that a later payment quietly invalidates.',
        source: 'D-45',
      },
      {
        title: 'Remittance clears the payable',
        body: 'Paying the landlord moves the money out of the organization’s own client account and clears landlord payable. Ethanel opens no account and holds no float at any point in this.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'Deposits are not on this list',
        body: 'A deposit held is a deposit liability. It is money the organization is holding for someone else, so it never appears as income and is never paid out as though it had been earned.',
        source: 'DOMAIN.md §5',
      },
    ],
  },

  target: {
    claim: 'Landlord figures read live from the ledger, with a last-updated stamp',
    bound:
      'Never a cached summary: the statement is computed from the journal when it is opened rather than served from an overnight snapshot, and the stamp tells the reader how current it is instead of leaving them to assume. A design commitment the platform holds itself to before go-live, not a result an agency has seen.',
    source: 'D-45',
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'The parts worth knowing before you ask',
      lede: 'A statement is a promise about accuracy, so the places where the policy is not settled belong on the page.',
    },
    items: [
      'Deposits held are a liability and never income. They do not appear as money the agency has earned, they are not remitted as though they were, and no statement line treats them as revenue.',
      'A statement cannot be edited into agreement. If a figure is wrong, the entry behind it is reversed by a new entry that carries a reason, and the statement changes because the ledger changed. There is no cell to retype.',
      'Whether remittance is paid gross or net, and whether a landlord is paid once or once per property, is not ours to invent. The management agreement’s grain settles the payment grain structurally, and the policy behind it is still open with our prospective partners.',
      'When agency commission is recognised — on invoice or on collection — posts a different entry at a different moment, and that choice is open. VAT applicability and rate are open with it. No rate appears anywhere on this site until they are settled.',
      'None of this has shipped. The journal and its accounts are scheduled for Sprints 005 and 006, statement rendering for Sprint 006, read models and exports for Sprint 004, the landlord portal and remittance for Sprint 010, and the statement notice for Sprint 009.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What the statement reads from',
    },
    links: [
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Reconciliation', href: '/features/reconciliation' },
      { label: 'Invoicing and rent runs', href: '/features/invoicing-and-rent-runs' },
      { label: 'Repairs and work orders', href: '/features/repairs-and-work-orders' },
      { label: 'For landlords', href: '/solutions/landlords' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Put one landlord’s month through it',
      lede: 'Pick the portfolio with the repairs spend on it. That is the statement that takes longest to explain.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
