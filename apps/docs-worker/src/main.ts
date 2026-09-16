import { startShell } from './shell.ts'

/**
 * Deployable shell for `docs-worker`.
 *
 * Split into its own Deployment from day one, not on a trigger: it will run
 * headless Chromium (D-10), and ARCHITECTURE §13.1 lists blast radius as a
 * split reason -- a Chromium leak must not be able to take a request path down.
 */
await startShell('docs-worker')
