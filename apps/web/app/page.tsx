/**
 * Deployable shell. Sprint 001 P5: "just enough to prove the pipeline carries a
 * real artifact. No domain model, no chassis."
 *
 * The marketing track replaces this with app/(marketing)/page.tsx, which owns
 * `/`. Both cannot exist -- deleting this file is that slice's first step.
 */
export default function Page() {
  return (
    <main>
      <h1>Ethanel</h1>
      <p>Deployable shell.</p>
    </main>
  )
}
