import { BASE_URL } from '../../../content/marketing/routes'
import { home } from '../../../content/marketing/home'

/**
 * The site-wide `Organization` record, emitted once from the marketing layout.
 *
 * What is absent matters more than what is present. `address` and `telephone`
 * are omitted because Q20 is open: there is no confirmed Nairobi address and no
 * WhatsApp number. Structured data is not decoration — a search engine will
 * index a `PostalAddress` and surface it in a knowledge panel, so an invented
 * one becomes a published claim that outlives the guess that produced it. The
 * footer makes the same omission on the same grounds, and the two have to agree
 * or the markup contradicts the page it describes.
 *
 * `logo` is omitted for the same class of reason: there is no logo asset
 * (DEBT-10), and pointing at a URL that 404s is worse than pointing nowhere.
 *
 * `sameAs` is omitted because no social profile has been verified as belonging
 * to this organization, and `sameAs` is precisely a claim of ownership.
 *
 * Rendered with `dangerouslySetInnerHTML` because that is the only way to emit
 * a `<script type="application/ld+json">` body — React would otherwise escape
 * the JSON into something no parser accepts. The content is `JSON.stringify` of
 * an object literal built here, so there is no interpolation path from user
 * input into the script tag.
 */
export function OrganizationJsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ethanel',
    url: BASE_URL,
    description: home.meta.description,
    email: 'hello@ethanel.co.ke',
    areaServed: { '@type': 'Country', name: 'Kenya' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  )
}
