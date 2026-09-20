import { env } from '@env/index.js'
import type { PostWithLikesCount } from '@/repositories/posts-repository.js'

export function dailyHighlightsTextTemplate(posts: PostWithLikesCount[]) {
  const appName = env.APP_NAME

  if (posts.length === 0) {
    return `Destaques das últimas 24 horas - ${appName}

Nenhum post recebeu curtidas nas últimas 24 horas.

Este e-mail foi gerado automaticamente pelo sistema ${appName}.`.trim()
  }

  const postsList = posts
    .map(
      (post, index) =>
        `  ${index + 1}. ${post.title} — ❤️ ${post.likesCount} curtidas\n     ${post.content}`,
    )
    .join('\n\n')

  return `Destaques das últimas 24 horas - ${appName}

Os posts que mais engajaram nossa comunidade hoje:

${postsList}

---
Este e-mail foi gerado automaticamente pelo sistema ${appName}.
Você está recebendo porque é um usuário cadastrado na plataforma.`.trim()
}
