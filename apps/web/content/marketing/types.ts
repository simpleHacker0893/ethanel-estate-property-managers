/**
 * Content-module types for the marketing track.
 *
 * Copy lives in `content/marketing/` modules as typed data; section components
 * in `app/(marketing)/_sections/` only render it — a lint rule rejects string
 * literals over 30 characters there, so copy cannot migrate back into JSX.
 *
 * The `Capability` type is the honesty mechanism: a feature cannot be
 * described on the site without naming the service that implements it and its
 * real availability. The union is the twelve logical services of D-67
 * (`SERVICE-TOPOLOGY.md`), and the availability values mean exactly:
 *   available    — a shipped sprint's acceptance criteria pass
 *   sprint       — a scheduled sprint (name the sprint in `sprint`)
 *   may-not-ship — genuinely uncertain; the page must say so (D-68 style
 *                  honesty is a copy rule, not a vibe)
 */

import type { Locale } from './routes'

/** The twelve logical services (D-67, SERVICE-TOPOLOGY.md). */
export type ServiceName =
  | 'web'
  | 'gateway'
  | 'identity'
  | 'property'
  | 'listing'
  | 'money'
  | 'payments'
  | 'messaging'
  | 'ops'
  | 'docs'
  | 'billing'
  | 'reporting'

export type Availability = 'available' | 'sprint' | 'may-not-ship'

/**
 * A capability, and the reason acceptance row 7 is a type error rather than a
 * test: the discriminated union means an entry that is not `available` cannot
 * omit `sprint`. There is no way to describe a scheduled capability on this
 * site without saying when it is scheduled for.
 */
export type Capability = {
  label: string
  /** Does not compile without naming the implementing service. */
  service: ServiceName
  /** Optional one-liner; kept under 120 characters, checked by `features.test.ts`. */
  description?: string
} & (
  | { availability: 'available'; sprint?: never }
  | { availability: 'sprint' | 'may-not-ship'; sprint: string }
)

export interface SectionHeading {
  eyebrow?: string
  title: string
  lede?: string
}

export interface Cta {
  label: string
  href: string
}

export interface Step {
  title: string
  body: string
  /** Optional trace, rendered as the small mono line under a step. */
  source?: string
}

export interface FaqItem {
  question: string
  answer: string
}

/**
 * One of the four publishable numbers, and only those four (D-40, D-41,
 * D-39-as-bounded-by-D-66, D-45).
 *
 * `bound` is required and not optional on purpose. A bare "95% auto-matched" is
 * the exact defect D-66 was written to fix, so the denominator is part of the
 * shape of the claim rather than a nicety someone can leave off. `source` names
 * the decision, which is what makes the claim checkable against the pack.
 */
export interface DesignTarget {
  claim: string
  bound: string
  source: string
}

export interface ProofBarContent {
  title: string
  /** What the bar will carry once there are pilot partners, said plainly. */
  pendingNote: string
  href: string
  hrefLabel: string
  targets: DesignTarget[]
}

// ---------------------------------------------------------------- landing ---
// S2..S16. One interface per section so five slices can be written in parallel
// against a fixed contract and assembled without drift.

export interface HeroContent {
  h1: string
  subhead: string
  /** The scoped risk-reversal line. Above the fold at 390x844 — acceptance 4. */
  riskReversal: string
  primaryCta: Cta
  secondaryCta: Cta
  /** The "dual door" — letting agency on one side, land seller on the other. */
  doors: { label: string; href: string; description: string }[]
}

export interface ProblemContent {
  heading: SectionHeading
  /**
   * The symptom in the owner's voice, and the capability that answers it.
   *
   * The field is `symptom` and not `quote` for two reasons. Nobody is being
   * quoted — these are written by us, and calling them quotations invites
   * exactly the invented-testimonial the content-truth guard exists to catch,
   * which greps for a `quote:` key. And `symptom` is the more accurate word for
   * what they are.
   */
  pains: { symptom: string; response: string }[]
}

export interface HowItWorksContent {
  heading: SectionHeading
  steps: Step[]
  /** The reconciliation order, DOMAIN.md §4, rendered as it actually runs. */
  reconciliationOrder: { order: number; label: string; detail: string }[]
  suspenseNote: string
}

export interface FeatureGridContent {
  heading: SectionHeading
  capabilities: Capability[]
  cta: Cta
}

export interface DeepDiveContent {
  heading: SectionHeading
  body: string[]
  /** Rendered as the chart of accounts table where the dive needs it. */
  accounts?: { account: string; type: string; note?: string }[]
  target?: DesignTarget
  cta?: Cta
}

export interface RoleSwitcherContent {
  heading: SectionHeading
  roles: {
    /** Becomes the `nuqs` URL value, so it is a slug and not a label. */
    id: string
    label: string
    lede: string
    points: Capability[]
  }[]
}

export interface BandContent {
  heading: SectionHeading
  points: Capability[]
  cta: Cta
  /** Availability is stated on the band itself, not only per bullet. */
  availabilityNote: string
}

