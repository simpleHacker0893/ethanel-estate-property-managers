import type { StandardPageContent } from '../types'

/**
 * `/legal/data-processing` — a titled stub (DEBT-09), and the one of the four
 * where inventing text would be hardest to detect and most expensive.
 *
 * A data processing addendum is the document an agency attaches to its own
 * obligations. It is signed and then relied on: the agency tells its landlords
 * and its residents that resident data is handled under it, and the agency's
 * own position depends on ours being accurate. A plausible addendum published
 * here would be read by exactly the audience least able to check it, and would
 * be doing work — in somebody else's compliance file — from the day it went up.
 *
 * The single thing it must establish is the thing Q6 has not answered: whether
 * Ethanel acts as a processor on the agency's instructions, as a controller in
 * its own right, or as each of those for different categories of data. That is
 * not a drafting detail that can be filled in later around settled clauses. It
 * determines who owes the notice, who answers a resident's access request, who
 * reports a breach and to whom. Guessing it and writing the rest of the
 * document on top of the guess produces a coherent page that is wrong in its
 * foundation, which is the worst failure mode available here.
 *
 * What can honestly be published is the layer underneath the legal one. How
 * data is partitioned, what the ledger's append-only property means for
 * deletion, and the fact that Ethanel is never in the money path are
 * properties of the code today. They are stated here as engineering facts so a
 * reader doing diligence has something real to work with, and stated as
 * engineering facts specifically so that nobody mistakes them for the
 * contractual commitments the addendum will have to make separately.
 */

// TODO(Q6): unblocked when the controller/processor split is decided per
// category of data and registered under the Data Protection Act, the
// production sub-processor set is fixed (hosting, payments and messaging
// providers are not all chosen), and a Kenyan advocate drafts the addendum.
// Replace this module wholesale and flip `/legal/data-processing` off
// `v1.1-stub` in `routes.ts`.

export const dataProcessing: StandardPageContent = {
  slug: '/legal/data-processing',

  meta: {
    title: 'Data processing addendum — in review',
    description:
      'No data processing addendum exists yet. This page names the open questions, including our processing role, and states what the architecture already fixes.',
  },

  banner:
    'In review. There is no data processing addendum to sign, and the most basic question one answers — whether Ethanel acts as processor, controller, or each for different data — is still open. Treat this page as a status note, not a document.',

  hero: {
    eyebrow: 'Legal',
    h1: 'The data processing addendum is still an open question, not a draft',
    lede: 'An addendum is a document your own compliance depends on. Ours cannot be written until the controller and processor roles are settled, so this page states what is unresolved and what the system already does.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'Why this page is empty',
        title: 'The foundation is missing, not the wording',
      },
      paragraphs: [
        'An addendum is built on one determination: who is the controller and who is the processor for each category of personal data that moves through the platform. Resident records loaded by an agency, staff accounts, and the data this site collects from a visitor may not land on the same side of that line. That determination is unresolved, and it is tied to our registration under the Data Protection Act.',
        'Everything else in such a document follows from it. Who answers when a resident asks what is held about them, who is obliged to notify a breach and within what period, whose instructions govern processing, and what happens on termination all change depending on the answer. Publishing clauses now would mean fixing them on top of a guess.',
        'It also has to be a document you can sign, and something signed is negotiated. An addendum published as a page is a take-it-or-leave-it position, which is not the conversation we want to have with the first agencies to trust us with their residents’ data.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The shape of the real document',
        title: 'What the addendum will have to settle',
        lede: 'Open items, listed so an agency can see what it will eventually be able to hold us to. None is decided.',
      },
      items: [
        {
          title: 'The role split, per category of data',
          body: 'Processor, controller, or both for different categories. This is the determination the rest of the document is built on, and it is the open one.',
        },
        {
          title: 'Scope, duration and documented instructions',
          body: 'What is processed, for how long, and on whose instructions — written so an agency can check our behaviour against it rather than trust it.',
        },
        {
          title: 'Sub-processors, and notice before they change',
          body: 'Hosting, payments and messaging are third parties in the path. The list has to be real at the time of signing, and an agency needs notice and a say before it changes.',
        },
        {
          title: 'Where data is stored, and any transfer out of Kenya',
          body: 'The production hosting position is not fixed. Any transfer outside Kenya carries its own requirements, and those cannot be described before the decision is made.',
        },
        {
          title: 'Breach notification, with a period attached',
          body: 'A commitment to notify without a stated period is not a commitment. The number has to be one we can hold under the worst conditions rather than the best.',
        },
        {
          title: 'Assistance with requests from residents and landlords',
          body: 'Access, correction, erasure and objection requests reach the agency first. What we do to help, and how quickly, is the practical core of the addendum for anyone operating it day to day.',
        },
        {
          title: 'Return and deletion at the end',
          body: 'Complicated here in a way it is not elsewhere: the ledger is append-only, so what deletion can mean for a book of account has to be spelled out rather than asserted.',
        },
        {
          title: 'Audit, and what evidence we can actually produce',
          body: 'There is no completed third-party audit and no penetration test, because the system is not deployed for one to be run against. The addendum will say what evidence exists, not what would sound reassuring.',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Already true',
        title: 'The engineering positions the addendum will be written over',
        lede: 'Verifiable properties of the system as built. They are not contractual commitments, and they do not stand in for the addendum.',
      },
      rows: [
        {
          label: 'Partitioned per organization',
          value:
            'Every query carries the organization it belongs to, enforced in the data layer rather than by application code. A bug inside one organization and a leak across two are different classes of failure, and the boundary is built to keep them different.',
        },
        {
          label: 'Append-only ledger, reversals rather than edits',
          value:
            'A posting is never modified. Correcting one means recording a reversal that carries a mandatory reason, so the original and the correction are both on the record. This is the fact that makes deletion a real question for the addendum rather than a switch.',
        },
        {
          label: 'Attribution is not correction',
          value:
            'An unmatched payment posts to suspense immediately and is later allocated to the lease it belongs to. An allocation carries no reason and is not a reversal, so the audit trail distinguishes money being attributed from money being undone.',
        },
        {
          label: 'Ethanel holds no rent',
          value:
            'Funds settle to the organization’s own client account. We hold the record of the money, not the money, so no payment balance sits here to be disclosed, seized or lost.',
        },
        {
          label: 'The receivable belongs to the lease',
          value:
            'Not to a person. A lease may have several parties with several verified phone numbers paying against the same invoice, which is why the data model is organized around the lease and why the addendum cannot treat a resident record as a standalone row.',
        },
        {
          label: 'Nothing is processing live data yet',
          value:
            'No sprint has shipped and no organization is running on Ethanel, so no resident data is being processed today. The addendum is owed before the first pilot loads real data, and that is the deadline we are working to.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: {
        eyebrow: 'In the meantime',
        title: 'Send us your addendum, or your questions',
      },
      paragraphs: [
        'If your agency already has a data processing addendum it uses with suppliers, send it to hello@ethanel.co.ke. Reviewing a real one from an operating agency is more useful to us than drafting in the abstract, and it means the eventual document is shaped by what agencies here actually need to sign.',
        'Pilot terms, including how data is handled during a parallel run, are negotiated directly and put in writing. Nothing is accepted by using this site.',
        'For the technical detail behind the facts above, the security page states the custody position, the ledger guarantees and the bound on every number published on this site.',
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Bring your compliance requirements to the demo',
      lede: 'The obligations you already owe your landlords and residents are the best specification for this document.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
