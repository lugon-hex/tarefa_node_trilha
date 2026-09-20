import type {
  PostsRepository,
  PostWithLikesCount,
} from '../posts-repository.js'

interface Like {
  likedAt: Date
}

interface MockPost {
  id: number
  title: string
  content: string
  likes: Like[]
}

const now = new Date()
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000)

const MOCK_POSTS: MockPost[] = [
  {
    id: 1,
    title: 'Clean Architecture com Node.js e Fastify',
    content:
      'Aprenda a estruturar seu backend com Use Cases, Repositórios e inversão de dependências.',
    likes: [
      { likedAt: hoursAgo(1) },
      { likedAt: hoursAgo(3) },
      { likedAt: hoursAgo(8) },
      { likedAt: hoursAgo(20) },
      { likedAt: hoursAgo(30) },
    ],
  },
  {
    id: 2,
    title: 'Dominando CRON Jobs em TypeScript',
    content:
      'Como agendar tarefas periódicas com node-cron de forma tipada e desacoplada da regra de negócio.',
    likes: [
      { likedAt: hoursAgo(2) },
      { likedAt: hoursAgo(5) },
      { likedAt: hoursAgo(12) },
      { likedAt: hoursAgo(48) },
    ],
  },
  {
    id: 3,
    title: 'Prisma ORM: do zero ao avançado',
    content:
      'Tudo sobre migrations, relations, filtros complexos e o novo Prisma Adapter com pg.',
    likes: [
      { likedAt: hoursAgo(4) },
      { likedAt: hoursAgo(10) },
      { likedAt: hoursAgo(36) },
    ],
  },
  {
    id: 4,
    title: 'Nodemailer com Gmail e Senhas de App',
    content:
      'Guia completo para configurar envio de e-mails transacionais usando Gmail SMTP e autenticação segura.',
    likes: [{ likedAt: hoursAgo(6) }, { likedAt: hoursAgo(18) }],
  },
  {
    id: 5,
    title: 'Zod v4: validação de variáveis de ambiente',
    content:
      'Como usar z.preprocess, z.coerce e z.enum para garantir tipagem segura no startup da aplicação.',
    likes: [
      { likedAt: hoursAgo(72) }, 
    ],
  },
]

export class InMemoryPostsRepository implements PostsRepository {
  async findTopLikedLast24Hours(limit = 5): Promise<PostWithLikesCount[]> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    return MOCK_POSTS.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      likesCount: post.likes.filter(
        (like) => like.likedAt >= twentyFourHoursAgo,
      ).length,
    }))
      .filter((post) => post.likesCount > 0)
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, limit)
  }
}
