import Link from 'next/link'
import { buttonClassName, Card, Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import { FEATURE_SLUGS } from '../../../content/marketing/routes'
import type { Capability, FeatureGridContent } from '../../../content/marketing/types'
import { AvailabilityBadge } from '../_components/availability-badge'

/**
 * S6 — the capability grid.
 *
 * THE HREF IS DERIVED BY INDEX. `Capability` has no href field — it carries a
 * label, a service and an availability, and widening it so that one section
 * could hold a link would put routing data in the type every feature page and
 * every band also uses. So the grid pairs `content.capabilities[i]` with
 * `FEATURE_SLUGS[i]`, and `content/marketing/home/feature-grid.ts` states in
 * its header that its ten entries are in `FEATURE_SLUGS` order for exactly this
 * reason. `routes.ts` is the single source for the slugs, so the link crawl
 * (acceptance row 1) walks the same list the cards link to and a card cannot
 * point at a page that does not exist.
 *
 * A capability past the end of `FEATURE_SLUGS` renders as a plain card rather
 * than a broken link: the failure mode of adding an eleventh capability is a
 * card with no link, which is visible, rather than a 404, which is not.
 *
 * The heading link text is the capability's label, so a screen-reader user
 * listing the links on the page hears ten distinct destinations rather than ten
 * copies of the same generic phrase.
 */

function CapabilityBadge({ capability }: { capability: Capability }) {
  // `exactOptionalPropertyTypes`: the badge's `sprint` prop is optional, so it
  // is passed or omitted, never handed an explicit undefined.
  return capability.sprint ? (
    <AvailabilityBadge availability={capability.availability} sprint={capability.sprint} />
  ) : (
    <AvailabilityBadge availability={capability.availability} />
  )
}

export function FeatureGrid({ content }: { content: FeatureGridContent }) {
  const { heading, capabilities, cta } = content

  return (
    <Section tone="raised" aria-labelledby="feature-grid-heading">
      <Container>
        <Prose>
          {heading.eyebrow ? <Eyebrow>{heading.eyebrow}</Eyebrow> : null}
          <h2
            id="feature-grid-heading"
            className="text-h2 text-ink font-display mt-3 font-semibold"
          >
            {heading.title}
          </h2>
          {heading.lede ? <p className="text-body-lg text-ink-muted mt-4">{heading.lede}</p> : null}
        </Prose>

        <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => {
            const slug = FEATURE_SLUGS[index]
            return (
              <li key={capability.label} className="h-full">
                <Card className="flex h-full flex-col gap-3">
                  <h3 className="text-h4 text-ink font-display font-semibold">
                    {slug ? (
                      <Link
                        href={`/features/${slug}`}
                        className="hover:text-accent-text focus-visible:text-accent-text"
                      >
                        {capability.label}
                      </Link>
                    ) : (
                      capability.label
                    )}
                  </h3>

                  {capability.description ? (
                    <p className="text-body-sm text-ink-muted">{capability.description}</p>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                    <CapabilityBadge capability={capability} />
                    <span className="text-caption text-ink-quiet font-mono">
                      {capability.service}
                    </span>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>

        <div className="mt-10">
          <Link href={cta.href} className={buttonClassName('quiet', 'lg')}>
            {cta.label}
          </Link>
        </div>
      </Container>
    </Section>
  )
}
