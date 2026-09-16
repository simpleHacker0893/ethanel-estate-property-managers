import { startShell } from './shell.ts'

/**
 * Deployable shell for the `gateway` Deployment.
 *
 * `gateway` is where every inbound webhook terminates (D-14, ADR-011): verify
 * the signature, persist the raw payload to the owning service's inbox table,
 * return 200 in milliseconds. Nothing is processed inline. None of that exists
 * yet -- Sprint 007 builds it, on Sprint 002's chassis.
 */
await startShell('gateway')
