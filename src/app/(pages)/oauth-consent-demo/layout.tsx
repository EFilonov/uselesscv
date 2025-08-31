// src/app/(pages)/oauth-consent-demo/layout.tsx
import { ReCaptchaProvider } from 'next-recaptcha-v3';

export default function OAuthConsentDemoLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
            <div>
                <div
                    style={{
                        background: '#1976d2',
                        color: 'white',
                        padding: '15px',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>
                    🎥 OAuth Consent Demo for Google Verification Team - Gmail Send Scope
                </div>
                {children}
            </div>
        </ReCaptchaProvider>
    );
}
