'use client';

import { ForgotForm } from '@/app/components/ForgotForm/ForgotForm';

import { ReCaptchaProvider } from 'next-recaptcha-v3';

export default function ForgotPasswordPage() {
    return (
        <div className='forgotPasswordPage'>
            <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
                <ForgotForm />
            </ReCaptchaProvider>
        </div>
    );
}
