'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Link from 'next/link'

import { navGroups, routes } from '../../../content/marketing/routes'

/**
 * Desktop navigation (ticket 03). Radix NavigationMenu — D-19 primitives,
 * nothing hand-rolled: focus management, aria and the escape/outside-click
 * behaviour come from the library. Entries come from the route manifest, the
 * single source that later also generates the sitemap.
 */
export function Header() {
  return (
    <header className="border-line bg-surface border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-h4 text-ink flex min-h-[var(--spacing-touch)] items-center">
          Ethanel
        </Link>

        <NavigationMenu.Root aria-label="Main" className="relative hidden md:block">
          <NavigationMenu.List className="flex items-center gap-1">
            {navGroups.map((group) => {
              const entries = routes
                .filter((r) => r.nav?.group === group.id && !r.devOnly)
                .sort((a, b) => (a.nav?.order ?? 0) - (b.nav?.order ?? 0))
              return (
                <NavigationMenu.Item key={group.id}>
                  <NavigationMenu.Trigger className="text-body-sm text-ink data-[state=open]:bg-surface-sunken inline-flex min-h-[var(--spacing-touch)] items-center rounded-md px-3">
                    {group.label}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="border-line bg-surface-raised data-[motion=from-end]:animate-enter data-[motion=from-start]:animate-exit absolute top-full left-0 w-72 rounded-lg border p-2 shadow-lg">
                    <ul className="py-1">
                      {entries.length === 0 ? (
                        <li className="text-body-sm text-ink-muted px-3 py-2">
                          Coming with the next release
                        </li>
                      ) : (
                        entries.map((entry) => (
                          <li key={entry.path}>
                            <NavigationMenu.Link asChild>
                              <Link
                                href={entry.path}
                                className="text-body-sm text-ink hover:bg-surface-sunken flex min-h-[var(--spacing-touch)] items-center rounded-md px-3"
                              >
                                {entry.title}
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            })}
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="/demo"
                  className="bg-cta-fill text-body-sm text-cta-ink ml-2 inline-flex min-h-[var(--spacing-touch)] items-center rounded-md px-4 font-medium"
                >
                  Request a demo
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          {/* Viewport positions the dropdown content; Radix manages collision. */}
          <div className="absolute top-full left-0 flex justify-start">
            <NavigationMenu.Viewport className="border-line bg-surface relative mt-2 w-max rounded-lg border shadow-lg" />
          </div>
        </NavigationMenu.Root>
      </div>
    </header>
  )
}
