import type { FastifyReply, FastifyRequest } from 'fastify'
import { resetPasswordSchema } from '@/http/schemas/users/reset-password-schema.js'
import { InvalidTokenError } from '@/use-cases/errors/invalid-token-error.js'
import { makeResetPasswordUseCase } from '@/use-cases/users/factories/make-reset-passwd-use-case.js'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { password, token } = resetPasswordSchema.parse(request.body)

  try {
    const resetPasswordUseCase = makeResetPasswordUseCase()

    await resetPasswordUseCase.execute({ password, token })

    return reply.status(200).send({ message: 'Password changed successfully!' })
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
