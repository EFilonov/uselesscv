import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { connectMongo } from "../services/mongoService";
import { Users } from "../dbSchemas/userSchema";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo() 
        console.log("Credentials:", credentials);
        const foundUser = await Users.findOne({ email: credentials?.email });
        if (!foundUser) console.log("User not found");

        // Проверяем email и пароль
        if (
          credentials?.email === "kip@kip.kip" &&
          credentials?.password === "111"
        ) {
          return {
            id: "test-user-id",
            name: "Test User",
            email: "kip@kip.kip",
          };
        }

        // Если не совпадает — возвращаем null
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
};