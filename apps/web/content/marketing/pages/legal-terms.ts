import type { StandardPageContent } from '../types'

/**
 * `/legal/terms` — a titled stub, for the same reason as the other three
 * (DEBT-09), and with one reason of its own.
 *
 * Terms of service are an offer. Publishing them is not describing a
 * relationship, it is proposing one, and a visitor who reads a page headed
 * "Terms of service" reasonably concludes that using the product means
 * accepting what is on it. So a drafted-but-unreviewed page here is not merely
 * inaccurate — it is an unreviewed contract on public offer, which is a worse
 * object than an unreviewed privacy notice.
 *
 * The clauses that would carry the most risk are exactly the ones that look
 * most like filler: the warranty position, the liability cap, the governing
 * law and forum, the suspension and termination rights. Each is a commercial
 * decision nobody here has made, and a limitation clause invented by a content
 * module is the kind of thing that is discovered during a dispute rather than
 * during review.
 *
 * There is also a factual reason the page would be wrong whatever it said.
 * Nothing has shipped. There is no service to be under terms yet and no
 * organization using one, so a present-tense document describing service
 * levels, support obligations and subscription mechanics would be describing
 * something that does not exist. The first organizations to use Ethanel will
 * be pilot partners on a negotiated written agreement, which is a different
 * instrument to a click-through and is where their terms will actually live.
 *
 * This page therefore does three things: names what the eventual terms have to
 * settle, states what is already fixed by how the system is built, and points
 * at the negotiation that is the real route in for now.
 */

// TODO(Q6): unblocked when a Kenyan advocate drafts and reviews the terms
// against a settled commercial model, and the pricing model behind them is
// fixed (Q7 is open, so there is no subscription mechanic for terms to
// describe). Replace this module wholesale and flip `/legal/terms` off
// `v1.1-stub` in `routes.ts` at that point.

export const terms: StandardPageContent = {
  slug: '/legal/terms',

  meta: {
    title: 'Terms of service — in review',
    description:
      'There are no terms of service yet. This page says what they will have to settle, what is already fixed by the build, and how a pilot agreement is reached.',
  },

  banner:
    'In review. No terms of service are in force, and nothing on this page is an offer or a contract. Pilot terms are negotiated and signed directly, not accepted by using this site.',

  hero: {
    eyebrow: 'Legal',
    h1: 'There are no terms of service yet, and nothing here is an offer',
    lede: 'Terms of service are a proposal, not a description. Publishing an unreviewed set would put a contract on offer that no advocate has read and no commercial decision stands behind, so this page states the open questions instead.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'Why this page is empty',
        title: 'An unreviewed contract is not a placeholder',
      },
      paragraphs: [
        'A privacy notice that is wrong misleads a reader. Terms of service that are wrong bind somebody, or fail to bind us in a way we only discover when it matters. That asymmetry is why this page carries no clauses at all rather than a draft marked provisional.',
        'The parts that look most like boilerplate carry the most weight — the warranty position, any cap on liability, the governing law and forum, and the grounds on which either side can suspend or walk away. None of those has been decided, and none of them is the sort of thing a content module should decide by picking a plausible sentence.',
        'There is a plainer reason too. No sprint has shipped, so there is no running service for terms to govern, no subscription to describe and no support commitment that anyone has yet had to hold. A present-tense document would be describing a product that does not exist.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The shape of the real document',
        title: 'What the terms will have to settle',
        lede: 'Open questions, listed so you can see the scope. Each one is unanswered, including the ones that usually read as standard.',
      },
      items: [
        {
          title: 'Who the customer is',
          body: 'The account holder is an organization, not an individual user, and the terms have to say what that means for staff who join and leave, for the data the organization loads, and for what happens to it when the relationship ends.',
        },
        {
          title: 'What is being supplied, and when',
          body: 'Capability on this site is labelled by sprint, and one area is marked as possibly not shipping at all. Terms that promise a roadmap would contradict that labelling, so what is committed and what is merely planned has to be drawn carefully.',
        },
        {
          title: 'The limits of our role in the money',
          body: 'Rent settles to the organization’s own client account and never to us. The terms have to state the consequence — we record and reconcile, and we are not a payment service, a custodian or a party to what the agency owes its landlords.',
        },
        {
          title: 'Availability, support and incidents',
          body: 'Any service commitment has to be one that can be held on the day it is published rather than one that sounds respectable. Nothing has been measured in production yet, so nothing has been committed.',
        },
        {
          title: 'Risk, liability and the law that governs them',
          body: 'The warranty position, any limitation of liability and the governing law and forum are commercial and legal decisions in equal parts. They are open, and they will be settled with an advocate rather than drafted here.',
        },
        {
          title: 'Fees, and what happens when they change',
          body: 'Billing mechanics cannot be written before the pricing model is fixed, which it is not. The pricing page shows the model and a route to a pilot conversation for the same reason.',
        },
        {
          title: 'Getting your data out',
          body: 'Export on exit matters more in an accounting system than in most software, because the ledger is the organization’s book of account. What is returned, in what format and by when belongs in the terms.',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Already true',
        title: 'What the build settles, whatever the terms end up saying',
        lede: 'Properties of the system as it is written today. They constrain what the terms can say; they are not themselves terms.',
      },
      rows: [
        {
          label: 'Ethanel never holds rent',
          value:
            'Funds settle to the bank account the organization already runs for client money. There is no Ethanel-controlled account for rent to sit in, which is an architectural fact and the reason it is not a promise we need a clause to keep.',
        },
        {
          label: 'Each organization is a closed boundary',
          value:
            'Data is scoped per organization in the data layer, so one agency reading another’s records is not a permission mistake waiting to happen but a thing the queries cannot express.',
        },
        {
          label: 'Postings are immutable',
          value:
            'Corrections are reversals with a mandatory reason, never edits. Nobody at Ethanel and nobody at an agency can quietly rewrite a figure that has been posted.',
        },
        {
          label: 'Nothing is live',
          value:
            'No sprint has shipped and no organization is running on Ethanel. There is no customer currently under terms, which is why publishing a set now would create the first obligation rather than record an existing one.',
        },
        {
          label: 'A pilot is a signed agreement',
          value:
            'The first organizations join on a written agreement negotiated directly, covering scope, the parallel-run gate and what happens if it does not go well. That document governs, not a page on this site.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: {
        eyebrow: 'In the meantime',
        title: 'Talk to us, and put it in writing',
      },
      paragraphs: [
        'If you need to see contractual terms before you can take a pilot to your own board or your landlords, say so at hello@ethanel.co.ke. We would rather negotiate a real agreement with you than have you accept a page that nobody has reviewed.',
        'Bring your own requirements too. An agency that already has obligations to its landlords about data, custody and reporting knows more about what the terms need to cover than a first draft written in the abstract would.',
        'The security page sets out the custody and ledger positions the terms will have to be consistent with, and it is a better starting point for a due-diligence conversation than this page is.',
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Start the conversation that ends in a signed agreement',
      lede: 'A pilot begins with a demo and a direct negotiation, not with a click-through.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
