import Link from 'next/link'
import { Card, Container, Eyebrow, Prose, Section, cn, type SectionTone } from '@ethanel/ui'

import type { DeepDiveContent } from '../../../content/marketing/types'

/**
 * S7, S8 and S9 — the three deep dives.
 *
 * This file renders and contains no copy: every string on screen arrives
 * through `content/marketing/home/deep-dives.ts`, which is what acceptance row
 * 12 and the `_sections` lint rule are for. The only literals here are the
 * three table column headers, which are labels rather than prose.
 *
 * Tones are pinned here rather than passed in, because the landing page may
 * carry at most two `brand-900` bands and a Playwright assertion counts them.
 * Pinning them makes the budget countable by reading this function: custody and
 * reconciliation are inverted, the chart of accounts is not. The accounts table
 * is the reason for that split — nine rows of small mono text belong on a light
 * surface, and it is the one block on the page a reader will screenshot.
 *
 * No primary call-to-action marker is set anywhere in this file. These dives
 * close with a plain link, so the one-primary-per-viewport count of acceptance
 * row 5 stays owned by the slices that place the real calls to action.
 */

const CUSTODY_ID = 'deep-dive-custody'
const LEDGER_ID = 'deep-dive-ledger'
const RECONCILIATION_ID = 'deep-dive-reconciliation'

export function DeepDives({
  content,
}: {
  content: [DeepDiveContent, DeepDiveContent, DeepDiveContent]
}) {
  const [custody, ledger, reconciliation] = content

  return (
    <>
      <DeepDive id={CUSTODY_ID} tone="inverted" content={custody} />
      <DeepDive id={LEDGER_ID} tone="raised" content={ledger} />
      <DeepDive id={RECONCILIATION_ID} tone="inverted" content={reconciliation} />
    </>
  )
}

function DeepDive({
  id,
  tone,
  content,
}: {
  id: string
  tone: SectionTone
  content: DeepDiveContent
}) {
  // Inside a brand-900 band the accent step is the quiet one (accent-300), and
  // never the call-to-action fill, which is 2.67:1 on white and carries white
  // text at the same ratio. The two band tokens are the only colours in here.
  const inverted = tone === 'inverted'

  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container>
        <Prose>
          {content.heading.eyebrow ? (
            <Eyebrow className={inverted ? 'text-accent-band-quiet' : undefined}>
              {content.heading.eyebrow}
            </Eyebrow>
          ) : null}

          <h2
            id={id}
            className={cn(
              'text-h2 font-display mt-3 font-semibold text-balance',
              inverted ? 'text-accent-band-ink' : 'text-ink',
            )}
          >
            {content.heading.title}
          </h2>

          {content.heading.lede ? (
            <p
              className={cn(
                'text-body-lg mt-4',
                inverted ? 'text-accent-band-quiet' : 'text-ink-muted',
              )}
            >
              {content.heading.lede}
            </p>
          ) : null}

          <div className="mt-6 space-y-4">
            {content.body.map((paragraph) => (
              <p
                key={paragraph}
                className={cn('text-body', inverted ? 'text-accent-band-ink' : 'text-ink-muted')}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Prose>

        {content.accounts ? (
          <AccountsTable accounts={content.accounts} inverted={inverted} />
        ) : null}

        {content.target ? (
          <Card
            className={cn(
              'mt-10 max-w-[var(--measure)]',
              inverted && 'border-accent-band-quiet bg-transparent',
            )}
          >
            <p
              className={cn(
                'text-h3 font-display font-semibold',
                inverted ? 'text-accent-band-quiet' : 'text-ink',
              )}
            >
              {content.target.claim}
            </p>
            <p
              className={cn(
                'text-body-sm mt-2',
                inverted ? 'text-accent-band-ink' : 'text-ink-muted',
              )}
            >
              {content.target.bound}
            </p>
            <p
              className={cn(
                'text-caption mt-2 font-mono',
                inverted ? 'text-accent-band-quiet' : 'text-ink-quiet',
              )}
            >
              {content.target.source}
            </p>
          </Card>
        ) : null}

        {content.cta ? (
          <p className="mt-8">
            <Link
              href={content.cta.href}
              className={cn(
                'text-body-sm inline-flex min-h-[var(--spacing-touch)] items-center font-semibold underline underline-offset-4',
                inverted ? 'text-accent-band-quiet' : 'text-accent-text',
              )}
            >
              {content.cta.label}
            </Link>
          </p>
        ) : null}
      </Container>
    </Section>
  )
}

/**
 * The chart of accounts, rendered as a table because that is what it is. The
 * account name is the row header and renders in `font-mono` / `text-data`, the
 * tabular step the rent roll uses for every money cell.
 *
 * The rows come from the content module and are never derived here: adding a
 * tenth account has to be a decision recorded in the pack, not a line someone
 * adds to a component.
 */
function AccountsTable({
  accounts,
  inverted,
}: {
  accounts: NonNullable<DeepDiveContent['accounts']>
  inverted: boolean
}) {
  const head = cn(
    'text-caption pb-2 pr-4 font-semibold tracking-wide uppercase',
    inverted ? 'text-accent-band-quiet' : 'text-ink-quiet',
  )
  const rule = inverted ? 'border-accent-band-quiet/40' : 'border-line'

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full border-collapse text-left align-top">
        <thead>
          <tr className={cn('border-b', rule)}>
            <th scope="col" className={head}>
              Account
            </th>
            <th scope="col" className={head}>
              Type
            </th>
            <th scope="col" className={head}>
              What it holds
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((row) => (
            <tr key={row.account} className={cn('border-b align-top last:border-b-0', rule)}>
              <th
                scope="row"
                className={cn(
                  'text-data py-3 pr-4 font-mono font-normal',
                  inverted ? 'text-accent-band-ink' : 'text-ink',
                )}
              >
                {row.account}
              </th>
              <td
                className={cn(
                  'text-body-sm py-3 pr-4',
                  inverted ? 'text-accent-band-quiet' : 'text-ink-muted',
                )}
              >
                {row.type}
              </td>
              <td
                className={cn(
                  'text-body-sm py-3',
                  inverted ? 'text-accent-band-ink' : 'text-ink-muted',
                )}
              >
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
