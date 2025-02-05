import { Suspense } from 'react';
import BlogForm from '@/components/BlogsCreateEdit';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  // Await the params object
  const { slug } = await params;

  // Validate the slug parameter
  if (!slug) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <BlogForm mode="edit" slug={slug} />
    </Suspense>
  );
}
