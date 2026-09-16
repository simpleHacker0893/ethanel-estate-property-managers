import type { FaqContent } from '../types'

/**
 * S15 — the questions a sceptical Nairobi agency owner actually asks, in
 * roughly the order they ask them.
 *
 * The first one is not a warm-up. "Do you hold our rent?" is one of the two
 * answers that decide a deal, and the answer is No: funds settle to the
 * organization's own client account, which is what the client account cash
 * ledger account exists to model. It is the first question a landlord asks an
 * agency, so it is the first question this page answers.
 *
 * The rest are written to the same standard as the rest of the site. Nothing
 * here claims a customer, a result or a price. Where a capability is not yet
 * built the answer says which sprint it is scheduled for, because an FAQ that
 * quietly describes the roadmap in the present tense is the most expensive kind
 * of copy on a site like this one — it is the copy a buyer quotes back to you
 * in month two.
 *
 * The section component builds its FAQPage structured data from this array, so
 * the answer a search engine indexes is the answer on the screen by
 * construction rather than by anyone remembering to update two places.
 */
export const faq: FaqContent = {
  heading: {
    eyebrow: 'Questions',
    title: 'The questions agency owners ask first',
    lede: 'Short answers, with the limits included. If something is scheduled rather than built, it says so.',
  },

  items: [
    {
      question: 'Do you hold our rent?',
      answer:
        "No. Resident payments settle into your organization's own client account, and that account is what the ledger models as client account cash. Ethanel is a ledger and a workflow, never a wallet: we never take custody of your landlords' money, so nothing that happens to us can strand it.",
    },
    {
      question: 'What happens when a resident pays the wrong amount, or forgets the reference?',
      answer:
        'The payment posts to suspense the moment it arrives, so it is in the ledger from the first second — it is simply not attributed to a lease yet. It then waits in a manual match queue for someone to allocate it. Matching runs in a fixed order: the account reference on the unit, then a payer phone already verified against the lease, then an exact amount against open invoices, oldest invoice first. An overpayment becomes a credit rather than a puzzle. Payments, reconciliation and the match queue are scheduled for Sprint 007.',
    },
    {
      question: 'Is our data separate from every other agency on the platform?',
      answer:
        "Yes, and the separation is enforced by the database rather than by our application code. Every row belongs to an organization, and row-level security in Postgres decides what a connection can see. A query that forgets to scope itself returns nothing, instead of returning someone else's rent roll.",
    },
    {
      question: 'Can our accountant see the books?',
      answer:
        'The books are a real double-entry journal, not a report generated from one: debits equal credits on every entry, entries are append-only, and a correction is recorded as a new entry carrying a mandatory reason rather than as an edit. Nine accounts, named the same way every month, so your accountant reads the same chart in January as in December. Memberships, roles and permissions are part of the organization model and are scheduled for Sprint 002; exactly which roles exist at launch is something we are settling with pilot partners rather than announcing here. Reporting read models and exports are scheduled for Sprint 004.',
    },
    {
      question: 'What if we decide to leave?',
      answer:
        'You take your data with you. Leases, residents, landlords, units, invoices, payments and the full journal are exportable, because a ledger you cannot get out of the system is not a ledger you can rely on. Exports are scheduled for Sprint 004, and the same import path you use to arrive — self-serve, with a dry run, a row-level validation report and a rollback — is the one that proves the data was portable in the first place.',
    },
    {
      question: 'Do residents need to install an app?',
      answer:
        'No. Residents pay over M-Pesa and hear from you over WhatsApp, with SMS as the fallback and email for documents. A resident portal is scheduled for Sprint 010 for the people who want one, but collecting rent never depends on a resident downloading anything.',
    },
    {
      question: 'Who holds the deposits, and how are they accounted for?',
      answer:
        'Deposits sit in your client account, and the ledger carries them as a deposit liability rather than as income — money you are holding on behalf of someone else, not money you have earned. They stay a liability until the lease reaches move-out and the deposit is settled against what is owed.',
    },
    {
      question: 'How does a repair reach a caretaker?',
      answer:
        'A resident raises a repair request. It moves through New, Triaged, Assigned, In progress, Awaiting approval, Awaiting resident confirmation and Closed, with Rejected and Duplicate as the two other ways out. Your staff dispatch a work order against the request, and expenses land against the property rather than in a chat thread. Caretakers are online-only in the pilot, on deliberately low-data screens. Repairs and work orders are scheduled for Sprint 008.',
    },
    {
      question: 'What can we use today, and what is only scheduled?',
      answer:
        'Today, this site — no sprint has shipped yet, and nothing on this page pretends otherwise. The ledger, invoicing, rent runs and statements are scheduled across Sprints 005 and 006; documents and signing for Sprint 006; payments and reconciliation for Sprint 007; repairs for Sprint 008; WhatsApp and notifications for Sprint 009; the resident and landlord portals for Sprint 010; the marketplace for Sprint 011. Land, plots, instalments and SaaS billing sit in Sprint 012, which is the designated slip absorber and may not ship at all. Every capability on this site carries its own label.',
    },
    {
      question: 'What does it cost?',
      answer:
        'You pay for each unit under management, billed monthly to the organization, with the tier depending on how many units you manage and which capabilities you switch on. The tiers are being settled with our first pilot partners, so there is no figure on this site yet. Tell us the size of the portfolio and what you need it to do, and you will get a pilot price in writing.',
    },
  ],
}
