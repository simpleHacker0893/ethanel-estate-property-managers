import Link from 'next/link'
import { Container } from '@ethanel/ui'

import type { ProofBarContent } from '../../../content/marketing/types'

/**
 * S3, and the single most tempting place on the site to invent something.
 *
 * D-68 is explicit: no customer, no logo, no testimonial, no rating, no
 * units-under-management figure. There are no pilot partners yet, so there is
 * no proof of the kind a proof bar usually carries — and a row of grey
 * rectangles captioned "trusted by leading agencies" is exactly the thing that
 * makes a sceptical reader close the tab.
 *
 * So the bar ships in its `pending` state: it says what it will carry, and in
 * the meantime it carries the only proof that exists — engineering targets the
 * platform holds itself to, each with the bound that makes it true, each linked
 * to /security where the bound is written out. That is a weaker claim than a
 * logo wall and a more credible one.
 *
 * Every number here is D-40, D-41, D-39-as-bounded-by-D-66 or D-45. There is no
 * fifth number, and the content module is where they are written; this
 * component renders whatever it is handed and invents nothing.
 */
export function ProofBar({ content }: { content: ProofBarContent }) {
  return (
    <section aria-labelledby="proof-heading" className="border-line bg-surface-raised border-y">
      <Container className="py-8 md:py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h2 id="proof-heading" className="text-h4 text-ink">
            {content.title}
          </h2>
          <p className="text-body-sm text-ink-muted">
            {content.pendingNote}{' '}
            <Link href={content.href} className="text-accent-text font-semibold underline">
              {content.hrefLabel}
            </Link>
          </p>
        </div>

        <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.targets.map((target) => (
            <li key={target.claim}>
              <p className="text-h3 text-ink font-display font-semibold">{target.claim}</p>
              <p className="text-body-sm text-ink-muted mt-1">{target.bound}</p>
              <p className="text-caption text-ink-quiet mt-1.5 font-mono">{target.source}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
