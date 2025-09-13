import { prisma } from "../utils/prisma";

export const readPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};
