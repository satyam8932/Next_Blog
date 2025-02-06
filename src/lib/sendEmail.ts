// lib/email.ts
import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    attachments?: Array<{
        filename: string;
        path: string;
    }>;
}

export async function sendEmail(options: EmailOptions) {
    const transporter = nodemailer.createTransport({
        // Configure your email service here
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: options.text,
        attachments: options.attachments
    });
}