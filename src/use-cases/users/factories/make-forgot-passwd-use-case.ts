import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ForgotPasswordUseCase } from '@/use-cases/users/forgot-passwd.js'

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}
