import type { FeaturePageContent } from '../types'

/**
 * `/features/documents-and-signing` — the page where the honest claim is about
 * provenance rather than about paper.
 *
 * Every other document product on the market renders a template and asks
 * somebody to fill it in. The one fact worth stating here is the opposite one:
 * a document is rendered *from the record*, which is why a receipt refers to
 * the entry that recorded the money and why a statement cannot show a figure
 * the journal does not hold. That is the whole page, and it is a structural
 * claim rather than a feature list.
 *
 * Two things the pack settles and two it does not, kept straight on purpose.
 * Settled: rendering and signature requests are Sprint 006, the lease they
 * render from is Sprint 005, and email is the channel for documents while
 * WhatsApp carries messages and SMS is the fallback. Not settled: which
 * e-signature provider is used, and what weight a signature carries under
 * Kenyan law — DEBT-09 has that waiting on advocate review. Neither is guessed
 * here; both are stated as open in `limits`, because a page that implies a
 * legal position we do not hold is worse than a page that admits the gap.
 *
 * No `target` block. None of the four publishable numbers is about documents,
 * and inventing a fifth to fill the slot is exactly what D-68 forbids.
 */
export const documentsAndSigning: FeaturePageContent = {
  slug: 'documents-and-signing',
  locale: 'en-KE',
  meta: {
    title: 'Documents and signing',
    description:
      'Leases, receipts and statements are rendered from the record they describe, so a receipt refers to the entry that recorded the money, not to a form field.',
  },

  hero: {
    eyebrow: 'Documents and signing',
    h1: 'Documents rendered from the record, not typed into a template',
    subhead:
      'A lease comes out of the lease. A receipt comes out of the posting. A statement comes out of the journal. Nothing on a document is a second copy of the truth that somebody has to remember to update.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Producing the paper without re-typing the facts',
      lede: 'An agency does not have a document problem. It has a problem with documents that disagree with the books, and with nobody being sure which one is right.',
    },
    body: [
      'The lease is in a folder, the rent figure is in a spreadsheet, and the receipt is a template someone opened, edited and saved under a new name. Each of those is a place the same fact lives, and each of them is a place it can drift. By the time a landlord queries a statement, answering the query means opening three files and deciding which one to believe.',
      'The re-typing is the expensive part, and it is expensive twice. Once when somebody does it, and again when a figure that was keyed by hand turns out not to match the money that actually moved.',
      'Ethanel renders documents from the record instead. A lease document is rendered from the lease — its parties, its dates, its rent. A receipt is rendered against the posting that recorded the payment, which is why it refers to that entry and not to a form field somebody completed afterwards. A landlord statement is rendered from the journal, so the closing balance on the page is the closing balance in the books by construction rather than by diligence.',
      'The consequence is the point. A document cannot say something the record does not say. If a figure is wrong, the correction is a new entry in the ledger with a reason attached, and the document re-renders from the corrected record — nobody edits the PDF.',
      'Documents go out by email. WhatsApp is the channel for messages and SMS is the fallback behind it, but a lease or a statement is something a landlord needs to keep, forward and find again, and email is where that belongs.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'Rendering, delivery and signature requests',
      lede: 'Each bullet names the service that implements it and the sprint it is scheduled for. Nothing here has shipped, and nothing here is labelled as though it had.',
    },
    items: [
      {
        label: 'Lease documents rendered from the lease',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'Rendered from the lease record, its parties and its dates — never a second copy somebody maintains.',
      },
      {
        label: 'Receipts rendered against the posting',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'The receipt refers to the entry that recorded the money, not to a field on a form.',
      },
      {
        label: 'Landlord statements rendered from the journal',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'Opening balance, postings and closing balance, read from the journal rather than assembled by hand.',
      },
      {
        label: 'Signature requests against a rendered document',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'A request sent to a named signer and tracked until it comes back. The provider behind it is not chosen.',
      },
      {
        label: 'The lease a document is rendered from',
        service: 'property',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Lease parties, dates and the lease lifecycle — move-in, renewal, notice, move-out — in one record.',
      },
      {
        label: 'The postings a receipt and a statement read',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Held in KES, double entry, append-only. A figure on a document is a figure in the journal.',
      },
      {
        label: 'Email delivery of documents',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'Email is the document channel. WhatsApp carries messages and SMS is the fallback behind it.',
      },
      {
        label: 'Who asked for it, and who signed it',
        service: 'identity',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Requests and signatures are written to the audit log as they happen, against a real user.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'From record to document to signature',
      lede: 'The order matters, because it is the order that makes a document checkable against something.',
    },
    steps: [
      {
        title: 'The record exists first',
        body: 'A lease, an invoice or a posting. There is no step where a document is created for a thing that is not already in the system, which is what stops a document from becoming a source of facts of its own.',
        source: 'DOMAIN.md §4',
      },
      {
        title: 'A render is requested against it',
        body: 'The render names the record it is for. A receipt names the entry that recorded the money; a statement names the period and the landlord it covers.',
        source: 'SERVICE-TOPOLOGY.md · docs-svc',
      },
      {
        title: 'The figures come out of the journal',
        body: 'Money on a document is read from postings, in KES, and postings are immutable. Nothing is keyed in on the way to the page.',
        source: 'D-61',
      },
      {
        title: 'It goes out by email',
        body: 'Documents are emailed, because a lease or a statement is something a landlord keeps and comes back to. WhatsApp stays the channel for messages and SMS the fallback.',
        source: 'DOMAIN.md §5',
      },
      {
        title: 'A signature is requested, not assumed',
        body: 'A signature request is sent to a named signer and tracked until it is returned. Which provider carries it is an open question, and this page does not pretend otherwise.',
        source: 'SERVICE-TOPOLOGY.md · docs-svc',
      },
      {
        title: 'Who did what is written down',
        body: 'The request and the signature land in the audit log against the user who made them, so the question of who approved a document has an answer that does not depend on memory.',
        source: 'SERVICE-TOPOLOGY.md · identity-svc',
      },
      {
        title: 'A correction re-renders',
        body: 'A wrong figure is fixed by a new entry carrying a reason, never by editing the one before it. The document is rendered again from the corrected record; the old one is not quietly overwritten.',
        source: 'DOMAIN.md §4',
      },
    ],
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'The parts we are not going to overstate',
      lede: 'Two of these are open questions rather than design choices, and it matters which is which.',
    },
    items: [
      'The e-signature provider is not chosen. Signature requests are scheduled and their shape is settled; which service actually captures the signature is not, and we are not going to name one on a marketing page before we have picked it.',
      'We make no claim about what a signature signed through Ethanel is worth under Kenyan law. That is advocate work, it is still in review, and an implied legal position is exactly the kind of invented fact that gets built on. Ask us and we will tell you where the review has got to.',
      'A document is not a record you can edit. Nothing on a rendered receipt or statement can be changed in the document itself — a mistake is corrected by a new ledger entry with a reason, and the document is rendered again from what the books now say.',
      'Documents are emailed, not sent over WhatsApp. WhatsApp is the conversation channel and SMS is its fallback; a lease or a statement goes to an email address, and an organization without one for a landlord will need to collect it.',
      'None of this has shipped. Rendering and signature requests are scheduled for Sprint 006, the lease they render from and the journal they read for Sprint 005, and email delivery for Sprint 009. No sprint has completed.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What produces the records these documents are made of',
    },
    links: [
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Invoicing and rent runs', href: '/features/invoicing-and-rent-runs' },
      { label: 'Landlord statements and remittance', href: '/features/landlord-statements' },
      { label: 'WhatsApp and notifications', href: '/features/whatsapp-and-notifications' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Bring the statement a landlord argued with',
      lede: 'The useful demo is the one where you check a rendered page against the entries behind it, line by line, and see whether they agree.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
