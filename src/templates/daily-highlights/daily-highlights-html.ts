import { env } from '@env/index.js'
import type { PostWithLikesCount } from '@/repositories/posts-repository.js'

export function dailyHighlightsHtmlTemplate(posts: PostWithLikesCount[]) {
  const appName = env.APP_NAME

  const postsRows = posts
    .map(
      (post, index) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #eee;">
          <strong style="color: #1a1a1a;">${index + 1}. ${post.title}</strong>
          <p style="margin: 4px 0 0; color: #555; font-size: 14px;">${post.content}</p>
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #eee; text-align: center; white-space: nowrap;">
          <span style="
            background: #e8f4fd;
            color: #1976d2;
            font-weight: bold;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 14px;
          ">❤️ ${post.likesCount}</span>
        </td>
      </tr>`,
    )
    .join('')

  return `
    <div style="font-family: Arial, sans-serif; color: #222; max-width: 640px; margin: 0 auto;">
      <div style="background: #1976d2; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">🏆 Destaques das últimas 24 horas</h1>
        <p style="color: #c9e1f8; margin: 8px 0 0; font-size: 14px;">
          Os posts que mais engajaram nossa comunidade hoje
        </p>
      </div>

      <div style="background: #fff; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; padding: 24px 32px;">
        ${
          posts.length === 0
            ? '<p style="color: #888;">Nenhum post recebeu curtidas nas últimas 24 horas.</p>'
            : `
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 10px 16px; text-align: left; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Post</th>
                <th style="padding: 10px 16px; text-align: center; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Curtidas</th>
              </tr>
            </thead>
            <tbody>
              ${postsRows}
            </tbody>
          </table>
        `
        }

        <p style="margin: 24px 0 0; font-size: 13px; color: #999;">
          Este e-mail foi gerado automaticamente pelo sistema ${appName}.<br>
          Você está recebendo porque é um usuário cadastrado na plataforma.
        </p>
      </div>
    </div>
  `
}
