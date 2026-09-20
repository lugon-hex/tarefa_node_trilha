import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3333),
  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z.string(),
  HASH_SALT_ROUNDS: z.coerce.number().default(12),

  JWT_SECRET: z.string(),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_SECURE: z.preprocess(
    (val) => val === 'true' || val === true,
    z.boolean(),
  ),
  SMTP_EMAIL: z.string().email(),
  SMTP_PASSWORD: z.string(),

  APP_NAME: z.string().default(''),
  APP_PORT: z.coerce.number().int().positive().default(3000),
  FRONTEND_URL: z.string().url(),
  SENTRY_DSN: z.string().optional(),

  PROJECT_NAME: z.string(),

  // Command
  COMMAND: z.string().optional(),

  // Cron
  CRON_SCHEDULE: z.string().default('0 23 * * *'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error)
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
