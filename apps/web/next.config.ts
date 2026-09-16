import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ARCHITECTURE §11.1: the container runs `output: 'standalone'`, and static
  // assets are uploaded to S3/CloudFront at build time rather than served by the
  // pod. Set here so the Dockerfile and the chart do not have to assume it.
  output: 'standalone',

  // Fail the build on a type error. The default already does this, but it is
  // overridable per-project and a silent `ignoreBuildErrors: true` is how
  // "TypeScript strict" stops being a merge gate (VALIDATION.md §2). Stating it
  // means flipping it shows up in a diff.
  typescript: { ignoreBuildErrors: false },
  // No `eslint` key: Next 16 removed lint-on-build. ESLint runs as its own CI
  // step (`pnpm exec eslint . --max-warnings=0`), which is the better place --
  // it lints the whole workspace, not just what the app bundle happens to pull in.

  // D-68/D-69: marketing routes are static or ISR and carry no money figure.
  // Cache Components are enabled for them. D-45 is untouched -- nothing on a
  // marketing route reads the ledger, and landlord and dashboard figures stay
  // uncached wherever they appear.
  cacheComponents: true,
}

export default nextConfig
