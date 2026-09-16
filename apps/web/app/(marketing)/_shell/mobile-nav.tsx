'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useState } from 'react'
import { buttonClassName } from '@ethanel/ui'

import type { NavMenu } from './nav-data'

/**
 * The mobile drawer. Radix Dialog — D-19 primitives: focus trap, `aria-modal`,
 * escape and outside-click for free.
 *
 * Kept as its own Radix tree, separate from the desktop mega menu, so neither
 * can break the other's keyboard behaviour. They render inside the same header
 * bar but share no state.
 *
 * Groups use native `<details>` rather than a Radix accordion: the drawer holds
 * twenty-odd links across three groups, and a disclosure that works before
 * hydration is worth more here than one that animates. Native platform first,
 * per the blueprint's dependency policy.
 */
export function MobileNav({
  menus,
  strings,
}: {
  menus: NavMenu[]
  strings: {
    openMenu: string
    closeMenu: string
    menu: string
    mobileNav: string
    primaryCta: string
  }
}) {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={strings.openMenu}
        className="border-line-control text-ink flex min-h-[var(--spacing-touch)] min-w-[var(--spacing-touch)] items-center justify-center rounded-md border lg:hidden"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-sand-950/55 fixed inset-0" />
        <Dialog.Content className="bg-surface fixed inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col p-4 shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-h4 text-ink">{strings.menu}</Dialog.Title>
            <Dialog.Close
              aria-label={strings.closeMenu}
              className="border-line-control text-ink flex min-h-[var(--spacing-touch)] min-w-[var(--spacing-touch)] items-center justify-center rounded-md border"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </Dialog.Close>
          </div>

          <nav aria-label={strings.mobileNav} className="mt-4 flex-1 overflow-y-auto">
            {menus.map((menu) => (
              <details key={menu.id} className="border-line border-b py-1">
                <summary className="text-body-sm text-ink flex min-h-[var(--spacing-touch)] cursor-pointer list-none items-center justify-between px-2 font-semibold">
                  {menu.label}
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" />
                  </svg>
                </summary>
                {menu.columns.map((column) => (
                  <div key={column.column} className="pb-2">
                    {column.column ? (
                      <p className="text-caption text-ink-quiet px-2 pt-2 font-semibold tracking-wide uppercase">
                        {column.column}
                      </p>
                    ) : null}
                    <ul>
                      {column.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="text-body-sm text-ink hover:bg-surface-sunken flex min-h-[var(--spacing-touch)] items-center justify-between gap-3 rounded-md px-2"
                          >
                            {item.label}
                            {item.stub ? (
                              <span className="text-caption text-ink-quiet">In review</span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </details>
            ))}
          </nav>

          {/*
            Secondary, not primary, for the same reason as the desktop header
            CTA: the drawer is fixed, so a primary-marked control inside it
            would intersect every scroll step of the acceptance-row-5 scan.
          */}
          <Link href="/demo" onClick={close} className={buttonClassName('secondary', 'lg', 'mt-4')}>
            {strings.primaryCta}
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
