'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Define types
type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  category: {
    name: string;
  };
};

interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPosts: number;
  totalPages: number;
}

export default function BlogsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [metadata, setMetadata] = useState<PaginationMetadata | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/blogs/admin?page=${currentPage}&limit=10${
                    searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
                }`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch posts');
                }
                
                setPosts(data.posts);
                setMetadata(data.metadata);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch posts');
            } finally {
                setIsLoading(false);
            }
        };
    
        const debounceTimer = setTimeout(fetchPosts, 300);
        return () => clearTimeout(debounceTimer);
    }, [currentPage, searchQuery]);

    // Handle delete
    const handleDelete = async (slug: string) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await fetch(`/api/blogs/${slug}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            // Refetch posts after deletion
            const updatedResponse = await fetch(`/api/blogs?page=${currentPage}&limit=10`);
            const updatedData = await updatedResponse.json();
            setPosts(updatedData.posts);
            setMetadata(updatedData.metadata);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete post');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-semibold">Blogs</h1>
                <div className="flex items-center flex-col md:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                        />
                    </div>
                    <Link
                        href="/admin/blogs/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Create New Blog
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="h-16 bg-gray-100 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                            No blogs found
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {post.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {post.category.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    post.published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {post.published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={`/admin/blogs/edit/${post.slug}`}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.slug)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {metadata && metadata.totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <p className="text-sm text-gray-700">
                                Showing {(metadata.currentPage - 1) * metadata.pageSize + 1} to{' '}
                                {Math.min(metadata.currentPage * metadata.pageSize, metadata.totalPosts)} of{' '}
                                {metadata.totalPosts} results
                            </p>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                
                                {Array.from({ length: metadata.totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'border hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, metadata.totalPages))}
                                    disabled={currentPage === metadata.totalPages}
                                    className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}