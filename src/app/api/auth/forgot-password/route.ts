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
        if (!result.success) {
            return NextResponse.json({ error: 'ReCAPTCHA validation failed' }, { status: 400 });
        }

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        await connectMongo();
        const user = await Users.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User with this email does not exist' },
                { status: 404 } // 404 для несуществующего пользователя
            );
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await user.save();

        // Send email with improved error handling
        try {
            await sendPasswordResetEmail(email, token);
            return NextResponse.json(
                { message: 'Reset email sent successfully. Please check your inbox.' },
                { status: 200 }
            );
        } catch (emailError) {
            // Clear token if email failed to send
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export const GET = async () => {
    return NextResponse.json({ message: 'Forgot password endpoint is ready' }, { status: 200 });
};
