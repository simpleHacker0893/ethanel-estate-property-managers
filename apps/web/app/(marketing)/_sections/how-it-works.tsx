import { Card, Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import type { HowItWorksContent } from '../../../content/marketing/types'

/**
 * S5 — how it works, and the reconciliation order rendered as an ordered list
 * because it is one.
 *
 * `reconciliationOrder` carries its own `order` number, so the list renders
 * what the data says rather than what the DOM happens to count. If a future
 * edit reorders the array, the numbers on screen change with it and the
 * mismatch is visible instead of silent — the order is a domain fact (DOMAIN.md
 * §4), not a layout decision this component gets to make.
 *
 * `source` under a step is the trace back to the decision the step states, and
 * it renders in the mono caption style for the same reason the proof bar's
 * does: it is a citation, and it should look like one rather than like a claim.
 *
 * No prose here. The suspense note — the sentence that keeps an unmatched
 * payment inside the ledger rather than outside it — is a content field, so a
 * legal or domain correction to it never touches this file.
 */
export function HowItWorks({ content }: { content: HowItWorksContent }) {
  const { heading, steps, reconciliationOrder, suspenseNote } = content

  return (
    <Section aria-labelledby="how-it-works-heading">
      <Container>
        <Prose>
          {heading.eyebrow ? <Eyebrow>{heading.eyebrow}</Eyebrow> : null}
          <h2
            id="how-it-works-heading"
            className="text-h2 text-ink font-display mt-3 font-semibold"
          >
            {heading.title}
          </h2>
          {heading.lede ? <p className="text-body-lg text-ink-muted mt-4">{heading.lede}</p> : null}
        </Prose>

        <ol className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="border-line border-t pt-4">
              <p className="text-data text-ink-quiet font-semibold">{index + 1}</p>
              <h3 className="text-h4 text-ink font-display mt-1 font-semibold">{step.title}</h3>
              <p className="text-body-sm text-ink-muted mt-2">{step.body}</p>
              {step.source ? (
                <p className="text-caption text-ink-quiet mt-3 font-mono">{step.source}</p>
              ) : null}
            </li>
          ))}
        </ol>

        <Card className="mt-10 md:mt-12">
          <ol className="grid gap-5 sm:grid-cols-2">
            {reconciliationOrder.map((step) => (
              <li key={step.order} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="bg-accent-quiet text-cta-ink text-data flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold"
                >
                  {step.order}
                </span>
                <div>
                  <p className="text-body text-ink font-semibold">{step.label}</p>
                  <p className="text-body-sm text-ink-muted mt-1">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="text-body-sm text-ink-muted border-line mt-6 border-t pt-5">
            {suspenseNote}
          </p>
        </Card>
      </Container>
    </Section>
  )
}
