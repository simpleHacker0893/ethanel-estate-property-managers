/**
 * Readiness and liveness target for `charts/service` (D-34 gate 1).
 *
 * Deliberately shallow: it answers "is this process serving HTTP". Sprint 002's
 * chassis adds the dependency checks ARCHITECTURE §11.1 asks for -- Valkey and
 * Neon connectivity -- because a probe that fails when Postgres blips takes
 * every pod out at once, and that belongs behind one shared implementation
 * rather than being invented here.
 */
export const dynamic = 'force-dynamic'

export function GET(): Response {
  return Response.json({
    status: 'ok',
    service: 'web',
    version: process.env.APP_VERSION ?? 'dev',
  })
}
