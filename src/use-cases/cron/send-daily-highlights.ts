import { messages } from '@/constants/messages.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { dailyHighlightsHtmlTemplate } from '@/templates/daily-highlights/daily-highlights-html.js'
import { dailyHighlightsTextTemplate } from '@/templates/daily-highlights/daily-highlights-text.js'
import type { SendEmailUseCase } from '@/use-cases/messaging/send-email.js'

export class SendDailyHighlightsUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly sendEmailUseCase: SendEmailUseCase,
  ) {}

  async execute() {
    const [topPosts, users] = await Promise.all([
      this.postsRepository.findTopLikedLast24Hours(5),
      this.usersRepository.list(),
    ])

    if (users.length === 0) {
      console.log(
        '[DailyHighlights] Nenhum usuário cadastrado. Nenhum e-mail enviado.',
      )
      return
    }

    const subject = messages.email.dailyHighlightsSubject
    const html = dailyHighlightsHtmlTemplate(topPosts)
    const text = dailyHighlightsTextTemplate(topPosts)

    const results = await Promise.allSettled(
      users.map((user) =>
        this.sendEmailUseCase.execute({
          to: user.email,
          subject,
          message: text,
          html,
        }),
      ),
    )

    const sent = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.filter((r) => r.status === 'rejected').length

    console.log(
      `[DailyHighlights] Resumo enviado: ${sent} sucesso(s), ${failed} falha(s). Top posts: ${topPosts.length}`,
    )
  }
}
