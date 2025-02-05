import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { posts: true }
                }
            }
        })
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name, slug, description } = await request.json()
        const category = await prisma.category.create({
            data: {
                name,
                slug,
                description,
            }
        })
        return NextResponse.json(category)
    } catch (error) {
      console.log(error)
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 })
    }
}