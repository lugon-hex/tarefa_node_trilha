import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import { appRoutes } from './http/controlllers/routes.js'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message:
        'Problema Encontrado !!: O corpo da requisicao nao esta em formato JSON valido. Verifique a estrutura dos dados enviados',
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})
