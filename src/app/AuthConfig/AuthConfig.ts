import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
          required: true,
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
          required: true,
        }
        
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Здесь должна быть логика авторизации пользователя
        // Например, проверка в базе данных
        return null
      },
    }),
  ],
  trustHost: true,
};