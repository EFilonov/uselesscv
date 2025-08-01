import { redirect } from 'next/navigation';

import { auth } from '@/app/auth';
import { LoginForm } from '@/app/components/LoginForm/LoginForm';

const SigninPage = async () => {
    const session = await auth();

    if (session?.user) {
        redirect('/');
    }

    return <LoginForm />;
};

export default SigninPage;
