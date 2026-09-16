/**
 * Readiness and liveness target for `charts/service` (D-34 gate 1).
 *
 * Deliberately shallow: it answers "is this process serving HTTP". Sprint 002's
 * chassis adds the dependency checks ARCHITECTURE §11.1 asks for -- Valkey and
 * Neon connectivity -- because a probe that fails when Postgres blips takes
 * every pod out at once, and that belongs behind one shared implementation
 * rather than being invented here.
 *
 * `connection()` opts the handler out of static prerendering, which is what
 * `export const dynamic = 'force-dynamic'` used to do before cacheComponents
 * stopped accepting segment config (a probe must always answer at request
 * time, never from a build).
 */
import { connection } from 'next/server'

export async function GET(): Promise<Response> {
  await connection()
  return Response.json({
    status: 'ok',
    service: 'web',
    version: process.env.APP_VERSION ?? 'dev',
  })
}
