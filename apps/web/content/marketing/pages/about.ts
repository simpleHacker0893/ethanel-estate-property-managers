import type { StandardPageContent } from '../types'

/**
 * `/about` — who is building this, and the one thing we cannot yet answer.
 *
 * An about page for a company with no customers is usually where invention
 * starts: a founding story with a date nobody recorded, a mission sentence, a
 * team grid, a "trusted by" row. None of that is true here, so none of it is on
 * this page. What is true and checkable in the pack is: the product is a
 * sixteen-week build that has not started shipping to anyone, it is being built
 * by one person, and the sequence and the gate before any switch-over are written down. That is
 * the whole story, and telling it plainly is more persuasive to a sceptical
 * agency owner than a mission statement would be.
 *
 * The page exists mainly to carry one uncomfortable paragraph. Ethanel sells
 * software to letting agencies and also manages a portfolio of its own, which
 * makes us a supplier to firms we compete with (PRD-F5, carried as Q13). An
 * agency owner will work that out in about four seconds and will then wonder
 * whether we read their data or rank our own units above theirs on the
 * marketplace. The answer to that question is not settled — there is a proposed
 * arrangement in the pack and nobody has confirmed it, and the terms wording
 * does not exist. So the gap ships marked rather than smoothed over: the page
 * states the conflict, states what is proposed, and states that it is proposed
 * and not decided. A page that quietly omitted the conflict would be caught
 * later by the reader, at a much worse moment.
 *
 * What this page deliberately refuses to say: how many units anyone manages,
 * when the company was founded, how big the team will be, who has invested,
 * what any agency thinks of the product, and any figure at all — the four
 * publishable design targets carry bounds that only fit on the Security page,
 * and this page points there instead of restating them.
 */
export const about: StandardPageContent = {
  slug: '/about',

  meta: {
    title: 'About Ethanel',
    description:
      'Who is building Ethanel, why the ledger came before the marketplace, and the dual-role conflict we have not finished disclosing.',
  },

  hero: {
    eyebrow: 'Company',
    h1: 'Who is building this, and what we still owe you',
    lede: 'Ethanel is an unfinished build, not a launched product. This page says who is behind it, what is actually finished, and the one question about our own position that we have not answered yet.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'Why it exists',
        title: 'Rent already reconciles itself — by hand, on a Saturday',
        lede: 'The work Ethanel is trying to remove is work Kenyan agencies are already doing.',
      },
      paragraphs: [
        'An agency collects rent over M-Pesa. The payments arrive as a statement export with a payer name, a phone number and sometimes an account reference. Someone then sits with that export and a spreadsheet and decides which payment belongs to which unit, which resident is short, and what each landlord is owed. It holds until a payer uses a relative’s phone, pays a round figure, or pays for two units at once.',
        'Ethanel starts from the opposite end. Every payment posts to a double-entry ledger the moment it arrives, attributed if the reference and the phone and the amount agree, and sat in a suspense account waiting in a manual match queue if they do not. Money is on the record either way. The reconciliation is the product; the portals, the marketplace and the messaging are things you can only build honestly once the books balance.',
        'That ordering is why the ledger is early in the build and the marketplace is late. It is also why this site links every figure it publishes to the Security page, where each one carries the denominator that makes it true.',
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'The state of the build',
        title: 'What is actually true today',
        lede: 'Stated as facts a reader can hold us to, rather than as progress language.',
      },
      rows: [
        {
          label: 'Who is building it',
          value:
            'Njuguna Njenga, founder and technical architect, building solo. No developer is being hired for the pilot, which is a constraint on scope rather than an aspiration about efficiency.',
        },
        {
          label: 'How the build is sequenced',
          value:
            'Sixteen one-week sprints, written down in advance with an exit condition each. The ledger comes first, then invoicing and rent runs, then payments and reconciliation, then repairs, messaging, portals and the marketplace.',
        },
        {
          label: 'What is running in production',
          value:
            'This website. No agency is using Ethanel, no rent has been collected through it, and no infrastructure beyond the site has been deployed.',
        },
        {
          label: 'What happens before any agency switches',
          value:
            'One full rent cycle is run alongside the agency’s existing spreadsheet and the two sets of books are compared. That comparison is a gate on the pilot, not a marketing promise.',
        },
        {
          label: 'Where the numbers are',
          value:
            'Every design target this site publishes sits on the Security page with the bound that makes it true. No figure appears anywhere on this page, because a figure without its denominator is a different figure.',
        },
      ],
    },
    // TODO(Q13): the dual-role disclosure is open. PRD-F5 proposes that
    // Ethanel's management arm is an ordinary organization with no special
    // access, that marketplace ranking rules are published and identical for
    // every organization, and that the whole arrangement is disclosed in the
    // terms. None of that is confirmed and the terms wording does not exist.
    // Needed by the start of Sprint 011 (the marketplace), and the terms
    // wording before Sprint 016. When it is answered, replace this block's
    // third paragraph with the agreed disclosure and delete this comment.
    {
      kind: 'prose',
      heading: {
        eyebrow: 'An open conflict',
        title: 'We sell to agencies and we also manage property',
        lede: 'This is the part of the page that is not finished, and hiding it would be the worse choice.',
      },
      paragraphs: [
        'Ethanel is a software company selling to letting and management agencies. The same people also run a property management arm. That means we are a supplier to firms we compete with, and you are right to ask what stops us reading your rent roll or ranking our own units above yours once a marketplace exists.',
        'The proposal in our own planning documents is that our management arm is an ordinary organization on the platform with no special access, that marketplace ranking rules are published and identical for everyone, and that the arrangement is disclosed in the terms of service. Structurally that is how the system is being built: data is separated per organization at the database layer, so there is no privileged read for us to grant ourselves quietly.',
        'The disclosure itself is not settled. Nobody has signed off the wording, the terms of service that would carry it do not exist yet, and the marketplace ranking rules have not been written. We are not going to publish a reassuring paragraph here and work out afterwards whether it is true. If this conflict matters to your decision — and it should — raise it in the demo and ask for the current state directly, and take the dated answer over this page.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'How this site is written',
        title: 'The rules every page here is held to',
        lede: 'They are enforced by tests in the same repository as the product, not by editorial discipline.',
      },
      items: [
        {
          title: 'No customer that does not exist',
          body: 'There is no logotype row, no named agency, no rating and no endorsement anywhere on this site, because there is no agency using Ethanel yet. A test greps the copy for the shapes those claims take.',
        },
        {
          title: 'No number without its bound',
          body: 'Four engineering targets are publishable and each one only means anything inside a denominator, so all four are stated once on the Security page and linked to from everywhere else rather than repeated.',
        },
        {
          title: 'Every capability names a service and a sprint',
          body: 'A feature described on this site must name the service that implements it and the sprint it is scheduled for. That is a compile error rather than a review comment, which is why nothing here is described as finished when it is not.',
        },
        {
          title: 'Commitments in the future tense',
          body: 'We restore-drill monthly from Sprint 004 onward. We have not been restore-drilling for years, and writing it that way would be a lie told in a tense nobody checks.',
        },
        {
          title: 'Open questions ship marked',
          body: 'Where a business fact is genuinely unresolved — this page’s disclosure, our published contact details, what the product costs — the page says so in the place the answer will go. The Legal pages carry an in-review banner for the same reason.',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Ask the awkward questions on the call',
      lede: 'The dual role, the ledger and what happens to your data are all better interrogated in a conversation than read about.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
