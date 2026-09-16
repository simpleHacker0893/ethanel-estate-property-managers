import Link from 'next/link'
import { Container, Eyebrow, Prose, Section, buttonClassName, ctaMarker } from '@ethanel/ui'

import type { FinalCtaContent } from '../../../content/marketing/types'

/**
 * S16 — the closing band, and the one primary call to action in this slice.
 *
 * The tone is `raised` rather than `inverted`. The landing page may carry at
 * most two `brand-900` bands, a Playwright assertion counts them, and both are
 * spent on the deep dives — so the closing band earns its separation from the
 * surface above it with elevation instead of colour.
 *
 * `ctaMarker('primary')` sets the `data-cta="primary"` attribute that
 * acceptance row 5 counts. It is applied here and nowhere else in this slice:
 * security, pricing and the FAQ close with quiet links precisely so that this
 * one lands alone in its 844px step.
 *
 * The reassurance line sits below the call to action rather than above it. A
 * reader who has already decided does not need it; a reader who has not is
 * looking for the catch, and the catch is the sentence that says what happens
 * if the books disagree.
 */

const HEADING_ID = 'final-cta-heading'

export function FinalCta({ content }: { content: FinalCtaContent }) {
  return (
    <Section tone="raised" aria-labelledby={HEADING_ID}>
      <Container>
        <Prose>
          {content.heading.eyebrow ? <Eyebrow>{content.heading.eyebrow}</Eyebrow> : null}

          <h2
            id={HEADING_ID}
            className="text-h2 text-ink font-display mt-3 font-semibold text-balance"
          >
            {content.heading.title}
          </h2>

          {content.heading.lede ? (
            <p className="text-body-lg text-ink-muted mt-4">{content.heading.lede}</p>
          ) : null}

          <p className="mt-8">
            <Link
              href={content.primaryCta.href}
              className={buttonClassName('primary', 'lg')}
              {...ctaMarker('primary')}
            >
              {content.primaryCta.label}
            </Link>
          </p>

          <p className="text-body-sm text-ink-muted border-line-control mt-6 border-l-2 pl-4">
            {content.reassurance}
          </p>
        </Prose>
      </Container>
    </Section>
  )
}
