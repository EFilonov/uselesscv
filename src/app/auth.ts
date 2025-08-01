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
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                await connectMongo();
                const user = null;

                const foundUser = await Users.findOne({ email: credentials?.email });
                if (!foundUser) return user;
                console.log('Found user:', foundUser);

                const hash = bcrypt.hashSync('12345678' as string, 8);

                console.log('Hash:', hash);
                console.log('Found user password:', foundUser.password);
                console.log('Credentials password:', credentials.password);

                const isValid = bcrypt.compareSync(credentials.password as string, foundUser.password as string);
                console.log('isValid:', isValid);
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
