'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
}

// Define props type for page
interface EditCategoryProps {
    params: {
        slug: string;
    };
}

export default function EditCategory({ params }: EditCategoryProps) {
    const router = useRouter();
    const { slug } = params;
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
    });

    // Fetch category data
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`/api/categories/${slug}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch category');
                }

                setCategory(data);
                setFormData({
                    name: data.name,
                    slug: data.slug,
                    description: data.description || '',
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch category');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        try {
            const response = await fetch(`/api/categories/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update category');
            }

            router.push('/admin/categories');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update category');
        } finally {
            setIsSaving(false);
        }
    };

    // Generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setFormData(prev => ({
            ...prev,
            name: newName,
            slug: generateSlug(newName),
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!category && !isLoading) {
        return (
            <div className="text-center py-8 text-red-600">
                Category not found
            </div>
        );
    }

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

            <h1 className="text-2xl font-semibold mb-6">Edit Category</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-full">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleNameChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Slug
                    </label>
                    <input
                        type="text"
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}  
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        This is the URL-friendly version of the name. It should contain only lowercase letters, numbers, and hyphens.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Enter category description..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Provide a brief description of what this category represents.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>

                    <Link
                        href="/admin/categories"
                        className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}