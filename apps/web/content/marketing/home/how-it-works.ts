import type { HowItWorksContent } from '../types'

/**
 * S5 — how it works, and the section the whole page is really about.
 *
 * `reconciliationOrder` is the real order the engine runs in, from DOMAIN.md
 * §4, and it is data rather than prose so that it cannot drift into a
 * marketing-friendly reordering. Four steps, in this order, and no fifth:
 * account reference, payer phone on file, exact amount, review queue.
 *
 * Step two resolves to a lease and not to a person (D-57). A lease may have
 * several parties with several verified phones, and the receivable belongs to
 * the lease, so two parties paying separately allocate against the same
 * invoice. Stating it that way is the difference between a description of this
 * ledger and a description of a simpler one that does not exist.
 *
 * `suspenseNote` carries the fact that makes the auto-match figure a
 * measurement rather than a cliff: an unmatched payment is not rejected and not
 * parked outside the books. It posts to suspense immediately (D-15) and waits
 * in the manual match queue — money in the ledger from the moment it arrives,
 * just not yet attributed. Attributing it later is an **allocation**: it is not
 * a correction, it is not a reversal, it carries no reason and it is not
 * subject to an approval threshold (D-62). Only a reversal is.
 *
 * No timing figure appears in the steps. The two that exist — the rent-run
 * target and the callback-ingress target — are design targets that ship with
 * their bounds and a link to /security, which is the proof bar's job and the
 * security section's job, not this one's. What the steps state instead are the
 * bounds themselves: a rent run is idempotent and resumable, a callback is
 * verified, persisted and acknowledged and never processed inline.
 */
export const howItWorks: HowItWorksContent = {
  heading: {
    eyebrow: 'How it works',
    title: 'From the import to the landlord statement',
    lede: 'The flow an organization runs every month, and what happens to a single payment on the way through it.',
  },

  steps: [
    {
      title: 'Load your own book',
      body: 'An organization imports its landlords, properties, units, leases and residents itself, with a dry run first, a row-level validation report, and a rollback if the report reads badly.',
      source: 'property',
    },
    {
      title: 'Raise the month',
      body: 'Rent schedules raise invoices against the lease receivable in KES. The run is idempotent and resumable, so executing it twice is safe and finishing a half-done run is the same operation as starting it.',
      source: 'money · D-40',
    },
    {
      title: 'Residents pay over M-Pesa',
      body: 'Daraja callbacks arrive at the public webhook ingress and are verified, persisted and acknowledged before anything reads them. Nothing is processed inline on the callback.',
      source: 'gateway · payments · D-41',
    },
    {
      title: 'Payments reconcile against open invoices',
      body: 'The engine walks the order below, settling the oldest open invoice first. Whatever it cannot attribute posts to suspense and waits for a person, already in the ledger.',
      source: 'payments · D-15',
    },
    {
      title: 'Landlords are paid and can see why',
      body: 'Commission, VAT and repairs expense post as the entries they are, the balance sits in landlord payable, and the statement renders from the ledger with a last-updated stamp.',
      source: 'money · docs · reporting · D-45',
    },
  ],

  // DOMAIN.md §4. This order, no other, and nothing appended to it.
  reconciliationOrder: [
    {
      order: 1,
      label: 'Account reference',
      detail:
        'The account reference a resident puts on the payment is the code on the unit, and it is the first thing the engine reads.',
    },
    {
      order: 2,
      label: 'Payer phone on file',
      detail:
        'Failing that, the paying number is looked up against the phones verified on the lease. This resolves to a lease and not to a person, so two lease parties paying from two numbers allocate against the same invoice.',
    },
    {
      order: 3,
      label: 'Exact amount against open invoices',
      detail: 'Failing that, an exact amount against the open invoices on the lease, oldest first.',
    },
    {
      order: 4,
      label: 'Review queue',
      detail:
        'Anything still unattributed goes to a person, with the money already posted and the candidates it could belong to shown alongside it.',
    },
  ],

  suspenseNote:
    'A payment that none of the four steps attributes posts to suspense immediately and waits in the manual match queue. It is money in the ledger from the moment it arrives, just not yet attributed to a lease. Invoices settle oldest first and an overpayment becomes a credit against the next one. Attributing a suspense payment is an allocation — not a correction, not a reversal, and it carries no reason.',
}
