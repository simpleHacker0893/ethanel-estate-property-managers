import type { FeaturePageContent } from '../types'

/**
 * `/features/marketplace-and-viewings` — the page where the vocabulary table
 * stops being a style guide and starts being the argument.
 *
 * A **prospect** is the person; a **lead** is the record of that person's
 * interest in a listing. Everywhere else in the pack that distinction is a
 * tidiness rule. Here it is the product: what an agency buys is not a person,
 * it is a record with events on it that can be read a month later, and copy
 * that blurs the two describes a different, vaguer thing.
 *
 * The honesty problem on this page is a marketplace's chicken and egg. A
 * marketplace is worth something because people are already on it, and nobody
 * is on this one — there is no audience, no published inventory and no
 * enquiry flow, because Sprint 011 has not run and no sprint has. So the page
 * describes the mechanism and says plainly that the audience does not exist
 * yet, rather than implying a demand side by describing the supply side in the
 * present tense.
 *
 * No `target` block. None of the four publishable numbers is about listings,
 * and a throughput or inventory figure here would be invented.
 */
export const marketplaceAndViewings: FeaturePageContent = {
  slug: 'marketplace-and-viewings',
  locale: 'en-KE',
  meta: {
    title: 'Marketplace and viewings',
    description:
      'Listings published from the unit record, viewings booked against a listing, and a lead recording what a prospect did. Scheduled for Sprint 011; nothing is live.',
  },

  hero: {
    eyebrow: 'Marketplace and viewings',
    h1: 'Listings that come from the unit, and leads that survive the week',
    subhead:
      'A listing is published from the record the lease is written against, so it is never a second copy someone forgets to take down. A viewing is booked against that listing, and the lead keeps what happened.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Letting the vacant unit without losing the enquiry',
      lede: 'Nobody struggles to advertise a unit. What goes wrong is everything between the enquiry arriving and somebody remembering to follow it up.',
    },
    body: [
      'A unit falls vacant, so it gets posted — to a portal, to a WhatsApp group, to whatever the agency used last time. Enquiries arrive across all of those. Some are answered, some are not, and the record of which is which is a phone belonging to whoever was on duty.',
      'Then the unit is let, and the advert is still up, so the enquiries keep coming for a unit nobody can show. Meanwhile a prospect who asked about a different unit two weeks ago has heard nothing, because there was never a record of them to work through — only a message thread that has since scrolled away.',
      'Ethanel treats the listing as a view of the unit rather than a copy of it. The listing is published from the same record the lease is written against, so what a prospect reads on the public side and what the agency sees on the inside cannot drift apart, and taking the unit off the market is one action rather than a list of places to remember.',
      'The enquiry becomes a record. A prospect is the person who is interested; a lead is the record of that interest, with the events on it — the enquiry, the viewing booked, the viewing attended. That distinction is why an agency can still answer, in a month, what happened to a prospect who came in today.',
      'And the honest part: none of this is running. There is no marketplace audience, no published inventory and no enquiry coming in, because Sprint 011 has not happened. What follows is the mechanism as it is designed, not a description of something you can use.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it does',
      title: 'Listings, storefronts, viewings and leads',
      lede: 'Each bullet names the service that implements it and its sprint. Every one of them is scheduled work, and nothing on this page is marked as available.',
    },
    items: [
      {
        label: 'Listings published from the unit record',
        service: 'listing',
        availability: 'sprint',
        sprint: 'Sprint 011',
        description:
          'One listing, drawn from the record the lease is written against. Not a second copy to maintain.',
      },
      {
        label: 'A storefront for your agency',
        service: 'listing',
        availability: 'sprint',
        sprint: 'Sprint 011',
        description:
          'Your own page on the public site, showing what you are currently letting or selling.',
      },
      {
        label: 'Viewings booked against a listing',
        service: 'listing',
        availability: 'sprint',
        sprint: 'Sprint 011',
        description:
          'A viewing is attached to the listing it is for, so attendance is recorded against something.',
      },
      {
        label: 'A lead record behind every prospect',
        service: 'listing',
        availability: 'sprint',
        sprint: 'Sprint 011',
        description:
          'The prospect is the person; the lead is the record, with its events kept in order.',
      },
      {
        label: 'Search across published listings',
        service: 'listing',
        availability: 'sprint',
        sprint: 'Sprint 011',
        description:
          'Postgres full-text and trigram search. Filters live in the URL, so a search is a link you can send.',
      },
      {
        label: 'The unit behind the listing',
        service: 'property',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Properties, units and leases. A unit that has just been let is a unit that is no longer listed.',
      },
      {
        label: 'Enquiries into the conversation inbox',
        service: 'messaging',
        availability: 'sprint',
        sprint: 'Sprint 009',
        description:
          'One assignee per WhatsApp conversation; everyone else on the team reads it and does not reply.',
      },
      {
        label: 'A verified prospect, held to the resident standard',
        service: 'identity',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Phone verification for a prospect is the same gate as for a resident, not a weaker one.',
      },
      {
        label: 'Public storefront and search pages',
        service: 'web',
        availability: 'sprint',
        sprint: 'Sprint 011',
        description:
          'Rendered by the public site. The storefront is the one surface where cached staleness costs nobody.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it works',
      title: 'From a vacant unit to a lead you can still read next month',
      lede: 'Each step writes something down, which is the only reason the next one has anything to work with.',
    },
    steps: [
      {
        title: 'The unit is already in the system',
        body: 'It exists because a property was placed under a management agreement and its units were recorded. Listing it does not create a second record of it.',
        source: 'SERVICE-TOPOLOGY.md · property-svc',
      },
      {
        title: 'A listing is published from it',
        body: 'The listing is a view of the unit on the public side. When the unit is let, the listing comes down from the same action rather than from somebody remembering three places.',
        source: 'SERVICE-TOPOLOGY.md · listing-svc',
      },
      {
        title: 'A prospect finds it',
        body: 'Through the agency storefront or through search across published listings. Search is Postgres full-text plus trigram matching — no separate search cluster to keep in step with the data.',
        source: 'DOMAIN.md §6',
      },
      {
        title: 'The enquiry becomes a lead',
        body: 'The prospect is the person who enquired. The lead is the record of that interest in that listing, and the events that follow are appended to it rather than replacing what it said before.',
        source: 'DOMAIN.md §3',
      },
      {
        title: 'A viewing is booked against the listing',
        body: 'Not against a free-text note. The viewing hangs off the listing, so the question of which units are actually being shown has an answer that is not a guess.',
        source: 'SERVICE-TOPOLOGY.md · listing-svc',
      },
      {
        title: 'One person owns the conversation',
        body: 'A WhatsApp conversation has a single assignee and everyone else is read-only, so a prospect does not get three answers from three members of staff.',
        source: 'DOMAIN.md §5',
      },
      {
        title: 'A let unit stops being a listing',
        body: 'The lease is written against the unit the listing came from, so letting it is what takes it off the market. There is no separate step that somebody can skip.',
        source: 'D-57',
      },
    ],
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'Read this before you plan a letting campaign around it',
      lede: 'The first item is the one that matters, and it is the one a marketplace page usually leaves out.',
    },
    items: [
      'There is no marketplace audience. Nothing is published, nobody is searching it, and we are not going to imply otherwise with a number or a phrase about buyer demand. A storefront is worth something once people are looking at it, and right now they are not.',
      'A listing is not a portal syndication. Publishing a unit here puts it on your storefront and in search on this site. It does not push it to any third-party property portal, and we have not built or committed to an integration with one.',
      'Search is scoped to what agencies have published here, and it is Postgres full-text with trigram matching rather than a dedicated search engine. It is chosen to stay consistent with the data it indexes, not to behave like a national property index.',
      'An enquiry from this marketing site is not a marketplace lead. The demo form on this site writes to its own sink and deliberately does not land in the marketplace lead pipeline, because mixing a sales enquiry into a letting funnel corrupts the numbers an agency would read off it.',
      'None of this has shipped. Listings, storefronts, viewings, leads and search are scheduled for Sprint 011, the units behind them for Sprint 005, and the conversation inbox for Sprint 009. No sprint has completed.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'What happens to a prospect who becomes a resident',
    },
    links: [
      { label: 'Documents and signing', href: '/features/documents-and-signing' },
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Invoicing and rent runs', href: '/features/invoicing-and-rent-runs' },
      { label: 'WhatsApp and notifications', href: '/features/whatsapp-and-notifications' },
      { label: 'Land, plots and instalments', href: '/features/land-plots-and-instalments' },
      { label: 'For letting and management agencies', href: '/solutions/letting-agencies' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Tell us how you let a unit today',
      lede: 'If the marketplace is the reason you are reading this, say so when you book — it is Sprint 011, and you should hear where that actually stands before you plan around it.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
