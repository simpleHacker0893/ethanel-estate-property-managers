import type { FeaturePageContent } from '../types'

/**
 * `/features/invoicing-and-rent-runs` — D-40's page.
 *
 * The temptation on a batch-processing page is to sell speed, and speed on its
 * own is the wrong claim: a rent run that is fast and not resumable is worse
 * than a slow one, because the failure mode is a portfolio invoiced one and a
 * half times. So the headline property is idempotent and resumable, and the
 * two minutes is written as the bound's companion rather than as the point.
 *
 * Immutability is stated in the mechanics and again in the limits, because it
 * is the thing an agency owner does not expect from software that replaces a
 * spreadsheet: there is no cell to retype. A wrong invoice is reduced by a
 * credit note or undone by a reversal that carries a reason, and the version
 * that was sent is the version that stays on the record.
 *
 * Q2, Q9 and Q10 are open, so VAT treatment, late-rent penalties and water
 * billing are described as mechanism without values (D-64). No rate appears
 * here, not even an example one.
 */
export const invoicingAndRentRuns: FeaturePageContent = {
  slug: 'invoicing-and-rent-runs',
  locale: 'en-KE',
  meta: {
    title: 'Invoicing and rent runs',
    description:
      'Rent schedules raise a cycle’s invoices in one run that is idempotent and resumable. A wrong invoice is reduced by a credit note, never edited.',
  },

  hero: {
    eyebrow: 'Invoicing and rent runs',
    h1: 'Raise the month in one run, and run it again if it dies',
    subhead:
      'A rent run reads the schedule on every lease and raises the cycle’s invoices as postings. It is idempotent and resumable, which means a run that fails halfway is re-run rather than unpicked by hand.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Billing a portfolio without billing anybody twice',
      lede: 'Raising invoices is the easy half. Knowing exactly which ones were raised, after something went wrong in the middle, is the half that costs a morning.',
    },
    body: [
      'Rent is not one invoice. It is every lease in the portfolio, on its own schedule, with its own charges, on a day that does not move. Done from a spreadsheet and a mail merge, the work is repetitive rather than difficult — until the merge stops halfway and nobody can say which residents already have their invoice.',
      'That uncertainty is what makes people re-run cautiously, or not at all, and it is what puts a duplicate invoice in front of a resident who has already paid. The apology costs more than the invoice did.',
      'Ethanel treats the run as a single operation that is safe to execute twice. Each invoice belongs to a lease and a cycle, so a second run raises what is missing and touches nothing that already exists. A run that dies at unit three hundred is a run you restart, not a reconciliation exercise.',
      'What the run produces is not a document with a total on it. Each invoice is a posting in a double-entry journal — debits equal credits, appended and never edited — so the rent roll, the arrears list and the landlord statement are all reading the same records rather than three exports that have to be argued into agreement.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'Schedules, runs, credit notes and receipts',
      lede: 'Every bullet names the service that implements it and the sprint it is scheduled for. Nothing here is available yet, and none of it is labelled as though it were.',
    },
    items: [
      {
        label: 'Rent schedules held on the lease',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'What a lease is charged and when, kept against the lease rather than retyped each cycle.',
      },
      {
        label: 'The rent run',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'One operation raises the cycle across a portfolio, lease by lease, on the schedule each one carries.',
      },
      {
        label: 'Idempotent and resumable execution',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'A second execution raises what is missing and touches what already exists not at all.',
      },
      {
        label: 'Every invoice posted, not just printed',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Debits equal credits per entry, checked as the entry is written. The journal is append-only.',
      },
      {
        label: 'Credit notes against an issued invoice',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'How an invoice is reduced. The original is not edited, because nothing in the journal is.',
      },
      {
        label: 'VAT payable kept in its own account',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description: 'Tax is a liability of its own, not a number folded into the rent line.',
      },
      {
        label: 'Invoice and receipt rendering',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'The document is rendered from the entry that recorded the money, not from a form field.',
      },
      {
        label: 'The invoice notice on WhatsApp',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description: 'A financial notice, which means it is mandatory and cannot be switched off.',
      },
      {
        label: 'Rent-run read models and exports',
        service: 'reporting',
        availability: 'sprint',
        sprint: 'Sprint 004',
        description:
          'What was raised, what was skipped and why, exportable for the month-end file.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'From a schedule to a posting to a notice',
      lede: 'Five steps, and the second one is the only one people ask about twice.',
    },
    steps: [
      {
        title: 'The schedule says what is due',
        body: 'Each lease carries its own rent schedule and charges. The run reads them; it does not ask anyone to confirm the same figures a second time in a spreadsheet.',
        source: 'DOMAIN.md §3',
      },
      {
        title: 'The run raises the cycle',
        body: 'One operation walks the portfolio and raises the cycle’s invoices. A large run is a design target with a bound attached, which is the next block on this page.',
        source: 'D-40',
      },
      {
        title: 'And it is safe to execute twice',
        body: 'An invoice belongs to a lease and a cycle, so a repeat execution raises only what is missing. A run that dies at unit three hundred is restarted rather than audited.',
        source: 'D-40',
      },
      {
        title: 'Each invoice is a posting',
        body: 'Money is held and posted in KES as whole minor units. Debits equal credits per entry and the journal is append-only, so the invoice and the ledger cannot drift apart.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'A mistake is a new entry, never an edit',
        body: 'An issued invoice is reduced by a credit note, or the posting behind it is undone by a reversal that names what it reverses and states why. Above a threshold an admin approves the reversal.',
        source: 'D-44 · threshold open (Q1)',
      },
      {
        title: 'The notice goes out',
        body: 'The invoice notice reaches the resident on WhatsApp, with SMS as the fallback and email for the document itself. It is a financial notice, so it is not one of the messages anyone can turn off.',
        source: 'DOMAIN.md §5',
      },
    ],
  },

  target: {
    claim: '500 units invoiced in under 2 minutes',
    bound:
      'Idempotent and resumable: a rent run is safe to execute twice, and a run interrupted halfway is re-run rather than unpicked by hand. The property is the point and the duration is the consequence — this is a design target the platform holds itself to before go-live, not a result an agency has seen.',
    source: 'D-40',
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'The parts worth knowing before you ask',
      lede: 'Scoping decisions, written here rather than discovered in month two.',
    },
    items: [
      'A rent run raises invoices; it does not collect money. Payments arrive separately over M-Pesa and are attributed by the reconciliation ladder. Keeping the two apart is deliberate — an invoice that marks itself paid is a rent roll nobody can audit.',
      'An issued invoice is never edited. It is reduced by a credit note or undone by a reversal that carries a reason and refers to the entry it reverses, so the version on the record is the version that was sent.',
      'Late-rent penalties are not in the first cut. Whether one is charged, at what rate and from which day of the cycle differs by agency and is still open, so the mechanism is built before any value is set — and no rate appears on this site until one is.',
      'Water and other metered charges are not modelled yet. How water is billed varies by property and the answer is open; until it is settled, metered usage stays outside the rent run rather than being guessed at.',
      'None of this has shipped. Rent schedules and the journal are scheduled for Sprint 005, the rent run, credit notes and document rendering for Sprint 006, read models and exports for Sprint 004, and the invoice notice for Sprint 009.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What the run feeds, and what feeds it',
    },
    links: [
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Reconciliation', href: '/features/reconciliation' },
      { label: 'Arrears and credit control', href: '/features/arrears-and-credit-control' },
      { label: 'Landlord statements and remittance', href: '/features/landlord-statements' },
      { label: 'Documents and signing', href: '/features/documents-and-signing' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Watch a run raise your own portfolio',
      lede: 'Bring a cycle with the awkward leases in it — the part-months, the mid-term changes, the ones that never merge cleanly.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
