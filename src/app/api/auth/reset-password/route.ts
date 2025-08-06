// src/app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { Users } from '@/app/dbSchemas/userSchema';
import { connectMongo } from '@/app/services/mongoService';

import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

    await connectMongo();

    const user = await Users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
        return NextResponse.json({ error: 'Token expired or invalid' }, { status: 400 });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({ message: 'Password updated' });
}
