import { Card, Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import type { ProblemContent } from '../../../content/marketing/types'

/**
 * S4 — the problem.
 *
 * Every word on screen arrives in `content`; this file renders a shape. The
 * lint rule on `_sections/**` rejects a run of six literal words in JSX and any
 * string literal over thirty characters, which is what keeps a copy edit in
 * `content/marketing/` where the content-truth vitest can read it.
 *
 * The pains are laid out as statements in the reader's own voice with the
 * platform's answer beneath, separated by a rule rather than by a label —
 * a label would be copy, and copy does not live here. They are deliberately
 * not attributed to anyone: there are no pilot partners yet, and a card that
 * looked like a named testimonial would be the invented business fact D-68
 * exists to prevent.
 */
export function Problem({ content }: { content: ProblemContent }) {
  const { heading, pains } = content

  return (
    <Section tone="sunken" aria-labelledby="problem-heading">
      <Container>
        <Prose>
          {heading.eyebrow ? <Eyebrow>{heading.eyebrow}</Eyebrow> : null}
          <h2 id="problem-heading" className="text-h2 text-ink font-display mt-3 font-semibold">
            {heading.title}
          </h2>
          {heading.lede ? <p className="text-body-lg text-ink-muted mt-4">{heading.lede}</p> : null}
        </Prose>

        <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
          {pains.map((pain) => (
            <li key={pain.symptom} className="h-full">
              <Card className="flex h-full flex-col gap-4">
                <p className="text-body-lg text-ink font-display">{pain.symptom}</p>
                <p className="text-body-sm text-ink-muted border-line mt-auto border-t pt-4">
                  {pain.response}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
