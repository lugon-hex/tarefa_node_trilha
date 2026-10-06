import type { User } from '@/@types/prisma/client.js'
import { redis } from '@/libs/redis.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetUserUseCaseRequest {
  publicId: string
}

type GetUserUseCaseResponse = {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    publicId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const cacheKey = `user:${publicId}`

    const cachedUser = await redis.get(cacheKey)

    if (cachedUser) {
      return {
        user: JSON.parse(cachedUser),
      }
    }

    const user = await this.usersRepository.findBy({ publicId })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600)

    return { user }
  }
}
