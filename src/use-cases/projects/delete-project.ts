import type { ProjectsRepository } from '@/repositories/projects-repository.js'
import type { TasksRepository } from '@/repositories/tasks-repository.js'
import { ProjectHasTasksError } from '../errors/project-has-tasks-error.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteProjectCaseRequest {
  publicId: string
}

export class DeleteProjectUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private tasksRepository: TasksRepository,
  ) {}

  async execute({ publicId }: DeleteProjectCaseRequest) {
    const project = await this.projectsRepository.findBy({ publicId })

    if (!project) {
      throw new ResourceNotFoundError()
    }

    const tasksCount = await this.tasksRepository.countByProjectId(project.id)

    if (tasksCount > 0) {
      throw new ProjectHasTasksError()
    }

    await this.projectsRepository.delete(project.id)
  }
}
