import { defineConfig } from 'vitest/config'

// apps/web unit tests are node-side only: the content-module guards
// (tests/content) and later Server Action logic. Browser behaviour is covered
// by the Playwright suite; nothing here renders React.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
