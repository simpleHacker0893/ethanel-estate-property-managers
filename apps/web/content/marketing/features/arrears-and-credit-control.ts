import type { FeaturePageContent } from '../types'

/**
 * `/features/arrears-and-credit-control` — the page a reader arrives at after
 * they have stopped asking whether money can be collected and started asking
 * what happens when it isn't.
 *
 * Two things had to be kept straight here, because getting either wrong turns
 * the page into a description of a different product. The receivable belongs to
 * the lease and not to a person (D-57), so a lease with several parties who are
 * co-liable shows one balance and not one balance each. And an allocation is
 * not a reversal (D-62): attributing money carries no reason and no approval,
 * while undoing an entry carries a mandatory reason and names the entry it
 * undoes. The vocabulary table exists because those two are routinely blurred
 * into "correction", and once blurred the audit trail stops meaning anything.
 *
 * No number appears on this page. Arrears is the place where a percentage would
 * be most tempting and least defensible — the four publishable design targets
 * are allocated elsewhere, and a collection-rate figure would be an invented
 * business fact rather than a bounded target (D-68).
 */
export const arrearsAndCreditControl: FeaturePageContent = {
  slug: 'arrears-and-credit-control',
  locale: 'en-KE',
  meta: {
    title: 'Arrears and credit control',
    description:
      'Arrears read live off the ledger rather than from a report someone runs: one balance per lease, oldest invoice first, and an overpayment that becomes a credit.',
  },

  hero: {
    eyebrow: 'Arrears and credit control',
    h1: 'Who owes what, and what happens next',
    subhead:
      'The arrears list is not a spreadsheet somebody rebuilds every Monday. It is what the ledger says right now, per lease, with the entries that produced it still underneath.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Chasing the right people, for the right amount',
      lede: 'Most of the damage done by an arrears process is done to residents who had already paid.',
    },
    body: [
      'An agency knows roughly who is behind. Knowing it precisely, on a Tuesday afternoon, per lease, for the amount that is actually outstanding after the part-payment that came in on Sunday, is a different job — and it is the one that decides whether the follow-up message is a reminder or an insult.',
      'The usual answer is a report. Someone exports the rent roll, someone else exports the payments, and the arrears list is whatever those two agree on by the time the export finished. It was true when it was run. By the time it is acted on, several payments have landed against it.',
      'Ethanel does not produce an arrears report. Arrears is the unpaid part of the lease receivable, read off the journal as it stands, so opening the list and refreshing the list are the same operation. There is nothing to run and nothing to go stale between running it and using it.',
      'The balance belongs to the lease, not to a person. A lease with several parties who are co-liable has one balance, and either of them paying reduces the same amount — which is the only way the arithmetic can work when two people pay separately against one invoice.',
      'Where money has to move to clear an arrear, it moves in the organization’s own client account. Ethanel records the posting; it never holds the funds.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'The balance, the chase and the correction',
      lede: 'Each bullet names the service that implements it and the sprint it is scheduled for. Nothing here has shipped, and nothing here is labelled as though it had.',
    },
    items: [
      {
        label: 'Arrears as a live read, not a report',
        service: 'reporting',
        availability: 'sprint',
        sprint: 'Sprint 004',
        description:
          'A read model over the journal. There is no run step, so there is no window in which it is stale.',
      },
      {
        label: 'One balance per lease',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'The receivable is the lease’s. Several co-liable parties owe one amount between them, not one each.',
      },
      {
        label: 'Oldest invoice first',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'A payment clears the oldest open invoice before it touches a newer one. The rule does not vary by day.',
      },
      {
        label: 'Overpayment becomes a credit on the lease',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'Money over the invoiced amount is carried as a credit and applied next, rather than left unexplained.',
      },
      {
        label: 'Credit notes, posted rather than edited in',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'Reducing what is owed is an entry with its own trail. An invoice is never quietly rewritten.',
      },
      {
        label: 'Reversals carry a mandatory reason',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'A reversal names the entry it undoes and says why. An allocation is not a reversal and carries neither.',
      },
      {
        label: 'Statements that agree with the list',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'A resident statement and the arrears list are two readings of the same journal, not two records.',
      },
      {
        label: 'The chase, on the channel residents answer',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'Reminders and demands go out over WhatsApp with SMS behind it, addressed to the lease that owes.',
      },
      {
        label: 'Financial notices that cannot be switched off',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'A notice about money owed or received is mandatory. Preferences apply to everything else.',
      },
      {
        label: 'Exports of the arrears read model',
        service: 'reporting',
        availability: 'sprint',
        sprint: 'Sprint 004',
        description:
          'The same read model, saved as a view or exported, for the meeting that wants it on paper.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'From an invoice to a balance to a chase',
      lede: 'Every step here is a posting or a read of postings. There is no separate arrears table keeping its own opinion.',
    },
    steps: [
      {
        title: 'The invoice posts to lease receivable',
        body: 'Rent and charges are raised against the lease, debiting lease receivable. Debits equal credits per entry, and the journal is append-only.',
        source: 'D-61',
      },
      {
        title: 'Arrears is what is still unpaid',
        body: 'Not a status someone sets. It is the outstanding part of the lease receivable, read live off the ledger, with the entries that produced it one click underneath.',
        source: 'D-45',
      },
      {
        title: 'A payment clears the oldest invoice first',
        body: 'When money lands and is attributed to the lease, it is applied to the oldest open invoice before any newer one — so a part-payment ages the balance down rather than scattering across it.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'Anything over becomes a credit',
        body: 'An overpayment is not held aside as an oddity or refunded by default. It becomes a credit on the lease and is applied against what comes next.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'Attributing money is an allocation',
        body: 'Deciding which lease a payment belongs to carries no reason field and no approval threshold. It is not a correction, and treating it as one would bury real corrections in noise.',
        source: 'D-62',
      },
      {
        title: 'Undoing an entry is a reversal',
        body: 'A reversal is a new entry that refers to the one it undoes and carries a mandatory reason. Nothing is edited and nothing is deleted, so the history an auditor reads is the history that happened.',
        source: 'D-62',
      },
      {
        title: 'The chase goes out against the lease',
        body: 'Reminders address the lease that owes, which means co-liable parties see the same balance rather than a share each of them has to reconcile in their head.',
        source: 'D-57',
      },
    ],
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'The parts worth knowing before you ask',
      lede: 'Written here rather than left for you to find, because you were going to find them.',
    },
    items: [
      'Ethanel does not collect debt on your behalf. There is no collections agency behind it, no credit-bureau listing and no legal process — it tells you precisely what is owed and sends the notices you decide to send.',
      'Money that clears an arrear moves in the organization’s own client account. Ethanel opens no account, holds no float and sweeps no balance; it records the posting.',
      'A balance cannot be typed over. Writing an amount down is a credit note, and undoing an entry is a reversal that names its target and carries a reason. Neither is an edit, because postings are immutable.',
      'Notices about money cannot be turned off. A resident can decline most message groups on most channels, but not a demand, a receipt or a statement notice — that asymmetry is deliberate.',
      'None of this has shipped. The ledger, credit notes and statements are scheduled for Sprints 005 and 006, the read models and exports for Sprint 004, what clears an arrear for Sprint 007, and the chase for Sprint 009.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What sits either side of the balance',
    },
    links: [
      { label: 'Invoicing and rent runs', href: '/features/invoicing-and-rent-runs' },
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Reconciliation', href: '/features/reconciliation' },
      { label: 'Landlord statements and remittance', href: '/features/landlord-statements' },
      { label: 'WhatsApp and notifications', href: '/features/whatsapp-and-notifications' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Bring the arrears list you argue about',
      lede: 'The one with the part-payments, the co-liable leases and the two residents everyone is sure have already paid.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
