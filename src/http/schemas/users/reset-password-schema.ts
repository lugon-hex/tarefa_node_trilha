import { z } from 'zod'
import { passwordSchema } from '@/http/schemas/utils/password.js'

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  token: z.string(),
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>
