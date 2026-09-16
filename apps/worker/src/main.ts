import { startShell } from './shell.ts'

/**
 * Deployable shell for the `worker` Deployment, which hosts the `money-worker`,
 * `payments-worker` and `messaging-worker` handlers.
 *
 * Real behaviour needs `pg-boss` on Postgres (D-04) and the graceful-shutdown
 * contract that is D-34's seventh gate -- a worker that drops in-flight work
 * fails a chassis test. Both are Sprint 002.
 */
await startShell('worker')
