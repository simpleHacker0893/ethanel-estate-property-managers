import { Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import type { FaqContent, FaqItem } from '../../../content/marketing/types'

/**
 * S15 — the FAQ, and the page's structured data.
 *
 * Two decisions worth keeping.
 *
 * The accordion is native `<details>`/`<summary>`. The blueprint's dependency
 * policy is native platform first where it will do, and a disclosure is the
 * canonical case: the browser supplies the expanded state, the keyboard
 * behaviour and the accessible name for nothing, while an accordion library
 * would be the first real client JavaScript on a page whose budget is already
 * within ~14 KB of the framework floor (D-71). Nothing here is a client
 * component.
 *
 * The `FAQPage` JSON-LD is built from `content.items` rather than written by
 * hand. Hand-maintained structured data drifts from the visible copy — usually
 * within one copy edit — and the drift is invisible, because nobody reads the
 * script tag. Deriving it means a search engine cannot be shown an answer that
 * is not on the screen, which is the same honesty rule the rest of the site is
 * built on, applied to the machine-readable layer.
 */

const HEADING_ID = 'faq-heading'

function faqJsonLd(items: FaqItem[]): string {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
  // A literal `</script>` inside the payload would close the tag early. The
  // answers are plain text today, so this is belt and braces rather than a
  // live escape — and it stays correct when a future answer is not.
  return JSON.stringify(payload).replace(/</g, '\\u003c')
}

export function Faq({ content }: { content: FaqContent }) {
  return (
    <Section aria-labelledby={HEADING_ID}>
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

          <ul className="border-line mt-8 border-t">
            {content.items.map((item) => (
              <li key={item.question} className="border-line border-b">
                <details className="group">
                  <summary className="text-ink flex min-h-[var(--spacing-touch)] cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-body-lg font-display font-semibold">{item.question}</h3>
                    <Chevron />
                  </summary>
                  <p className="text-body text-ink-muted pb-5">{item.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </Prose>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(content.items) }}
      />
    </Section>
  )
}

/** Decorative, so it is hidden from assistive technology: `<summary>` already
 * announces its own expanded state. */
function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink-quiet h-5 w-5 shrink-0 transition-transform duration-[var(--motion-fast)] group-open:rotate-180 motion-reduce:transition-none"
    >
      <path d="M5 7.5 10 12.5 15 7.5" />
    </svg>
  )
}
