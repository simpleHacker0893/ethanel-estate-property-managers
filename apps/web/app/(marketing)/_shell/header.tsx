import Link from 'next/link'
import { Container } from '@ethanel/ui'

import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'
import { buildNavMenus } from './nav-data'
import type { ShellStrings } from './strings'

/**
 * The header bar. A Server Component that reads the route manifest and hands
 * two independent client navigation trees their data as plain props — so the
 * manifest never reaches the browser, only the twenty-odd links it produces.
 *
 * Both trees live inside this one `<header>` element. They were previously
 * siblings in the layout, which put the mobile trigger in its own block below
 * the bar instead of in it.
 */
export function Header({ strings }: { strings: ShellStrings }) {
  const menus = buildNavMenus()

  return (
    <header className="border-line bg-surface sticky top-0 z-40 border-b">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-h4 text-ink font-display flex min-h-[var(--spacing-touch)] items-center font-bold"
        >
          {strings.brand}
        </Link>

        <DesktopNav menus={menus} ctaLabel={strings.primaryCta} ariaLabel={strings.mainNav} />
        <MobileNav
          menus={menus}
          strings={{
            openMenu: strings.openMenu,
            closeMenu: strings.closeMenu,
            menu: strings.menu,
            mobileNav: strings.mobileNav,
            primaryCta: strings.primaryCta,
          }}
        />
      </Container>
    </header>
  )
}
