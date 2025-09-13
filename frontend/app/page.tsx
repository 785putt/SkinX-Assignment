'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import LogoutButton from './Components/LogoutButton';

export default function HomePage() {
  type Post = {
    id: number;
    title: string;
    content: string;
    postedAt: string;
    postedBy: string;
    tags: string[];
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      router.push('/login')
      return
    }

    // ✅ Attach token to Authorization header
    axios
      .get('http://localhost:8080/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('Fetched posts:', res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      })
      .finally(() => setLoading(false));
  }, [])


  // derive unique tags
  const tags = Array.from(
    new Set(posts?.flatMap?.(post => post.tags || []) || [])
  )

  // filter posts by selected tag
  const displayed: Post[] = Array.isArray(posts)
    ? selectedTag
      ? posts.filter(post => post.tags?.includes(selectedTag))
      : posts
    : []

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <LogoutButton />
      </div>
      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 mb-8 mt-4">
        <button
          className={`px-3 py-1 rounded-full ${
            selectedTag === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setSelectedTag(null)}
        >
          All
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full ${
              selectedTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <p>Loading…</p>
      ) : displayed.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        displayed.map(post => (
          <Link
            key={post.id}
            href={`/`}
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
              Tags: {post.tags?.join(', ')}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}