import { ProofBar } from './_components/proof-bar'
import { DeepDives } from './_sections/deep-dives'
import { Faq } from './_sections/faq'
import { FeatureGrid } from './_sections/feature-grid'
import { FinalCta } from './_sections/final-cta'
import { Hero } from './_sections/hero'
import { HowItWorks } from './_sections/how-it-works'
import { LandBand } from './_sections/land-band'
import { MarketplaceBand } from './_sections/marketplace-band'
import { PricingPreview } from './_sections/pricing-preview'
import { Problem } from './_sections/problem'
import { RoleSwitcherSection } from './_sections/role-switcher-section'
import { Security } from './_sections/security'
import { home } from '../../content/marketing/home'

/**
 * The landing page, S2 to S16.
 *
 * This file is the page's order and nothing else: every section takes its copy
 * as a typed prop from `content/marketing/home`, and a lint rule stops prose
 * getting back into a section component. A copy change never touches this file
 * and never touches JSX.
 *
 * The order is argued rather than arbitrary. The hero states the mechanism and
 * the risk reversal; the proof bar immediately concedes that there are no
 * customer results yet and offers bounded engineering targets instead, because
 * a reader who has been sold software before is looking for the catch and it is
 * cheaper to hand it to them. The problem comes before how it works so the
 * mechanism answers something. The three deep dives sit in the middle, where a
 * reader who is still here has earned detail — custody first because it is the
 * question that decides the deal, then the ledger, then what happens when
 * reconciliation fails. Availability honesty (the two bands) comes before
 * pricing and the FAQ, so nobody reaches the call to action without having been
 * told what is not built yet.
 */
export default function Page() {
  return (
    <>
      <Hero content={home.hero} />
      <ProofBar content={home.proofBar} />
      <Problem content={home.problem} />
      <HowItWorks content={home.howItWorks} />
      <FeatureGrid content={home.featureGrid} />
      <DeepDives content={home.deepDives} />
      <RoleSwitcherSection content={home.roleSwitcher} />
      <MarketplaceBand content={home.marketplaceBand} />
      <LandBand content={home.landBand} />
      <Security content={home.security} />
      <PricingPreview content={home.pricingPreview} />
      <Faq content={home.faq} />
      <FinalCta content={home.finalCta} />
    </>
  )
}
