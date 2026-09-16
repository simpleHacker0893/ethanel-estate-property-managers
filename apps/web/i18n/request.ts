import { getRequestConfig } from 'next-intl/server'

import { activeLocale } from '../content/marketing/routes'

/**
 * D-25: next-intl from day one, English only at launch, Swahili in R1.1.
 *
 * There is no locale routing yet and no locale segment — Sprint 003 exercises
 * that. What exists now is the seam: every shell string is resolved through a
 * message catalogue keyed by locale, so adding Swahili is writing
 * `messages/sw-KE.json` and turning routing on, not finding hardcoded English
 * in forty components.
 *
 * Deliberately server-only. There is no `NextIntlClientProvider` anywhere in
 * the tree, because shipping the message catalogue and the formatter to the
 * browser would cost first-party JavaScript on a page whose entire budget is
 * the framework floor (Q23). Strings are resolved during render.
 */
export default getRequestConfig(async () => {
  const locale = activeLocale
  const messages = (await import(`../messages/${locale}.json`)) as {
    default: Record<string, unknown>
  }
  return { locale, messages: messages.default }
})
