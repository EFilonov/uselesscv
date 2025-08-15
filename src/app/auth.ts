import { Users } from '@/app/dbSchemas/userSchema';
import { connectMongo } from '@/app/services/mongoService';

import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!
        }),
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                await connectMongo();
                const user = null;

                const foundUser = await Users.findOne({ email: credentials?.email });
                if (!foundUser) return user;

                const isValid = bcrypt.compareSync(credentials.password as string, foundUser.password as string);

                if (!isValid) return null;

                return {
                    id: foundUser._id.toString(),
                    name: foundUser.name,
                    email: foundUser.email
                };
            }
        })
    ],
    pages: {
        signIn: '/auth/signin' // ваша кастомная страница входа
        // signOut: '/auth/signout', // опционально
        // error: '/auth/error', // опционально
    },

    session: {
        strategy: 'jwt', // or "database"
        maxAge: 60 * 30 // 0.5 hour
    }
});
