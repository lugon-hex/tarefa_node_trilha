import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { PrismaTaskRepository } from '@/repositories/prisma/task-prisma-repository.js'
import { DeleteProjectUseCase } from '../delete-project.js'

export function makeDeleteUseCase() {
  const projectRepository = new PrismaProjectsRepository()
  const tasksRepository = new PrismaTaskRepository()
  const deleteProjectUseCase = new DeleteProjectUseCase(
    projectRepository,
    tasksRepository,
  )

  return deleteProjectUseCase
}
