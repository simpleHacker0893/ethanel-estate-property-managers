import type { StandardPageContent } from '../types'

/**
 * `/find` — the one page on this site written for somebody who is not an
 * agency, and the one page that currently has nothing to show them.
 *
 * The marketplace surface belongs to `listing` and is scheduled for Sprint 011.
 * Plot inventory and subdivisions are Sprint 012, which is the designated slip
 * absorber for the whole plan and may not ship at all. So there is no search
 * box here that returns results, because there are no listings, and a search
 * field that always returns nothing is a worse experience than a page that says
 * so in a sentence. What ships instead is an honest account of what searching
 * here will involve, who publishes the listings, and what a home-seeker will be
 * able to expect from an agency on the other side of an enquiry.
 *
 * The register shifts here and that is deliberate. Everywhere else on this site
 * the reader is an agency owner being asked to trust a ledger. Here the reader
 * is a person who wants somewhere to live, who has been burned by a listing
 * that was let three weeks ago and by a "viewing fee" collected for a unit that
 * did not exist. The copy answers those fears rather than explaining
 * double-entry accounting, which is of no interest to them whatsoever. It
 * refers to what they are looking for as a unit or a plot, because that is the
 * vocabulary the rest of the system uses and a listing that means something
 * different to the reader than it does to the database is where marketplace
 * trust goes to die.
 *
 * What this page deliberately refuses to say: that anything is searchable now,
 * that any agency has published anything, how many units or plots will be
 * listed, or when a home-seeker should come back. It names sprints because
 * sprints are what actually exist, and it says outright that Sprint 012 may not
 * ship rather than implying plots are around the corner. It invents no
 * neighbourhood, no rent level and no example listing.
 *
 * A known tension, recorded rather than papered over: the call to action on
 * this page is "Request a demo", which points at `/demo` — and `/demo` is an
 * agency action, not something a home-seeker would ever want. Until there is a
 * listing-alert path for home-seekers to join, or a marketplace to send them
 * into, the honest framing is to address the closing section to the agency
 * reading over their shoulder, which is what the CTA heading below does. The
 * page does not pretend the demo form is for the home-seeker.
 */
