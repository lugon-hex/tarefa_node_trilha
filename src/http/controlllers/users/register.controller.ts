import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { makeRegisterUseCase } from '@/use-cases/users/factories/make-register-use-case.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string().trim().min(1).max(100),
      email: z.email().max(100),
      password: z.string().min(6).max(100),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send(user)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
