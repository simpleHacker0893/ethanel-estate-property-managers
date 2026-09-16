import Link from 'next/link'
import { Card, Container, Eyebrow, Prose, Section, buttonClassName } from '@ethanel/ui'

import type { BandContent } from '../../../content/marketing/types'
import { AvailabilityBadge } from '../_components/availability-badge'

/**
 * S12 — the land band, and the most important honesty moment on the page.
 *
 * Every point is `may-not-ship` against Sprint 012, and Sprint 012 is the
 * designated slip absorber: if the sprints before it run long, this is the
 * work that gets cut. Somebody whose business is selling plots is exactly the
 * reader most likely to buy on this section, so the band's `availabilityNote`
 * is given the weight the marketplace band's does not get — its own boxed,
 * dashed-bordered callout in body size, echoing the dashed "Planned" badge, and
 * placed above the points rather than below them.
 *
 * The note is set in the content module and it does not say "coming soon".
 * That phrase converts an uncertainty into a promise without anybody having
 * decided to make one, which is the failure mode D-68 exists to prevent.
 *
 * The call to action is `quiet`, never `primary` (acceptance row 5), and the
 * band is `sunken` rather than `inverted` — the landing page's two brand-900
 * bands are spent elsewhere and a third is a test failure.
 */

const HEADING_ID = 'land-band-heading'

export function LandBand({ content }: { content: BandContent }) {
  return (
    <Section tone="sunken" aria-labelledby={HEADING_ID}>
      <Container>
        {content.heading.eyebrow ? <Eyebrow>{content.heading.eyebrow}</Eyebrow> : null}
        <h2 id={HEADING_ID} className="text-h2 font-display text-ink mt-2 font-semibold">
          {content.heading.title}
        </h2>
        {content.heading.lede ? (
          <Prose>
            <p className="text-body-lg text-ink-muted mt-3">{content.heading.lede}</p>
          </Prose>
        ) : null}

        <Prose>
          <p className="border-line-control bg-surface text-body text-ink mt-8 rounded-lg border border-dashed p-5">
            {content.availabilityNote}
          </p>
        </Prose>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.points.map((point) => (
            <li key={point.label}>
              <Card className="h-full">
                <AvailabilityBadge
                  availability={point.availability}
                  {...(point.sprint === undefined ? {} : { sprint: point.sprint })}
                />
                <p className="text-body text-ink mt-3 font-semibold">{point.label}</p>
                {point.description ? (
                  <p className="text-body-sm text-ink-muted mt-1.5">{point.description}</p>
                ) : null}
                <p className="text-caption text-ink-quiet mt-2 font-mono">{point.service}</p>
              </Card>
            </li>
          ))}
        </ul>

        <Link href={content.cta.href} className={buttonClassName('quiet', 'md', 'mt-8')}>
          {content.cta.label}
        </Link>
      </Container>
    </Section>
  )
}
