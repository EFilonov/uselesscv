import { NextResponse } from 'next/server';

import { auth } from '@/app/auth';
import { connectMongo } from '@/app/services/mongoService';

import { Users } from './../../../dbSchemas/userSchema';

export async function GET() {
    await connectMongo();
    Users.find({})
        .then((users) => {
            return console.log(users);
        })
        .catch((err) => {
            console.error('Error fetching users:', err);
        });
    return new NextResponse('Hello from the user route!');
}
