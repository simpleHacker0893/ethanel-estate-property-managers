import { Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import type { RoleSwitcherContent } from '../../../content/marketing/types'
import { RoleSwitcher } from '../_components/role-switcher'

/**
 * S10. The server half of the role switcher: heading, lede and nothing else.
 *
 * Only the tablist and its panels are a client component, so the section's
 * copy ships as static HTML and the `'use client'` boundary stays as small as
 * the feature allows — every one of those is spent against the 150 KB
 * first-party JS budget on `/` (D-71).
 *
 * The <h2> id is handed to the tablist as its accessible name, which is why it
 * is a constant here rather than a literal in two files: a tablist needs a
 * label, and borrowing the heading avoids inventing a string of copy inside a
 * component, which is the thing criterion 12 forbids.
 */

const HEADING_ID = 'role-switcher-heading'

export function RoleSwitcherSection({ content }: { content: RoleSwitcherContent }) {
  return (
    <Section tone="raised" aria-labelledby={HEADING_ID}>
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

        <RoleSwitcher roles={content.roles} labelledBy={HEADING_ID} className="mt-8" />
      </Container>
    </Section>
  )
}
