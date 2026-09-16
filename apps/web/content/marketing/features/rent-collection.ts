import type { FeaturePageContent } from '../types'

/**
 * `/features/rent-collection` — the page the template was proven on, and the
 * hardest of the ten to write honestly.
 *
 * It is the hardest because it is where overstatement is cheapest. "Rent
 * collects itself" is the whole pitch, nothing has shipped, and the temptation
 * is to describe Sprint 007 in the present tense. So every capability here
 * carries its sprint, the mechanics are DOMAIN.md §4 in the order they run, and
 * the one number is D-41 with the bound that makes it true rather than D-39's
 * 95%, which belongs on the reconciliation page where the denominator can be
 * explained properly.
 *
 * The custody answer appears twice on purpose — once in the job, once in the
 * limits. It is the first question a landlord asks an agency, and a reader who
 * skims the middle of a page still hits one of them.
 */
export const rentCollection: FeaturePageContent = {
  slug: 'rent-collection',
  locale: 'en-KE',
  meta: {
    title: 'Rent collection',
    description:
      'Residents pay over M-Pesa, the callback is persisted before anything is processed, and the payment posts against the lease that owes it — or else to suspense.',
  },

  hero: {
    eyebrow: 'Rent collection',
    h1: 'Rent arrives on M-Pesa and posts to the ledger as it lands',
    subhead:
      'Not an overnight import, and not a spreadsheet someone reconciles on a Saturday. A payment is a posting from the moment it arrives, attributed to a lease or held in suspense until it can be.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Knowing who has paid, before the landlord asks',
      lede: 'The question an agency answers twenty times a month is not hard. It is just expensive to answer from a statement export and a WhatsApp thread.',
    },
    body: [
      'Rent comes in over M-Pesa in ones and twos across the first week of the month, in amounts that rarely match the invoice exactly, from phone numbers that are not always the number on the lease. Somebody downloads a statement, opens the rent roll, and starts reading down two columns at once.',
      'That work is not finished until every payment has a name against it, and until then nobody can answer the landlord. The arrears list is stale, the follow-up messages go to people who have already paid, and the month closes late because the reconciliation has to finish before the statement can go out.',
      'Ethanel moves that work to the moment the payment arrives. The callback is persisted, the payment is matched against open invoices by a rule that runs in a fixed order, and what cannot be matched posts to suspense — which means it is money in the ledger, visible and counted, from the first second. It is not attributed yet. That is a different thing from being lost.',
      'The funds themselves never touch Ethanel. Rent settles into the organization’s own client account, which is the account its landlords already expect their money to sit in.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'Collection, ingress and attribution',
      lede: 'Each of these names the service that implements it and the sprint it is scheduled for. No sprint has shipped yet, and none of them is labelled as though it had.',
    },
    items: [
      {
        label: 'M-Pesa collection over Daraja',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'Residents pay the way they already pay. Ethanel opens no account and holds no float.',
      },
      {
        label: 'Webhook ingress that does not drop a callback',
        service: 'gateway',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'Every inbound callback is verified, persisted and acknowledged before anything is processed.',
      },
      {
        label: 'Automatic attribution against open invoices',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'Account reference, then payer phone on file, then exact amount. Oldest invoice first.',
      },
      {
        label: 'Suspense, and a manual match queue behind it',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'An unmatched payment is in the ledger immediately, waiting for a person rather than for a batch.',
      },
      {
        label: 'Posting into a double-entry journal',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Debits equal credits per entry, checked as the entry is written. The journal is append-only.',
      },
      {
        label: 'Receipts issued against the posting',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'The receipt refers to the entry that recorded the money, not to a form field.',
      },
      {
        label: 'Payment confirmation on WhatsApp',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description: 'A financial notice, which means it is mandatory and cannot be switched off.',
      },
      {
        label: 'Verified phones held against the lease',
        service: 'property',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'A lease can have several parties and several phones. The receivable belongs to the lease.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'The order a payment is matched in',
      lede: 'One order, and no other. A rule that runs differently depending on the day is a rule nobody can audit.',
    },
    steps: [
      {
        title: 'The callback is persisted first',
        body: 'Verified, written down and acknowledged. Nothing is processed inline, so a slow downstream step can never turn into a lost payment.',
        source: 'D-41',
      },
      {
        title: 'Account reference',
        body: 'The unit code the resident paid against. When it is there and it resolves, the payment is attributed and the rest of the ladder never runs.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'Payer phone on file',
        body: 'The paying number is looked up among the verified phones on the lease — which resolves to a lease, not to a person, because two parties may pay separately against the same invoice.',
        source: 'D-57',
      },
      {
        title: 'Exact amount against open invoices',
        body: 'Oldest invoice first. An overpayment does not sit unexplained; it becomes a credit on the lease.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'Otherwise, suspense',
        body: 'Anything the ladder cannot resolve posts to suspense immediately and enters the manual match queue. It is counted, it is visible, and it is in the books.',
        source: 'D-15',
      },
      {
        title: 'A person allocates it',
        body: 'Attributing a suspense payment is an allocation. It is not a correction and not a reversal, it carries no reason, and no approval threshold applies to it.',
        source: 'D-62',
      },
    ],
  },

  target: {
    claim: '50 callbacks per second for ten minutes, with zero loss',
    bound:
      'A design target Ethanel holds the webhook ingress to: every callback verified, persisted and acknowledged, and none of them processed inline. It is a bar the platform must clear, not a result an agency has seen.',
    source: 'D-41',
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'The parts worth knowing before you ask',
      lede: 'Written here rather than left for you to find, because you were going to find them.',
    },
    items: [
      'Ethanel is not a wallet. It opens no account, takes no float and sweeps no balance — rent settles to the organization’s own client account and Ethanel records the posting.',
      'A posting is never edited and never deleted. A mistake is undone by a new entry that carries a reason and refers to the one it reverses, so the history an auditor reads is the history that happened.',
      'Automatic attribution is a ladder, not a guess. A payment that does not clear one of its four rungs is not force-matched to the nearest invoice; it goes to suspense and waits for a person.',
      'None of this has shipped. M-Pesa collection, webhook ingress and reconciliation are scheduled for Sprint 007, and the ledger they post into for Sprints 005 and 006.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What sits either side of collection',
    },
    links: [
      { label: 'Reconciliation', href: '/features/reconciliation' },
      { label: 'Invoicing and rent runs', href: '/features/invoicing-and-rent-runs' },
      { label: 'Arrears and credit control', href: '/features/arrears-and-credit-control' },
      { label: 'Landlord statements and remittance', href: '/features/landlord-statements' },
      { label: 'WhatsApp and notifications', href: '/features/whatsapp-and-notifications' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'See it run against a month of your own numbers',
      lede: 'A demo on your rent roll, not on a sample one. Bring the month that was worst to reconcile.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
