'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useState } from 'react'

import { navGroups, routes } from '../../../content/marketing/routes'

/**
 * Mobile navigation (ticket 03). Radix Dialog as the drawer — D-19
 * primitives: focus trap, aria-modal, escape and outside-click for free.
 * Entries come from the route manifest.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="border-line flex min-h-[var(--spacing-touch)] min-w-[var(--spacing-touch)] items-center justify-center rounded-md border md:hidden"
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
        <Dialog.Overlay className="fixed inset-0 bg-neutral-950/50" />
        <Dialog.Content className="bg-surface fixed inset-y-0 right-0 flex w-72 flex-col p-4 shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-h4 text-ink">Menu</Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="border-line flex min-h-[var(--spacing-touch)] min-w-[var(--spacing-touch)] items-center justify-center rounded-md border"
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

          <nav aria-label="Mobile" className="mt-4 flex-1 overflow-y-auto">
            {navGroups.map((group) => {
              const entries = routes
                .filter((r) => r.nav?.group === group.id && !r.devOnly)
                .sort((a, b) => (a.nav?.order ?? 0) - (b.nav?.order ?? 0))
              if (entries.length === 0) return null
              return (
                <div key={group.id} className="mb-4">
                  <p className="text-caption text-ink-muted px-2 tracking-wide uppercase">
                    {group.label}
                  </p>
                  <ul>
                    {entries.map((entry) => (
                      <li key={entry.path}>
                        <Link
                          href={entry.path}
                          onClick={() => {
                            setOpen(false)
                          }}
                          className="text-body-sm text-ink hover:bg-surface-sunken flex min-h-[var(--spacing-touch)] items-center rounded-md px-2"
                        >
                          {entry.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </nav>

          <Link
            href="/demo"
            onClick={() => {
              setOpen(false)
            }}
            className="bg-cta-fill text-body-sm text-cta-ink flex min-h-[var(--spacing-touch)] items-center justify-center rounded-md px-4 font-medium"
          >
            Request a demo
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
