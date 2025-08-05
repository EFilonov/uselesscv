import { redirect } from 'next/navigation';

import { auth } from '@/app/auth';
import { RegisterForm } from '@/app/components/RegisterForm/RegisterForm';

const RegisterPage = async () => {
    const session = await auth();

    if (session?.user) {
        redirect('/');
    }
    return (
        <div>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
