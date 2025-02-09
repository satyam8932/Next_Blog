'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { Share2 } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  category: {
    name: string;
  };
  createdAt: string;
}

interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPosts: number;
  totalPages: number;
}

const DestinationInsights = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<PaginationMetadata | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/blogs?page=${page}&limit=3`);
      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      setPosts(data.posts);
      setMetadata(data.metadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (slug: string) => {
    const url = `${window.location.origin}/blogs/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!', {
        duration: 2000,
        position: 'top-center',
      });
    } catch (err) {
      toast.error('Failed to copy link', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  if (error) {
    return (
      <div className="text-center text-red-600 py-12">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 md:px-20 py-28 bg-gradient-to-b from-gray-50 to-white rounded-3xl">
        {/* Header Section */}
        <div className='text-center mb-16'>
          <p className="text-blue-600">GUIDE TO LIVING, WORKING, AND THIRIVING IN UAE</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">The MetaExpat Blog</h2>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage || '/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {post.category.name}
                    </span>
                    <button
                      onClick={() => handleShare(post.slug)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Share post"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {post.title}
                  </h3>

                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <span>Read more</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default DestinationInsights;