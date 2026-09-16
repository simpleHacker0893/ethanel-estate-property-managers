import type { StandardPageContent } from '../types'

/**
 * `/legal/cookies` — a stub like the other three (DEBT-09), but the one where
 * most of the page can be true today.
 *
 * The legal half is genuinely open. Whether this site needs a consent
 * mechanism, what that mechanism would have to look like, and how the answer
 * relates to our unresolved registration under the Data Protection Act are all
 * Q6 questions, and no advocate has looked at any of them. So nothing here
 * states a legal position, and the banner says as much.
 *
 * The factual half is not open at all, and that is why this page is longer
 * than its siblings. What a browser stores when it visits this site is a
 * property of code that exists and can be read: one first-party cookie, set
 * conditionally by `proxy.ts`, whose exact name, contents, lifetime and flags
 * are fixed in `packages/contracts` and `lib/attribution.ts`. Describing that
 * accurately costs nothing and is the only part of a cookie notice a visitor
 * actually wants.
 *
 * The specific trap this page is written to avoid: a cookie notice that
 * describes a consent banner the site does not have. That is the most common
 * false statement on pages of this kind, it is trivially falsifiable by the
 * reader in front of them, and it discredits every other claim on the site. No
 * banner exists here. The page says so in those words rather than describing
 * how to manage preferences through a control that is not there.
 *
 * It follows that the counter-list matters as much as the list. No analytics
 * script, no advertising pixel, no tag manager, no session recorder, no chat
 * widget and no use of browser storage is a stronger and more checkable claim
 * than any assurance about how carefully data would be handled, and it stays
 * true only as long as nobody adds one. Anyone who does is editing this page in
 * the same commit.
 */

// TODO(Q6): unblocked when an advocate advises whether a consent mechanism is
// required for the attribution cookie under the Data Protection Act, and the
// data-controller registration that question hangs from is settled. If the
// advice is that consent is required, the banner and the mechanism ship
// together with the rewritten notice. The factual sections below must be
// re-checked against `proxy.ts`, `lib/attribution.ts` and
// `packages/contracts/src/marketing/attribution.ts` whenever they change.

