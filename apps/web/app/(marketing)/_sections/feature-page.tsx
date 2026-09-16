import Link from 'next/link'
import {
  Card,
  Container,
  Eyebrow,
  Prose,
  Section,
  buttonClassName,
  cn,
  ctaMarker,
} from '@ethanel/ui'

import type { FeaturePageContent, SectionHeading } from '../../../content/marketing/types'
import { AvailabilityBadge } from '../_components/availability-badge'
import { FinalCta } from './final-cta'

/**
 * The eight-block feature page, and the only component any of the ten
 * `/features/*` routes renders.
 *
 * The template is the deliverable; the pages are data. `app/(marketing)/features/[slug]`
 * resolves a slug to a `FeaturePageContent` and hands it here, so there is no
 * per-page component to drift — a page that needs something this file cannot
 * express changes this file, and all ten pages get it. That is ticket 11's "no
 * page introduces a new component" made structural rather than remembered.
 *
 * The blocks, in the order a sceptical reader needs them:
 *
 *   1  hero          what this is, and the one thing it does
 *   2  job           the job the agency is trying to get done
 *   3  capabilities  what it does — every bullet service-traced and labelled
 *   4  mechanics     how it works, in the order it runs
 *   5  target        the bounded number, on the four pages one applies to
 *   6  limits        what it deliberately does not do
 *   7  related       where it sits relative to the rest
 *   8  cta           the same closing band the landing page uses
 *
 * Block 6 is the one that is easy to drop and the one that earns the page. A
 * reader who has been sold property software before is looking for what was
 * left out; handing it to them is cheaper than letting them find it.
 *
 * Tones alternate so the eye can find a block boundary without a rule, and
 * exactly one band is `inverted` — the target. The landing page's two-band
 * budget is its own (a Playwright assertion counts it there), but the reason
 * for the budget is the same here: a `brand-900` band is the page's loudest
 * instrument and it stops meaning anything when every block plays it.
 *
 * Block 8 reuses `FinalCta` rather than restating it, which keeps the
 * `data-cta="primary"` marker in one place. The hero carries the only other
 * primary call to action on the page, six blocks away from it.
 *
 * No copy lives in this file. The only literals are the block ids and the
 * heading for the service trace, which is a label.
 */

const JOB_ID = 'feature-job'
const CAPABILITIES_ID = 'feature-capabilities'
const MECHANICS_ID = 'feature-mechanics'
const TARGET_ID = 'feature-target'
const LIMITS_ID = 'feature-limits'
const RELATED_ID = 'feature-related'

