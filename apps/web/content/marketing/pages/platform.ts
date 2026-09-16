import type { StandardPageContent } from '../types'

/**
 * `/platform` — the page that explains the shape of the thing, rather than
 * selling any one part of it.
 *
 * The ten feature pages each answer "what does it do for me". This page answers
 * the question underneath those: why is it one system at all, and what holds
 * the pieces together. The answer is the double-entry ledger. Every service on
 * the list either writes to it, reads from it, or feeds the facts that make a
 * posting possible — and that is not a diagram convention, it is why a payment
 * that arrives with no reference is still money in the books the moment it
 * lands, sitting in suspense rather than in somebody's inbox.
 *
 * So the page is organised around the ledger and not around a service map. An
 * agency owner does not buy twelve services; they operate a month: raise the
 * invoices, take the money, work out what the money was for, pay the landlord,
 * and be able to say afterwards exactly what happened. The `steps` block is
 * that month. The service names are attached to it, because every claim on this
 * site has to name the service that would implement it, but they are the trace
 * and not the story.
 *
 * What this page deliberately refuses to say: that any of it runs. No sprint has
 * shipped and no agency is live, so every capability here is written with the
 * sprint it is scheduled for, and the Sprint 012 work — land, plots,
 * instalments and SaaS billing — additionally says that Sprint 012 is the
 * designated slip absorber and may not ship at all. It also refuses to restate
 * the platform's bounded design targets; a number without its denominator is a
 * different number, so they live on `/security` and this page links there.
 *
 * It refuses, finally, to draw the architecture as a claim about scale. Twelve
 * logical services is a boundary decision about which team and which database
 * own what, not a boast about deployment topology, and nothing on a marketing
 * page should imply a reader can verify it.
 */
