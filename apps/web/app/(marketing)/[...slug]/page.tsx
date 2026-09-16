import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Eyebrow, Prose, Section } from '@ethanel/ui'

import { pending } from '../../../content/marketing/pending'
import { routeFor, routes } from '../../../content/marketing/routes'

/**
 * Every route the manifest names but no page implements yet.
 *
 * The header and footer are generated from the route manifest, so the moment a
 * route is listed there it is linked from all eighteen nav and footer slots —
 * whether or not a page exists. Before this file, only `/`, `/demo` and
 * `/features/*` were built, so every other link in the chrome returned a 404:
 * `/pricing`, `/security`, `/about`, `/contact`, `/platform`, `/find`,
 * `/resources`, `/status`, the four `/solutions/*` and the four `/legal/*`.
 * The manifest's own definition of `v1.1-stub` promises the opposite — "a
 * titled placeholder that exists so a nav item does not 404" — so the promise
 * was documented and never kept.
 *
 * This route keeps it, and keeps it without a list to maintain. Next.js
 * resolves static segments before dynamic ones and dynamic before catch-all,
 * so a real page always wins: adding `app/(marketing)/pricing/page.tsx` takes
 * `/pricing` away from this file with no edit here and no registry to update.
 * That matters because the failure mode being fixed is exactly a list that
 * drifted from reality — replacing it with a second list would reintroduce it.
 *
 * `routeFor` is what stops this becoming a catch-all that answers 200 for
 * anything: a path the manifest does not name is still a 404, so a typo in a
 * link is still caught by the Phase 6 crawl rather than silently absorbed.
 *
 * Deliberately `robots: noindex`. These pages carry no content worth ranking,
 * and an indexed placeholder competes with the real page that replaces it.
 */
/**
 * Every manifest route, handed to the prerenderer.
 *
 * This is not a list of "routes without a page" — maintaining one of those is
 * the drift that caused the bug in the first place. It is the manifest itself,
 * unfiltered, and routing precedence does the filtering: a path with a real
 * page is served by that page, so the entry generated here for it is never
 * reached. Adding `app/(marketing)/pricing/page.tsx` therefore needs no edit
 * in this file.
 *
 * It also has to exist. Under `cacheComponents` a route that reads `params`
 * outside Suspense cannot be prerendered without it, and the alternatives both
 * break the 404: a Suspense boundary or `instant = false` leaves the response
 * partially prerendered, which commits a 200 status before `notFound()` runs
 * and turns every unknown path into a soft 404 — a page that says "not found"
 * under a 200, invisible to the Phase 6 link crawl and indexable by Google.
 * With static params, an unknown path renders on demand and `notFound()`
 * sets a real 404.
 */
export function generateStaticParams(): { slug: string[] }[] {
  return routes
    .filter((entry) => !entry.devOnly && entry.path !== '/')
    .map((entry) => ({ slug: entry.path.slice(1).split('/') }))
}

interface Params {
  params: Promise<{ slug: string[] }>
}

function pathFor(slug: string[]): string {
  return `/${slug.join('/')}`
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const entry = routeFor(pathFor(slug))
  if (!entry) return {}

  return {
    title: entry.title,
    robots: { index: false, follow: true },
  }
}

export default async function PendingPage({ params }: Params) {
  const { slug } = await params
  const entry = routeFor(pathFor(slug))

  // Not in the manifest, or development-only: a genuine 404 either way.
  if (!entry || entry.devOnly) notFound()

  return (
    <Section>
      <Container width="narrow">
        <Eyebrow>{pending.eyebrow}</Eyebrow>
        <h1 className="text-h1 text-ink font-display mt-3 font-bold text-balance">{entry.title}</h1>
        <Prose className="text-body-lg text-ink-muted mt-4">{pending.lede}</Prose>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {pending.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body-sm text-accent-text inline-flex min-h-[var(--spacing-touch)] items-center font-semibold underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
