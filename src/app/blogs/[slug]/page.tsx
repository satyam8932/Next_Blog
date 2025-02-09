'use client';
import { useEffect, useState, useRef } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BlogContent from '@/components/BlogContent';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

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
    const contentRef = useRef<HTMLDivElement>(null);

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/blogs/${params.slug}`);
                if (!response.ok) throw new Error('Failed to fetch post');
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

    const scrollToHeading = (headingText: string) => {
        if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll('h2, h3');
            for (const heading of headings) {
                if (heading.textContent === headingText) {
                    const headerOffset = 100;
                    const elementPosition = heading.getBoundingClientRect().top;
                    const offsetPosition = window.pageYOffset + elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    break;
                }
            }
        }
    };

    if (isLoading) return <></>;

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

    // Extract headings from content
    const getTableOfContents = () => {
        const div = document.createElement('div');
        div.innerHTML = post.content;
        const headings = div.querySelectorAll('h2, h3');
        return Array.from(headings).map(heading => ({
            title: heading.textContent || '',
            level: heading.tagName.toLowerCase() === 'h2' ? 2 : 3
        }));
    };

    const tableOfContents = getTableOfContents();

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

                {/* Content Grid - Modified for better mobile ordering */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Sidebar/Table of Contents - Now appears first on mobile */}
                    <div className="col-span-1 lg:col-span-1 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:sticky lg:top-8 space-y-6"
                        >
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-semibold mb-6">Table of Contents</h2>
                                <nav className="toc-container space-y-3">
                                    {tableOfContents.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button
                                                onClick={() => scrollToHeading(item.title)}
                                                className={`
                                                text-gray-600 hover:text-blue-600 transition-colors
                                                ${item.level === 2 ? 'font-medium' : 'pl-4 text-sm'}
                                                block w-full text-left
                                            `}
                                            >
                                                {item.title}
                                            </button>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content - Now appears second on mobile */}
                    <div className="col-span-1 lg:col-span-2 order-2 lg:order-1">
                        <div ref={contentRef} className="blog-content">
                            <BlogContent content={post.content} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}