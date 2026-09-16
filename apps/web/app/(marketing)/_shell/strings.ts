import { getTranslations } from 'next-intl/server'

/**
 * The shell's strings, resolved on the server and handed to the client
 * components as plain props.
 *
 * This is the shape that keeps D-25's seam without paying for it in the
 * browser: the header drawer and the mega menu are Radix, so they are client
 * components, but the message catalogue and the next-intl formatter never cross
 * the boundary — only the resolved strings do. A `NextIntlClientProvider` here
 * would put the whole catalogue in the bundle on a page whose JavaScript budget
 * is already the framework floor (Q23).
 */
export interface ShellStrings {
  brand: string
  skipToContent: string
  openMenu: string
  closeMenu: string
  menu: string
  mainNav: string
  mobileNav: string
  primaryCta: string
  footerBlurb: string
  footerContactHeading: string
  footerEmailLabel: string
  footerContactPending: string
  copyright: string
  comingSoon: string
}

export async function getShellStrings(): Promise<ShellStrings> {
  const t = await getTranslations('shell')
  return {
    brand: t('brand'),
    skipToContent: t('skipToContent'),
    openMenu: t('openMenu'),
    closeMenu: t('closeMenu'),
    menu: t('menu'),
    mainNav: t('mainNav'),
    mobileNav: t('mobileNav'),
    primaryCta: t('primaryCta'),
    footerBlurb: t('footerBlurb'),
    footerContactHeading: t('footerContactHeading'),
    footerEmailLabel: t('footerEmailLabel'),
    footerContactPending: t('footerContactPending'),
    copyright: t('copyright'),
    comingSoon: t('comingSoon'),
  }
}
