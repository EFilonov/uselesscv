import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const authConfig = {
    providers: [
        Google({
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/drive'
                }
            }
        }),
        Credentials({
            credentials: {
                email: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'johndoe@gmail.com'
                },
                password: {
                    type: 'password',
                    label: 'Password',
                    placeholder: '*****'
                }
            }
        })
    ]
    // pages: { //customize sign-in page
    //   signIn: "/auth/signin"
    // }
};
