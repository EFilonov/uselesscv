import { NextResponse } from 'next/server';

import { Users } from '@/app/dbSchemas/userSchema';
import { connectMongo } from '@/app/services/mongoService';

import bcrypt from 'bcrypt';

export const POST = async (request: Request) => {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        await connectMongo();

        // Проверка на существующего пользователя
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Users({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
