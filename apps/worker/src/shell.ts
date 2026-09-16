import { createServer } from 'node:http'
import { baseEnvSchema, parseEnv } from '@ethanel/config/env'

/**
 * A health endpoint and nothing else. Sprint 001 P5: enough to prove the
 * pipeline carries a real artifact, with no domain model and no chassis.
 *
 * This file is near-identical in three apps ON PURPOSE. Config loading,
 * structured logging, OpenTelemetry, probes, graceful shutdown and the error
 * envelope are `packages/chassis`, which is Sprint 002's whole week and gets it
 * because a chassis defect is the same bug in twelve services. Extracting a
 * shared helper now would pre-empt that design with the shape a hello-world
 * happened to need -- and `002/blueprint.md` is explicit that the interfaces get
 * designed before either is written. Three throwaway copies cost less than one
 * premature seam.
 */
export async function startShell(service: string): Promise<void> {
  const env = parseEnv(baseEnvSchema)

  const server = createServer((req, res) => {
    if (req.url === '/health' || req.url === '/ready') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok', service, version: env.APP_VERSION }))
      return
    }
    res.writeHead(404, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: 'not_found' }))
  })

  // SIGTERM handling is a placeholder, not the D-34 gate-7 implementation. That
  // gate requires in-flight `pg-boss` work to finish or be released before the
  // process exits, and it is enforced by a chassis contract test in Sprint 002.
  // Closing the listener is the most this shell can honestly claim to do.
  for (const signal of ['SIGTERM', 'SIGINT'] as const) {
    process.on(signal, () => {
      server.close(() => process.exit(0))
    })
  }

  await new Promise<void>((resolve) => {
    server.listen(env.PORT, () => {
      process.stdout.write(
        `${JSON.stringify({ level: 'info', service, msg: 'listening', port: env.PORT })}\n`,
      )
      resolve()
    })
  })
}
