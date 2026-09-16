import type { Capability, FeatureGridContent } from '../types'

/**
 * S6 — the capability grid, and the honesty mechanism doing its job in public.
 *
 * Ten capabilities, one per feature page, each naming the service that
 * implements it (the `ServiceName` union of D-67) and each carrying its real
 * availability. Nothing on this site is `available` yet: no sprint has shipped,
 * so every entry is `sprint` or `may-not-ship` and the sprint is named. The
 * type makes the omission impossible rather than merely discouraged —
 * acceptance row 7 is a compile error, not a test.
 *
 * ORDER IS LOAD-BEARING. The entries are in `FEATURE_SLUGS` order, because the
 * `FeatureGrid` section derives each card's `/features/<slug>` link from
 * `FEATURE_SLUGS` by index — `Capability` has no href field and this slice does
 * not get to add one. Reordering this array without reordering `FEATURE_SLUGS`
 * silently points every card at the wrong page. An eleventh entry, with no
 * slug to pair with, renders as a card with no link rather than as a broken
 * one — the section handles that case explicitly.
 *
 * Labels say what the capability does for an agency, not what the service is
 * called. The service trace is the `service` field, where the type system can
 * hold it; a label that read "money-svc" would be an engineering org chart
 * printed on a marketing page.
 *
 * Availability comes from the track brief §7. Sprint 012 — land, plots,
 * instalments and SaaS billing — is a designated slip absorber that may not
 * ship at all, so it is `may-not-ship` and the card says so rather than selling
 * week twelve as a date.
 */

const LEDGER_SPRINT = 'Sprint 005–006'
const PAYMENTS_SPRINT = 'Sprint 007'

const capabilities: Capability[] = [
  {
    // 1 — /features/rent-collection
    label: 'Collect rent over M-Pesa without chasing references',
    service: 'payments',
    availability: 'sprint',
    sprint: PAYMENTS_SPRINT,
    description:
      'Daraja callbacks verified, persisted and acknowledged, then reconciled against the open invoices.',
  },
  {
    // 2 — /features/reconciliation
    label: 'Know who has paid without opening a spreadsheet',
    service: 'payments',
    availability: 'sprint',
    sprint: PAYMENTS_SPRINT,
    description:
      'Account reference, then payer phone, then exact amount, then a review queue. Suspense holds the rest.',
  },
  {
    // 3 — /features/invoicing-and-rent-runs
    label: 'Raise a whole month of rent in one run',
    service: 'money',
    availability: 'sprint',
    sprint: LEDGER_SPRINT,
    description:
      'Rent schedules, invoices and credit notes on a double-entry ledger. The run is idempotent and resumable.',
  },
  {
    // 4 — /features/landlord-statements
    label: 'Show every landlord where their money is',
    service: 'money',
    availability: 'sprint',
    sprint: LEDGER_SPRINT,
    description:
      'Remittance and statements read live from the ledger with a last-updated stamp, never from a cached summary.',
  },
  {
    // 5 — /features/arrears-and-credit-control
    label: 'See who is behind, and by how long',
    service: 'money',
    availability: 'sprint',
    sprint: LEDGER_SPRINT,
    description:
      'Arrears from the ledger itself, ageing by invoice, oldest first, with credits already applied.',
  },
  {
    // 6 — /features/repairs-and-work-orders
    label: 'Turn a repair request into a dispatched work order',
    service: 'ops',
    availability: 'sprint',
    sprint: 'Sprint 008',
    description:
      'New, triaged, assigned, in progress, awaiting approval, awaiting resident confirmation, closed.',
  },
  {
    // 7 — /features/whatsapp-and-notifications
    label: 'Reach residents where they already read messages',
    service: 'messaging',
    availability: 'sprint',
    sprint: 'Sprint 009',
    description:
      'WhatsApp first with SMS fallback, one assignee per conversation, financial notices always on.',
  },
  {
    // 8 — /features/documents-and-signing
    label: 'Send a lease, a receipt or a statement as a document',
    service: 'docs',
    availability: 'sprint',
    sprint: 'Sprint 006',
    description:
      'Rendered from the same records the ledger holds, with signature requests where a signature is owed.',
  },
  {
    // 9 — /features/marketplace-and-viewings
    label: 'Put vacant units in front of people and book viewings',
    service: 'listing',
    availability: 'sprint',
    sprint: 'Sprint 011',
    description: 'Storefronts, search and viewings, with a lead record for each prospect who asks.',
  },
  {
    // 10 — /features/land-plots-and-instalments
    label: 'Sell plots and follow the instalments',
    service: 'listing',
    availability: 'may-not-ship',
    sprint: 'Sprint 012',
    description:
      'Plot inventory and subdivisions. Sprint 012 absorbs slip from earlier sprints and may not ship.',
  },
]

export const featureGrid: FeatureGridContent = {
  heading: {
    eyebrow: 'What it does',
    title: 'Ten capabilities, each traced to a service and a sprint',
    lede: 'Every capability names the service that implements it and when it is scheduled. Nothing here has shipped yet, and the labels say so.',
  },
  capabilities,
  cta: {
    label: 'See how the platform fits together',
    href: '/platform',
  },
}
