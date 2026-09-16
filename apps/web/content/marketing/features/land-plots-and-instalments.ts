import type { FeaturePageContent } from '../types'

/**
 * `/features/land-plots-and-instalments` — the page that is hardest to write
 * honestly, because it is the one a land-selling company most wants to be sold.
 *
 * Sprint 012 is the designated slip absorber. If Sprints 004 to 011 run long,
 * this is the work that gets cut, and it may not ship at all. So every Sprint
 * 012 capability below carries `may-not-ship` rather than `sprint`, and the
 * hero and the job block say it in words rather than leaving it to a badge — a
 * badge is a thing you hover, and a reader who never hovers anything must still
 * come away knowing that this is a roadmap intent and not a product.
 *
 * The phrase this page refuses is "coming soon", which converts an uncertainty
 * into a promise without anybody having decided to make one.
 *
 * Two boundaries kept straight. The ledger and the payment rail are genuinely
 * scheduled — Sprints 005 to 007 — so the capabilities that name them say
 * `sprint`. Plot inventory, instalment schedules and SaaS billing are not, so
 * they say `may-not-ship`. And D-66 excludes plot instalments from the
 * auto-match denominator by construction: reconciliation starts at a unit code
 * and a plot carries a label instead, so a plot payment reaches the review
 * queue. This page does not claim automatic matching covers it.
 *
 * No `target` block, and no commercial terms anywhere. Nothing about what a
 * plot costs, how big it is, what a deposit looks like or how long a schedule
 * runs is settled, and none of it is going to be illustrated here.
 */
