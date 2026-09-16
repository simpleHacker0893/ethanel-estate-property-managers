import type { DeepDiveContent } from '../types'

/**
 * S7, S8 and S9 — the three deep dives, and the part of the page a sceptical
 * agency owner forwards to their accountant.
 *
 * Every claim here is traceable. The custody answer is the compliance
 * constraint that `client account cash` exists to model; the nine accounts are
 * D-61's chart, with D-61's names and no tenth; the reconciliation order is
 * DOMAIN.md §4 in the order it actually runs; and the one number is D-39 as
 * bounded by D-66, which is why `bound` carries the denominator rather than
 * leaving it to a footnote. A bare 95% is the exact defect D-66 was written to
 * fix.
 *
 * Nothing here is written in the present perfect. No sprint has shipped, so
 * each dive states the sprint its capability is scheduled for instead of
 * implying a running system.
 */

const custody: DeepDiveContent = {
  heading: {
    eyebrow: 'Custody of funds',
    title: 'Ethanel never holds rent',
    lede: "Rent settles into the organization's own client account. Ethanel records the posting; it does not sit in the money path.",
  },
  body: [
    'A resident pays over M-Pesa. The funds settle to the bank account the organization already runs for client money — the account its landlords expect their rent to sit in. Ethanel opens no account, takes no float and sweeps no balance.',
    'What Ethanel holds is the record. Two accounts model the path the money takes. Cash in transit is money that has settled at M-Pesa but has not yet reached the client account. Client account cash is money that has. When the bank credit lands, the balance moves from the first to the second and the entry records it.',
    'So the first question a landlord asks an agency has a short answer. The rent is in the agency’s own client account, and the ledger shows how it got there. Ethanel is a ledger and a workflow. It is not a wallet.',
    'The ledger accounts are scheduled for Sprint 005 and Sprint 006. M-Pesa settlement and reconciliation are scheduled for Sprint 007.',
  ],
  cta: { label: 'How funds and data are handled', href: '/security' },
}

const ledger: DeepDiveContent = {
  heading: {
    eyebrow: 'The ledger',
    title: 'Nine accounts, and double entry that is enforced',
    lede: 'This is the whole chart of accounts, not a sample of it. An accountant can read it in a minute and tell you whether the model is right.',
  },
  body: [
    'Every posting is an entry with lines, and the lines must balance. Debits equal credits, checked when the entry is written rather than in an overnight job, and an entry that does not balance is not stored.',
    'The journal is append-only. A posting, once written, is never edited and never deleted. A correction is a new entry that carries a reason and refers to the entry it undoes, so the history an auditor reads is the history that happened rather than the history after someone tidied it.',
    'The receivable belongs to the lease and not to a person. A lease can have several parties, they are co-liable for the same invoice, and two of them paying separately settle the same receivable. That is why the account is named lease receivable.',
    'Money is held and posted in Kenyan shillings. The ledger, invoicing, rent runs and statements are scheduled for Sprint 005 and Sprint 006.',
  ],
  // D-61, exactly. Nine accounts, these names. "resident receivable" and
  // "agency fee income" are the old names the rename replaced, and the tenth
  // account only exists if Q16 comes back yes, which it has not.
  accounts: [
    { account: 'lease receivable', type: 'asset', note: 'What a lease owes, across its parties.' },
    {
      account: 'deposit liability',
      type: 'liability',
      note: 'Deposits held. A liability, never income.',
    },
    {
      account: 'landlord payable',
      type: 'liability',
      note: 'What the organization owes the landlord.',
    },
    {
      account: 'agency commission income',
      type: 'income',
      note: "The agency's own earnings on a collection.",
    },
    { account: 'VAT payable', type: 'liability', note: 'Tax collected and not yet remitted.' },
    { account: 'repairs expense', type: 'expense', note: 'Work-order spend against a property.' },
    {
      account: 'client account cash',
      type: 'asset',
      note: "Money in the organization's client account.",
    },
    {
      account: 'cash in transit',
      type: 'asset',
      note: 'Settled at M-Pesa, not yet in the client account.',
    },
    { account: 'suspense', type: 'asset', note: 'In the ledger, not yet attributed to a lease.' },
  ],
  // D-45. Stated as a design target the platform holds itself to, with the
  // bound that makes it true, and linked to /security by the call to action.
  target: {
    claim: 'Landlord figures read live from the ledger, with a last-updated stamp',
    bound:
      'A design target the platform holds itself to: figures are read from these accounts at request time, never from a cached summary.',
    source: 'D-45',
  },
  cta: { label: 'How the ledger is protected', href: '/security' },
}

const reconciliation: DeepDiveContent = {
  heading: {
    eyebrow: 'Reconciliation',
    title: 'What happens when a payment does not match',
    lede: 'Most payments should match themselves. The ones that do not are the reason to read this section.',
  },
  body: [
    'A callback arrives from M-Pesa and the engine tries four things, in this order. The account reference against the unit code. The payer phone against the verified phones on file. The exact amount against open invoices. Then the review queue.',
    'The second step resolves to a lease rather than to a person. A lease can have several parties with several verified phones, and the receivable is the lease’s, so two parties paying separately allocate against the same invoice.',
    'Where more than one invoice is open, the oldest is settled first. Where the payment is larger than the amount owed, the remainder becomes a credit on the lease rather than a balance nobody can find again.',
    'A payment that matches nothing is not held at the door. It posts to suspense immediately and appears in the manual match queue, where a person attributes it. The money is in the ledger from the moment it arrives; what is missing is the attribution, not the money.',
    'Attributing a suspense payment is an allocation. It is not a correction and it is not a reversal: it carries no reason and it is not subject to an approval threshold. Undoing an entry is a reversal, and that one carries both.',
    'That is what makes the figure below a measurement rather than a cliff. A payment outside it is not a payment that went missing. It is a payment that waited for a person.',
    'Payments, reconciliation, suspense and the manual match queue are scheduled for Sprint 007, which is also when the match rate is first instrumented.',
  ],
  target: {
    claim: '95% of payments matched with no human action',
    bound:
      'A design target, measured over rent and charge payments against open invoices; deposits and plot instalments are excluded from the denominator. It is a gate the platform must clear on real partner data before go-live, not a result already achieved.',
    source: 'D-39, bounded by D-66',
  },
  cta: { label: 'How the match rate is measured', href: '/security' },
}

export const deepDives: [DeepDiveContent, DeepDiveContent, DeepDiveContent] = [
  custody,
  ledger,
  reconciliation,
]
