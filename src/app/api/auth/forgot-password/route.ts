import { NextResponse } from 'next/server';

import { Users } from '@/app/dbSchemas/userSchema';
import { sendPasswordResetEmail } from '@/app/lib/mail';
import { validateRecaptcha } from '@/app/lib/validateRecaptcha';
import { connectMongo } from '@/app/services/mongoService';

import crypto from 'crypto';

export const POST = async (request: Request) => {
    try {
        const { email, token: recaptchaToken } = await request.json();
        const result = await validateRecaptcha(recaptchaToken, process.env.RECAPTCHA_SECRET_KEY!);
        console.log('Recaptcha token from submit form(site key):', recaptchaToken);
        console.log('Recaptcha secret key:', process.env.RECAPTCHA_SECRET_KEY);
        console.log('Recaptcha result.success:', result.success);
        console.log('Recaptcha validation result:', result);

        if (!result.success) {
            return NextResponse.json({ error: 'Recaptcha validation failed' }, { status: 400 });
        }

        if (!email) {
            return new NextResponse('Email is required', { status: 400 });
        }
        await connectMongo();
        const user = await Users.findOne({ email });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 час

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await user.save();

        await sendPasswordResetEmail(email, token);
        return new NextResponse('Reset password link sent to your email', { status: 200 });
    } catch (error) {
        console.error('Error in reset password route:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const GET = async () => {
    return new NextResponse('Reset password route is ready', { status: 200 });
};

//D:\React\next\useless-cv\src\app\api\auth\forgot-password\route.ts
