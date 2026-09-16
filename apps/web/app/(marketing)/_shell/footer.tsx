import Link from 'next/link'
import { Container } from '@ethanel/ui'

import { buildFooterColumns } from './nav-data'
import type { ShellStrings } from './strings'

/**
 * The footer. Columns come from the route manifest, so a route that exists is
 * reachable and a route that does not exist cannot be linked.
 *
 * The contact block is where Q20 is visible on the page. There is no real
 * WhatsApp number and no confirmed Nairobi address, so the footer renders an
 * email address and says plainly that the rest is not there yet. A `wa.me` link
 * with a placeholder number either 404s or reaches a stranger, and an invented
 * address becomes a schema.org claim search engines index — so the site-wide
 * `Organization` JSON-LD omits `address` for the same reason (Phase 5).
 */
export function Footer({ strings }: { strings: ShellStrings }) {
  const columns = buildFooterColumns()

  return (
    <footer className="border-line bg-surface-raised border-t">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="text-h4 text-ink font-display font-bold">{strings.brand}</p>
          <p className="text-body-sm text-ink-muted mt-2 max-w-xs">{strings.footerBlurb}</p>

          <p className="text-caption text-ink-quiet mt-6 font-semibold tracking-wide uppercase">
            {strings.footerContactHeading}
          </p>
          <a
            href={`mailto:${strings.footerEmailLabel}`}
            className="text-body-sm text-accent-text inline-flex min-h-[var(--spacing-touch)] items-center font-semibold underline"
          >
            {strings.footerEmailLabel}
          </a>
          {/* TODO(Q20): WhatsApp number and Nairobi address. Until answered this
              line stays, because the honest gap reads better than a dead link. */}
          <p className="text-caption text-ink-quiet max-w-xs">{strings.footerContactPending}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.label} aria-label={column.label}>
            <p className="text-caption text-ink-quiet font-semibold tracking-wide uppercase">
              {column.label}
            </p>
            <ul className="mt-2">
              {column.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-ink inline-flex min-h-[var(--spacing-touch)] items-center hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* No dynamic year: cacheComponents forbids current-time access during
          prerender, and a build-frozen year is a lie after New Year's Eve. */}
      <div className="border-line text-caption text-ink-quiet border-t py-4 text-center">
        {strings.copyright}
      </div>
    </footer>
  )
}
