import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { getPaginatedPosts } from '../services/postService';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// GET all posts
router.get('/posts', authenticate , async (_req, res) => {
  try {
    const posts = await prisma.post.findMany({
      take: 100,
      orderBy: { postedAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET paginated posts
router.get('/paginate', authenticate , async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10; // Cap limit to 100 max
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { postedAt: 'desc' },
    });

    const total = await prisma.post.count();

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      posts,
    });
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single post by ID
router.get('/posts/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
