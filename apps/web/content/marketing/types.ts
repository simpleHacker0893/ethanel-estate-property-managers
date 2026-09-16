/**
 * Content-module types for the marketing track (ticket 03).
 *
 * Copy lives in `content/marketing/` modules as typed data; section components
 * in `app/(marketing)/_sections/` only render it — a lint rule rejects string
 * literals over 30 characters there, so copy cannot migrate back into JSX.
 *
 * The `Capability` type is the honesty mechanism: a feature cannot be
 * described on the site without naming the service that implements it and its
 * real availability. The union is the twelve logical services of D-67
 * (`SERVICE-TOPOLOGY.md`), and the availability values mean exactly:
 *   available   — a shipped sprint's acceptance criteria pass
 *   sprint      — a scheduled sprint (name the sprint in `sprint`)
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

export interface Capability {
  label: string
  /** Does not compile without naming the implementing service. */
  service: ServiceName
  availability: Availability
  /** Required when availability is not 'available'. */
  sprint?: string
  /** Optional one-liner; kept under 120 characters, checked by the proof test. */
  description?: string
}

export interface SectionHeading {
  eyebrow?: string
  title: string
  lede?: string
}

/** A page's content module. Sections reference data by key, not inline copy. */
export interface ContentModule {
  locale: Locale
  meta: { title: string; description: string }
  sections: (
    | { kind: 'hero'; heading: SectionHeading; primaryCta: Cta; secondaryCta?: Cta }
    | { kind: 'features'; heading: SectionHeading; capabilities: Capability[] }
    | { kind: 'steps'; heading: SectionHeading; steps: Step[] }
    | { kind: 'faq'; heading: SectionHeading; items: FaqItem[] }
    | { kind: 'band'; heading: SectionHeading; cta: Cta }
  )[]
}

export interface Cta {
  label: string
  href: string
}

export interface Step {
  title: string
  body: string
}

export interface FaqItem {
  question: string
  answer: string
}
