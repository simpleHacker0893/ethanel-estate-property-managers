import Link from 'next/link'

import { navGroups, routes } from '../../../content/marketing/routes'

/**
 * Footer (ticket 03). Columns mirror the nav groups; legal links live in
 * their own column. All entries come from the route manifest.
 */
export function Footer() {
  return (
    <footer className="border-line bg-surface-raised border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-h4 text-ink">Ethanel</p>
          <p className="text-body-sm text-ink-muted mt-2 max-w-xs">
            Letting and property management for Kenyan agencies. Residents pay over M-Pesa; you see
            it posted, reconciled.
          </p>
        </div>
        {navGroups.map((group) => (
          <nav key={group.id} aria-label={group.label}>
            <p className="text-caption text-ink-muted tracking-wide uppercase">{group.label}</p>
            <ul className="mt-2">
              {routes
                .filter((r) => r.footer?.group === group.id && !r.devOnly)
                .sort((a, b) => (a.footer?.order ?? 0) - (b.footer?.order ?? 0))
                .map((entry) => (
                  <li key={entry.path}>
                    <Link
                      href={entry.path}
                      className="text-body-sm text-ink inline-flex min-h-[var(--spacing-touch)] items-center hover:underline"
                    >
                      {entry.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Legal">
          <p className="text-caption text-ink-muted tracking-wide uppercase">Legal</p>
          <ul className="mt-2">
            {routes
              .filter((r) => r.footer?.group === 'legal' && !r.devOnly)
              .sort((a, b) => (a.footer?.order ?? 0) - (b.footer?.order ?? 0))
              .map((entry) => (
                <li key={entry.path}>
                  <Link
                    href={entry.path}
                    className="text-body-sm text-ink inline-flex min-h-[var(--spacing-touch)] items-center hover:underline"
                  >
                    {entry.title}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      {/* No dynamic year: cacheComponents forbids current-time access during
          prerender, and a build-frozen year is a lie after New Year's Eve. */}
      <div className="border-line text-caption text-ink-muted border-t py-4 text-center">
        © Ethanel
      </div>
    </footer>
  )
}