export const cookies: StandardPageContent = {
  slug: '/legal/cookies',

  meta: {
    title: 'Cookie notice — in review',
    description:
      'The legal notice is unwritten, but what this site stores is not a mystery: one first-party cookie, set only when you arrive from a campaign link.',
  },

  banner:
    'In review. The legal notice is unwritten and no advocate has advised on whether consent is required here. What follows is a factual description of what this site actually stores, which is accurate today and is not a legal position.',

  hero: {
    eyebrow: 'Legal',
    h1: 'One cookie, set only sometimes, and nothing else at all',
    lede: 'The reviewed notice is still owed. In the meantime this page describes precisely what this site stores in your browser, because that part is a matter of fact rather than of drafting.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'Why this page is part written',
        title: 'The facts are settled even though the notice is not',
      },
      paragraphs: [
        'Whether this site needs a consent mechanism, and what shape it would have to take, is a legal question tied to our unresolved registration under the Data Protection Act. Nobody qualified has advised on it, so this page takes no position on it.',
        'What the site stores is a different kind of question. It is answered by code that exists, so it can be described exactly rather than approximately, and the description below is written from that code rather than from a template.',
        'One thing worth stating in plain words, because pages like this one so often imply otherwise: there is no cookie banner on this site. No preference centre exists, there are no categories to toggle, and nothing on any page asks you to accept anything. Whether one is required is part of what is in review.',
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'The one cookie',
        title: 'What is set, when, and for how long',
        lede: 'A single first-party cookie. Every value below is fixed in code and can be checked against what your browser receives.',
      },
      rows: [
        {
          label: 'Name',
          value:
            'eth_attr. There is exactly one, and this is it. Nothing else on this site writes to your browser.',
        },
        {
          label: 'When it is set',
          value:
            'Only when the address you arrive on carries an advertising click identifier or a campaign parameter, or when your browser reports that you came from another site. Arrive by typing the address in, or from a bookmark, and no cookie is set at all.',
        },
        {
          label: 'What it holds',
          value:
            'The click identifier and campaign parameters from the address you landed on, the referring site where there is one, and the time of that first landing. No name, no phone number, no email address, and no identifier we generated for you.',
        },
        {
          label: 'How long it lasts',
          value:
            'Ninety days from the first landing. Later visits do not extend it and do not overwrite what it already holds: the first source is kept and only gaps are filled in, because re-attributing an old visit to the most recent advert would be a worse record than none.',
        },
        {
          label: 'Who can read it',
          value:
            'The server only. It is marked HttpOnly, so no script on the page can read it, and it is restricted to this site with SameSite set to Lax, so it is not sent to anyone else. In production it is sent over an encrypted connection only.',
        },
        {
          label: 'What it is used for',
          value:
            'One thing. If you later submit the demo form, the values travel with that submission so we can tell which campaign brought you. Click identifiers are also written to a server-side conversion log, which currently has no destination configured — where it eventually points is an open question.',
        },
        {
          label: 'What happens if you delete it',
          value:
            'Nothing you can see. No page on this site depends on it, no content changes, and the demo form works exactly the same way without it.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'The full path',
        title: 'Everything that happens, in order',
        lede: 'There are only four steps, and two of them are conditional.',
      },
      steps: [
        {
          title: 'You land on a page',
          body: 'The address is checked for advertising click identifiers and campaign parameters, and the referring site is read from the request. If none of those is present, nothing is stored and the visit leaves no trace in your browser.',
          source: 'first landing only',
        },
        {
          title: 'A cookie is written, if there was something to write',
          body: 'The values found are stored in the single first-party cookie described above, alongside the time. If a cookie already exists, it is filled in rather than replaced.',
          source: 'first touch wins',
        },
        {
          title: 'Nothing reads it while you browse',
          body: 'No script can reach it and no request is made to any third party on your behalf. Browsing the rest of the site adds nothing and changes nothing.',
          source: 'server-side only',
        },
        {
          title: 'It is read once, if you submit the demo form',
          body: 'The values are attached to your enquiry so we know which campaign it came from, and the click identifiers alone are written to a conversion log with no personal details attached.',
          source: 'on submit',
        },
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The counter-list',
        title: 'What this site does not do',
        lede: 'More useful than a list of assurances, because each line is something you can check.',
      },
      items: [
        {
          title: 'No analytics script',
          body: 'There is no page-view analytics product on this site, first-party or third-party, and no dashboard somewhere counting your scroll depth.',
        },
        {
          title: 'No advertising pixel or tag manager',
          body: 'No advertising platform loads code on these pages. Where a conversion is reported, it is reported from our own server after you submit a form, not from your browser as you read.',
        },
        {
          title: 'No browser storage',
          body: 'Nothing is written to local storage or session storage. Interface state that needs to survive a refresh, such as which audience tab you are reading, lives in the address bar where you can see it.',
        },
        {
          title: 'No session recording or heat mapping',
          body: 'Nothing watches or replays your interaction with a page.',
        },
        {
          title: 'No chat widget',
          body: 'There is no third-party chat or support bubble loading on any page here.',
        },
        {
          title: 'No third-party font or asset requests',
          body: 'Typefaces are served from this site, packaged at build time, so loading a page does not tell a font provider that you visited.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: {
        eyebrow: 'In the meantime',
        title: 'Clear it, block it, or ask',
      },
      paragraphs: [
        'You can clear or block the cookie in your browser settings as you would for any site, and nothing here will stop working. Since there is no preference centre to offer you, that is the honest answer rather than a link to a control we have not built.',
        'If you want to know what a page did on a particular visit, or you have a question this notice does not answer, write to hello@ethanel.co.ke and ask. The answer will be a description of code rather than an interpretation of policy, which is the more reliable of the two things we can currently give you.',
        'When the reviewed notice is published it will replace this page, and it will have to remain consistent with whatever the site is actually doing at that point. If anything on this site starts storing more than is described above, this page changes in the same commit.',
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'See what the product does with data that matters more',
      lede: 'A cookie is the least interesting data question here. Rent, leases and the ledger are the ones worth an hour of your time.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
