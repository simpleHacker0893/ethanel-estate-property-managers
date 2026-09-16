import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Newsreader, Public_Sans, Schibsted_Grotesk } from 'next/font/google'

import { activeLocale } from '../content/marketing/routes'
import './globals.css'

/**
 * Four families, six files. This is a deliberate deviation from the
 * requirements' "2 maximum" font-family budget row, taken by the operator on
 * 16 September 2026 and recorded in the Phase 0 PR body rather than absorbed
 * silently.
 *
 * What pays for it: every face is subsetted to `latin`, every one loads with
 * `display: swap` so a slow Safaricom connection renders text in a fallback
 * rather than nothing, and each carries only the weights that are actually
 * used. Six files at one weight each is a smaller download than two families at
 * four weights, which is the shape the budget row was written to prevent.
 *
 * Each family reaches the token layer through the `--font-*-next` indirections
 * that `packages/ui/theme.css` already expects. Nothing references a font
 * family name directly.
 */

const display = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-display-next',
})

const sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-sans-next',
})

/** One face, one weight, italic only: it is used for pull quotes and asides. */
const serif = Newsreader({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-serif-next',
})

/** Account references, unit codes and the chart of accounts. */
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-mono-next',
})

export const metadata: Metadata = {
  title: 'Ethanel',
  description: 'Property management for Kenyan letting agencies.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // D-25: next-intl from day one, `en-KE` active and `sw-KE` reserved. The lang
  // attribute reads the manifest rather than a literal so switching it is a
  // content change.
  return (
    <html
      lang={activeLocale}
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="bg-surface text-ink font-sans">{children}</body>
    </html>
  )
}
