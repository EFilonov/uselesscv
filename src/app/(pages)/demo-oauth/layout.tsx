import { ReCaptchaProvider } from 'next-recaptcha-v3';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
            <div>
                <div style={{ background: '#1976d2', color: 'white', padding: '10px', textAlign: 'center' }}>
                    🎥 OAuth Demo for Google Verification Team
                </div>
                {children}
            </div>
        </ReCaptchaProvider>
    );
}
