import type { SecurityContent } from '../types'

/**
 * S13 — security and trust.
 *
 * The tense here is the whole design of the section. Nothing is running yet:
 * Sprint 004 schedules the *first* restore drill and Sprint 007 is when the
 * auto-match rate is first instrumented. So every entry below is written as a
 * commitment the platform holds itself to, never as an operating history. "We
 * restore-drill monthly" is true and checkable; "we have restored monthly for
 * two years" would be a fabrication, and it is the kind a buyer's own auditor
 * would eventually ask to see evidence for.
 *
 * For the same reason there is no compliance badge on this section. Ethanel
 * holds no SOC 2 report and no ISO 27001 certificate, so it claims neither. The
 * substitutes are architectural facts a reader can check against the product
 * once it is in front of them — row-level isolation, integer money, immutable
 * postings, durable webhook ingress — plus the four publishable design targets,
 * each carrying the bound that makes it true (D-66's rule: a number without its
 * denominator is the defect, not the number).
 */
export const security: SecurityContent = {
  heading: {
    eyebrow: 'Security and reliability',
    title: 'Isolation, immutable postings, and money we never touch',
    lede: 'We hold no compliance certification and we will not pretend otherwise. What we can show you is how the system is built, and the targets we hold ourselves to before a single agency goes live.',
  },

  commitments: [
    {
      title: 'Your data is isolated in the database, not in our code',
      body: "Each organization's rows are separated by row-level security inside Postgres rather than by a filter somewhere in application code. A query that forgets to scope itself returns nothing at all, instead of returning another agency's rent roll.",
    },
    {
      title: 'Money is integer minor units, in KES',
      body: 'Every amount is held and posted as an integer number of cents in Kenyan shillings. No floating point goes anywhere near a balance, so a shilling cannot quietly vanish into a rounding mode between an invoice and a statement.',
    },
    {
      title: 'Postings are immutable and double entry is enforced',
      body: 'Debits equal credits on every entry and the journal is append-only. A correction is a new entry carrying a mandatory reason, never an edit to the original, so the audit trail cannot be rewritten after the fact — not by your staff, and not by us.',
    },
    {
      title: 'Payment callbacks are persisted before they are processed',
      body: 'Inbound webhooks are verified, written down and acknowledged first. Nothing is processed inline on the callback, which is what keeps a slow downstream step from turning into a payment that the ledger never hears about.',
    },
    {
      title: 'Backups go to a second region, and we restore-drill monthly',
      body: 'A backup nobody has restored is a hope, not a backup. We commit to a restore drill every month; the first one is scheduled for Sprint 004, and we will publish the date it runs rather than a history we do not yet have.',
    },
    {
      title: 'Ethanel never holds rent',
      body: "Resident payments settle to your organization's own client account, which is exactly what the client account cash ledger account exists to model. We are a ledger and a workflow, never a wallet, so our solvency never sits between a landlord and their rent.",
    },
  ],

  // The four publishable numbers, and there is no fifth. Each is a design
  // target the platform holds itself to — never a result a customer has seen,
  // because no customer has seen anything yet.
  targets: [
    {
      claim: '500 units invoiced in under 2 minutes',
      bound:
        'A rent run is idempotent and resumable, so executing it twice is safe and an interrupted run is finished rather than restarted.',
      source: 'D-40',
    },
    {
      claim: '50 callbacks per second for 10 minutes, zero loss',
      bound:
        'Webhook ingress only. Each callback is verified, persisted and acknowledged, and never processed inline.',
      source: 'D-41',
    },
    {
      claim: '95% of payments matched with no human action',
      bound:
        'Measured over rent and charge payments against open invoices; deposits and plot instalments are excluded from the denominator. This is a bar to clear before go-live on real partner data, not a result already achieved.',
      source: 'D-39, bounded by D-66',
    },
    {
      claim: 'Landlord figures read live from the ledger',
      bound:
        'Read on request with a last-updated stamp attached, never served from a cached summary that can drift from the journal.',
      source: 'D-45',
    },
  ],

  cta: { label: 'How the platform is secured', href: '/security' },
}
