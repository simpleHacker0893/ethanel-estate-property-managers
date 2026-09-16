import type { FeaturePageContent } from '../types'

/**
 * `/features/whatsapp-and-notifications` — the page that leads with the
 * restriction rather than the reach.
 *
 * The interesting fact about notifications here is not that they go out over
 * WhatsApp. It is the asymmetry: notices about money are mandatory and cannot
 * be switched off, while everything else is a per-event-group, per-channel
 * choice the recipient makes. Selling the reach and hiding the mandatory half
 * in a limits bullet would be the dishonest ordering, and it is also the less
 * persuasive one — an agency owner reading this has been burned by a resident
 * who claims they never got the demand.
 *
 * The second design decision stated plainly is one assignee per conversation,
 * everyone else read-only. That is a real constraint with a real cost (no two
 * people answering at once) and it is written as a constraint, not as
 * "collaboration".
 *
 * Nothing on this page names a phone number, a WhatsApp handle or an address.
 * Q20 is open — the organization's own number is not published anywhere yet —
 * and inventing one would be a business fact, indexed as such.
 */
export const whatsappAndNotifications: FeaturePageContent = {
  slug: 'whatsapp-and-notifications',
  locale: 'en-KE',
  meta: {
    title: 'WhatsApp and notifications',
    description:
      'WhatsApp primary, SMS behind it, email for documents. Notices about money are mandatory; everything else is a choice, per event group and per channel.',
  },

  hero: {
    eyebrow: 'WhatsApp and notifications',
    h1: 'Notices about money are mandatory. Everything else is a choice.',
    subhead:
      'WhatsApp is the primary channel, SMS is the fallback, and documents go by email. A resident can turn off most of what we send them — but not a demand, a receipt or a statement notice.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Reaching people where they already are, without losing the thread',
      lede: 'The channel is settled. Kenyan residents answer WhatsApp. What is not settled, in most agencies, is who replied and whether the message was ever sent.',
    },
    body: [
      'Messages to residents come from staff handsets, which means the record of what an agency told someone lives on a phone that leaves with the person who owns it. When a resident says they were never told the rent had gone up, there is no place to look that settles it.',
      'The mirror problem is the group inbox. Everyone can see the conversation, so everyone assumes someone else is replying, and two people answer the same resident differently in the same hour.',
      'Ethanel takes a position on both. Conversations belong to the organization, not to a handset. And one person is the assignee on a conversation at a time — everybody else can read it, but only the assignee replies.',
      'Outbound notices are split into event groups, and a recipient chooses which groups reach them on which channel. That choice stops at money. A notice about an amount owed, a payment received or a statement issued is mandatory, because the alternative is a resident who has opted out of being told they are in arrears and an agency that cannot prove it tried.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'The channel, the inbox and the preferences',
      lede: 'Each bullet names the service that implements it and the sprint it is scheduled for. Nothing here has shipped, and nothing here is labelled as though it had.',
    },
    items: [
      {
        label: 'WhatsApp as the primary channel',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'The channel residents already read, used as the default rather than as an extra.',
      },
      {
        label: 'SMS as the fallback',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'Where WhatsApp cannot deliver, the notice still goes. The fallback is part of the design, not a plugin.',
      },
      {
        label: 'Email for documents',
        service: 'docs',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'Leases, receipts and statements are rendered and sent as documents, which is what email is still better at.',
      },
      {
        label: 'A conversation inbox owned by the organization',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'Threads live with the organization and stay when staff leave, rather than on a personal handset.',
      },
      {
        label: 'One assignee per conversation',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'Exactly one person replies. Everyone else has the thread read-only, so nobody answers twice.',
      },
      {
        label: 'Who can be assigned comes from roles',
        service: 'identity',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Memberships and roles decide who may hold a conversation, and reassignment lands in the audit log.',
      },
      {
        label: 'Preferences per event group and per channel',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'Not a single on-off switch. A recipient chooses which kinds of notice reach them on which channel.',
      },
      {
        label: 'Financial notices that cannot be switched off',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'Amounts owed, payments received and statements issued are mandatory and have no preference to unset.',
      },
      {
        label: 'Inbound messages through verified webhooks',
        service: 'gateway',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'Inbound traffic is verified, persisted and acknowledged before anything downstream processes it.',
      },
      {
        label: 'Notices raised from the record that caused them',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'A receipt notice refers to the posting, a repair update to the work order. Nothing is retyped.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'What happens to a message, in both directions',
      lede: 'Inbound and outbound are different paths with different rules, and the rules are worth knowing before you rely on either.',
    },
    steps: [
      {
        title: 'Inbound is persisted before it is processed',
        body: 'A message arriving from the channel is verified, written down and acknowledged. Nothing is handled inline, so a slow downstream step cannot turn into a resident whose message vanished.',
        source: 'D-41',
      },
      {
        title: 'It lands in the conversation for that resident',
        body: 'Threads are attached to the people and the leases they concern, so the history is in one place rather than distributed across the handsets of whoever happened to reply.',
        source: 'SERVICE-TOPOLOGY.md · messaging',
      },
      {
        title: 'One person takes the conversation',
        body: 'The assignee replies. Colleagues can read the thread and can take it over, but there is no state in which two people are answering the same resident at once.',
        source: 'DOMAIN.md',
      },
      {
        title: 'Outbound starts from a record, not a compose box',
        body: 'A notice is raised by something that happened in the ledger or in a work order, and it carries the reference back to that entry. Bulk typing is not the mechanism.',
        source: 'SERVICE-TOPOLOGY.md · messaging',
      },
      {
        title: 'Preferences decide the rest',
        body: 'For everything that is not a financial notice, the recipient’s choice per event group and per channel decides whether it goes, and where.',
        source: 'DOMAIN.md',
      },
      {
        title: 'Financial notices ignore the preference',
        body: 'A notice about money owed, money received or a statement issued is sent regardless. There is no setting that suppresses it, for the resident or for the agency.',
        source: 'DOMAIN.md',
      },
      {
        title: 'WhatsApp first, SMS behind it, email for documents',
        body: 'The order is fixed. A document is emailed because a document should arrive as a file, and the notice that it exists still goes to the channel the person reads.',
        source: 'DOMAIN.md',
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
      'Financial notices cannot be turned off — not by the resident, not by you. If that is a problem for a recipient, this is not the platform for that relationship.',
      'A conversation has one assignee and everyone else reads it. There is no co-owned thread and no second person typing into it, which is the point, but it does mean handovers are an action somebody has to take.',
      'We have not published a WhatsApp number, a phone number or a street address for Ethanel itself. This site gives an email address and nothing else, because a channel we cannot yet answer properly is worse than an honest gap.',
      'Messaging is not a broadcast tool with its own compose box at the centre. Notices are raised by records — a posting, an invoice, a work order — and carry the reference back to them.',
      'None of this has shipped. WhatsApp, the conversation inbox and notification preferences are scheduled for Sprint 009, inbound webhooks for Sprint 007, roles and assignment for Sprint 005, and the documents that go by email for Sprint 006.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What the notices are about',
    },
    links: [
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Arrears and credit control', href: '/features/arrears-and-credit-control' },
      { label: 'Repairs and work orders', href: '/features/repairs-and-work-orders' },
      { label: 'Documents and signing', href: '/features/documents-and-signing' },
      { label: 'Residents and caretakers', href: '/solutions/residents-and-caretakers' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'See what a month of notices would actually look like',
      lede: 'Which of them are mandatory, which a resident could decline, and who on your team would be holding each conversation.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
