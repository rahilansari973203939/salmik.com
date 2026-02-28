import { NextResponse } from 'next/server';

// This is where you integrate your email service
// You can use Nodemailer, SendGrid, EmailJS, or any other email service

// POST /api/auth/send-otp
export async function POST(request) {
    try {
        const body = await request.json();
        const { email, otp, purpose } = body;

        if (!email || !otp) {
            return NextResponse.json(
                { success: false, error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        // ============================================
        // HERE IS WHERE YOU INTEGRATE YOUR EMAIL SERVICE
        // ============================================

        // Option 1: Using Nodemailer (recommended for Gmail/SMTP)
        /*
        const nodemailer = require('nodemailer');
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-app-password'
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: `Your OTP for ${purpose || 'verification'}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Your OTP Code</h2>
                    <p>Your OTP is: <strong style="font-size: 24px;">${otp}</strong></p>
                    <p>This OTP will expire in 10 minutes.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        */

        // Option 2: Using SendGrid
        /*
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
            to: email,
            from: 'your-email@example.com',
            subject: `Your OTP for ${purpose || 'verification'}`,
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`
        };
        
        await sgMail.send(msg);
        */

        // Option 3: Using EmailJS (frontend-friendly)
        /*
        // Call from frontend instead of backend
        */

        // For now, we'll just log the OTP (demo mode)
        console.log(`📧 Sending OTP ${otp} to ${email} for ${purpose || 'verification'}`);

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully'
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send OTP' },
            { status: 500 }
        );
    }
}
