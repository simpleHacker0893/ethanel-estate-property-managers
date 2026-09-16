import Link from 'next/link'
import { Card, Container, Eyebrow, Prose, Section, buttonClassName } from '@ethanel/ui'

import type { BandContent } from '../../../content/marketing/types'
import { AvailabilityBadge } from '../_components/availability-badge'

/**
 * S11 — the marketplace band. Listings, storefronts, viewings, search.
 *
 * Every point is Sprint 011 and every point says so on its own badge, and the
 * band repeats it once more in its `availabilityNote`, because a badge inside
 * a card is easy to scroll past and a line under the heading is not.
 *
 * There is no map. D-26 rules a map library out on `/`, and a map here would
 * be decoration: it would spend the whole first-party JS budget to show
 * listings that do not exist yet.
 *
 * The call to action is `quiet`, never `primary` — acceptance row 5 counts one
 * primary call to action per 844px of scroll and those belong to the hero and
 * the closing band, not to a section describing unshipped work.
 */

const HEADING_ID = 'marketplace-band-heading'

export function MarketplaceBand({ content }: { content: BandContent }) {
  return (
    <Section tone="default" aria-labelledby={HEADING_ID}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div>
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
              <p className="border-line-control text-body-sm text-ink mt-6 border-l-2 pl-4">
                {content.availabilityNote}
              </p>
            </Prose>

            <Link href={content.cta.href} className={buttonClassName('quiet', 'md', 'mt-6')}>
              {content.cta.label}
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
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
        </div>
      </Container>
    </Section>
  )
}
