// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, categoryId, published, featuredImage } = body;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        categoryId,
        published,
        featuredImage: featuredImage || null,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}