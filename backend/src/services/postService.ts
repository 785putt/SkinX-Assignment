// src/services/postService.ts
import { prisma } from "../utils/prisma";

export async function getPaginatedPosts(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { postedAt: 'desc' } // optional but recommended
    }),
    prisma.post.count()
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    list: posts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

// Route testing example: /paginate?page=1&limit=10