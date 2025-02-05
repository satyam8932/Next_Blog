import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET single category
export async function GET(
    request: Request,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = await context.params; // Removed unnecessary await
        const category = await prisma.category.findUnique({
            where: { slug },
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching category' },
            { status: 500 }
        );
    }
}

// PUT/UPDATE category
export async function PUT(
    request: Request,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = await context.params; // Removed unnecessary await
        const body = await request.json();
        const { name, slug: newSlug, description } = body;

        // Check if new slug already exists (if slug is being changed)
        if (newSlug !== slug) {
            const existing = await prisma.category.findUnique({
                where: { slug: newSlug },
            });

            if (existing) {
                return NextResponse.json(
                    { error: 'Slug already exists' },
                    { status: 400 }
                );
            }
        }

        const category = await prisma.category.update({
            where: { slug },
            data: { name, slug: newSlug, description },
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error updating category' },
            { status: 500 }
        );
    }
}

// DELETE category
export async function DELETE(
    request: Request,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = await context.params; // Removed unnecessary await

        // First check if category exists
        const category = await prisma.category.findUnique({
            where: { slug },
            include: { _count: { select: { posts: true } } }
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        // Prevent deletion if category has posts
        if (category._count.posts > 0) {
            return NextResponse.json(
                { error: 'Cannot delete category with existing posts. Please reassign or delete the posts first.' },
                { status: 400 }
            );
        }

        // Delete the category
        await prisma.category.delete({ where: { slug } });

        return NextResponse.json(
            { message: 'Category deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json(
            { error: 'Error deleting category' },
            { status: 500 }
        );
    }
}