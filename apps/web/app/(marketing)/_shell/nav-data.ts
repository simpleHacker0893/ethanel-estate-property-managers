import { navColumnsFor, navGroups, navLabelFor, routes } from '../../../content/marketing/routes'
import type { NavGroup } from '../../../content/marketing/routes'

/**
 * The manifest, flattened into the plain serialisable shape the two client
 * navigation trees consume.
 *
 * Both the mega menu and the mobile drawer render this identical structure, so
 * a route added to `routes.ts` appears in both or in neither — which is the
 * property the link crawl relies on when it asserts zero 404s across nav.
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

export function buildNavMenus(): NavMenu[] {
  return navGroups.map((group) => ({
    id: group.id,
    label: group.label,
    columns: navColumnsFor(group.id).map((column) => ({
      column: column.column,
      items: column.entries.map((entry) => ({
        href: entry.path,
        label: navLabelFor(entry),
        stub: entry.status === 'v1.1-stub',
      })),
    })),
  }))
}

export interface FooterColumn {
  label: string
  items: NavItem[]
}

export function buildFooterColumns(): FooterColumn[] {
  const groups: { id: 'product' | 'solutions' | 'company' | 'legal'; label: string }[] = [
    { id: 'product', label: 'Product' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'company', label: 'Company' },
    { id: 'legal', label: 'Legal' },
  ]
  return groups.map((group) => ({
    label: group.label,
    items: routes
      .filter((r) => r.footer?.group === group.id && !r.devOnly)
      .sort((a, b) => (a.footer?.order ?? 0) - (b.footer?.order ?? 0))
      .map((entry) => ({
        href: entry.path,
        label: navLabelFor(entry),
        stub: entry.status === 'v1.1-stub',
      })),
  }))
}
