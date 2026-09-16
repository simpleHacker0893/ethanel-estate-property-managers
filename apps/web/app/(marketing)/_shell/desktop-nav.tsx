'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { buttonClassName } from '@ethanel/ui'

import type { NavMenu } from './nav-data'

/**
 * The desktop mega menu. Radix NavigationMenu — D-19 primitives, nothing
 * hand-rolled: focus management, aria, escape and outside-click come from the
 * library, and every one of those is something a hand-rolled menu gets wrong.
 *
 * Entries come from the route manifest via props; this component does not know
 * what a route is.
 */
export function DesktopNav({
  menus,
  ctaLabel,
  ariaLabel,
}: {
  menus: NavMenu[]
  ctaLabel: string
  ariaLabel: string
}) {
  return (
    <NavigationMenu.Root aria-label={ariaLabel} className="relative hidden lg:block">
      <NavigationMenu.List className="flex items-center gap-1">
        {menus.map((menu) => (
          <NavigationMenu.Item key={menu.id}>
            <NavigationMenu.Trigger className="text-body-sm text-ink data-[state=open]:bg-surface-sunken inline-flex min-h-[var(--spacing-touch)] items-center gap-1 rounded-md px-3 font-semibold">
              {menu.label}
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform duration-[var(--motion-fast)] group-data-[state=open]:rotate-180"
              >
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-full left-0 p-2">
              <div className="flex gap-6 p-2">
                {menu.columns.map((column) => (
                  <div key={column.column} className="min-w-56">
                    {column.column ? (
                      <p className="text-caption text-ink-quiet px-3 pb-1 font-semibold tracking-wide uppercase">
                        {column.column}
                      </p>
                    ) : null}
                    <ul>
                      {column.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenu.Link asChild>
                            <Link
                              href={item.href}
                              className="text-body-sm text-ink hover:bg-surface-sunken flex min-h-[var(--spacing-touch)] items-center justify-between gap-3 rounded-md px-3"
                            >
                              {item.label}
                              {item.stub ? (
                                <span className="text-caption text-ink-quiet">In review</span>
                              ) : null}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}

        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            {/*
              The header CTA is the `secondary` variant, not `primary`. That is
              acceptance row 5 working as intended rather than a style choice:
              the header is sticky, so a primary-marked CTA here would intersect
              every 844px scroll step and collide with the one the section
              beneath it owns.
            */}
            <Link href="/demo" className={buttonClassName('secondary', 'md', 'ml-2')}>
              {ctaLabel}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="absolute top-full left-0 flex justify-start">
        <NavigationMenu.Viewport className="border-line bg-surface relative mt-2 w-max rounded-lg border shadow-lg" />
      </div>
    </NavigationMenu.Root>
  )
}
