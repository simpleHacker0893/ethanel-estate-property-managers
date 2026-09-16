'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'
// The adapter is mounted HERE, around these tabs only, rather than in
// app/layout.tsx or app/(marketing)/layout.tsx.
//
// Two reasons. The shared layouts are owned by other slices of this track, and
// editing a file four agents are writing against is a merge conflict waiting
// to happen. And mounting the adapter at the root would pull nuqs' client
// runtime onto every marketing page, including the ten feature pages that hold
// no URL state at all — first-party JS on `/` is budgeted at 150 KB gzipped
// (D-71), roughly 14 KB over the Next.js framework floor, so a provider that
// can be scoped gets scoped.
//
// Nesting is safe: nuqs resolves the nearest adapter through React context, so
// if a later ticket mounts NuqsAdapter in a layout, this import and the
// wrapper below can simply be deleted and nothing else here changes.
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type KeyboardEvent, Suspense, useMemo, useRef } from 'react'
import { Card, buttonClassName } from '@ethanel/ui'

import type { RoleSwitcherContent } from '../../../content/marketing/types'
import { AvailabilityBadge } from './availability-badge'

/**
 * S10 — the role switcher.
 *
 * The chosen tab lives in the URL as `?role=<solution-slug>` (D-23, nuqs)
 * rather than in component state, so the role survives a refresh and the page
 * can be sent to somebody already open at the part that concerns them. The
 * value is the same slug the matching /solutions page uses, which is why it
 * reads as `?role=land-and-plot-sellers` and not `?tab=2`.
 *
 * Radix is the house rule for tabs (D-19), but `@radix-ui/react-tabs` is not a
 * dependency of this app and a new npm dependency needs the operator's
 * sign-off against the JS budget. So the tablist is hand-rolled to the APG
 * tabs pattern instead — roving tabindex, `aria-selected`, `aria-controls`,
 * `aria-labelledby` on each panel, Left/Right/Home/End with automatic
 * activation — and the tabs themselves are the design system's own button
 * classes, so the 44px touch floor and the verified contrast pairs come for
 * free. If `@radix-ui/react-tabs` is ever approved, this is the only file that
 * changes.
 *
 * All four panels render, with `hidden` on the inactive ones, so every role's
 * content is in the static HTML for a crawler and for a reader whose
 * JavaScript has not arrived yet.
 */

type Role = RoleSwitcherContent['roles'][number]

interface TabsProps {
  roles: Role[]
  /** The id of the section's <h2>. The tablist borrows it rather than inventing a label. */
  labelledBy: string
  className?: string | undefined
}

const TAB_ID = 'role-tab'
const PANEL_ID = 'role-panel'

export function RoleSwitcher({ roles, labelledBy, className }: TabsProps) {
  // nuqs' App Router adapter reads `useSearchParams`, which opts a prerendered
  // page out of static HTML unless it sits under a Suspense boundary. The
  // boundary is here so that opt-out is scoped to these tabs instead of to the
  // whole landing page, and the fallback is the same tablist showing the first
  // role — so the prerendered HTML is complete and hydration replaces like
  // with like rather than shifting the layout.
  return (
    <Suspense
      fallback={
        <RoleTabs
          roles={roles}
          labelledBy={labelledBy}
          className={className}
          activeId={roles[0]?.id ?? ''}
        />
      }
    >
      <NuqsAdapter>
        <UrlRoleTabs roles={roles} labelledBy={labelledBy} className={className} />
      </NuqsAdapter>
    </Suspense>
  )
}

function UrlRoleTabs({ roles, labelledBy, className }: TabsProps) {
  // Restricted to the four role ids, so `?role=` carrying anything else falls
  // back to the first role instead of rendering a section with no panel open.
  // Memoised because an unstable parser identity re-subscribes on every render.
  const parser = useMemo(
    () =>
      parseAsStringLiteral(roles.map((role) => role.id))
        .withDefault(roles[0]?.id ?? '')
        .withOptions({
          // Replace, not push: flicking through four tabs should not cost four
          // presses of the Back button to leave the page. `scroll: false`
          // keeps the viewport still, `shallow` keeps it off the server, and
          // `clearOnDefault` keeps `/` clean until a role other than the first
          // is actually chosen.
          history: 'replace',
          scroll: false,
          shallow: true,
          clearOnDefault: true,
        }),
    [roles],
  )

  const [activeId, setActiveId] = useQueryState('role', parser)

  return (
    <RoleTabs
      roles={roles}
      labelledBy={labelledBy}
      className={className}
      activeId={activeId}
      onSelect={(id) => {
        void setActiveId(id)
      }}
    />
  )
}

function RoleTabs({
  roles,
  labelledBy,
  className,
  activeId,
  onSelect,
}: TabsProps & { activeId: string; onSelect?: ((id: string) => void) | undefined }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = roles.length - 1
    let next = -1
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    if (next < 0) return

    const role = roles[next]
    if (!role) return
    event.preventDefault()
    onSelect?.(role.id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-labelledby={labelledBy}
        aria-orientation="horizontal"
        className="flex flex-wrap gap-2"
      >
        {roles.map((role, index) => {
          const selected = role.id === activeId
          return (
            <button
              key={role.id}
              type="button"
              role="tab"
              id={`${TAB_ID}-${role.id}`}
              aria-selected={selected}
              aria-controls={`${PANEL_ID}-${role.id}`}
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              onClick={() => {
                onSelect?.(role.id)
              }}
              onKeyDown={(event) => {
                onKeyDown(event, index)
              }}
              // `secondary` and `quiet`, never `primary`: the page's primary
              // calls to action are counted per viewport (acceptance row 5) and
              // a tab is not one of them. `buttonClassName` carries the 44px
              // touch floor. The unselected tab's border is lifted to
              // --line-control, because here the border is the only thing
              // identifying it as a control (WCAG 1.4.11 wants 3:1, and the
              // card rule sand-200 is 1.27:1).
              className={buttonClassName(
                selected ? 'secondary' : 'quiet',
                'md',
                selected ? undefined : 'border-line-control',
              )}
            >
              {role.label}
            </button>
          )
        })}
      </div>

      {roles.map((role) => (
        <Card
          key={role.id}
          id={`${PANEL_ID}-${role.id}`}
          role="tabpanel"
          aria-labelledby={`${TAB_ID}-${role.id}`}
          tabIndex={0}
          hidden={role.id !== activeId}
          className="mt-6 md:p-7"
        >
          <p className="text-body-lg text-ink max-w-[var(--measure)]">{role.lede}</p>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {role.points.map((point) => (
              <li key={point.label} className="border-line border-t pt-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-body text-ink font-semibold">{point.label}</p>
                  <AvailabilityBadge
                    availability={point.availability}
                    {...(point.sprint === undefined ? {} : { sprint: point.sprint })}
                  />
                </div>
                {point.description ? (
                  <p className="text-body-sm text-ink-muted mt-1.5">{point.description}</p>
                ) : null}
                <p className="text-caption text-ink-quiet mt-1.5 font-mono">{point.service}</p>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}
