// app/api/action-plan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { processActionPlan } from '@/lib/processActionPlan';

export async function POST(request: NextRequest) {
    try {
        const userData = await request.json();

        processActionPlan(userData).catch((error : any) => {
            console.error('Background task failed:', error);
        });

        return NextResponse.json({
            success: true,
            message: "Your action plan is being generated. You will receive an email when it's ready.",
            estimatedTime: "5-10 minutes"
        });

    } catch (error) {
        console.error('Request processing error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to initiate action plan generation' ,
                estimatedTime: ""
            },
            { status: 500 }
        );
    }
}