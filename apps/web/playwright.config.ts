import { join } from 'node:path'

import { defineConfig, devices } from '@playwright/test'

/** Where the demo Server Action writes captured leads during the suite. */
export const LEAD_SINK_PATH = join(import.meta.dirname, 'test-results', 'demo-leads.jsonl')

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
    // Two opt-in escape hatches for machines where downloading the bundled
    // chromium is impossible (restricted network, or a preinstalled browser at
    // a different revision than this Playwright pins):
    //   PLAYWRIGHT_CHANNEL=chrome         run on an installed Google Chrome
    //   PLAYWRIGHT_EXECUTABLE_PATH=/path  run on a specific chromium binary
    // CI sets neither and stays on the bundled chromium.
    ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } }
      : {}),
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
    // NEVER reuse a server this config did not start.
    //
    // The attribution suite depends on the server's *environment*, not just on
    // its responses: it reads the captured lead back off the path in
    // LEAD_SINK_PATH. A server already listening on 3000 — one a developer left
    // running, or one from an earlier build — does not carry that variable, so
    // its leads land in the default `.data/demo-leads.jsonl` and the suite
    // inspects a file nothing ever writes to.
    //
    // That has now cost two debugging sessions, both spent on a "regression"
    // that was the harness inspecting the wrong file. Reuse saves about five
    // seconds and buys a test whose subject is unknown, so it is off
    // everywhere rather than off in CI only.
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      // The only way to assert acceptance row 8 end to end while DEBT-08 stands
      // and the LeadSink writes to a file. Pointing it at a test path keeps the
      // suite from appending to whatever a developer has been collecting.
      LEAD_SINK_PATH: LEAD_SINK_PATH,
    },
  },
})
