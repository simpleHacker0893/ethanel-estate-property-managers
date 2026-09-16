import type { StandardPageContent } from '../types'

/**
 * `/contact` — one real address, and an honest account of the ones we do not
 * have yet.
 *
 * A contact page is the cheapest place on a website to invent a business fact,
 * and the most expensive place to be caught doing it. A WhatsApp click-to-chat
 * link with a placeholder number either fails or reaches a stranger who now has
 * an agency owner asking them about rent reconciliation. A Nairobi street
 * address that nobody occupies is not just copy — it goes into the site-wide
 * `Organization` structured data, which is a claim search engines index and
 * repeat. Q20 is open: there is no confirmed WhatsApp business number and no
 * confirmed physical address. So this page publishes the one route that reaches
 * us, and says plainly that the others do not exist yet.
 *
 * There is a deliberate asymmetry worth noting. We ask for a WhatsApp number on
 * the demo form because that is where a Kenyan agency owner actually answers,
 * and we reply on it. What we cannot do is publish an inbound number for anyone
 * to message before that number exists. Asking for a channel and publishing one
 * are different commitments, and only the first is currently honest.
 *
 * What this page refuses to say: a response time, an office, a phone number, a
 * support tier, a named person to ask for, or anything that implies a staffed
 * desk. Nobody has committed to a response-time target, so quoting one would be
 * a service level invented by a copywriter.
 */
export const contact: StandardPageContent = {
  slug: '/contact',

  meta: {
    title: 'Contact Ethanel',
    description:
      'Email is the only contact route we can publish honestly today. Here is where to write, what to include, and what is still missing.',
  },

  hero: {
    eyebrow: 'Company',
    h1: 'One address that reaches us',
    lede: 'Email is the only contact route we can publish without inventing something. The phone number and the office address are not settled yet, and this page says so rather than filling the gap.',
  },

  blocks: [
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Where to write',
        title: 'The routes that exist',
        lede: 'Two of them, and both reach the same people.',
      },
      rows: [
        {
          label: 'Email',
          value:
            'hello@ethanel.co.ke — for anything at all: a pilot conversation, a question about the ledger, a press enquiry, a correction to something on this site.',
        },
        {
          label: 'The demo form',
          value:
            'Five fields, and the faster route if what you want is a walkthrough. It asks for a WhatsApp number because that is where we will reply, and asks nothing we do not need to arrange the call.',
        },
        {
          label: 'What reaches nobody',
          value:
            'There is no support desk, no sales line and no chat widget on this site. A message sent to any of those would be a message sent into a system that does not exist.',
        },
      ],
    },
    // TODO(Q20): no WhatsApp business number and no Nairobi address are
    // confirmed. Until they are, this page and the footer render email only,
    // and the site-wide Organization JSON-LD omits `address` rather than
    // guessing one. When the number is confirmed, add a wa.me link here and in
    // the footer; when the address is confirmed, add it to the structured data
    // and replace the second paragraph of this block. Blocks the marketing
    // track; needed before the footer is considered finished.
    {
      kind: 'prose',
      heading: {
        eyebrow: 'The gap',
        title: 'Why there is no phone number on this page',
        lede: 'It is not an oversight and it is not a design choice.',
      },
      paragraphs: [
        'We do not yet have a confirmed WhatsApp business number for the company. Publishing a click-to-chat link before that is settled has exactly two outcomes: the link fails, or it opens a conversation with whoever happens to hold that number. The second is worse than the first, and both are worse than an email address that reaches somebody.',
        'The same applies to an address. We have not published a physical office because the one that would appear in our structured data has not been confirmed, and a fabricated address is not a piece of copy you can quietly correct later — it is a claim indexed and repeated by search engines and maps. The footer of this site therefore carries email and nothing else.',
        'Both of these are recorded as an open question in our own planning pack rather than as something forgotten. When they are answered, they will appear here and in the footer, and this section will be shorter.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'Make the first reply useful',
        title: 'What to put in the message',
        lede: 'None of this is required. It is what turns a first reply into an answer instead of a list of questions.',
      },
      items: [
        {
          title: 'Roughly how many units you manage',
          body: 'A range is fine. It changes whether the interesting part of the conversation is the rent run, the arrears position or the landlord statements.',
        },
        {
          title: 'How rent reaches you now',
          body: 'A paybill, a till, several landlords’ own numbers, bank transfer, cash — the reconciliation story is different for each, and the awkward cases are the ones worth discussing.',
        },
        {
          title: 'What you reconcile with today',
          body: 'Excel, an existing system, a book. We are not asking in order to disparage it; the comparison run at pilot is against whatever you use now, so we need to know what that is.',
        },
        {
          title: 'The question you actually want answered',
          body: 'Custody of rent, data separation between agencies, what happens to an unmatched payment, whether land and plots are in scope. Ask the hard one first.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'After you write',
        title: 'What happens next, without a time attached',
        lede: 'We will not quote a response time, because nobody here has committed to one and an invented service level is still an invention.',
      },
      steps: [
        {
          title: 'A person reads it',
          body: 'There is no ticketing system and no autoresponder in front of this address. The message is read by the people building the product.',
          source: 'today',
        },
        {
          title: 'We reply with questions about your rent cycle',
          body: 'How you invoice, when rent falls due, what you do with a payment you cannot place. The answers shape what a demo would even show you.',
          source: 'today',
        },
        {
          title: 'A walkthrough on seeded demo data, labelled as such',
          body: 'Nothing you would be shown is a real agency’s figures, and every screen carries a badge saying the data is seeded. Bring a month of your own payments if you want the comparison to mean something.',
          source: 'today',
        },
        {
          title: 'A pilot conversation, if it is a fit',
          body: 'Pilot partners run one full rent cycle in parallel with their current process before anything is switched over. That comparison is the gate, and it is the same for everyone.',
          source: 'Sprint 016',
        },
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Or skip the email and book the walkthrough',
      lede: 'Five fields, and we reply on WhatsApp because that is where you actually answer.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
