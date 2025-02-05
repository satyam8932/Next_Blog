'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import AdminLayout from '@/app/admin/page';
import Link from 'next/link';
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { Category, PostCreateInput } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import BlogEditor from './BlogEditor';

type Props = {
  mode?: 'create' | 'edit';
  slug?: string;
};

export default function BlogForm({ mode = 'create', slug }: Props) {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const cursorPosRef = useRef<{ start: number; end: number } | null>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isCheckingSlug, setIsCheckingSlug] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsInitialLoading(true);
        // Fetch categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();

        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }

        setCategories(categoriesData);

        // If editing, fetch post data
        if (mode === 'edit' && slug) {
          const postResponse = await fetch(`/api/blogs/${slug}`);

          if (postResponse.status === 404) {
            router.push('/admin/blogs'); // Redirect if post not found
            return;
          }

          const postData = await postResponse.json();

          if (!postResponse.ok) {
            throw new Error('Failed to fetch post');
          }

          setTitle(postData.title);
          setContent(postData.content);
          setSelectedCategory(postData.categoryId);
          if (postData.featuredImage) {
            setFeaturedImage(postData.featuredImage);
            setPreviewImage(postData.featuredImage); // Set previewImage to the featuredImage URL
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
  }, [mode, slug, router]);

  const generateUniqueSlug = async (baseSlug: string): Promise<string> => {
    let uniqueSlug = baseSlug;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      try {
        // Check if the current slug exists
        const response = await fetch(`/api/blogs/check-slug/${uniqueSlug}`);
        const data = await response.json();

        if (mode === 'edit' && slug === uniqueSlug) {
          // If we're editing and this is the current post's slug, it's fine to use
          isUnique = true;
        } else if (response.status === 404) {
          // 404 means slug doesn't exist, so we can use it
          isUnique = true;
        } else {
          // Slug exists, append counter and try again
          uniqueSlug = `${baseSlug}-${counter}`;
          counter++;
        }
      } catch (err) {
        console.error('Error checking slug:', err);
        // In case of error, append timestamp to make it unique
        uniqueSlug = `${baseSlug}-${Date.now()}`;
        isUnique = true;
      }
    }

    return uniqueSlug;
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || '';
    if (textareaRef.current) {
      cursorPosRef.current = {
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      };
    }
    setContent(newValue);
  };

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploadingImage(true);
        setError("");

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to server
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to upload image');
        }

        // Save the Cloudinary URL
        setFeaturedImage(data.url);
        setPreviewImage(data.url); // Set previewImage to the uploaded image URL
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload image');
        setPreviewImage('');
        setFeaturedImage(null);
      } finally {
        setIsUploadingImage(false);
      }
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>, isDraft: boolean = false) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const baseSlug = generateSlug(title);
      const uniqueSlug = await generateUniqueSlug(baseSlug);

      const postData: PostCreateInput = {
        title,
        slug: uniqueSlug,
        content,
        categoryId: selectedCategory,
        published: !isDraft,
      };

      // Only add featuredImage if it exists
      if (featuredImage) {
        postData.featuredImage = featuredImage;
      }
      const url = mode === 'edit' ? `/api/blogs/${slug}` : '/api/blogs';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${mode} post`);
      }

      router.push('/admin/blogs');

    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${mode} post`);
    } finally {
      setIsLoading(false);
    }
  }, [title, content, selectedCategory, featuredImage, mode, router, slug]);
  console.log(previewImage)
  if (isInitialLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  const ImageUploadSection = () => {
    if (isUploadingImage) {
      return (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
          <span className="text-sm text-gray-500">Uploading image...</span>
        </div>
      );
    }

    if (previewImage) {
      return (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300">
          <div className="relative w-full h-full">
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              onLoad={() => console.log('Image loaded')}
            />
          </div>
          <Button
            type="button"
            onClick={() => {
              setFeaturedImage(null);
              setPreviewImage("");
            }}
            className="absolute top-3 right-3 bg-white hover:bg-red-50 text-red-500 rounded-full p-2 shadow-lg"
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 hover:bg-gray-50 transition-all duration-200">
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-10 h-10 text-gray-400 mb-3" />
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Click to upload
            </span>
            <span className="text-xs text-gray-500 mt-1">
              or drag and drop
            </span>
            <span className="text-xs text-gray-400 mt-2">
              PNG, JPG, GIF (max 10MB)
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploadingImage}
          />
        </label>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <Link
            href="/admin/blogs"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>
        </div>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            {mode === 'edit' ? 'Edit Blog' : 'Create New Blog'}
          </h1>
          <Link href="/admin/blogs" className="text-gray-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </Link>
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Featured Image
            </label>
            <ImageUploadSection />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <BlogEditor
              content={content}
              onChange={(newContent) => setContent(newContent)}
            />

          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e as any, true)}
              disabled={isLoading || isUploadingImage || isCheckingSlug}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              {isCheckingSlug ? 'Checking slug...' : 'Save as Draft'}
            </button>
            <button
              type="submit"
              disabled={isLoading || isUploadingImage || isCheckingSlug}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : isCheckingSlug ? 'Checking slug...' : mode === 'edit' ? 'Save Changes' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}