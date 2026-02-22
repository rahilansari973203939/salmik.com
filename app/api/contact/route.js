import { NextResponse } from 'next/server';

// POST /api/contact - Submit contact form
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, subject, message, phone } = body;

        // In production, this would:
        // 1. Validate the input
        // 2. Save to database
        // 3. Send confirmation email
        // 4. Notify admin

        const contact = {
            id: Date.now(),
            name,
            email,
            subject,
            message,
            phone,
            status: 'new',
            createdAt: new Date().toISOString(),
        };

        return NextResponse.json({
            success: true,
            data: contact,
            message: 'Message sent successfully'
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
