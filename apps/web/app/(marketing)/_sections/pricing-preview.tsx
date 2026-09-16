import Link from 'next/link'
import { Container, Eyebrow, Prose, Section, buttonClassName } from '@ethanel/ui'

import type { PricingPreviewContent } from '../../../content/marketing/types'

/**
 * S14 — the pricing preview.
 *
 * The notable thing about this component is what it cannot render: there is no
 * tier card, no figure slot and no "from" line, because Q7 is open and D-64
 * says ship the mechanism without the value. A layout with three empty price
 * cards would pull an invented number into existence within a week, so the
 * section is built to display a model and a path instead, and the marked gap
 * lives in the content module where the decision will be recorded.
 *
 * The call to action is the `quiet` variant. It leads to the same place as the
 * page's primary call to action, and two `data-cta="primary"` elements within
 * one 844px scroll step is an acceptance-row-5 failure.
 */

const HEADING_ID = 'pricing-preview-heading'

export function PricingPreview({ content }: { content: PricingPreviewContent }) {
  return (
    <Section tone="sunken" aria-labelledby={HEADING_ID}>
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

          <ul className="mt-8 space-y-4">
            {content.model.map((line) => (
              <li key={line} className="text-body text-ink flex gap-3">
                <span
                  aria-hidden="true"
                  className="bg-accent-quiet mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="border-line-control text-body-sm text-ink-muted mt-8 border-l-2 pl-4">
            {content.note}
          </p>

          <p className="mt-8">
            <Link href={content.cta.href} className={buttonClassName('quiet', 'lg')}>
              {content.cta.label}
            </Link>
          </p>
        </Prose>
      </Container>
    </Section>
  )
}
