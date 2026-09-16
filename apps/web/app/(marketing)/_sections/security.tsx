import Link from 'next/link'
import { Card, Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import type { SecurityContent } from '../../../content/marketing/types'

/**
 * S13 — security and trust.
 *
 * Renders only. Every string on screen arrives from
 * `content/marketing/home/security.ts`, where the commitment tense and the four
 * publishable numbers are written and where the content-truth test can see
 * them. There is no badge row here and no certification mark, because Ethanel
 * holds neither a SOC 2 report nor an ISO 27001 certificate and a section that
 * looks like a compliance page invites the reader to assume one.
 *
 * `bound` is rendered next to every `claim` and is not collapsible, hidden
 * behind a tooltip or set in a smaller grey than the reader will actually read.
 * D-66 exists because a number separated from its denominator is how "95% of
 * payments matched" becomes a promise nobody made; putting the bound behind an
 * interaction would reintroduce exactly that defect through the layout.
 *
 * The call to action is a plain underlined link. Acceptance row 5 counts
 * primary calls to action per 844px scroll step, and this slice spends its one
 * primary on the final band.
 */

const HEADING_ID = 'security-heading'

export function Security({ content }: { content: SecurityContent }) {
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
        </Prose>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.commitments.map((commitment) => (
            <li key={commitment.title}>
              <Card className="h-full">
                <h3 className="text-h4 text-ink font-display font-semibold">{commitment.title}</h3>
                <p className="text-body-sm text-ink-muted mt-2">{commitment.body}</p>
              </Card>
            </li>
          ))}
        </ul>

        <div className="border-line mt-10 border-t pt-8">
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.targets.map((target) => (
              <li key={target.source}>
                <p className="text-body text-ink font-display font-semibold">{target.claim}</p>
                <p className="text-body-sm text-ink-muted mt-1">{target.bound}</p>
                <p className="text-caption text-ink-quiet mt-1.5 font-mono">{target.source}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <Link
              href={content.cta.href}
              className="text-accent-text text-body-sm inline-flex min-h-[var(--spacing-touch)] items-center font-semibold underline underline-offset-4"
            >
              {content.cta.label}
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  )
}
