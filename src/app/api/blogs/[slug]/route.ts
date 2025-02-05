// app/api/posts/[slug]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  // Await the params object
  const { slug } = await params;

  // Fetch the post from the database
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      category: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, content, categoryId, published, featuredImage } = body;

    const updateData: any = {
      title,
      content,
      categoryId,
      published,
    };

    // Only include featuredImage if it's provided
    if (featuredImage !== undefined) {
      updateData.featuredImage = featuredImage;
    }

    const post = await prisma.post.update({
      where: {
        slug: slug,
      },
      data: updateData,
      include: {
        category: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;
    await prisma.post.delete({
      where: {
        slug: slug,
      },
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}