export const platform: StandardPageContent = {
  slug: '/platform',

  meta: {
    title: 'The platform: twelve services around one double-entry ledger',
    description:
      'How Ethanel fits together: property, money, payments, messaging and ops arranged around one append-only ledger, and the sprint each part is scheduled for.',
  },

  hero: {
    eyebrow: 'The platform',
    h1: 'Twelve services, one ledger, one version of what happened',
    lede: 'Ethanel is built as twelve logical services around a double-entry ledger that every one of them answers to. This page is how they fit, what an agency actually operates month to month, and which sprint each part is scheduled for.',
  },

  blocks: [
    {
      kind: 'prose',
      links: [
        { label: 'Find a home or a plot', href: '/find' },
        { label: 'How we bound every number', href: '/security' },
        { label: 'How Ethanel is priced', href: '/pricing' },
      ],
      heading: {
        eyebrow: 'The centre',
        title: 'The ledger is the product; the rest is how facts reach it',
        lede: 'Start here, because every design decision downstream is a consequence of this one.',
      },
      paragraphs: [
        'Money in Ethanel is held and posted in KES against a fixed chart of nine accounts — lease receivable, deposit liability, landlord payable, agency commission income, VAT payable, repairs expense, client account cash, cash in transit and suspense. Debits equal credits on every entry, and entries are append-only. A posting that was wrong is not edited; it is undone by a reversal that carries a mandatory reason and is itself an entry on the record.',
        'That immutability is what makes the rest of the system possible to reason about. A rent run can be executed twice without doubling anybody’s invoice because the run is idempotent and resumable. A payment that arrives with no usable reference posts to suspense immediately and waits in a manual match queue, so the cash is in the books from the moment it lands and the only open question is which lease it belongs to. Attributing it later is an allocation, which is a different operation from a reversal and deliberately carries neither a reason nor an approval threshold.',
        'A receivable belongs to a lease rather than to a person, which is why two lease parties paying separately from two different phones allocate against the same invoice, and why a lease ending does not orphan what is still owed under it. Landlord figures are read live from the ledger with a last-updated stamp rather than served from a cached summary. The bounds on that and on every other number Ethanel publishes are set out on the security page.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The services',
        title: 'What each of the twelve owns',
        lede: 'A boundary is a statement about who owns which data. Nothing here has shipped; the schedule is in the table below.',
      },
      items: [
        {
          title: 'property',
          body: 'Landlords, management agreements, properties and the units inside them, leases and lease parties, residents, the lease lifecycle from move-in through renewal and notice to move-out, deposits held as a liability rather than as income, inspections and caretaker assignment.',
        },
        {
          title: 'money',
          body: 'The chart of nine accounts and the journal itself: invoices, rent schedules, credit notes, receipts, statements, reversals with their mandatory reasons, arrears positions and landlord remittance. Every other service writes here or reads here.',
        },
        {
          title: 'payments',
          body: 'M-Pesa Daraja, the callback ingress, the reconciliation engine, the suspense account and the manual match queue. Callbacks are verified, persisted and acknowledged rather than processed inline, so a slow downstream step cannot cost you a payment.',
        },
        {
          title: 'messaging',
          body: 'WhatsApp as the primary channel with SMS fallback, the shared conversation inbox with one assignee per conversation and everyone else read-only, and notification preferences per event group and per channel. Financial notices are mandatory and cannot be switched off.',
        },
        {
          title: 'ops',
          body: 'Repair requests raised by residents and the work orders staff dispatch in response, through New, Triaged, Assigned, In progress, Awaiting approval, Awaiting resident confirmation and Closed, plus Rejected and Duplicate. Caretaker tasks, expenses and vendors sit here too.',
        },
        {
          title: 'docs',
          body: 'Rendering leases, receipts and statements as documents, and the signature requests that go with them. Email is the channel for documents, where WhatsApp is the channel for conversation.',
        },
        {
          title: 'listing',
          body: 'Marketplace listings and search, agency storefronts, viewings and marketplace leads, plus plot inventory and subdivisions. This is the public-facing half of the platform and the one behind the find-a-home surface.',
        },
        {
          title: 'reporting',
          body: 'Read models, saved views and exports. Kept separate from money so that a report can be reshaped without touching the journal that the report is derived from.',
        },
        {
          title: 'identity',
          body: 'Organizations, users, memberships, roles, permissions and the audit log. Every query carries the organization it belongs to, which is where the isolation boundary between agencies is enforced.',
        },
        {
          title: 'gateway',
          body: 'The public REST API and every inbound webhook, including the M-Pesa callbacks. One ingress that authenticates, verifies and persists before anything downstream is asked to think.',
        },
        {
          title: 'billing',
          body: 'SaaS plans, usage counters and per-organization feature flags — how Ethanel charges an agency, as distinct from how an agency charges a landlord, which is money. Scheduled for Sprint 012, which may not ship; see the pricing page.',
        },
        {
          title: 'web',
          body: 'The Next.js application itself: the agency console, the resident and landlord portals, the low-data caretaker screens and this public site.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'A month, end to end',
        title: 'What an agency actually operates',
        lede: 'The same cycle you run now, with the reconciliation step done by the system and the exceptions handed back as a queue rather than as a mystery.',
      },
      steps: [
        {
          title: 'The rent run raises the invoices',
          body: 'One run across the portfolio posts an invoice per lease against lease receivable. The run is idempotent and resumable, so an interrupted run is safe to execute again — a design target with its bound is set out on the security page.',
          source: 'money · Sprints 005–006',
        },
        {
          title: 'Residents pay, and the callback is captured before anything else',
          body: 'An M-Pesa payment callback arrives at the gateway, is verified, persisted and acknowledged, then queued. Nothing about matching happens on the callback path, because the only unforgivable failure here is losing a payment.',
          source: 'gateway, payments · Sprint 007',
        },
        {
          title: 'Reconciliation runs in a fixed order, and posts either way',
          body: 'Account reference on the unit code first, then the payer phone on file resolved to a lease, then an exact amount against open invoices, oldest first, with overpayment becoming a credit. Anything unresolved posts to suspense and waits in the manual match queue.',
          source: 'payments · Sprint 007',
        },
        {
          title: 'Repairs and conversations post their own consequences',
          body: 'A repair request becomes a work order, an approved work order becomes an expense against repairs expense, and the resident is notified over WhatsApp with SMS as fallback. The conversation has one assignee; everyone else on the team reads it.',
          source: 'ops, messaging · Sprints 008–009',
        },
        {
          title: 'The landlord is paid and the statement is rendered from the journal',
          body: 'Commission, VAT and approved expenses net off against the landlord payable balance, and the statement is generated from the entries rather than from a summary table, carrying a last-updated stamp.',
          source: 'money, docs, reporting · Sprints 006 and 010',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Schedule',
        title: 'When each part is scheduled',
        lede: 'Nothing on this site has shipped and no agency is live. Every row below is a plan with a sprint against it, and one of them says it may not arrive at all.',
      },
      rows: [
        {
          label: 'Reporting read models and exports',
          value:
            'Scheduled for Sprint 004, alongside the first restore drill described on the security page.',
        },
        {
          label: 'Ledger, invoicing, rent runs and statements',
          value:
            'Scheduled for Sprints 005 and 006. This is the centre of the platform and it is scheduled first for that reason.',
        },
        {
          label: 'Documents and signing',
          value:
            'Scheduled for Sprint 006, so that a statement has something to render into as soon as there are statements.',
        },
        {
          label: 'Payments, reconciliation, suspense and the match queue',
          value:
            'Scheduled for Sprint 007. This is also when the auto-match design target is first instrumented against real data.',
        },
        {
          label: 'Repairs and work orders',
          value:
            'Scheduled for Sprint 008, with caretakers online-only in the pilot on low-data screens.',
        },
        {
          label: 'WhatsApp and notifications',
          value:
            'Scheduled for Sprint 009, WhatsApp primary with SMS fallback and email reserved for documents.',
        },
        {
          label: 'Resident and landlord portals',
          value:
            'Scheduled for Sprint 010, reading live from the ledger rather than from a cached summary.',
        },
        {
          label: 'Marketplace, viewings and storefronts',
          value:
            'Scheduled for Sprint 011. The public find-a-home surface says plainly that it is not open yet.',
        },
        {
          label: 'Land, plots, instalments and SaaS billing',
          value:
            'Scheduled for Sprint 012, which is the designated slip absorber for the whole plan and may not ship at all. Treat it as intent rather than as a date.',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Walk the ledger with your own month in mind',
      lede: 'The fastest way to judge whether this fits your portfolio is to take one of your own rent cycles and follow it through the steps above with us.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
