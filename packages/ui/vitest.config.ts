import { defineConfig } from 'vitest/config'

// packages/ui tests are node-side: the contrast table recomputation reads
// theme.css from disk. Nothing here renders React.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
