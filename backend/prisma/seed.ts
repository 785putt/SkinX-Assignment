import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const posts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));
  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        postedAt: new Date(post.postedAt),
        postedBy: post.postedBy,
        tags: post.tags
      }
    });
  }
  console.log('Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