export const find: StandardPageContent = {
  slug: '/find',

  meta: {
    title: 'Find a home or a plot: what the Ethanel marketplace will be',
    description:
      'The Ethanel marketplace is not open yet. What searching for a home or a plot here will involve, who publishes the listings, and when each part is scheduled.',
  },

  hero: {
    eyebrow: 'For home-seekers',
    h1: 'Find a home, or a plot, without the runaround',
    lede: 'There is nothing to search here yet — the marketplace is scheduled for Sprint 011 and no listing has been published. This page is a straight account of what it will be, so you can judge it before you rely on it.',
  },

  blocks: [
    {
      kind: 'prose',
      links: [
        { label: 'How we bound every number', href: '/security' },
        { label: 'How Ethanel is priced', href: '/pricing' },
        { label: 'Contact us', href: '/contact' },
      ],
      heading: {
        eyebrow: 'Where we are',
        title: 'Nothing is listed yet, and we are not going to pretend otherwise',
        lede: 'The most useful thing this page can do today is set your expectations accurately.',
      },
      paragraphs: [
        'Ethanel is software that letting and management agencies in Kenya use to run their books, their repairs and their conversations with residents. The public side of it — the marketplace where you would search for somewhere to live — is scheduled for Sprint 011 and has not been built. Land and plot inventory follows in Sprint 012, which is the sprint held back to absorb delays elsewhere in the plan and which may not ship at all.',
        'That means no search box on this page returns anything today, and there is no waiting list to join that we could honestly promise to contact you from. If you have found this page while looking for a home right now, the useful move is to deal with a letting agency directly.',
        'When it does open, the listings will be published by the agencies themselves, from the same records they manage the unit with. A unit that has been let is a unit whose lease exists in the system, which is the mechanism by which a listing should stop being shown — not a reminder somebody has to action.',
      ],
    },
    {
      kind: 'list',
      heading: {
        eyebrow: 'The intent',
        title: 'What we are building it to do for you',
        lede: 'Each of these is a design commitment for the marketplace scheduled for Sprint 011, not something you can do today.',
      },
      items: [
        {
          title: 'Search units and plots that a real agency stands behind',
          body: 'Every listing traces to an agency with a management agreement for that unit, or to a seller with the plot on their inventory. You are not searching a noticeboard where anyone can post anything.',
        },
        {
          title: 'See a listing that goes away when the unit goes',
          body: 'Listings are built against the same record the agency leases the unit from, so a let unit is a closed listing. The commonest waste of a home-seeker’s afternoon is a listing that outlived its availability by a month.',
        },
        {
          title: 'Request a viewing without a phone-tag negotiation',
          body: 'A viewing request reaches the agency as a record with your details attached, in the same inbox they run their other conversations from, rather than as a missed call somebody meant to return.',
        },
        {
          title: 'Talk to the agency where you already talk to people',
          body: 'WhatsApp is the primary channel, with SMS as fallback and email for documents. One person on the agency side owns the conversation, so you are not re-explaining yourself to whoever picks up next.',
        },
        {
          title: 'Pay rent to the agency, never to us',
          body: 'If you go on to rent through an agency using Ethanel, your M-Pesa payment settles to that agency’s own client account. Ethanel never holds rent; the arrangement is set out on the security page.',
        },
        {
          title: 'Browse an agency storefront rather than a stream of ads',
          body: 'Each agency gets a storefront page carrying its own listings, so you can judge who you are dealing with before you arrange to meet a stranger at an empty unit.',
        },
      ],
    },
    {
      kind: 'steps',
      heading: {
        eyebrow: 'The plan',
        title: 'What happens when you enquire, once it is open',
        lede: 'Written in the order it will run, with the sprint each part depends on.',
      },
      steps: [
        {
          title: 'You search and open a listing',
          body: 'Search, filters and the listing page itself are part of the marketplace surface, along with the agency storefronts the listings hang from.',
          source: 'listing · Sprint 011',
        },
        {
          title: 'You request a viewing',
          body: 'The request becomes a lead record held against the listing and the agency — a lead is the record, you are the prospect — so it can be answered, tracked and closed rather than lost in a personal phone.',
          source: 'listing · Sprint 011',
        },
        {
          title: 'The agency answers you on WhatsApp',
          body: 'The enquiry lands in the agency’s conversation inbox with a single assignee. Notifications about money are mandatory and cannot be switched off; everything else is a preference you would control.',
          source: 'messaging · Sprint 009',
        },
        {
          title: 'If you take the unit, the lease and the documents follow',
          body: 'The lease is created against the unit, your deposit is recorded as money the agency holds and owes back rather than as income it has earned, and the lease document is rendered and sent for signature by email.',
          source: 'property, docs · Sprints 005 and 006',
        },
        {
          title: 'You pay over M-Pesa and get a receipt that matches the books',
          body: 'Your payment is matched against the invoice on your lease, oldest first, and an overpayment becomes a credit rather than disappearing. If it cannot be matched automatically it is still recorded immediately and queued for a person to attribute.',
          source: 'payments · Sprint 007',
        },
      ],
    },
    {
      kind: 'facts',
      heading: {
        eyebrow: 'Straight answers',
        title: 'The questions a home-seeker should be asking',
        lede: 'Including the ones with an unsatisfying answer.',
      },
      rows: [
        {
          label: 'Can I search for a home here today?',
          value:
            'No. The marketplace is scheduled for Sprint 011 and nothing has been published. No sprint on this plan has shipped yet.',
        },
        {
          label: 'Will there be plots and land for sale?',
          value:
            'That is the intent, in Sprint 012 — but Sprint 012 is deliberately held as slack for the rest of the plan and may not ship at all. We would rather tell you that now than list it as coming soon.',
        },
        {
          label: 'Does Ethanel charge me anything?',
          value:
            'No. Ethanel is charged to the agency, on a basis set out on the pricing page. There is no home-seeker fee, and searching or enquiring will not cost you anything.',
        },
        {
          label: 'Does my rent go to Ethanel?',
          value:
            'Never. Rent settles to the client account of the agency you are dealing with. Ethanel is not in the money path at any point, for the reasons set out on the security page.',
        },
        {
          label: 'Who do I complain to if a listing is wrong?',
          value:
            'The agency that published it, in the first instance. If you cannot get an answer from them, reach us through the contact page and we will tell you honestly what we can and cannot do about it.',
        },
        {
          label: 'What happens to my details when I enquire?',
          value:
            'They go to the agency handling that listing so it can answer you. Our data-controller registration and the notices that depend on it are still in review, and the pages under Legal say so on their own faces rather than carrying policy text we have not settled.',
        },
      ],
    },
  ],

  cta: {
    // The tension noted in the file docstring: /demo is an agency action, so
    // the closing section addresses the agency rather than the home-seeker who
    // read the rest of this page.
    heading: {
      eyebrow: 'For agencies',
      title: 'Run a letting agency? This is where your listings would sit',
      lede: 'The marketplace is scheduled for Sprint 011 and is fed by the units you already manage in Ethanel, so a listing and a lease are never two separate truths. A demo is an agency conversation, not a home-seeker one.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
