'use client';
import { useEffect, useState } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BlogContent from '@/components/BlogContent';
import { format } from 'date-fns';
import { LoadingScreen } from '@/components/LoadingSpinner';

interface Post {
    id: string;
    title: string;
    content: string;
    featuredImage: string;
    createdAt: string;
    author: string;
    category: {
        name: string;
        slug: string;
    };
}

export default function BlogPost() {
    const params = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/blogs/${params.slug}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }

                const data = await response.json();
                setPost(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch post');
            } finally {
                setIsLoading(false);
            }
        };

        if (params.slug) {
            fetchPost();
        }
    }, [params.slug]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error || !post) {
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-lg text-red-600">{error || 'Post not found'}</div>
                </div>
                <Footer />
            </>
        );
    }

    // Generate table of contents from content
    // This is a simple example - you might want to use a markdown parser
    // or implement a more sophisticated way to generate the TOC
    // const tableOfContents = post.content
    //     .match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g)
    //     ?.map((match, index) => ({
    //         id: index + 1,
    //         title: match.replace(/<\/?[^>]+(>|$)/g, ""),
    //     })) || [];

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm mb-6">
                    <Link href="/blogs" className="text-blue-600 hover:text-blue-700">
                        BLOG
                    </Link>
                    <span className="text-gray-500">/</span>
                    <Link
                        href={`/blogs`}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        {post.category.name.toUpperCase()}
                    </Link>
                </div>

                {/* Article Header */}
                <div className="max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
                        <span>{post.author}</span>
                        <span>{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative h-[500px] w-full rounded-3xl overflow-hidden mb-12">
                    <Image
                        src={post.featuredImage || '/default-blog-image.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="prose prose-lg max-w-none">
                            <BlogContent content={post.content} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Table of Contents */}
                        <div className="sticky top-8 space-y-6">
                            {/* <div className="bg-gray-50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4">Content</h2>
                                <nav className="space-y-2">
                                    {tableOfContents.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#section-${item.id}`}
                                            className="block text-sm text-gray-600 hover:text-blue-600"
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                </nav>
                            </div> */}

                            {/* CTA Card */}
                            <div className="bg-[#0A0B14] text-white rounded-2xl p-6">
                                <h3 className="text-2xl font-bold mb-4">Save up to 50%</h3>
                                <p className="text-gray-300 mb-6">
                                    Receive up to 6 free quotes from international movers in 3 simple steps.
                                    Start comparing now!
                                </p>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg">
                                    Get started →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}