// pages/articles.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { format } from 'date-fns'; // Install with: npm install date-fns

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  published: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function Articles() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // Fetch categories and posts
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch categories
                const categoriesResponse = await fetch('/api/categories');
                const categoriesData = await categoriesResponse.json();
                
                if (!categoriesResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }
                
                setCategories(categoriesData);

                // Fetch posts
                const postsResponse = await fetch('/api/blogs');
                const postsData = await postsResponse.json();
                
                if (!postsResponse.ok) {
                    throw new Error('Failed to fetch posts');
                }
                
                setBlogPosts(postsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter posts based on search and category
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || post.category.id === selectedCategory;
        return matchesSearch && matchesCategory && post.published;
    });

    if (error) {
        return <div className="text-center text-red-600 py-8">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12">
                    <Image
                        src="/blogs.jpg"
                        alt="Map background"
                        fill
                        className="object-cover"
                        priority
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-bold text-white">
                                Articles
                            </h1>

                            {/* Search Bar */}
                            <div className="max-w-xl w-full mx-auto mt-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Search for an article"
                                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-12">
                    <button
                        className={`px-4 py-2 rounded-full text-sm ${
                            !selectedCategory
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCategory('')}
                    >
                        All Articles
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full text-sm ${
                                selectedCategory === category.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                {isLoading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="group">
                                <Link href={`/blogs/${post.slug}`}>
                                    <div className="space-y-4">
                                        <div className="relative h-48 rounded-2xl overflow-hidden">
                                            <Image
                                                src={post.featuredImage || '/default-blog-image.jpg'}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-blue-600">
                                                {post.category.name}
                                            </p>
                                            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                                Read more →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                {!isLoading && filteredPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No articles found matching your criteria.
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}