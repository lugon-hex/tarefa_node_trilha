import { z } from 'zod'
import { emailSchema } from '@/http/schemas/utils/email.js'
import { passwordSchema } from '@/http/schemas/utils/password.js'
import { usernameSchema } from '@/http/schemas/utils/username.js'

export const updateSchema = z.object({
  name: z.string().trim().min(4).optional(),
  email: emailSchema.optional(),
  username: usernameSchema.optional(),
  password: passwordSchema.optional(),
})

export type updateSchemaType = z.infer<typeof updateSchema>
