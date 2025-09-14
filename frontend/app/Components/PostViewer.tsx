'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: string[];
}

export default function PostViewer() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch post');
        return res.json();
      })
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  if (!id) return <p className="p-6">Missing post ID</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post.postedBy} • {new Date(post.postedAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg mb-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p className="text-sm text-gray-600 mb-4">
        Tags: {post.tags.join(', ')}
      </p>
      <Link href="/" className="text-blue-600 hover:underline font-medium">
        ← Back to all posts
      </Link>
    </main>
  );
}
