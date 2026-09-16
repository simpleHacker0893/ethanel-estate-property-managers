import Link from 'next/link'
import { Card, Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import { FinalCta } from './final-cta'
import type {
  PageBlock,
  SectionHeading,
  StandardPageContent,
} from '../../../content/marketing/types'

/**
 * Every page on the site that is not the landing page, the demo path or a
 * feature page — sixteen of them — drawn from one template.
 *
 * Same argument as the feature template: a page that can only say what the
 * block vocabulary can express is a page that cannot quietly grow a testimonial
 * or a price. The blocks alternate tone by position rather than by choice, so a
 * content module cannot spend an inverted band, and the "at most one inverted
 * band" assertion holds without the copy having to know about it.
 *
 * No prose lives here. Every visible string arrives through `content`.
 */

const HERO_ID = 'page-hero-heading'

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

function Block({ block, index }: { block: PageBlock; index: number }) {
  const id = `page-block-${String(index)}`
  // Alternating rhythm, decided by position. A content module has no say in it.
  const tone = index % 2 === 0 ? 'sunken' : 'default'

  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container>
        <BlockHeading id={id} heading={block.heading} />

        {block.kind === 'prose' ? (
          <Prose className="mt-6">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink-muted mt-4">
                {paragraph}
              </p>
            ))}
          </Prose>
        ) : null}

        {block.kind === 'list' ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item) => (
              <li key={item.title}>
                <Card>
                  <h3 className="text-h4 text-ink font-display font-semibold">{item.title}</h3>
                  <p className="text-body-sm text-ink-muted mt-2">{item.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        ) : null}

        {block.kind === 'steps' ? (
          <ol className="mt-8 grid gap-4">
            {block.steps.map((step, stepIndex) => (
              <li key={step.title}>
                <Card>
                  <p className="text-caption text-ink-quiet font-mono">{stepIndex + 1}</p>
                  <h3 className="text-h4 text-ink font-display mt-1 font-semibold">{step.title}</h3>
                  <p className="text-body-sm text-ink-muted mt-1.5">{step.body}</p>
                  {step.source ? (
                    <p className="text-caption text-ink-quiet mt-2 font-mono">{step.source}</p>
                  ) : null}
                </Card>
              </li>
            ))}
          </ol>
        ) : null}

        {block.kind === 'facts' ? (
          <dl className="border-line mt-8 grid gap-0 border-t">
            {block.rows.map((row) => (
              <div
                key={row.label}
                className="border-line grid gap-1 border-b py-4 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="text-body-sm text-ink font-semibold">{row.label}</dt>
                <dd className="text-body-sm text-ink-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {block.links ? (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {block.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-sm text-accent-text inline-flex min-h-[var(--spacing-touch)] items-center font-semibold underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  )
}

export function StandardPage({ content }: { content: StandardPageContent }) {
  return (
    <>
      <Section tone="default" aria-labelledby={HERO_ID}>
        <Container>
          {/*
            The in-review banner sits above the h1, not in a footnote. A reader
            who needs the privacy notice is looking for a commitment, and the
            honest answer today is that an advocate has not reviewed one yet
            (DEBT-09, Q6). Saying that first costs nothing; saying it last reads
            as a disclaimer someone hoped would be missed.
          */}
          {content.banner ? (
            <p className="border-line bg-surface-sunken text-body-sm text-ink-muted mb-6 rounded-lg border px-4 py-3">
              {content.banner}
            </p>
          ) : null}

          {content.hero.eyebrow ? <Eyebrow>{content.hero.eyebrow}</Eyebrow> : null}
          <h1 id={HERO_ID} className="text-h1 text-ink font-display mt-3 font-bold text-balance">
            {content.hero.h1}
          </h1>
          <Prose className="text-body-lg text-ink-muted mt-4">{content.hero.lede}</Prose>
        </Container>
      </Section>

      {content.blocks.map((block, index) => (
        <Block key={block.heading.title} block={block} index={index} />
      ))}

      <FinalCta content={content.cta} />
    </>
  )
}
