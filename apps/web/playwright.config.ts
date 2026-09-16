import { defineConfig, devices } from '@playwright/test'

// Ticket 01 (marketing-site track): the prefactor that puts the three approved
// gates at the front of the track, so an accessibility or budget regression
// fails at the commit that causes it. Budgets come from
// .docs/tracks/marketing-site/requirements.md ("Performance budgets") and are
// asserted by the Lighthouse suite, not here.
export default defineConfig({
  testDir: './tests/browser',
  // One CI retry only; a flaky gate is a gate that quietly stops being run.
  retries: process.env.CI ? 1 : 0,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
  },
  // The assertions that are about geometry run at the phone profile the
  // acceptance criteria name (390x844, criterion 4 and 5).
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
