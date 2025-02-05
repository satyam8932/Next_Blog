import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop(); // Extracts slug

  if (!slug) {
    return NextResponse.json({ error: 'Slug is missing' }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is missing' }, { status: 400 });
    }

    const body = await request.json();
    const { title, content, categoryId, published, featuredImage } = body;

    const updateData: Record<string, any> = { title, content, categoryId, published };
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;

    const post = await prisma.post.update({
      where: { slug },
      data: updateData,
      include: { category: true },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is missing' }, { status: 400 });
    }

    await prisma.post.delete({
      where: { slug },
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
