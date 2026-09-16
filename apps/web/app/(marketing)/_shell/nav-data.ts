import {
  footerEntriesFor,
  footerGroups,
  navColumnsFor,
  navGroups,
  navLabelFor,
} from '../../../content/marketing/routes'
import type { NavGroup, RouteEntry } from '../../../content/marketing/routes'

/**
 * The manifest, flattened into the plain serialisable shape the two client
 * navigation trees consume.
 *
 * Both the mega menu and the mobile drawer render this identical structure, so
 * a route added to `routes.ts` appears in both or in neither — which is the
 * property the link crawl relies on when it asserts zero 404s across nav.
 *
 * This file selects and reshapes; it does not decide. The grouping, filtering
 * and ordering rules all live in `routes.ts` and are reached through its
 * exported helpers. That split is load-bearing: this function previously kept
 * its own copy of the footer group list and its own filter-and-sort, while
 * `footerGroups` and `footerEntriesFor` sat unused next to the manifest they
 * describe. Two implementations of one rule stay equal only until one is
 * edited, and the nav is exactly where that divergence is invisible.
 */
export interface NavItem {
  href: string
  label: string
  /** 'v1.1-stub' rows are marked in the menu rather than silently linked. */
  stub: boolean
}

export interface NavColumn {
  column: string
  items: NavItem[]
}

export interface NavMenu {
  id: NavGroup
  label: string
  columns: NavColumn[]
}

export interface FooterColumn {
  label: string
  items: NavItem[]
}

function toNavItem(entry: RouteEntry): NavItem {
  return {
    href: entry.path,
    label: navLabelFor(entry),
    stub: entry.status === 'v1.1-stub',
  }
}

export function buildNavMenus(): NavMenu[] {
  return navGroups.map((group) => ({
    id: group.id,
    label: group.label,
    columns: navColumnsFor(group.id).map((column) => ({
      column: column.column,
      items: column.entries.map(toNavItem),
    })),
  }))
}

export function buildFooterColumns(): FooterColumn[] {
  return footerGroups.map((group) => ({
    label: group.label,
    items: footerEntriesFor(group.id).map(toNavItem),
  }))
}
