import type { FeaturePageContent } from '../types'

/**
 * `/features/reconciliation` — the page that carries D-39, and therefore the
 * page D-66 was written for.
 *
 * The 95% goes here rather than on `/features/rent-collection` because this is
 * the only page with room to explain the denominator, and a bare "95%
 * auto-matched" is the exact defect D-66 exists to fix. So the number never
 * appears without its bound, and the bound names what is counted and what is
 * excluded: rent and charge payments against open invoices, deposits and plot
 * instalments out. It is framed as a go-live gate the platform must clear on
 * real partner data — nothing has shipped, nobody has measured anything yet,
 * and a reader who comes away thinking an agency already sees 95% has been
 * misled by us.
 *
 * The suspense answer does the same work here that the custody answer does on
 * the collection page: it is why the bar is a measurement and not a cliff, and
 * it appears in the mechanics and again in the limits, because the reader who
 * skims the middle still needs it.
 */
export const reconciliation: FeaturePageContent = {
  slug: 'reconciliation',
  locale: 'en-KE',
  meta: {
    title: 'Reconciliation',
    description:
      'A payment is matched by a ladder in one fixed order: account reference, payer phone, exact amount. What it cannot resolve posts to suspense to await a person.',
  },

  hero: {
    eyebrow: 'Reconciliation',
    h1: 'A fixed order, run every time, and a queue for what is left',
    subhead:
      'Reconciliation is not judgement applied to a bank statement. It is four rungs in one order, oldest invoice first, and an account called suspense for everything that does not clear them.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Turning a list of payments into a list of who has paid',
      lede: 'The payments are not the problem. Attributing them is, and it is the work that decides when the month can close.',
    },
    body: [
      'An M-Pesa statement tells you that money arrived, from a number, at a time, with a reference somebody typed on a handset. It does not tell you which lease it belongs to. Somebody has to decide that, several hundred times, and the arrears list is wrong until they finish.',
      'Done by hand, that decision is made differently on a Tuesday than on the last day of the month. The amount is close enough, the number looks familiar, and the payment is put against the invoice that makes the report look right. Nobody can audit a rule that changes with the pressure on the person applying it.',
      'Ethanel applies one ladder, in one order, to every payment. Account reference first, then the payer phone held against the lease, then an exact amount against open invoices, oldest first. An overpayment does not need a decision either — it becomes a credit on the lease.',
      'What the ladder cannot resolve does not sit in an inbox. It posts to suspense the moment it arrives and enters the manual match queue, which means the money is in the ledger, counted and visible, before anyone has decided whose it is. Unattributed is not the same as missing, and the difference is the whole design.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'The ladder, the queue and the accounts behind them',
      lede: 'Each bullet names the service that implements it and the sprint it is scheduled for. No sprint has shipped, and nothing here is written as though one had.',
    },
    items: [
      {
        label: 'The four-rung match ladder',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'Account reference, then payer phone on file, then exact amount against open invoices. Then a person.',
      },
      {
        label: 'Suspense on arrival, not at end of day',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'An unmatched payment is a posting the second it lands. It is counted before it is attributed.',
      },
      {
        label: 'The manual match queue',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'Everything the ladder cannot resolve, in one worklist beside the open invoices it might belong to.',
      },
      {
        label: 'Allocation against open invoices',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Oldest invoice first. An overpayment becomes a credit on the lease, not an unexplained balance.',
      },
      {
        label: 'Reversal, with a mandatory reason',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'The only path that undoes a posting — and the only one that carries a reason and an approval.',
      },
      {
        label: 'Verified phones held against the lease',
        service: 'property',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Several parties, several phones, one receivable. The second rung resolves to a lease, not a person.',
      },
      {
        label: 'The auto-match rate, instrumented',
        service: 'reporting',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'Measured from the first payment, so the go-live gate is watched from week seven rather than found late.',
      },
      {
        label: 'Suspense and queue read models',
        service: 'reporting',
        availability: 'sprint',
        sprint: 'Sprint 004',
        description:
          'Suspense balance, queue age and match outcomes, exportable for the month-end file.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'Four rungs, in this order and no other',
      lede: 'The ladder stops at the first rung that resolves. What reaches the bottom is not forced onto the nearest invoice.',
    },
    steps: [
      {
        title: 'Account reference',
        body: 'The unit code the resident paid against. When it is present and it resolves, the payment is attributed and nothing below this rung runs.',
        source: 'DOMAIN.md §4 · units.code',
      },
      {
        title: 'Payer phone on file',
        body: 'The paying number is looked up among the verified phones on the lease. It resolves to a lease and not to a person: a lease may have several parties, and the receivable is the lease’s, so two parties paying separately allocate against the same invoice.',
        source: 'D-57',
      },
      {
        title: 'Exact amount against open invoices',
        body: 'Oldest invoice first. An exact match is required — close enough is what produces a rent roll nobody can defend. An overpayment is not refused; it becomes a credit on the lease.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'Otherwise, suspense and the review queue',
        body: 'Anything that clears no rung posts to suspense immediately and enters the manual match queue. It is money in the ledger from the moment it arrives, just not yet attributed. That is what makes the match rate a measurement rather than a cliff.',
        source: 'D-15',
      },
      {
        title: 'A person allocates it',
        body: 'Attributing a suspense payment is an allocation. Nothing was wrong — the money simply arrived unlabelled — so it carries no reason, and no approval threshold applies to it. The routine path does not share vocabulary with the exceptional one.',
        source: 'D-62',
      },
      {
        title: 'And only a reversal carries a reason',
        body: 'If a posting itself was wrong, it is undone by a new entry that names the entry it reverses and states why. Above a threshold an admin approves it. Nothing in the journal is ever edited or deleted.',
        source: 'D-44 · threshold open (Q1)',
      },
    ],
  },

  target: {
    claim: '95% of payments matched with no human action',
    bound:
      'Measured over rent and charge payments against open invoices. Deposits and plot instalments are excluded from the denominator: a deposit arrives once against no open invoice, and a plot carries a label rather than an account reference, so neither can clear the ladder by construction. This is a gate the platform must clear on real partner data before go-live — not a result an agency has seen.',
    source: 'D-39 as bounded by D-66',
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'The parts worth knowing before you ask',
      lede: 'A reconciliation engine is judged on what it refuses to do, so the refusals are written down here.',
    },
    items: [
      'Nothing is force-matched. A payment that clears none of the four rungs is not attached to the nearest invoice to make a report balance — it posts to suspense and waits for a person to allocate it.',
      'Attributing a payment out of suspense is an allocation, not a correction. It carries no reason and no approval, because nothing was wrong. Only a reversal undoes a posting, and a reversal always carries a reason.',
      'Plot instalments do not auto-match and are not counted as though they might. A plot carries a label rather than an account reference, so a plot payment reaches the review queue by construction — which is why plot instalments and deposits sit outside the denominator above, and why deferred work cannot move a go-live number.',
      'How residents identify themselves on an M-Pesa payment today is something we ask each partner during onboarding rather than assume. The ladder is built before the answer; the answer changes how often the first rung fires, not the order of the rungs.',
      'None of this has shipped. The reconciliation engine, suspense and the manual match queue are scheduled for Sprint 007, the ledger they post into for Sprints 005 and 006, and the read models behind the queue for Sprint 004.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What feeds the ladder, and what reads its output',
    },
    links: [
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Invoicing and rent runs', href: '/features/invoicing-and-rent-runs' },
      { label: 'Arrears and credit control', href: '/features/arrears-and-credit-control' },
      { label: 'Landlord statements and remittance', href: '/features/landlord-statements' },
      { label: 'Land, plots and instalments', href: '/features/land-plots-and-instalments' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Bring the month that took longest to reconcile',
      lede: 'A demo against your own statement and your own rent roll is the only version of this worth watching.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
