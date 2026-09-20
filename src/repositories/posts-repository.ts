export interface PostWithLikesCount {
  id: number
  title: string
  content: string
  likesCount: number
}

export interface PostsRepository {
  findTopLikedLast24Hours(limit?: number): Promise<PostWithLikesCount[]>
}
