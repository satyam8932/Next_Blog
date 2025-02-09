import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendEmail';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Please fill in all fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            );
        }

        // Send email to support
        await sendEmail({
            to: 'support@metaexpat.com',
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <br>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });

        // Send confirmation email to user
        await sendEmail({
            to: email,
            subject: '',
            text: `
Dear ${name},

Thank you for contacting MetaExpat. We have received your message and will get back to you as soon as possible.

Your message:
${message}

Best regards,
The MetaExpat Team
            `,
            html: `
                <h2>Thank you for contacting MetaExpat</h2>
                <p>Dear ${name},</p>
                <p>Thank you for contacting MetaExpat. We have received your message and will get back to you as soon as possible.</p>
                <br>
                <p><strong>Your message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <br>
                <p>Best regards,</p>
                <p>The MetaExpat Team</p>
            `
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}