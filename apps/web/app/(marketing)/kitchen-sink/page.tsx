import { notFound } from 'next/navigation'
import { loadThemeColours, ochrePairs } from './contrast'

// Development-only proof page (ticket 02): every token, type style and
// component state on one screen, with the ochre contrast ratios computed from
// theme.css at request time. Not in the sitemap, not rendered in production.

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

const BRAND_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const
const NEUTRAL_STEPS = [
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

function Swatch({ css, label }: { css: string; label: string }) {
  return (
    <div className="border-line overflow-hidden rounded-md border">
      <div className="h-12" style={{ backgroundColor: css }} />
      <div className="text-caption text-ink-muted px-2 py-1">{label}</div>
    </div>
  )
}

function Step({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex items-baseline gap-4 py-2">
      <span className="text-caption text-ink-muted w-28 shrink-0">{label}</span>
      <span className={className}>Rent collected and reconciled</span>
    </div>
  )
}

export default function KitchenSinkPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  const pairs = ochrePairs(loadThemeColours())

  return (
    <main className="bg-surface text-ink min-h-dvh px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-14">
        <header>
          <p className="text-caption text-ink-muted tracking-wide uppercase">Development only</p>
          <h1 className="text-h1">Kitchen sink</h1>
          <p className="text-body text-ink-muted mt-2 max-w-prose">
            Every token in the system, on one page, in your current colour scheme. There is no
            manual toggle: switch your device or emulator between light and dark to see the semantic
            layer redefine itself.
          </p>
        </header>

        {/* ------------------------------------------------ ochre pairs --- */}
        <section aria-labelledby="pairs-heading">
          <h2 id="pairs-heading" className="text-h2">
            Ochre contrast pairs
          </h2>
          <p className="text-body-sm text-ink-muted mt-2 max-w-prose">
            Computed at request time from the token values in packages/ui/theme.css. Ochre is never
            text on white and never carries white text; the CTA pair is fixed at 6.12:1.
          </p>
          <table className="text-body-sm mt-4 w-full border-collapse text-left">
            <thead>
              <tr className="border-line text-caption text-ink-muted border-b tracking-wide uppercase">
                <th className="py-2 pr-4 font-medium">Pair</th>
                <th className="py-2 pr-4 font-medium">Sample</th>
                <th className="py-2 pr-4 font-medium">Computed ratio</th>
                <th className="py-2 pr-4 font-medium">Verdict</th>
                <th className="py-2 font-medium">Usage</th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair) => (
                <tr key={pair.name} className="border-line border-b">
                  <td className="py-2 pr-4">{pair.name}</td>
                  <td className="py-2 pr-4">
                    <span
                      className="text-body-sm inline-block rounded-sm px-3 py-1"
                      style={{
                        backgroundColor: `var(--color-${pair.background})`,
                        color: `var(--color-${pair.foreground})`,
                      }}
                    >
                      Aa 12,500.00
                    </span>
                  </td>
                  <td className="text-data py-2 pr-4">{pair.ratio.toFixed(2)}:1</td>
                  <td
                    className={`py-2 pr-4 ${
                      pair.ratio >= 3 ? 'text-ink' : 'text-brand-700 font-medium'
                    }`}
                  >
                    {pair.verdict}
                  </td>
                  <td className="text-ink-muted py-2">{pair.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* -------------------------------------------------- type scale --- */}
        <section aria-labelledby="type-heading">
          <h2 id="type-heading" className="text-h2">
            Type scale
          </h2>
          <div className="mt-4">
            {TYPE_STEPS.map((step) => (
              <Step key={step} label={step} className={step} />
            ))}
          </div>
          <p className="text-body-sm text-ink-muted mt-4 max-w-prose">
            Built for data density: the rent roll lives in text-data (tabular numerals),
            text-body-sm and text-caption; display exists for marketing surfaces.
          </p>
        </section>

        {/* ---------------------------------------------------- palette --- */}
        <section aria-labelledby="palette-heading">
          <h2 id="palette-heading" className="text-h2">
            Palette
          </h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-h4">Brand green</h3>
              <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-10">
                {BRAND_STEPS.map((step) => (
                  <Swatch key={step} css={`var(--color-brand-${step})`} label={`brand-${step}`} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4">Ochre</h3>
              <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-10">
                {BRAND_STEPS.map((step) => (
                  <Swatch key={step} css={`var(--color-ochre-${step})`} label={`ochre-${step}`} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4">Warm neutrals</h3>
              <div className="mt-2 grid grid-cols-6 gap-2 sm:grid-cols-12">
                {NEUTRAL_STEPS.map((step) => (
                  <Swatch
                    key={step}
                    css={`var(--color-neutral-${step})`}
                    label={`neutral-${step}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4">Semantic</h3>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
                <Swatch css="var(--surface)" label="surface" />
                <Swatch css="var(--surface-raised)" label="surface-raised" />
                <Swatch css="var(--surface-sunken)" label="surface-sunken" />
                <Swatch css="var(--line)" label="line" />
              </div>
              <p className="text-caption text-ink-muted mt-2">
                Semantic swatches resolve through the indirection layer; check them in both colour
                schemes.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------- component states --- */}
        <section aria-labelledby="components-heading">
          <h2 id="components-heading" className="text-h2">
            Component states
          </h2>

          <h3 className="text-h4 mt-4">Buttons (44×44 touch floor)</h3>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="bg-cta-fill text-body-sm text-cta-ink min-h-[var(--spacing-touch)] rounded-md px-5 font-medium transition-colors duration-[var(--motion-fast)]"
            >
              Primary CTA
            </button>
            <button
              type="button"
              className="border-line bg-surface-raised text-body-sm text-ink min-h-[var(--spacing-touch)] rounded-md border px-5 font-medium transition-colors duration-[var(--motion-fast)]"
            >
              Secondary
            </button>
            <button
              type="button"
              disabled
              className="border-line text-body-sm text-ink-muted min-h-[var(--spacing-touch)] rounded-md border px-5 font-medium opacity-50"
            >
              Disabled
            </button>
            <a
              href="#components-heading"
              className="text-body-sm text-brand-700 inline-flex min-h-[var(--spacing-touch)] items-center font-medium underline underline-offset-4"
            >
              Link (tab to see the focus ring)
            </a>
          </div>

          <h3 className="text-h4 mt-6">Form field</h3>
          <div className="mt-2 max-w-sm">
            <label htmlFor="sink-field" className="text-caption">
              Account reference
            </label>
            <input
              id="sink-field"
              type="text"
              placeholder="e.g. KIL-Unit 4"
              className="border-line bg-surface-raised text-body placeholder:text-ink-muted mt-1 min-h-[var(--spacing-touch)] w-full rounded-md border px-3"
            />
            <p className="text-caption text-ink-muted mt-1">
              Inline message, not a bare red border.
            </p>
          </div>

          <h3 className="text-h4 mt-6">Badges and chips</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="bg-ochre-200 text-caption text-brand-900 rounded-full px-3 py-1">
              Scheduled
            </span>
            <span className="bg-brand-100 text-caption text-brand-900 rounded-full px-3 py-1">
              Available
            </span>
            <span className="border-line text-caption text-ink-muted rounded-full border px-3 py-1">
              Draft
            </span>
          </div>

          <h3 className="text-h4 mt-6">Data table (the density the rent roll gets)</h3>
          <div className="border-line mt-2 overflow-x-auto rounded-lg border">
            <table className="text-body-sm w-full text-left">
              <caption className="sr-only">
                Sample statement rows rendered at the data-density steps
              </caption>
              <thead>
                <tr className="border-line bg-surface-sunken text-caption text-ink-muted border-b tracking-wide uppercase">
                  <th className="px-3 py-2 font-medium">Unit</th>
                  <th className="px-3 py-2 font-medium">Invoice</th>
                  <th className="px-3 py-2 text-right font-medium">Amount (KES)</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['KIL-Unit 4', 'INV-0041', '45,000.00', 'Paid'],
                  ['KIL-Unit 5', 'INV-0042', '45,000.00', 'Awaiting'],
                ].map(([unit, invoice, amount, status]) => (
                  <tr key={invoice} className="border-line border-b last:border-0">
                    <td className="px-3 py-2">{unit}</td>
                    <td className="px-3 py-2">{invoice}</td>
                    <td className="text-data px-3 py-2 text-right">{amount}</td>
                    <td className="px-3 py-2">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-h4 mt-6">Inverted band (brand-900)</h3>
          <div className="bg-accent-band text-accent-band-ink mt-2 rounded-lg px-6 py-5">
            <p className="text-h3">Deep dive band</p>
            <p className="text-body-sm mt-1 max-w-prose opacity-90">
              White-on-brand is the one inversion the system allows; ochre never appears inside it
              as an ink.
            </p>
          </div>

          <h3 className="text-h4 mt-6">Motion</h3>
          <p className="text-body-sm text-ink-muted max-w-prose">
            Hover or focus this card: 120ms color transition only, no transform. With
            prefers-reduced-motion: reduce, every transition and animation in the system collapses
            to instant.
          </p>
          <div className="border-line bg-surface-raised hover:bg-surface-sunken mt-2 max-w-sm rounded-lg border p-4 transition-colors duration-[var(--motion-fast)]">
            <p className="text-body-sm">Hover card</p>
          </div>
        </section>

        <footer className="border-line text-caption text-ink-muted border-t pt-6">
          Excluded from the sitemap by the route manifest and rendered only outside production.
          Delete nothing here: Sprint 003 inherits this scale.
        </footer>
      </div>
    </main>
  )
}
