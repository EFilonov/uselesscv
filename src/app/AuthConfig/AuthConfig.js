import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    providers: [
     Google(),
     Credentials({
        credentials: {
            email: {
            type: "email",
            label: "Email",
            placeholder: "johndoe@gmail.com",
            },
            password: {
            type: "password",
            label: "Password",
            placeholder: "*****",
            },
        },
    })
    ],
}