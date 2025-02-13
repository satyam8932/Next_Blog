// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, categoryId, published, featuredImage } = body;

    if (!title || !slug || !content || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        categoryId,
        published: published ?? false, // Default to false if not provided
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 3;
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    // Validate pagination inputs
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;
    const where: Prisma.PostWhereInput = {
      published: true, // Only published posts for public API
    };

    // Apply category filter
    if (categoryId) where.categoryId = categoryId;

    // Add search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fetch posts and total count
    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          featuredImage: true,
          content: true,
          createdAt: true,
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      metadata: {
        currentPage: page,
        pageSize: limit,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching posts:", error);
    return NextResponse.json(
      {
        error: "Error fetching posts",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}