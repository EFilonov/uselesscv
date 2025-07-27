// import NextAuth from "next-auth";
import { authConfig } from "@/app/AuthConfig/AuthConfig";
import NextAuth from "next-auth"

 
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
export const { GET, POST } = handlers;

