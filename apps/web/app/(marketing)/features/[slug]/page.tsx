import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FeaturePage } from '../../_sections/feature-page'
import { BASE_URL } from '../../../../content/marketing/routes'
import { builtFeatureSlugs, getFeaturePage } from '../../../../content/marketing/features'

/**
 * All ten feature pages, as one route.
 *
 * `generateStaticParams` enumerates the registry, so every page is prerendered
 * at build time and shows as a static route in the build output — the same
 * shape ten hand-written directories would have produced, without ten
 * opportunities for one of them to grow its own layout.
 *
 * Metadata is generated here rather than in each module's page, which is the
 * half of ticket 10 that makes the remaining nine mechanical: a new page
 * inherits its title, description and canonical without writing any of them.
 *
 * `notFound()` is what closes the route to anything the registry does not name.
 * The obvious `dynamicParams = false` is unavailable — `cacheComponents` rejects
 * that segment config outright — so the unknown-slug shell the build reports
 * against `/features/[slug]` is the framework's, and this is what makes it 404
 * rather than render an empty template. It also narrows `content` off
 * `| undefined`, which is why it reads as a guard rather than as a fallback.
 */

interface Params {
  params: Promise<{ slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return builtFeatureSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const content = getFeaturePage(slug)
  if (!content) return {}

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: `${BASE_URL}/features/${content.slug}` },
  }
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const content = getFeaturePage(slug)
  if (!content) notFound()

  return <FeaturePage content={content} />
}
