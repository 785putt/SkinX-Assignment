'use client';
import { useEffect, useState } from 'react';
// import Link from 'next/link';
import axios from 'axios';
import dynamic from 'next/dynamic'
import LogoutButton from './Components/LogoutButton';
// import PostCard from './Components/PostCard';

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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    // const token = document.cookie
    //   .split('; ')
    //   .find(row => row.startsWith('token='))
    //   ?.split('=')[1]

    // if (!token) {
    //   router.push('/login')
    //   return
    // }

    // Attach token to Authorization header
    setLoading(true);
    axios
      .get(`http://localhost:8080/paginate?page=${page}&limit=${limit}`, {   // http://localhost:8080/posts  for full list (non-paginated)
        withCredentials: true,
      })
      .then(res => {
        console.log('Fetched posts:', res.data);
        // setPosts(res.data);  if using /posts endpoint
        setPosts(res.data.posts);  
        setTotal(res.data.totalPosts); 
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      })
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    console.log('Fetching page:', page)
    // axios call...
  }, [page])


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

  // calculate total pages
  const totalPages = Math.ceil(total / limit)

  // Lazy load PostCard skeletal UI component
  const LazyPostCard = dynamic(() => import('./Components/PostCard'), {
  loading: () => (
      <div className="animate-pulse bg-white rounded-lg shadow p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    ),
    ssr: false,
  })

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
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg shadow p-6 space-y-4"
            >
              <div className="h-6 bg-gray-300 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-20 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        displayed.map(post => (
          <LazyPostCard key={post.id} post={post} />
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next →
          </button>
        </div>

        {/* Page Jump Input */}
        <form
          onSubmit={e => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const input = form.pageInput as HTMLInputElement
            const targetPage = Math.max(1, Math.min(Number(input.value), totalPages))
            setPage(targetPage)
            input.value = ''
          }}
          className="flex items-center gap-2"
        >
          <input
            type="number"
            name="pageInput"
            min={1}
            max={totalPages}
            placeholder={`1–${totalPages}`}
            className="w-20 px-2 py-1 border rounded text-sm"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Go
          </button>
        </form>
      </div>

    </div>
  );
}