import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // E11: the coverage floor is configured now and enforced on the domain
    // packages as they appear. `packages/services/*` and `packages/chassis` do
    // not exist yet (Sprint 002) -- the thresholds below apply the moment they do.
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['packages/services/**/src/**', 'packages/chassis/src/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
      // Until a domain package exists there is nothing to measure, and a
      // threshold over an empty set fails for the wrong reason.
      allowExternal: false,
      skipFull: true,
    },
  },
})
