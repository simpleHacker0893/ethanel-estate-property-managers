import type { StandardPageContent } from '../types'

/**
 * `/legal/privacy` — a titled stub, and the only honest shape this page can
 * take today (DEBT-09).
 *
 * A privacy notice is a statement made by an identified data controller about
 * what it does with personal data and what rights a person has against it.
 * Two of those three parts are missing here. Our registration under the Data
 * Protection Act is not settled — that is Q6, still open — so the controller
 * is not yet identified in the sense the notice depends on. And no advocate
 * has reviewed a word of this, so there is nobody standing behind whatever a
 * notice would say.
 *
 * The tempting alternative is a page of familiar paragraphs: lawful bases,
 * retention periods, a list of sub-processors, a rights section. Every one of
 * those would be a guess written in the present tense, which is the one tense
 * a privacy notice cannot be guessed in. An agency would forward it to a
 * landlord as evidence that the question is handled. A resident would read it
 * and believe a right is exercisable against a process that does not exist —
 * no sprint has shipped, so nothing is processing resident data at all yet.
 * The cost of a stub is one disappointed click. The cost of an invented notice
 * is somebody relying on it.
 *
 * So the page says the three things that are true instead: what the notice
 * will have to cover, what is already fixed by the architecture rather than by
 * policy, and where to ask a real question in the meantime. The architecture
 * facts are stated as engineering properties, not as promises — organization
 * scoping and an append-only ledger are things the code does, and saying so is
 * not the same as undertaking to keep doing it in a contract nobody has
 * drafted.
 */

// TODO(Q6): unblocked by two things, in this order — (1) the data-controller
// registration under the Data Protection Act is settled, so the notice has a
// named controller to be about; (2) a Kenyan advocate in data-protection
// practice drafts and signs off the notice. Replace this module wholesale at
// that point and flip `/legal/privacy` off `v1.1-stub` in `routes.ts`.

export const privacy: StandardPageContent = {
  slug: '/legal/privacy',

  meta: {
    title: 'Privacy notice — in review',
    description:
      'Our privacy notice has not been written or reviewed yet. This page says what it will cover, what the architecture already fixes, and who to ask meanwhile.',
  },

  banner:
    'In review. No privacy notice exists yet: our data-controller registration is unsettled and no advocate has reviewed a draft. Nothing on this page is a legal commitment, and nothing on it should be relied on as one.',

  hero: {
    eyebrow: 'Legal',
    h1: 'The privacy notice is not written yet, and we would rather say so',
    lede: 'A notice that has not been reviewed is worse than no notice, because somebody will act on it. This page states what the notice must cover, what is already true of how the system is built, and what to do while the real document is drafted.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'Why this page is empty',
        title: 'What is missing, and who it is owed to',
      },
      paragraphs: [
        'Two things have to be settled before a privacy notice can be published. The first is our registration under the Data Protection Act, which decides who the controller is for each category of data and is the question the whole notice hangs from. The second is review by a Kenyan advocate in data-protection practice, which has not happened. Neither has a date we are prepared to print.',
        'Until both are done, publishing policy text would mean inventing the answers. Retention periods, lawful bases and a list of sub-processors all look like boilerplate and are none of them boilerplate — each is a decision with consequences for a resident who wants their data corrected or erased, and we have not made those decisions.',
        'It is also worth being plain about scale: nothing has shipped. No agency is live on Ethanel, so no resident data is being processed by the platform today. The notice is owed before the first pilot organization loads real data, not before this page can be read.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The shape of the real document',
        title: 'What the notice will have to cover',
        lede: 'Listed as questions the document must answer. None of them is answered below, because none is answered yet.',
      },
      items: [
        {
          title: 'Who the controller is, per category of data',
          body: 'An agency staff account, a landlord record and a resident record may not all sit with the same controller. That distinction is the first thing the notice must make and the thing the registration question decides.',
        },
        {
          title: 'What is collected, and at which boundary',
          body: 'The marketing site and the product collect different things for different reasons. The notice will separate the two rather than describing them as one system, because a visitor reading a page and an organization loading a rent roll are not in the same relationship with us.',
        },
        {
          title: 'The basis for each use, and how long it is kept',
          body: 'Retention on financial records is constrained by what the ledger is for — an append-only book of account is not something rows can be quietly deleted from — and reconciling that with erasure requests is legal work, not engineering work.',
        },
        {
          title: 'How a person exercises a right, and how fast',
          body: 'Access, correction, erasure and objection each need a route that a resident can actually use, and a response time we can actually hold. Writing either before the process exists would be writing fiction.',
        },
        {
          title: 'Who else touches the data',
          body: 'Payment, messaging and hosting providers are all third parties in the path. The notice will name them once the production set is fixed; an aspirational list would be wrong within a sprint.',
        },
        {
          title: 'Where to complain, and to whom',
          body: 'A notice that offers no route past us is not a notice. The escalation path to the data-protection regulator belongs in the document, stated the way the Act requires rather than the way we would phrase it.',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Already true',
        title: 'What the architecture fixes, independent of the paperwork',
        lede: 'These are properties of how the system is built and can be checked against it. They are engineering facts, not legal undertakings, and they do not substitute for the notice.',
      },
      rows: [
        {
          label: 'Data is scoped per organization',
          value:
            'Every query carries the organization it belongs to, and the boundary is enforced in the data layer rather than in application code. One agency cannot read another agency’s leases, residents or ledger, and that is a structural property rather than a policy someone has to remember.',
        },
        {
          label: 'The ledger is append-only',
          value:
            'A posting is never edited. A mistake is corrected by a reversal, which is itself an entry carrying a mandatory reason. This is why retention and erasure are a question for the notice rather than a setting: the record of a correction is part of the book of account.',
        },
        {
          label: 'Ethanel is not in the money path',
          value:
            'Rent settles to the bank account the organization already runs for client money. Ethanel opens no account and holds no balance, so there is no payment instrument or float held here to be lost, frozen or disclosed.',
        },
        {
          label: 'The marketing site stores one cookie, conditionally',
          value:
            'This site sets a single first-party cookie, and only when a visitor arrives carrying a campaign parameter or an external referrer. There is no analytics script, no advertising pixel and no browser-side tracking of any kind. The cookie notice page describes exactly what it holds.',
        },
        {
          label: 'A demo request is a short form, stored as a file',
          value:
            'Name, agency name, a WhatsApp number, an optional email address, a units band and what system you use today. No database exists behind it yet, and the submitting address is used in memory for rate limiting rather than being written into the record.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: {
        eyebrow: 'In the meantime',
        title: 'Ask us directly, and get the pilot terms on paper',
      },
      paragraphs: [
        'If you are evaluating Ethanel and need to know how a specific category of data would be handled, write to hello@ethanel.co.ke and ask the specific question. A dated answer from a person is worth more to your own compliance file than a page that was written to look reassuring.',
        'A pilot is negotiated directly, and the agreement covering it is signed between us rather than accepted by clicking through a page. That is the document that will bind a pilot organization, not this one.',
        'The security page states the custody and ledger positions in more detail, including the bound on every number published anywhere on this site. It carries the same caveat as this page about what has and has not been reviewed.',
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Bring the data question to the demo',
      lede: 'The questions your landlords and residents will ask about their data are better answered by a person than by a page in review.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
