'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { ArrowLeft, X } from "lucide-react";

export default function CreateCategory() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Generate slug from name
    const generateSlug = useCallback((text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }, []);

    // Update slug when name changes
    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setSlug(generateSlug(newName));
    }, [generateSlug]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    slug,
                    description,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create category');
            }

            // Redirect to categories list on success
            router.push('/admin/categories');
            router.refresh();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create category');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
                <Link
                    href="/admin/categories"
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                    <ArrowLeft size={20} />
                    Back to Categories
                </Link>
            </div>
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Create Category</h1>
                <Link
                    href="/admin/categories"
                    className="text-gray-600 hover:text-gray-900"
                >
                    <X className="w-6 h-6" />
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-700"
                        placeholder="Enter category name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-700"
                        placeholder="category-slug"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        This is the URL-friendly version of the name. It should contain only lowercase letters, numbers, and hyphens.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-700 resize-none"
                        placeholder="Category description..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Provide a brief description of what this category represents.
                    </p>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        onClick={() => router.back()}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Category'}
                    </button>
                </div>
            </form>
        </div>
    );
}