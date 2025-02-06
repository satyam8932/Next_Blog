// lib/backgroundTasks.ts
import { generateActionPlan } from '@/lib/actionPlan';
import { markdownToPdf } from '@/lib/markdownToPdf';
import { SYSTEM_PROMPT } from '@/lib/prompt';
import { sendEmail } from '@/lib/sendEmail';
import { prisma } from './db';

interface ActionPlanTask {
    email: string;
    data: any;
}

export async function processActionPlan(userData: ActionPlanTask) {
    let actionPlan;

    try {
        actionPlan = await prisma.actionPlan.create({
            data: {
                email: userData.email,
                status: 'PROCESSING',
                data: userData.data,
            }
        });

        const openaiResponse = await generateActionPlan(
            SYSTEM_PROMPT, 
            JSON.stringify(userData.data)
        );

        const pdfResult = await markdownToPdf(openaiResponse as string);

        await prisma.actionPlan.update({
            where: { id: actionPlan.id },
            data: {
                status: 'COMPLETED',
                pdfUrl: pdfResult,
                completedAt: new Date()
            }
        });

        // await sendEmail({
        //     to: userData.email,
        //     subject: 'Your Action Plan is Ready',
        //     text: 'Your personalized action plan has been generated and is attached to this email.',
        //     attachments: [{
        //         filename: 'action-plan.pdf',
        //         path: pdfResult
        //     }]
        // });

    } catch (error: any) {
        console.error('Background processing failed:', error);
        
        if (actionPlan) {
            await prisma.actionPlan.update({
                where: { id: actionPlan.id },
                data: {
                    status: 'FAILED',
                    error: error.message || 'Unknown error occurred',
                    completedAt: new Date()
                }
            });
        }

        // await sendEmail({
        //     to: userData.email,
        //     subject: 'Action Plan Generation Failed',
        //     text: 'We encountered an error while generating your action plan. Please try again later.'
        // });
    }
}