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
    const status = searchParams.get("status");

    // ✅ Validate Pagination Inputs
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;
    const where: Prisma.PostWhereInput = {};

    // ✅ Filter by Category ID (if provided)
    if (categoryId) where.categoryId = categoryId;

    // ✅ Handle Status Filtering
    if (status === "published") {
      where.published = true;
    } else if (status === "draft") {
      where.published = false;
    } else {
      where.published = true; // Default: Fetch only published posts
    }

    // ✅ Fetch Posts & Total Count Concurrently
    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
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