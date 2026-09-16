import { notFound } from 'next/navigation'
import { Button, Card, Container, Eyebrow, Prose, Section } from '@ethanel/ui'
import { computePairs, loadThemeColours } from '@ethanel/ui/contrast'

import { AvailabilityBadge } from '../_components/availability-badge'
import { DemoDataBadge } from '../_components/demo-data-badge'
import { PlaceholderImage } from '../_components/placeholder-image'

/**
 * The development-only proof page: every token, type step, component state and
 * computed contrast pair on one screen.
 *
 * The contrast ratios are recomputed from `packages/ui/theme.css` at request
 * time by the same module the vitest uses, so what is printed here and what the
 * test asserts cannot disagree. Not in the sitemap, not rendered in production.
 */

const TYPE_STEPS = [
  'text-display',
  'text-h1',
  'text-h2',
  'text-h3',
  'text-h4',
  'text-body-lg',
  'text-body',
  'text-body-sm',
  'text-caption',
  'text-data',
] as const

const RAMP_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const
const SAND_STEPS = [
  '0',
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const

const VERDICT_COPY = {
  forbidden: 'Forbidden — under 3:1',
  'ui-only': 'UI boundaries only',
  'large-text': 'Large text and UI only',
  'body-text': 'Body text',
} as const

function Swatch({ css, label }: { css: string; label: string }) {
  return (
    <div className="border-line overflow-hidden rounded-md border">
      <div className="h-12" style={{ backgroundColor: css }} />
      <div className="text-caption text-ink-muted px-2 py-1">{label}</div>
    </div>
  )
}

function TypeRow({ label, className }: { label: string; className: string }) {
  return (
    <div className="border-line flex flex-col gap-1 border-b py-3 md:flex-row md:items-baseline md:gap-6">
      <span className="text-caption text-ink-quiet w-32 shrink-0 font-mono">{label}</span>
      <span className={className}>Rent collected and reconciled</span>
    </div>
  )
}

export default function KitchenSinkPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  const pairs = computePairs(loadThemeColours())

  return (
    <div className="bg-surface text-ink">
      <Section rhythm="tight">
        <Container>
          <Eyebrow>Development only</Eyebrow>
          <h1 className="text-display font-display mt-2 font-bold">Kitchen sink</h1>
          <Prose className="text-body-lg text-ink-muted mt-4">
            Every token in the system, on one page, in your current colour scheme. There is no
            manual toggle: switch your device between light and dark to see the semantic layer
            redefine itself.
          </Prose>
        </Container>
      </Section>

      {/* ---------------------------------------------------- contrast --- */}
      <Section tone="raised" rhythm="tight" aria-labelledby="pairs-heading">
        <Container>
          <h2 id="pairs-heading" className="text-h2 font-display font-semibold">
            Contrast pairs, recomputed
          </h2>
          <Prose className="text-body-sm text-ink-muted mt-2">
            Computed at request time from the token values in packages/ui/theme.css by the same
            module packages/ui/src/contrast.test.ts asserts against. The two rows that decide where
            a border colour may be used are at the bottom: a card border may be sand-200, a form
            control border may not.
          </Prose>
          <div className="mt-6 overflow-x-auto">
            <table className="text-body-sm w-full border-collapse text-left">
              <thead>
                <tr className="border-line text-caption text-ink-quiet border-b font-semibold tracking-wide uppercase">
                  <th className="py-2 pr-4">Pair</th>
                  <th className="py-2 pr-4">Sample</th>
                  <th className="py-2 pr-4">Ratio</th>
                  <th className="py-2 pr-4">Verdict</th>
                  <th className="py-2">Usage</th>
                </tr>
              </thead>
              <tbody>
                {pairs.map((pair) => (
                  <tr key={pair.name} className="border-line border-b align-top">
                    <td className="py-2 pr-4 whitespace-nowrap">{pair.name}</td>
                    <td className="py-2 pr-4">
                      <span
                        className="text-body-sm inline-block rounded-sm px-3 py-1 whitespace-nowrap"
                        style={{
                          backgroundColor: `var(--color-${pair.background})`,
                          color: `var(--color-${pair.foreground})`,
                        }}
                      >
                        Aa 12,500.00
                      </span>
                    </td>
                    <td className="text-data py-2 pr-4 whitespace-nowrap">
                      {pair.ratio.toFixed(2)}:1
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {pair.verdict === 'forbidden' ? (
                        <strong className="text-accent-text">{VERDICT_COPY.forbidden}</strong>
                      ) : (
                        VERDICT_COPY[pair.verdict]
                      )}
                    </td>
                    <td className="text-ink-muted py-2">{pair.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- type --- */}
      <Section rhythm="tight" aria-labelledby="type-heading">
        <Container>
          <h2 id="type-heading" className="text-h2 font-display font-semibold">
            Type scale
          </h2>
          <div className="mt-4">
            {TYPE_STEPS.map((step) => (
              <TypeRow key={step} label={step} className={step} />
            ))}
          </div>
          <Prose className="text-body-sm text-ink-muted mt-4">
            Built for data density: the rent roll lives in text-data (tabular numerals),
            text-body-sm and text-caption; display exists for marketing surfaces and is the outlier.
            Display tracks −0.035em at a 1.02 line height; headings track −0.022em; body runs 1.62.
          </Prose>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card>
              <p className="font-display text-h4 font-bold">Schibsted Grotesk 700</p>
              <p className="text-caption text-ink-quiet mt-1">--font-display — headings only</p>
            </Card>
            <Card>
              <p className="text-h4 font-sans">Public Sans 400 / 600</p>
              <p className="text-caption text-ink-quiet mt-1">--font-sans — body and UI</p>
            </Card>
            <Card>
              <p className="text-h4 font-serif italic">Newsreader 300 italic</p>
              <p className="text-caption text-ink-quiet mt-1">--font-serif — pull quotes, asides</p>
            </Card>
            <Card>
              <p className="text-data font-mono">IBM Plex Mono 500 · KIL-U4 · 45,000.00</p>
              <p className="text-caption text-ink-quiet mt-1">--font-mono — codes and references</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- palette --- */}
      <Section tone="raised" rhythm="tight" aria-labelledby="palette-heading">
        <Container>
          <h2 id="palette-heading" className="text-h2 font-display font-semibold">
            Palette
          </h2>
          <div className="mt-4 space-y-8">
            <div>
              <h3 className="text-h4 font-semibold">Brand green</h3>
              <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-10">
                {RAMP_STEPS.map((step) => (
                  <Swatch key={step} css={`var(--color-brand-${step})`} label={`brand-${step}`} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4 font-semibold">Ochre accent</h3>
              <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-10">
                {RAMP_STEPS.map((step) => (
                  <Swatch key={step} css={`var(--color-accent-${step})`} label={`accent-${step}`} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4 font-semibold">Sand neutrals</h3>
              <div className="mt-2 grid grid-cols-6 gap-2 sm:grid-cols-12">
                {SAND_STEPS.map((step) => (
                  <Swatch key={step} css={`var(--color-sand-${step})`} label={`sand-${step}`} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4 font-semibold">Semantic layer</h3>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
                <Swatch css="var(--surface)" label="surface" />
                <Swatch css="var(--surface-raised)" label="surface-raised" />
                <Swatch css="var(--surface-sunken)" label="surface-sunken" />
                <Swatch css="var(--line)" label="line" />
                <Swatch css="var(--line-control)" label="line-control" />
                <Swatch css="var(--cta-fill)" label="cta-fill" />
                <Swatch css="var(--accent-band)" label="accent-band" />
                <Swatch css="var(--focus)" label="focus" />
              </div>
              <p className="text-caption text-ink-quiet mt-2">
                These resolve through the indirection layer; check them in both colour schemes. Dark
                mode is a redefinition of these eight, not a second palette.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- components --- */}
      <Section rhythm="tight" aria-labelledby="components-heading">
        <Container>
          <h2 id="components-heading" className="text-h2 font-display font-semibold">
            Component states
          </h2>

          <h3 className="text-h4 mt-6 font-semibold">Buttons (44×44 touch floor)</h3>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Button variant="primary">Request a demo</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="quiet">Quiet</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <a
              href="#components-heading"
              className="text-body-sm text-accent-text inline-flex min-h-[var(--spacing-touch)] items-center font-semibold underline underline-offset-4"
            >
              Ochre link (tab to see the focus ring)
            </a>
          </div>
          <p className="text-caption text-ink-quiet mt-2">
            Only the primary variant carries data-cta=&quot;primary&quot;, which is what acceptance
            row 5 counts. A section cannot set that attribute itself.
          </p>

          <h3 className="text-h4 mt-8 font-semibold">Form field</h3>
          <div className="mt-2 max-w-sm">
            <label htmlFor="sink-field" className="text-body-sm font-semibold">
              Account reference
            </label>
            <input
              id="sink-field"
              type="text"
              placeholder="KIL-U4"
              aria-describedby="sink-field-hint"
              className="border-line-control bg-surface text-body placeholder:text-ink-quiet mt-1 min-h-[var(--spacing-touch)] w-full rounded-md border px-3"
            />
            <p id="sink-field-hint" className="text-caption text-ink-muted mt-1">
              The border is line-control (sand-500, 5.12:1), never the sand-200 used on cards — a
              control boundary has to clear 3:1.
            </p>
          </div>

          <h3 className="text-h4 mt-8 font-semibold">Availability and demo-data badges</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <AvailabilityBadge availability="available" />
            <AvailabilityBadge availability="sprint" sprint="Sprint 011" />
            <AvailabilityBadge availability="may-not-ship" sprint="Sprint 012" />
            <DemoDataBadge label="Demo data" />
          </div>

          <h3 className="text-h4 mt-8 font-semibold">
            Data table (the density the rent roll gets)
          </h3>
          <div className="border-line mt-2 overflow-x-auto rounded-lg border">
            <table className="text-body-sm w-full text-left">
              <caption className="sr-only">
                Sample statement rows rendered at the data-density steps
              </caption>
              <thead>
                <tr className="border-line bg-surface-sunken text-caption text-ink-quiet border-b font-semibold tracking-wide uppercase">
                  <th className="px-3 py-2">Unit</th>
                  <th className="px-3 py-2">Invoice</th>
                  <th className="px-3 py-2 text-right">Amount (KES)</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['KIL-U4', 'INV-0041', '45,000.00', 'Allocated'],
                  ['KIL-U5', 'INV-0042', '45,000.00', 'Open'],
                  ['KIL-U6', 'INV-0043', '12,000.00', 'Suspense'],
                ].map(([unit, invoice, amount, status]) => (
                  <tr key={invoice} className="border-line border-b last:border-0">
                    <td className="px-3 py-2 font-mono">{unit}</td>
                    <td className="px-3 py-2 font-mono">{invoice}</td>
                    <td className="text-data px-3 py-2 text-right">{amount}</td>
                    <td className="px-3 py-2">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-caption text-ink-quiet mt-2">
            Seeded demo rows, not customer data. Money renders at text-data with tabular numerals so
            columns align without a fixed width.
          </p>
        </Container>
      </Section>

      {/* -------------------------------------------------------- band --- */}
      <Section tone="inverted" rhythm="tight" aria-labelledby="band-heading">
        <Container>
          <h2 id="band-heading" className="text-h2 font-display font-semibold">
            The inverted band
          </h2>
          <Prose className="text-body-lg mt-3 opacity-95">
            White on brand-900 is 16.36:1 and it is the one inversion the system allows. The accent
            inside it is accent-300 at 9.72:1, never accent-500. The landing page may carry at most
            two of these; a third is a Playwright failure, not a style note.
          </Prose>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="inverted">Inverted button</Button>
            <span className="text-accent-band-quiet text-body-sm inline-flex items-center font-semibold">
              accent-300 on brand-900 — 9.72:1
            </span>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------ placeholders --- */}
      <Section rhythm="tight" aria-labelledby="assets-heading">
        <Container>
          <h2 id="assets-heading" className="text-h2 font-display font-semibold">
            Image placeholders (DEBT-10)
          </h2>
          <Prose className="text-body-sm text-ink-muted mt-2">
            No photography exists. Every slot reserves the real frame&apos;s aspect ratio and names
            the shot it owes, so nothing reflows when the shoot lands and the brief is visible to
            whoever has to commission it.
          </Prose>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <PlaceholderImage id="hero-portrait" />
            <PlaceholderImage id="find-map" />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ motion --- */}
      <Section tone="raised" rhythm="tight" aria-labelledby="motion-heading">
        <Container>
          <h2 id="motion-heading" className="text-h2 font-display font-semibold">
            Motion
          </h2>
          <Prose className="text-body-sm text-ink-muted mt-2">
            Hover or focus the card: a 120ms colour transition only, no transform. Under
            prefers-reduced-motion: reduce, every transition and animation in the system collapses
            to instant.
          </Prose>
          <div className="border-line bg-surface hover:bg-surface-sunken mt-4 max-w-sm rounded-lg border p-4 transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out-soft)]">
            <p className="text-body-sm">Hover card</p>
          </div>
          <p className="text-caption text-ink-quiet mt-8">
            Excluded from the sitemap by the route manifest and rendered only outside production.
            Delete nothing here: Sprint 003 inherits this scale.
          </p>
        </Container>
      </Section>
    </div>
  )
}
