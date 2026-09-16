import Link from 'next/link'
import { Container, buttonClassName, ctaMarker } from '@ethanel/ui'

import { PlaceholderImage } from '../_components/placeholder-image'
import type { HeroContent } from '../../../content/marketing/types'

/**
 * S2 — the hero, and the tightest piece of vertical geometry on the site.
 *
 * Acceptance row 4 requires the H1, the sub-headline, the primary call to
 * action and the risk-reversal line to be above the fold at 390x844, under a
 * 64px sticky header — roughly 780px of usable space. That is why this section
 * does not use `Section`: its default rhythm opens with 64px of padding on a
 * handset, which spends a twelfth of the fold on nothing. The hero opens at
 * 24px instead and takes the full rhythm back from `md` up, where there is
 * room for it.
 *
 * The four fold elements are marked with `data-fold` on the elements
 * themselves, so the Playwright check measures the real bounding boxes rather
 * than a wrapper that happens to contain them. Everything that is not one of
 * the four — the dual door, the secondary call to action, the image slot —
 * sits after them in the DOM and is expected to fall below the fold.
 *
 * The primary call to action is a `next/link` rather than `ButtonLink` so that
 * client-side navigation to `/demo` is prefetched; `buttonClassName` gives it
 * the verified accent-500-on-brand-900 pair (6.12:1) and `ctaMarker` supplies
 * the `data-cta="primary"` attribute that acceptance row 5 counts. Spreading
 * `ctaMarker` rather than typing the attribute keeps that marker one decision
 * in one function, which is the only reason the per-viewport count is
 * enforceable at all.
 *
 * No prose lives here. Every visible string arrives through `content`.
 */
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="bg-surface pt-6 pb-12 md:pt-14 md:pb-20" aria-labelledby="hero-h1">
      <Container>
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-14">
          <div className="max-w-[var(--measure)]">
            <h1
              data-fold="h1"
              id="hero-h1"
              className="text-h1 md:text-display text-ink font-display font-bold text-balance"
            >
              {content.h1}
            </h1>

            <p data-fold="subhead" className="text-body-lg text-ink-muted mt-3 text-pretty md:mt-5">
              {content.subhead}
            </p>

            <Link
              data-fold="cta"
              {...ctaMarker('primary')}
              href={content.primaryCta.href}
              className={buttonClassName('primary', 'lg', 'mt-5 w-full sm:w-auto')}
            >
              {content.primaryCta.label}
            </Link>

            <p data-fold="risk-reversal" className="text-body-sm text-ink-muted mt-3">
              {content.riskReversal}
            </p>

            {/* Below the fold from here down. */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.doors.map((door) => (
                <li key={door.href}>
                  <Link
                    href={door.href}
                    className="border-line bg-surface-raised hover:bg-surface-sunken flex h-full flex-col gap-1 rounded-lg border p-4 transition-colors"
                  >
                    <span className="text-h4 text-ink font-display font-semibold">
                      {door.label}
                    </span>
                    <span className="text-body-sm text-ink-muted">{door.description}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={content.secondaryCta.href}
              className="text-body-sm text-accent-text mt-6 inline-flex min-h-[var(--spacing-touch)] items-center font-semibold underline"
            >
              {content.secondaryCta.label}
            </Link>
          </div>

          <PlaceholderImage id="hero-portrait" className="mt-10 lg:mt-0" />
        </div>
      </Container>
    </section>
  )
}