export interface SecurityContent {
  heading: SectionHeading
  commitments: { title: string; body: string }[]
  targets: DesignTarget[]
  cta: Cta
}

export interface PricingPreviewContent {
  heading: SectionHeading
  model: string[]
  /** No number appears here. Q7 is open; the pilot-quote path ships instead. */
  note: string
  cta: Cta
}

export interface FaqContent {
  heading: SectionHeading
  items: FaqItem[]
}

export interface FinalCtaContent {
  heading: SectionHeading
  primaryCta: Cta
  reassurance: string
}

export interface HomeContent {
  locale: Locale
  meta: { title: string; description: string }
  hero: HeroContent
  proofBar: ProofBarContent
  problem: ProblemContent
  howItWorks: HowItWorksContent
  featureGrid: FeatureGridContent
  deepDives: [DeepDiveContent, DeepDiveContent, DeepDiveContent]
  roleSwitcher: RoleSwitcherContent
  marketplaceBand: BandContent
  landBand: BandContent
  security: SecurityContent
  pricingPreview: PricingPreviewContent
  faq: FaqContent
  finalCta: FinalCtaContent
}

// --------------------------------------------------------------- features ---

/** The eight-block feature-page template. Every page fills the same shape. */
export interface FeaturePageContent {
  slug: string
  locale: Locale
  meta: { title: string; description: string }
  /** Block 1 */
  hero: { eyebrow: string; h1: string; subhead: string; primaryCta: Cta }
  /** Block 2 — the job the agency is trying to get done. */
  job: { heading: SectionHeading; body: string[] }
  /** Block 3 — what it does, every bullet service-traced. */
  capabilities: { heading: SectionHeading; items: Capability[] }
  /** Block 4 — how it works, in order. */
  mechanics: { heading: SectionHeading; steps: Step[] }
  /** Block 5 — the bounded number, where one applies. */
  target?: DesignTarget
  /** Block 6 — what it deliberately does not do. */
  limits: { heading: SectionHeading; items: string[] }
  /** Block 7 — where it sits relative to the rest. */
  related: { heading: SectionHeading; links: Cta[] }
  /** Block 8 */
  cta: FinalCtaContent
}

// ----------------------------------------------------------------- assets ---

/**
 * DEBT-10: no photography exists. Every image on the site is a watermarked
 * placeholder with a row here naming the shot it owes, so the debt is a list
 * someone can shoot from rather than a vague intention.
 */
export interface AssetRow {
  id: string
  /** Where it appears. */
  usedOn: string
  /** The shot this placeholder owes. */
  owes: string
  width: number
  height: number
  alt: string
}

// ----------------------------------------------------------- site pages ---

/**
 * The block vocabulary every non-feature page is built from.
 *
 * Four shapes, chosen because sixteen pages needed them and not one needed a
 * fifth: running prose, a list of named things, an ordered process, and a
 * label/value table. A page picks blocks in order; the template knows how to
 * draw each kind and nothing else. Adding a `kind` is a deliberate act with a
 * renderer attached, which is what stops this drifting into a CMS.
 */
export type PageBlockBody =
  | { kind: 'prose'; paragraphs: string[] }
  | { kind: 'list'; items: { title: string; body: string }[] }
  | { kind: 'steps'; steps: Step[] }
  | { kind: 'facts'; rows: { label: string; value: string }[] }

export type PageBlock = {
  heading: SectionHeading
  /**
   * Links rendered as a row under the block.
   *
   * Body copy is plain strings with no markdown and no link parsing, which is
   * deliberate — a renderer that parses copy is a renderer that can be made to
   * emit markup from content. But that left pages unable to link at all, so
   * `/security` was being referenced as bare path text in prose that a reader
   * cannot click. This is the affordance: links are structured data with an
   * href the test suite can resolve against the route manifest, rather than a
   * string that happens to look like a path.
   */
  links?: Cta[]
} & PageBlockBody

/**
 * Every page on the site that is not the landing page, the demo path or a
 * feature page: pricing, the trust pages, the four solutions, the company
 * pages and the four legal stubs.
 *
 * One shape for all of them, for the same reason the ten feature pages share
 * one template — a page that cannot express something the type does not have
 * is a page that cannot quietly invent a customer, a price or a launch date.
 */
export interface StandardPageContent {
  /** Must equal the manifest path, asserted by `tests/content/pages.test.ts`. */
  slug: string
  meta: { title: string; description: string }
  /**
   * The in-review banner. Present only on pages whose content is owed to
   * someone outside the team — the four `/legal/*` stubs, where an advocate
   * review is outstanding and Q6 is open (DEBT-09). A page that renders this
   * is saying so on the page, not only in the nav.
   */
  banner?: string
  hero: { eyebrow?: string; h1: string; lede: string }
  blocks: PageBlock[]
  cta: FinalCtaContent
}
