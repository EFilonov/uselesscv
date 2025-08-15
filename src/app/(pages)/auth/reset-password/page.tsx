import { Suspense } from 'react';

import { ResetPasswordForm } from '@/app/components/ResetPasswordForm/ResetPasswordForm';

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
};
export default ResetPasswordPage;
