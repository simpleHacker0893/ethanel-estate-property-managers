import type { FeaturePageContent } from '../types'

/**
 * `/features/repairs-and-work-orders` — the page where the vocabulary is the
 * feature.
 *
 * A **repair request** is what a resident raises. A **work order** is what
 * staff dispatch in response. They are not synonyms and they are not two names
 * for one record: a request can produce more than one work order, a request
 * can be rejected or marked duplicate without any work order ever existing,
 * and the money only ever attaches to the work order. Collapsing the two into
 * a single generic record is how a repairs module ends up unable to say what a
 * landlord was actually charged for, so the two words are used strictly here
 * and nowhere loosened for rhythm.
 *
 * The lifecycle is quoted exactly as DOMAIN.md holds it, including the two
 * terminal states that are not Closed. Caretakers being online-only in the
 * pilot is a real scoping decision and sits in the limits block where a reader
 * deciding whether to pilot will see it, not buried as a footnote.
 *
 * No number appears on this page. Response times and completion rates are
 * exactly the figures a repairs page invents, and there is no measured one to
 * publish (D-68).
 */
export const repairsAndWorkOrders: FeaturePageContent = {
  slug: 'repairs-and-work-orders',
  locale: 'en-KE',
  meta: {
    title: 'Repairs and work orders',
    description:
      'A resident raises a repair request; staff dispatch a work order against it. One lifecycle, named states, and the cost landing in repairs expense on the ledger.',
  },

  hero: {
    eyebrow: 'Repairs and work orders',
    h1: 'A repair request from the resident, a work order from you',
    subhead:
      'Two different things, kept apart on purpose. What was reported has its own record and its own history; what was dispatched in response has a state, an assignee and a cost that reaches the ledger.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job to be done',
      title: 'Knowing what was reported, what was done, and what it cost',
      lede: 'Three questions that are usually answered by scrolling a group chat until somebody recognises a photo.',
    },
    body: [
      'A resident reports a leak. A caretaker is called. A plumber turns up, or does not. Somebody pays, and a month later the landlord asks what the deduction on their statement was for. Every part of that is recoverable from the messages, given an afternoon, and nobody has an afternoon.',
      'The loss is not really the record. It is that nobody can say, at a glance, which reports are waiting on staff and which are waiting on a resident, so the ones that go quiet go quiet permanently — and those are the ones that turn into a dispute at renewal.',
      'Ethanel separates the two records that the group chat conflates. The repair request is the resident’s: what they reported, when, with photographs, and what state it is in. The work order is the agency’s: who was dispatched, what was approved, what it cost, and against which unit.',
      'The cost lands where a cost belongs. A repair posts to repairs expense on the double-entry journal, against the unit it was carried out on, so the deduction a landlord sees on a statement has an entry behind it rather than a note.',
      'Ethanel does not pay the plumber. It records the expense; the money moves in the organization’s own client account, the same as every other shilling on the platform.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'From the report to the posting',
      lede: 'Each bullet names the service that implements it and the sprint it is scheduled for. Nothing here has shipped, and nothing here is labelled as though it had.',
    },
    items: [
      {
        label: 'Repair requests raised by residents',
        service: 'ops',
        availability: 'sprint',
        sprint: 'Sprint 008',
        description:
          'What was reported, by whom, against which unit, with photographs, held as its own record.',
      },
      {
        label: 'Work orders dispatched against a request',
        service: 'ops',
        availability: 'sprint',
        sprint: 'Sprint 008',
        description:
          'What staff sent someone to do. A request can produce more than one, and each carries its own state.',
      },
      {
        label: 'One lifecycle, with named states',
        service: 'ops',
        availability: 'sprint',
        sprint: 'Sprint 008',
        description:
          'New, Triaged, Assigned, In progress, Awaiting approval, Awaiting resident confirmation, Closed.',
      },
      {
        label: 'Rejected and Duplicate are real outcomes',
        service: 'ops',
        availability: 'sprint',
        sprint: 'Sprint 008',
        description:
          'A request that should not proceed is closed as one of those, with the reason visible, not left open.',
      },
      {
        label: 'Caretaker tasks on low-data screens',
        service: 'ops',
        availability: 'sprint',
        sprint: 'Sprint 008',
        description:
          'The caretaker view is built for a handset on a weak connection, not a shrunken desktop table.',
      },
      {
        label: 'Caretaker assignment held against the unit',
        service: 'property',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Who covers which units is part of the property record, so dispatch does not depend on memory.',
      },
      {
        label: 'Vendors, and what they were engaged for',
        service: 'ops',
        availability: 'sprint',
        sprint: 'Sprint 008',
        description:
          'External vendors sit on the work order, so a cost is always traceable to who did the work.',
      },
      {
        label: 'Repairs expense posted to the journal',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'The cost posts to repairs expense as an immutable entry. Debits equal credits, append-only.',
      },
      {
        label: 'Inspections recorded against the unit',
        service: 'property',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Move-in and move-out condition sits with the unit, where a later repair argument can reach it.',
      },
      {
        label: 'Photographs and paperwork kept with the record',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'Evidence and vendor paperwork attach to the request or the work order rather than to a chat thread.',
      },
      {
        label: 'Updates on the channel residents use',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'State changes reach the resident over WhatsApp, with SMS behind it, from the record itself.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'The lifecycle, in the order it runs',
      lede: 'These states and no others. A workflow that grows an informal state every quarter is a workflow nobody can report on.',
    },
    steps: [
      {
        title: 'New',
        body: 'A resident raises a repair request against their unit, with photographs. It exists from that moment as a record with a state, not as a message somebody has to remember to act on.',
        source: 'DOMAIN.md',
      },
      {
        title: 'Triaged',
        body: 'Staff decide what it is and what it needs. Two of the exits are terminal: Rejected for work that will not be carried out, and Duplicate for a report of the same leak that has already been raised.',
        source: 'DOMAIN.md',
      },
      {
        title: 'Assigned',
        body: 'A work order is dispatched — to the caretaker who covers that unit, or to a vendor. The request stays the resident’s record; the work order is the one that carries the assignee and the cost.',
        source: 'DOMAIN.md',
      },
      {
        title: 'In progress',
        body: 'Work is under way and the record says so. The caretaker updates it from a low-data screen on a handset, which is where the update is actually going to come from.',
        source: 'DOMAIN.md',
      },
      {
        title: 'Awaiting approval',
        body: 'Spending on a landlord’s property is agreed before it happens, not argued about afterwards. Work that needs a sign-off waits in this state rather than proceeding quietly.',
        source: 'DOMAIN.md',
      },
      {
        title: 'Awaiting resident confirmation',
        body: 'Staff do not close their own work. The resident who reported it confirms the repair was done, which is what stops a closed record and an unhappy household from being the same week.',
        source: 'DOMAIN.md',
      },
      {
        title: 'Closed, and posted',
        body: 'The cost posts to repairs expense against the unit, as an immutable entry on the journal. What a landlord sees deducted on a statement traces back to this work order.',
        source: 'D-61',
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
      'Caretakers are online-only in the pilot. The screens are built to be light on data and to work on a modest handset, but there is no offline capture and no queued sync — a caretaker with no connection cannot update a work order until they have one.',
      'Ethanel does not pay vendors. The expense is recorded against the unit and reaches the landlord’s statement; the money itself moves in the organization’s own client account, which Ethanel never holds.',
      'A posted cost is never edited. Getting a repairs expense wrong is undone by a reversal that names the entry it undoes and carries a mandatory reason, so the statement history stays the history that happened.',
      'There is no state outside the lifecycle. If your process has a stage this one does not, it will have to map onto these states rather than being added as a local variant.',
      'None of this has shipped. Repair requests, work orders, caretaker tasks, vendors and expenses are scheduled for Sprint 008, units and caretaker assignment for Sprint 005, the ledger they post into for Sprints 005 and 006, documents for Sprint 006, and resident messaging for Sprint 009.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What sits either side of a repair',
    },
    links: [
      { label: 'WhatsApp and notifications', href: '/features/whatsapp-and-notifications' },
      { label: 'Documents and signing', href: '/features/documents-and-signing' },
      { label: 'Landlord statements and remittance', href: '/features/landlord-statements' },
      { label: 'Residents and caretakers', href: '/solutions/residents-and-caretakers' },
      { label: 'Letting agencies', href: '/solutions/letting-agencies' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Walk us through the repair that went wrong',
      lede: 'The one that turned into a deduction nobody could explain at renewal. That is the case worth testing this against.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
