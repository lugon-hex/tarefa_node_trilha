import { InMemoryPostsRepository } from '@/repositories/in-memory/in-memory-posts-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { SendEmailUseCase } from '@/use-cases/messaging/send-email.js'
import { SendDailyHighlightsUseCase } from '../send-daily-highlights.js'

export function makeSendDailyHighlightsUseCase() {
  const postsRepository = new InMemoryPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const sendEmailUseCase = new SendEmailUseCase()

  return new SendDailyHighlightsUseCase(
    postsRepository,
    usersRepository,
    sendEmailUseCase,
  )
}