export const landPlotsAndInstalments: FeaturePageContent = {
  slug: 'land-plots-and-instalments',
  locale: 'en-KE',
  meta: {
    title: 'Land, plots and instalments',
    description:
      'Plot inventory, subdivisions, instalment sales and SaaS billing, described as roadmap intent: Sprint 012 absorbs slippage in our plan and may not ship.',
  },

  hero: {
    eyebrow: 'Land, plots and instalments · Sprint 012, may not ship',
    h1: 'The land side is a plan, and we are not going to sell it as a product',
    subhead:
      'Plots, subdivisions, instalment sales and SaaS billing are Sprint 012 — the release our plan deliberately absorbs slippage into. If the sprints before it run late, this is what gets cut. It may not ship at all.',
    primaryCta: { label: 'Request a demo', href: '/demo' },
  },

  job: {
    heading: {
      eyebrow: 'The job',
      title: 'Selling a plot is a different transaction from letting a unit',
      lede: 'It is paid down rather than paid monthly, it is asked about years later, and the buyer wants to know exactly where they stand every time they pay.',
    },
    body: [
      'Start with the part that is not in doubt: this is not available, and we do not know that it will be. Sprint 012 is the designated slip absorber in our plan. It exists so that when earlier work runs long — and some of it will — there is somewhere for the delay to go that is not the ledger, the payments rail or the reconciliation engine. That somewhere is this page. If land is the reason you are here, read the rest as an intent we are willing to be held to, not as something you can buy.',
      'With that said, the shape of the problem is clear enough to design against. A parent parcel is subdivided into plots. Each plot has a state — available, reserved, sold — and that state has to be right, because two people being sold the same plot is not a data-quality issue, it is a lawsuit.',
      'A buyer then pays the plot down over time. Every payment has to land somewhere a person can point at, the running balance has to be answerable on demand, and the receipt has to still make sense when somebody produces it years afterwards and asks what it was for.',
      'That last requirement is the one that decides the design. It is why instalments would post into the same double-entry journal as everything else rather than into a schedule of their own: money in KES, debits equal credits, postings immutable, a correction made as a new entry carrying a reason. A balance that is derived from entries is a balance you can defend. A balance that is a number in a field is a number somebody can have changed.',
      'Be clear about the matching, too. Automatic attribution begins with the account reference on the unit, and a plot does not carry one — it carries a label. So plot instalments are excluded from the automatic-match measurement on purpose, and a plot payment is expected to reach the review queue for a person to allocate. We would rather say that than let deferred work quietly flatter a go-live number.',
    ],
  },

  capabilities: {
    heading: {
      eyebrow: 'What it is meant to do',
      title: 'Plot inventory, instalments and the billing behind them',
      lede: 'Everything marked as may-not-ship is Sprint 012. The ledger and the payment rail underneath are genuinely scheduled, and are labelled differently for that reason.',
    },
    items: [
      {
        label: 'Plot inventory and subdivisions',
        service: 'listing',
        availability: 'may-not-ship',
        sprint: 'Sprint 012',
        description:
          'A parent parcel, the plots it is divided into, and the state each plot is in.',
      },
      {
        label: 'Plot listings and viewings',
        service: 'listing',
        availability: 'may-not-ship',
        sprint: 'Sprint 012',
        description:
          'A plot published to the storefront, and a viewing booked against the plot it is for.',
      },
      {
        label: 'Instalment schedules against a plot',
        service: 'money',
        availability: 'may-not-ship',
        sprint: 'Sprint 012',
        description:
          'A plot paid down over time, with each payment a posting and the balance derived from entries.',
      },
      {
        label: 'SaaS plans and usage counters',
        service: 'billing',
        availability: 'may-not-ship',
        sprint: 'Sprint 012',
        description:
          'What an organization is on and what it has used. The shape is designed; nothing is chargeable yet.',
      },
      {
        label: 'Per-organization feature flags',
        service: 'billing',
        availability: 'may-not-ship',
        sprint: 'Sprint 012',
        description:
          'Which capabilities an organization has switched on, held per organization rather than per build.',
      },
      {
        label: 'The double-entry journal instalments post into',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 005',
        description:
          'Held in KES, debits equal credits per entry, append-only. This part is scheduled, not deferred.',
      },
      {
        label: 'Buyer receipts and running balances',
        service: 'money',
        availability: 'sprint',
        sprint: 'Sprint 006',
        description:
          'A receipt refers to the entry that recorded the money, and a balance is what the postings add up to.',
      },
      {
        label: 'The M-Pesa rail a plot payment would arrive on',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description: 'Callbacks verified, persisted and acknowledged before anything is processed.',
      },
      {
        label: 'Plot payments in the review queue',
        service: 'payments',
        availability: 'sprint',
        sprint: 'Sprint 007',
        description:
          'A plot carries a label and not a unit code, so its payment reaches a person rather than a rule.',
      },
    ],
  },

  mechanics: {
    heading: {
      eyebrow: 'How it is designed to work',
      title: 'Parcel, plot, payment, posting',
      lede: 'Written in the conditional on purpose. This is the design we would build to, not a description of a running system.',
    },
    steps: [
      {
        title: 'A parcel is subdivided into plots',
        body: 'The parent parcel and the plots it becomes are both recorded, so the relationship between them survives — which plot came out of which parcel is a question with an answer rather than a matter of local knowledge.',
        source: 'DOMAIN.md §3',
      },
      {
        title: 'Each plot carries a state',
        body: 'Available, reserved or sold. The state is the record, not a colour on a spreadsheet, because this is the field that stops the same plot being sold twice.',
        source: 'SERVICE-TOPOLOGY.md · listing-svc',
      },
      {
        title: 'A plot is listed, and viewed',
        body: 'A plot listing sits on the same storefront as a unit listing, and a viewing is booked against it, so the land side is not a separate system bolted on beside the letting one.',
        source: 'SERVICE-TOPOLOGY.md · listing-svc',
      },
      {
        title: 'A sale sets up an instalment schedule',
        body: 'The schedule says what is owed and when. It does not hold the balance as a figure of its own; the balance is what the postings add up to.',
        source: 'D-61',
      },
      {
        title: 'The buyer pays, and it posts',
        body: 'Payment arrives over M-Pesa on the same rail as rent — verified, persisted and acknowledged before anything is processed, then written into the journal in KES.',
        source: 'D-41',
      },
      {
        title: 'A person allocates it',
        body: 'Automatic attribution starts at the unit code and a plot has none, so a plot payment reaches the review queue. Attributing it is an allocation: no reason required, no approval threshold, and not a reversal.',
        source: 'D-66, D-62',
      },
      {
        title: 'The receipt and the balance come from the entries',
        body: 'Both are rendered from postings rather than from a stored total. Postings are immutable, so a correction is a new entry with a reason and the history an auditor reads is the history that happened.',
        source: 'DOMAIN.md §4',
      },
    ],
  },

  limits: {
    heading: {
      eyebrow: 'What it does not do',
      title: 'The things to know before you plan anything around this',
      lede: 'This block is longer than the others on purpose. It is the honest part of a page about work that may never exist.',
    },
    items: [
      'Sprint 012 may not ship at all. It is the release our plan absorbs slippage into, which means it is the work that gets cut if anything before it runs late. We are not asking anyone to choose Ethanel on the strength of it, and if land is your main business you should assume it is not there and ask us where Sprint 012 actually stands.',
      'Automatic matching does not cover plot instalments. Attribution starts at the account reference on a unit and a plot carries a label instead, so plot payments are excluded from the automatic-match measurement by design and are expected to reach the review queue for a person. What reference a plot buyer would pay against is still an open question in our plan.',
      'Nothing about commercial terms is settled — not what a plan costs, not what a plot instalment schedule looks like, not what a deposit arrangement would be. You will not find an illustrative figure anywhere on this site, because an illustrative figure on a public page is read as a quotation.',
      'SaaS billing is not something you can sign up to. Plans, usage counters and feature flags are designed and scheduled into the same sprint that may be cut; for the pilot, invoicing an organization is a manual job done by a person.',
      'None of this has shipped, and the parts of it that are scheduled are scheduled behind everything else. Plot inventory, instalments and SaaS billing are Sprint 012 and may-not-ship. The journal they would post into is Sprint 005, receipts rendered from it are Sprint 006, and the M-Pesa rail is Sprint 007. No sprint has completed.',
    ],
  },

  related: {
    heading: {
      eyebrow: 'Nearby',
      title: 'The parts that are actually scheduled',
    },
    links: [
      { label: 'Rent collection', href: '/features/rent-collection' },
      { label: 'Reconciliation', href: '/features/reconciliation' },
      { label: 'Marketplace and viewings', href: '/features/marketplace-and-viewings' },
      { label: 'Documents and signing', href: '/features/documents-and-signing' },
      { label: 'For land and plot sellers', href: '/solutions/land-and-plot-sellers' },
      { label: 'Security and reliability', href: '/security' },
    ],
  },

  cta: {
    heading: {
      eyebrow: 'Next step',
      title: 'Ask us where Sprint 012 stands before you decide anything',
      lede: 'If plots are the reason you are here, tell us when you book. You will get a straight answer about the sequence rather than a demo of something that is not built.',
    },
    primaryCta: { label: 'Request a demo', href: '/demo' },
    reassurance:
      'For pilot partners, we run one full rent cycle alongside your current spreadsheet before you switch. If the two sets of books don’t agree, you don’t go live.',
  },
}
