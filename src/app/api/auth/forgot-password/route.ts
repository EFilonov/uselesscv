import { NextResponse } from 'next/server';

import { Users } from '@/app/dbSchemas/userSchema';
import { validateRecaptcha } from '@/app/lib/validateRecaptcha';
import { connectMongo } from '@/app/services/mongoService';

import { sendPasswordResetEmailSMTP, testSMTPConnection } from './../../../lib/emailServiceSMTP';
import crypto from 'crypto';

export const POST = async (request: Request) => {
    try {
        const { email, token: recaptchaToken } = await request.json();

        // Validate reCAPTCHA
        const result = await validateRecaptcha(recaptchaToken, process.env.RECAPTCHA_SECRET_KEY!);
        if (!result.success || result.score < 0.3) {
            return NextResponse.json(
                {
                    error: `❌ reCAPTCHA validation failed. Score: ${result.score || 'unknown'}`
                },
                { status: 400 }
            );
        }

        console.log(`✅ reCAPTCHA validated successfully. Score: ${result.score}`);

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await connectMongo();

        // Find user or create demo user
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user && email.includes('demo')) {
            console.log('🎭 Creating demo user for SMTP test:', email);
            // For demo we don't create user in database, just send email
        } else if (!user) {
            // In production return generic response for security
            return NextResponse.json({
                message: '✅ If an account with that email exists, a reset link has been sent.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        // Save token to database (only for real users)
        if (user) {
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetTokenExpiry;
            await user.save();
        }

        // Send email via SMTP
        try {
            await sendPasswordResetEmailSMTP(email, resetToken, user?.name);

            console.log(`📧 SMTP Email sent successfully to: ${email}`);

            return NextResponse.json(
                {
                    message: 'Password reset email sent successfully, check your inbox.',
                    method: 'SMTP (App Password)',
                    timestamp: new Date().toISOString(),
                    demo: email.includes('demo') ? true : false
                },
                { status: 200 }
            );
        } catch (emailError) {
            console.error('❌ SMTP Email sending failed:', emailError);

            // Clear token on sending error
            if (user) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                await user.save();
            }

            return NextResponse.json(
                {
                    error: 'Failed to send password reset email via SMTP',
                    details: emailError instanceof Error ? emailError.message : 'Unknown error'
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Forgot password API error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error'
            },
            { status: 500 }
        );
    }
};
