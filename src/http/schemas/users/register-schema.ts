import { z } from 'zod'
import { emailSchema } from '@/http/schemas/utils/email.js'
import { passwordSchema } from '@/http/schemas/utils/password.js'
import { usernameSchema } from '@/http/schemas/utils/username.js'

export const registerSchema = z.object({
  name: z.string().trim().min(4).max(255),
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export type registerSchemaType = z.infer<typeof registerSchema>
