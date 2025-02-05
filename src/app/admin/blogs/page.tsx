'use client';
import Link from "next/link";
import AdminLayout from "../page";
import { useEffect, useState } from "react";
import { format } from "date-fns"; // Install with: npm install date-fns

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

export default function BlogsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blogs');
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch posts');
                }
                
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch posts');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

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

            // Remove the deleted post from state
            setPosts(posts.filter(post => post.slug !== slug));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete post');
        }
    };

    return (
        <AdminLayout>
            <div className="bg-white rounded-lg shadow p-6">
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Blogs</h1>
                    <Link
                        href="/admin/blogs/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Create New Blog
                    </Link>
                </div>

                {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
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
                                        <tr key={post.id}>
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
                )}
            </div>
        </AdminLayout>
    );
}