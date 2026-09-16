import type { StandardPageContent } from '../types'

/**
 * `/resources` — a route the manifest promises and nothing has been written for.
 *
 * This is one of the two `v1.1-stub` routes. It exists because the header and
 * footer are generated from the route manifest, and a Company column with a
 * Resources row that returns a 404 is worse than a Resources page that admits it
 * is empty. The page is therefore short on purpose.
 *
 * The temptation on a page like this is to fill it: three ghost-written posts
 * about "digital transformation in property management", a downloadable
 * checklist gated behind an email field, a category taxonomy with nothing in any
 * category. An empty library reads better than a padded one, and it reads much
 * better than a library whose contents turn out to be search-engine filler. An
 * agency owner who came here for a reconciliation guide would rather be told in
 * one sentence that it does not exist than discover it after two paragraphs.
 *
 * So the page does three things and stops: it says nothing is written yet, it
 * names the material that is actually owed and why each piece is owed, and it
 * points at the parts of the site that already answer real questions. The
 * material listed is drawn from the domain work in the planning pack — the
 * reconciliation order, the rent run, the chart of accounts, how a deposit is
 * treated — so this is a commissioning list somebody can write from, not a wish.
 *
 * What this page refuses to do: publish a date for any of it, imply a
 * newsletter that does not exist, count articles that have not been written, or
 * restate a single one of the four design targets. The figures sit on the
 * Security page with their bounds and are linked to from there.
 */
export const resources: StandardPageContent = {
  slug: '/resources',

  meta: {
    title: 'Resources',
    description:
      'Guides on reconciliation, rent runs and Kenyan letting practice will sit here. None of them is written yet, and this page says so.',
  },

  hero: {
    eyebrow: 'Company',
    h1: 'Nothing is written here yet',
    lede: 'This page is named in the navigation because the guides it will hold are owed. None of them exists today, and filling the gap with generic articles would waste the one visit you gave it.',
  },

  blocks: [
    {
      kind: 'prose',
      heading: {
        eyebrow: 'The honest state',
        title: 'An empty library, rather than a padded one',
      },
      paragraphs: [
        'There are no articles, no downloads, no checklists behind an email field and no newsletter. If you followed a Resources link expecting a guide, it is not here, and the most useful thing this page can do is tell you that in the first sentence instead of the fifth paragraph.',
        'The reason is not that the material does not matter. It is that the product is still being built, and the guides worth reading are the ones written from a system that has actually run a rent cycle. A reconciliation guide written before the reconciliation engine exists would be a description of an intention.',
        'What follows is the list of what is owed. It is drawn from the domain notes the product itself is being built against, so it is a commissioning list rather than a set of headline ideas.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'Owed',
        title: 'What will be written here',
        lede: 'Each one is here because it is the kind of question that decides whether software like this is any use to an agency.',
      },
      items: [
        {
          title: 'How an M-Pesa payment gets attributed to a lease',
          body: 'The reconciliation order in the order it actually runs: account reference first, then the payer phone on file, then an exact amount against open invoices, then the manual match queue. Written with the awkward cases included, because those are the ones that decide whether it helps you.',
        },
        {
          title: 'What happens to a payment nothing matches',
          body: 'It posts to a suspense account immediately and waits to be attributed. Why that is a better answer than holding it outside the books, and why attributing it later is an allocation rather than a correction.',
        },
        {
          title: 'Running a rent cycle without a spreadsheet',
          body: 'Rent schedules, the monthly run, what happens when a run is executed twice, credit notes, and how arrears ageing falls out of the ledger rather than being maintained beside it.',
        },
        {
          title: 'Reading a landlord statement',
          body: 'What a landlord is actually owed once commission, repairs and a deposit held as a liability are accounted for, and why a deposit never appears as income.',
        },
        {
          title: 'Kenyan letting practice, written down',
          body: 'Deposits, notice, move-in and move-out, what a management agreement usually covers, and the points where the same situation is handled differently from one agency to the next.',
        },
        {
          title: 'Moving your existing data in',
          body: 'What a self-serve import looks like when it has a dry run, a row-level validation report and a rollback, and how to prepare a spreadsheet that several people have maintained over several years.',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'In the meantime',
        title: 'The pages that already answer something',
        lede: 'These are written and worth your time; they are elsewhere on this site.',
      },
      rows: [
        {
          label: 'Security and reliability',
          value:
            'Where rent sits, why Ethanel is not in the money path, what the append-only ledger guarantees, and the bound on every design target this site publishes. It is the one page that carries the figures, and every other page links to it rather than repeating them.',
        },
        {
          label: 'Reconciliation',
          value:
            'The feature page for the matching engine: the order it tries, the suspense account, and the manual match queue. The closest thing to the guide this page owes.',
        },
        {
          label: 'Pricing',
          value:
            'The charging model, described without a figure, because the figures are not set. The page says that outright rather than showing an example that would be read as a firm one.',
        },
        {
          label: 'The platform',
          value:
            'What is being built, in what order, with each capability naming the service behind it and the sprint it is scheduled for.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: {
        eyebrow: 'A commitment',
        title: 'What this page will not turn into',
      },
      paragraphs: [
        'No article will be published here to occupy a search term. If a guide appears on this page it will be because somebody asked the question in a real conversation and the answer was long enough to be worth writing once.',
        'Nothing here will be gated behind an email address. A guide that has to be traded for a contact detail is an advertisement wearing a guide’s clothes, and we would rather you read it and decide.',
        'If you want one of the pieces listed above sooner than it appears, say so — the order they get written in is not fixed, and knowing which one an agency actually needs is better information than our own guess.',
      ],
    },
  ],

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Ask the question instead of waiting for the guide',
      lede: 'Most of what would be in these pieces can be answered in a walkthrough, against your own rent cycle.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
