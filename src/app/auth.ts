import { authConfig } from "@/app/config/authConfig";
import NextAuth from "next-auth";
 
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
