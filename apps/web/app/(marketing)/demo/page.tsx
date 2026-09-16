import type { Metadata } from 'next'
import { Container, Prose, Section } from '@ethanel/ui'

import { DemoForm } from '../_components/demo-form'
import { demo } from '../../../content/marketing/demo'
import { requestDemo } from './actions'

/**
 * `/demo` — the only page in the group with a write path behind it.
 *
 * A Server Component that renders the copy and hands the form its Server
 * Action as a prop, so the action's module never enters the client graph.
 */
export const metadata: Metadata = {
  title: demo.meta.title,
  description: demo.meta.description,
}

export default function DemoPage() {
  return (
    <Section>
      <Container width="narrow">
        <h1 className="text-h1 font-display font-bold">{demo.h1}</h1>
        <Prose className="text-body-lg text-ink-muted mt-3">{demo.lede}</Prose>
        <DemoForm content={demo} action={requestDemo} />
      </Container>
    </Section>
  )
}
