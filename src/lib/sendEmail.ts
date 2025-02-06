// lib/email.ts
import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string; // Add HTML field
    attachments?: Array<{
        filename: string;
        path: string;
    }>;
}

export async function sendEmail(options: EmailOptions) {
    const transporter = nodemailer.createTransport({
        host: 'mail.metaexpat.com',
        port: 465,
        secure: true,
        auth: {
            user: 'support@metaexpat.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        const info = await transporter.sendMail({
            from: '"MetaExpat Support" <support@metaexpat.com>',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html, // Add HTML content
            attachments: options.attachments
        });

        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}