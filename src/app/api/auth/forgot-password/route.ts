import { NextResponse } from 'next/server';

import { Users } from '@/app/dbSchemas/userSchema';
import { sendPasswordResetEmail } from '@/app/lib/mail';
import { validateRecaptcha } from '@/app/lib/validateRecaptcha';
import { connectMongo } from '@/app/services/mongoService';

import crypto from 'crypto';

export const POST = async (request: Request) => {
    try {
        const { email, token: recaptchaToken } = await request.json();

        // Validate reCAPTCHA
        const result = await validateRecaptcha(recaptchaToken, process.env.RECAPTCHA_SECRET_KEY!);
        if (!result.success || result.score < 0.3) {
            return NextResponse.json(
                {
                    error: `reCAPTCHA validation failed. Score: ${result.score || 'unknown'}`
                },
                { status: 400 }
            );
        }

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await connectMongo();

        // Для демо - создаем временного пользователя если это demo email
        const user = await Users.findOne({ email });

        if (!user && email.includes('demo')) {
            // Создаем временного пользователя для демо
            console.log('Creating demo user for verification:', email);
        } else if (!user) {
            return NextResponse.json({ error: 'User with this email does not exist' }, { status: 404 });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        if (user) {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = expires;
            await user.save();
        }

        // Send email using Gmail Send scope
        try {
            await sendPasswordResetEmail(email, token);
            console.log(`🎥 DEMO: Password reset email sent to: ${email} using gmail.send scope`);

            return NextResponse.json(
                {
                    message: 'Password reset email sent successfully using Gmail Send scope! Check your inbox.',
                    scope: 'gmail.send',
                    timestamp: new Date().toISOString()
                },
                { status: 200 }
            );
        } catch (emailError) {
            console.error('Gmail Send scope error:', emailError);

            if (user) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                await user.save();
            }

            return NextResponse.json(
                {
                    error: 'Failed to send email using Gmail Send scope',
                    details: emailError instanceof Error ? emailError.message : 'Unknown error'
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Forgot password API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const GET = async () => {
    return NextResponse.json({ message: 'Forgot password endpoint is ready' }, { status: 200 });
};
