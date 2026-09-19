import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifySelfOrAdmin } from '@/http/middlewares/verify-self-or-admin.js'
import { authenticate } from './authenticate-user.controller.js'
import { deleteUser } from './delete-user.controller.js'
import { forgotPassword } from './forgot-passwd.controller.js'
import { get } from './get-user.controller.js'
import { listTasksByUser } from './list-tasks.controller.js'
import { list } from './list-users.controller.js'
import { register } from './register.controller.js'
import { resetPassword } from './reset-passwd.controller.js'
import { update } from './update-users.controller.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/auth/register', register)
  app.post('/auth/login', authenticate)

  app.post('/auth/forgot-password', forgotPassword)
  app.patch('/auth/reset-password', resetPassword)

  app.get(
    '/:publicId',
    {
      onRequest: [verifyJwt],
    },
    get,
  )

  app.get(
    '/',
    {
      onRequest: [verifyJwt],
    },
    list,
  )

  app.get(
    '/:publicId/tasks',
    {
      onRequest: [verifyJwt],
    },
    listTasksByUser,
  )

  app.put(
    '/:publicId',
    {
      onRequest: [verifyJwt, verifySelfOrAdmin],
    },
    update,
  )

  app.delete(
    '/:publicId',
    {
      onRequest: [verifyJwt, verifySelfOrAdmin],
    },
    deleteUser,
  )
}
