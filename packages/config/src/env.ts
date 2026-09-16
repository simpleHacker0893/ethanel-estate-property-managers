import { z } from 'zod'

/**
 * Environment is validated at startup and fails fast. Twelve-Factor, and
 * `gem-devops-guidelines`: never hard-code NODE_ENV=production.
 *
 * Deliberately thin. Every service adds its own keys by extending this schema
 * in its own package, so a missing DATABASE_URL fails in the service that needs
 * it and names itself -- not in a shared module that names nothing.
 */
export const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  /** Set by the Helm chart from the image tag, so a running pod can say what it is. */
  APP_VERSION: z.string().min(1).default('dev'),
  PORT: z.coerce.number().int().positive().max(65535).default(3000),
})

export type BaseEnv = z.infer<typeof baseEnvSchema>

export function parseEnv<S extends z.ZodType>(
  schema: S,
  source: unknown = process.env,
): z.infer<S> {
  const result = schema.safeParse(source)
  if (!result.success) {
    // Fail fast and name every missing key at once, rather than one per restart.
    const issues = result.error.issues
      .map((i) => `  ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n')
    throw new Error(`Invalid environment:\n${issues}`)
  }
  return result.data
}
