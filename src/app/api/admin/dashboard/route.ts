import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get counts
    const [totalPlans, completedPlans, failedPlans, processingPlans, recentPlans, dailyStats] = await Promise.all([
      prisma.actionPlan.count(),
      prisma.actionPlan.count({ where: { status: 'COMPLETED' } }),
      prisma.actionPlan.count({ where: { status: 'FAILED' } }),
      prisma.actionPlan.count({ where: { status: 'PROCESSING' } }),
      prisma.actionPlan.findMany({
        take: 10,
        orderBy: { startedAt: 'desc' },
      }),
      prisma.actionPlan.groupBy({
        by: ['startedAt'],
        _count: {
          id: true
        },
        orderBy: {
          startedAt: 'asc'
        },
        take: 7, // Last 7 days
      })
    ]);

    // Format daily stats
    const formattedDailyStats = dailyStats.map(stat => ({
      date: stat.startedAt.toISOString(),
      count: stat._count.id
    }));

    return NextResponse.json({
      totalPlans,
      completedPlans,
      failedPlans,
      processingPlans,
      recentPlans,
      dailyStats: formattedDailyStats
    });

  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}