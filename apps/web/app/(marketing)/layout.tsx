import { Header } from './_shell/header'
import { MobileNav } from './_shell/mobile-nav'
import { Footer } from './_shell/footer'
import type { Metadata } from 'next'

/**
 * The public marketing frame (ticket 03). This group imports nothing
 * authenticated — the ESLint import zone in eslint.config.mjs fails the build
 * if that ever changes, and the graph path check in acceptance.md backs it up
 * once Sprint 002 gives the boundary real endpoints.
 *
 * The mobile trigger lives here rather than inside Header so the desktop menu
 * and the drawer are independent Radix trees and neither can break the other's
 * keyboard behaviour.
 */
export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="focus:bg-cta-fill focus:text-body-sm focus:text-cta-ink sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:min-h-[var(--spacing-touch)] focus:rounded-md focus:px-4 focus:py-2 focus:font-medium"
      >
        Skip to main content
      </a>
      <Header />
      <MobileNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Ethanel — property management for Kenyan letting agencies',
    template: '%s | Ethanel',
  },
}
