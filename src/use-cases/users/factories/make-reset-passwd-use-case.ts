import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ResetPasswordUseCase } from '@/use-cases/users/reset-passwd.js'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository)

  return resetPasswordUseCase
}
