import type { StandardPageContent } from '../types'

/**
 * `/solutions/residents-and-caretakers` — the one page on this site whose
 * reader is not a buyer and is never going to be one.
 *
 * A resident pays rent and wants a receipt. A caretaker fixes things and wants
 * to know what is on the list today. Neither of them chose this platform,
 * neither of them can choose against it, and neither of them owes us their
 * attention. So the register shifts: short sentences, no case for adoption, no
 * design targets, no persuasion. The test applied to every line was whether a
 * person standing in a corridor on a weak connection would find it useful.
 *
 * Three things this page does that the other three do not:
 *
 *   - It explains suspense in plain words, because the sentence that matters
 *     most to somebody who has just paid is "your money is recorded the moment
 *     it arrives, even if nobody has worked out yet which invoice it belongs
 *     to". Everywhere else that is an accounting property. Here it is
 *     reassurance, and it is the honest kind: the money is in the books, it is
 *     simply not attributed yet, and a person is required to attribute it.
 *   - It says what a resident and a caretaker cannot see. Neither sees the
 *     ledger, the landlord's statement or another household's account. Being
 *     told the shape of the boundary is more respectful than being left to
 *     guess where it falls.
 *   - It states the caretaker limitation rather than glossing it. Caretakers
 *     are online-only in the pilot. Their screens are built for a bad
 *     connection, but they need one, and a caretaker who is told that up front
 *     can plan around it.
 *
 * Refused throughout: the word this site never uses for a person, any
 * suggestion that a resident should lobby their agency for this, anything
 * described as something you can use today — no sprint has shipped — and any
 * promise about what an individual agency will switch on, which is that
 * agency's decision and not ours to announce.
 */
export const residentsAndCaretakers: StandardPageContent = {
  slug: '/solutions/residents-and-caretakers',

  meta: {
    title: 'For residents and caretakers',
    description:
      'What Ethanel is for the people who pay the rent and the people who fix things: receipts, repair requests, task lists, and what is scheduled when.',
  },

  hero: {
    eyebrow: 'Residents and caretakers',
    h1: 'For the people who pay the rent and the people who fix things',
    lede: 'Your agency decides what software it keeps its records in. If it chooses Ethanel, this is what changes for you and what does not. Plain version: nothing here has been built yet, and each part below says which sprint schedules it.',
  },

  blocks: [
    {
      kind: 'prose',
      links: [{ label: 'How we bound every number', href: '/security' }],
      heading: {
        eyebrow: 'What this is',
        title: 'You did not choose this, and nothing here is asking you to',
        lede: 'This page exists so you know what the system your agency may use does with your payments and your repair requests.',
      },
      paragraphs: [
        'Ethanel is the record-keeping system a letting agency uses. It holds the leases, the invoices, the payments and the repair requests for the buildings that agency manages. You do not buy it and you do not sign up for it. If your agency starts using it, you will notice it in three places: the receipt after you pay, the way a repair is tracked, and the messages you get.',
        'Nothing on this page is something you can use today. No part of the system has been built and released yet. Every section below names the sprint that schedules it, so you can see the order of work rather than a promise.',
        'One thing worth knowing whichever way it goes: Ethanel never holds rent. Your payment settles into the bank account your agency runs for client money. It does not sit with us on the way. If you want the longer version of that, it is on the security page.',
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'Paying rent',
        title: 'What happens to your money after you pay',
        lede: 'Four stages. The third one is the one worth reading.',
      },
      steps: [
        {
          title: 'You pay over M-Pesa',
          body: 'The same way you pay now. WhatsApp is the main channel for messages about it, with SMS as a fallback when WhatsApp cannot be reached, and email for documents.',
          source: 'payments and messaging · Sprints 007 and 009',
        },
        {
          title: 'The payment is matched to what you owe',
          body: 'The system looks for the account reference first, then the phone number on file, then an amount that matches an open invoice. The oldest invoice is settled first. If you pay more than you owe, the extra becomes a credit against your next invoice rather than disappearing into a balance.',
          source: 'payments · Sprint 007',
        },
        {
          title: 'If it cannot be matched, it is still recorded',
          body: 'A payment that does not match anything is recorded the moment it arrives, in a holding account, and goes into a queue for a person at your agency to attribute. This is the part to remember if you ever pay from a new number or with an odd amount: your money is in the books straight away. It just has not been put against an invoice yet, and someone has to do that.',
          source: 'payments · Sprint 007',
        },
        {
          title: 'You get a receipt, and you can check the balance yourself',
          body: 'Receipts are produced from the same record the agency works from, so what you hold and what they see are the same thing. The resident portal, where you can look up your own balance, invoices and receipts without asking anyone, is scheduled later than the payments work.',
          source: 'docs and web · Sprints 006 and 010',
        },
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'Repairs',
        title: 'When something breaks',
        lede: 'A repair request is what you raise. A work order is what the agency sends out in response.',
      },
      items: [
        {
          title: 'You raise a repair request',
          body: 'One request, one thing that is wrong. It is a record from the moment you send it, not a message someone has to remember to write down.',
        },
        {
          title: 'It moves through stages you can see',
          body: 'New, triaged, assigned, in progress, awaiting approval, awaiting your confirmation, closed. A request can also be rejected or marked a duplicate, and both of those are stages rather than silence.',
        },
        {
          title: 'It is not closed until you say so',
          body: 'Awaiting resident confirmation is a real stage in the lifecycle. The work being finished and you agreeing it is finished are two different things, and the system treats them that way.',
        },
        {
          title: 'One person answers you',
          body: 'A WhatsApp conversation has a single assignee at your agency. Everyone else can read it but cannot reply, so you are not answered twice by two people who disagree.',
        },
        {
          title: 'Some messages cannot be switched off',
          body: 'Notices about money — an invoice, a receipt, an amount owed — are mandatory and have no opt-out. Everything else can be turned down per type of event and per channel, so you can keep the financial ones and stop the rest.',
        },
        {
          title: 'What you cannot see',
          body: 'Not the ledger, not your landlord’s statement, not another household’s account, not what the agency pays a vendor. You see your lease, your invoices, your receipts and your own repair requests.',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Caretakers',
        title: 'If your job is the list, not the rent',
        lede: 'Written for the person who is on site, on a phone, and often on a bad connection.',
      },
      rows: [
        {
          label: 'What you get',
          value:
            'The work orders assigned to you, in order, with what the resident reported and what stage it is at. You update the stage from the same screen instead of ringing the office to have someone else update it (ops, Sprint 008).',
        },
        {
          label: 'Built for a weak connection',
          value:
            'Low-data screens: small pages, few images, nothing that assumes an office desk or a good signal. This is a design constraint on the screens themselves rather than a setting you switch on.',
        },
        {
          label: 'Online-only in the pilot',
          value:
            'You need a connection to use it. Working offline and syncing later is not part of the pilot, and we would rather say so here than let you find out in a stairwell.',
        },
        {
          label: 'What is not your problem',
          value:
            'Money. Costs, approvals and what anything gets charged to are the agency’s side of the system. A caretaker records what was done and what stage it reached; the accounting follows from that automatically.',
        },
        {
          label: 'When it is scheduled',
          value:
            'Repairs, work orders and caretaker tasks are Sprint 008. WhatsApp and notifications are Sprint 009. Neither has been built yet, and nothing above is something you can open today.',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'If you are here by accident',
      title: 'Nothing on this page needs anything from you',
      lede: 'Demos are for the agency that manages your building. If that is you as well, or if you want to pass this on to whoever it is, the link below is the one.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
