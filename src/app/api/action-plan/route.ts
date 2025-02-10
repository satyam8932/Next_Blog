import { NextRequest, NextResponse } from 'next/server';
import { generateActionPlan } from '@/lib/actionPlan';
import { markdownToPdf } from '@/lib/markdownToPdf';
import { SYSTEM_PROMPT } from '@/lib/prompt';
import { prisma } from '@/lib/db';

export const maxDuration = 60; // 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const userData = await request.json();

        // Check if IP has reached limit
        const existingPlans = await prisma.actionPlan.count({
            where: {
                status: 'COMPLETED',
                OR: [
                    { ip: userData.ipAddress },
                    { email: userData.email }
                ]
            }
        });        

        if (existingPlans >= 2) {
            return NextResponse.json({
                success: false,
                message: "You have reached the maximum number of allowed action plans.",
            }, { status: 200 });
        }

        // Create action plan record
        const actionPlan = await prisma.actionPlan.create({
            data: {
                email: userData.email,
                status: 'PROCESSING',
                data: userData.data,
                ip: userData.ipAddress,
            }
        });

        try {
            // Generate the action plan
            const openaiResponse = await generateActionPlan(
                SYSTEM_PROMPT,
                JSON.stringify(userData.data)
            );

            // Convert to PDF
            const pdfResult = await markdownToPdf(openaiResponse as string);

            // Update the record
            await prisma.actionPlan.update({
                where: { id: actionPlan.id },
                data: {
                    status: 'COMPLETED',
                    pdfUrl: pdfResult,
                    completedAt: new Date(),
                    plans: existingPlans + 1
                }
            });

            // Return success response with PDF URL
            return NextResponse.json({
                success: true,
                message: "Your action plan has been generated successfully.",
                pdfUrl: pdfResult
            });

        } catch (error: any) {
            // Update record with error
            await prisma.actionPlan.update({
                where: { id: actionPlan.id },
                data: {
                    status: 'FAILED',
                    error: error.message || 'Unknown error occurred',
                    completedAt: new Date()
                }
            });

            throw error;
        }

    } catch (error: any) {
        console.error('Request processing error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to generate action plan',
                error: error.message
            },
            { status: 500 }
        );
    }
}