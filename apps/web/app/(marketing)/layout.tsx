import type { Metadata } from 'next'
import { buttonClassName } from '@ethanel/ui'

import { Footer } from './_shell/footer'
import { Header } from './_shell/header'
import { getShellStrings } from './_shell/strings'

/**
 * The public marketing frame. This group imports nothing authenticated — the
 * ESLint import zone in eslint.config.mjs fails the build the moment that
 * changes, at the commit rather than at review, and the graph path check in
 * acceptance.md backs it up once Sprint 002 gives the boundary real endpoints.
 */
export default async function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const strings = await getShellStrings()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className={buttonClassName(
          'secondary',
          'md',
          'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50',
        )}
      >
        {strings.skipToContent}
      </a>
      <Header strings={strings} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer strings={strings} />
    </div>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Ethanel — property management for Kenyan letting agencies',
    template: '%s | Ethanel',
  },
}
