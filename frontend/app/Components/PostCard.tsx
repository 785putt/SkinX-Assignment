import React from 'react'

import Link from 'next/link';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    postedAt: string;
    postedBy: string;
    tags: string[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      key={post.id}
      href={`/posts/?id=${post.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6 mb-6"
    >
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {post.postedBy} •{' '}
        {new Date(post.postedAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-sm text-gray-700 line-clamp-3 mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p className="text-sm text-gray-600">
        Tags: {post.tags?.join(', ') || 'None'}
      </p>
    </Link>
  )
}
