/**
 * The landing page (ticket 03 builds the skeleton; tickets 04-08 fill it in
 * from the content modules). `/` is owned by this file — the deployable
 * placeholder at app/page.tsx was deleted when this group took the route.
 */
export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-display text-ink">Property management that reconciles itself</h1>
      <p className="text-body-lg text-ink-muted mt-4 max-w-prose">
        Rent, arrears and landlord remittance for Kenyan letting and property management
        organizations. The section slices land in tickets 04 to 08.
      </p>
    </div>
  )
}
