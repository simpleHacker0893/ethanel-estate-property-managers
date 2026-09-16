import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, Container, Prose, Section } from '@ethanel/ui'

import { PlaceholderImage } from '../../_components/placeholder-image'
import { thanks } from '../../../../content/marketing/demo'

/**
 * `/demo/thanks`.
 *
 * Deliberately out of the sitemap (see the route manifest): a thank-you page a
 * crawler can reach is a thank-you page that gets counted as a conversion by
 * anyone measuring pageviews, which is how a conversion number becomes fiction.
 */
export const metadata: Metadata = {
  title: thanks.meta.title,
  description: thanks.meta.description,
  robots: { index: false, follow: false },
}

export default function ThanksPage() {
  return (
    <Section>
      <Container width="narrow">
        <h1 className="text-h1 font-display font-bold">{thanks.h1}</h1>
        <Prose className="text-body-lg text-ink-muted mt-3">{thanks.lede}</Prose>

        <ol className="mt-8 grid gap-4">
          {thanks.steps.map((step, index) => (
            <li key={step.title}>
              <Card>
                <p className="text-caption text-ink-quiet font-mono">{index + 1}</p>
                <h2 className="text-h4 mt-1 font-semibold">{step.title}</h2>
                <p className="text-body-sm text-ink-muted mt-1.5">{step.body}</p>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <PlaceholderImage id="demo-walkthrough" />
          <p className="text-caption text-ink-quiet mt-2">{thanks.walkthroughNote}</p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {thanks.next.map((link) => (
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
      </Container>
    </Section>
  )
}