export function FeaturePage({ content }: { content: FeaturePageContent }) {
  return (
    <>
      <Section aria-labelledby="feature-hero-heading">
        <Container>
          <Prose>
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
            <h1
              id="feature-hero-heading"
              className="text-h1 text-ink font-display mt-3 font-bold text-balance"
            >
              {content.hero.h1}
            </h1>
            <p className="text-body-lg text-ink-muted mt-5">{content.hero.subhead}</p>
            <p className="mt-8">
              <Link
                href={content.hero.primaryCta.href}
                className={buttonClassName('primary', 'lg')}
                {...ctaMarker('primary')}
              >
                {content.hero.primaryCta.label}
              </Link>
            </p>
          </Prose>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby={JOB_ID}>
        <Container>
          <Prose>
            <BlockHeading id={JOB_ID} heading={content.job.heading} />
            <div className="mt-6 space-y-4">
              {content.job.body.map((paragraph) => (
                <p key={paragraph} className="text-body text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Prose>
        </Container>
      </Section>

      <Section aria-labelledby={CAPABILITIES_ID}>
        <Container>
          <Prose>
            <BlockHeading id={CAPABILITIES_ID} heading={content.capabilities.heading} />
          </Prose>

          <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
            {content.capabilities.items.map((item) => (
              <li key={item.label} data-capability="" className="h-full">
                <Card className="flex h-full flex-col gap-3">
                  <h3 className="text-h4 text-ink font-display font-semibold">{item.label}</h3>
                  {item.description ? (
                    <p className="text-body-sm text-ink-muted">{item.description}</p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                    {/*
                      `sprint` is `string | undefined` on the union and the badge
                      prop is explicitly widened to match, so it forwards
                      straight through under `exactOptionalPropertyTypes`.
                    */}
                    <AvailabilityBadge availability={item.availability} sprint={item.sprint} />
                    <span
                      data-service={item.service}
                      className="text-caption text-ink-quiet font-mono"
                    >
                      {item.service}
                    </span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="raised" aria-labelledby={MECHANICS_ID}>
        <Container>
          <Prose>
            <BlockHeading id={MECHANICS_ID} heading={content.mechanics.heading} />
          </Prose>

          {/*
            An ordered list because the order is a domain fact rather than a
            layout choice: the reconciliation sequence is DOMAIN.md §4 and
            reading it out of sequence describes a different product.
          */}
          <ol className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
            {content.mechanics.steps.map((step, index) => (
              <li key={step.title} className="border-line border-t pt-4">
                <p className="text-data text-ink-quiet font-semibold">{index + 1}</p>
                <h3 className="text-h4 text-ink font-display mt-1 font-semibold">{step.title}</h3>
                <p className="text-body-sm text-ink-muted mt-2">{step.body}</p>
                {step.source ? (
                  <p className="text-caption text-ink-quiet mt-3 font-mono">{step.source}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {content.target ? (
        <Section tone="inverted" aria-labelledby={TARGET_ID}>
          <Container>
            <Prose>
              {/*
                The heading is the claim itself. A design target stated as a
                heading and sourced underneath is harder to misread as a result
                a customer already gets than the same sentence in a card.
              */}
              <h2
                id={TARGET_ID}
                className="text-h2 text-accent-band-ink font-display font-semibold text-balance"
              >
                {content.target.claim}
              </h2>
              {/*
                D-66: the bound is not a footnote. A bare figure is the exact
                defect that decision was written to fix, so `bound` is required
                on the type and rendered immediately under the claim.
              */}
              <p className="text-body-lg text-accent-band-quiet mt-4">{content.target.bound}</p>
              <p className="text-caption text-accent-band-quiet mt-4 font-mono">
                {content.target.source}
              </p>
            </Prose>
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby={LIMITS_ID}>
        <Container>
          <Prose>
            <BlockHeading id={LIMITS_ID} heading={content.limits.heading} />
            <ul className="mt-6 space-y-4">
              {content.limits.items.map((item) => (
                <li
                  key={item}
                  className="text-body text-ink-muted border-line-control border-l-2 pl-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Prose>
        </Container>
      </Section>

      <Section tone="sunken" aria-labelledby={RELATED_ID}>
        <Container>
          <Prose>
            <BlockHeading id={RELATED_ID} heading={content.related.heading} />
          </Prose>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.related.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-body text-accent-text border-line flex min-h-[var(--spacing-touch)] items-center',
                    'rounded-lg border px-4 py-3 font-semibold',
                    'hover:border-line-control focus-visible:border-line-control',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCta content={content.cta} />
    </>
  )
}

/**
 * Eyebrow, heading, lede — the same three-part opening every block uses.
 *
 * It lives here rather than in `@ethanel/ui` because it encodes a page rule
 * (`h2`, always, because the hero owns the page's only `h1`) and not a design
 * primitive. `Eyebrow` is a `<p>`, which is what keeps the heading levels
 * unskipped.
 */
function BlockHeading({ id, heading }: { id: string; heading: SectionHeading }) {
  return (
    <>
      {heading.eyebrow ? <Eyebrow>{heading.eyebrow}</Eyebrow> : null}
      <h2 id={id} className="text-h2 text-ink font-display mt-3 font-semibold text-balance">
        {heading.title}
      </h2>
      {heading.lede ? <p className="text-body-lg text-ink-muted mt-4">{heading.lede}</p> : null}
    </>
  )
}
