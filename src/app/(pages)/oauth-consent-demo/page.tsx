// src/app/(pages)/oauth-consent-demo/page.tsx
'use client';

import { useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useReCaptcha } from 'next-recaptcha-v3';

// src/app/(pages)/oauth-consent-demo/page.tsx

export default function OAuthConsentDemo() {
    const { data: session } = useSession();
    const [email, setEmail] = useState('demo@example.com');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { executeRecaptcha } = useReCaptcha();

    const handleGmailSendConsent = () => {
        const clientId = '33174385992-t5iou6h1o2sku6hkdg2fo1rp07bsopje.apps.googleusercontent.com';

        // ✅ Используем правильный redirect URI в зависимости от окружения
        const isProduction = window.location.hostname !== 'localhost';
        const redirectUri = isProduction
            ? 'https://uselesscv.vercel.app/api/oauth2callback'
            : 'http://localhost:3000/api/oauth2callback';

        const consentUrl =
            `https://accounts.google.com/oauth/authorize?` +
            `client_id=${clientId}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `scope=${encodeURIComponent('openid email profile https://www.googleapis.com/auth/gmail.send')}&` +
            `response_type=code&` +
            `access_type=offline&` +
            `prompt=consent&` +
            `state=gmail_send_demo`;

        console.log('🔗 Opening consent URL:', consentUrl);
        console.log('🌐 Redirect URI:', redirectUri);

        // Открываем в новом окне
        window.open(consentUrl, 'oauth_popup', 'width=500,height=600,scrollbars=yes,resizable=yes');
    };

    const handleServerSideEmailSend = async () => {
        setLoading(true);
        setMessage('');

        try {
            // ✅ Получаем НАСТОЯЩИЙ reCAPTCHA token
            console.log('🤖 Getting reCAPTCHA token...');
            const recaptchaToken = await executeRecaptcha('oauth_demo_email_send');

            if (!recaptchaToken) {
                setMessage('❌ reCAPTCHA verification failed. Please try again.');
                setLoading(false);
                return;
            }

            console.log('✅ reCAPTCHA token received');

            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    token: recaptchaToken // ✅ Используем настоящий reCAPTCHA token
                })
            });

            const result = await response.json();
            setMessage(result.message || result.error);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
            <h1>🎥 OAuth Consent Screen Demo - Gmail Send Scope</h1>

            <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h2>📋 For Google Verification Team</h2>
                <p>
                    <strong>Project ID:</strong> cv-builder-469009
                </p>
                <p>
                    <strong>Client ID:</strong> 33174385992-t5iou6h1o2sku6hkdg2fo1rp07bsopje.apps.googleusercontent.com
                </p>
                <p>
                    <strong>Requested Scope:</strong> <code>https://www.googleapis.com/auth/gmail.send</code>
                </p>
                <p>
                    <strong>Purpose:</strong> Send password reset emails from our application
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* LEFT SIDE: OAuth Consent Demo */}
                <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '8px' }}>
                    <h3>🔐 1. OAuth Consent Screen Demo</h3>
                    <p>
                        Click the button below to see the OAuth consent screen with <strong>gmail.send</strong> scope:
                    </p>

                    <button
                        onClick={handleGmailSendConsent}
                        style={{
                            padding: '15px 25px',
                            background: '#4285f4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            width: '100%',
                            marginBottom: '15px'
                        }}>
                        🔗 Show OAuth Consent Screen (gmail.send scope)
                    </button>

                    <div style={{ background: '#fff', padding: '15px', borderRadius: '5px', fontSize: '14px' }}>
                        <p>
                            <strong>What you&apos;ll see:</strong>
                        </p>
                        <ul>
                            <li>✅ Google OAuth consent screen</li>
                            <li>✅ &ldquo;Send email on your behalf&rdquo; permission</li>
                            <li>✅ gmail.send scope explicitly shown</li>
                            <li>✅ Language: English (as requested)</li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT SIDE: Actual Usage Demo */}
                <div style={{ background: '#f3e5f5', padding: '20px', borderRadius: '8px' }}>
                    <h3>📧 2. Actual Gmail Send Usage</h3>
                    <p>This shows how we actually use the gmail.send scope in production:</p>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Email for password reset:</label>
                        <br />
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: '10px',
                                width: '100%',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                marginTop: '5px'
                            }}
                        />
                    </div>

                    <button
                        onClick={handleServerSideEmailSend}
                        disabled={loading}
                        style={{
                            padding: '15px 25px',
                            background: loading ? '#ccc' : '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            width: '100%',
                            marginBottom: '15px'
                        }}>
                        {loading
                            ? '⏳ Processing reCAPTCHA & Sending...'
                            : '📧 Send Password Reset (Server-side + reCAPTCHA)'}
                    </button>

                    {message && (
                        <div
                            style={{
                                padding: '10px',
                                background: message.includes('error') || message.includes('❌') ? '#ffebee' : '#e8f5e8',
                                borderRadius: '4px',
                                fontSize: '14px',
                                border: `1px solid ${message.includes('error') || message.includes('❌') ? '#f44336' : '#4caf50'}`
                            }}>
                            {message}
                        </div>
                    )}

                    <div
                        style={{
                            background: '#e3f2fd',
                            padding: '10px',
                            borderRadius: '5px',
                            marginTop: '10px',
                            fontSize: '12px'
                        }}>
                        <p>
                            <strong>🔒 Security Features:</strong>
                        </p>
                        <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                            <li>reCAPTCHA v3 automatic verification</li>
                            <li>OAuth2 with gmail.send scope</li>
                            <li>Server-side email sending</li>
                            <li>Rate limiting protection</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ background: '#e8f5e8', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>🔧 Technical Implementation</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <h4>OAuth Consent (for verification)</h4>
                        <ul style={{ fontSize: '14px' }}>
                            <li>Shows user what permissions app requests</li>
                            <li>Includes gmail.send scope explicitly</li>
                            <li>User grants permission to send emails</li>
                            <li>Returns authorization code</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Production Usage (server-side)</h4>
                        <ul style={{ fontSize: '14px' }}>
                            <li>Uses pre-authorized refresh token</li>
                            <li>reCAPTCHA v3 protects against abuse</li>
                            <li>Sends password reset emails automatically</li>
                            <li>Secure server-to-server communication</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ background: '#fff9c4', padding: '20px', borderRadius: '8px' }}>
                <h3>📝 Instructions for Google Team</h3>
                <ol>
                    <li>
                        <strong>OAuth Consent:</strong> Click &ldquo;Show OAuth Consent Screen&rdquo; to see the
                        permission dialog
                    </li>
                    <li>
                        <strong>Scope Verification:</strong> Verify that &ldquo;gmail.send&rdquo; scope is clearly shown
                    </li>
                    <li>
                        <strong>Language:</strong> Confirm consent screen is in English
                    </li>
                    <li>
                        <strong>Actual Usage:</strong> Test the password reset function to see gmail.send in action
                    </li>
                    <li>
                        <strong>Security:</strong> Note that reCAPTCHA v3 and server-side security are active
                    </li>
                </ol>

                <div style={{ marginTop: '15px', padding: '15px', background: '#fff', borderRadius: '5px' }}>
                    <p>
                        <strong>Why two different flows?</strong>
                    </p>
                    <p>
                        • <strong>Consent Screen:</strong> Required by Google to show users what permissions app needs
                    </p>
                    <p>
                        • <strong>Server-side Usage:</strong> More secure for automated email sending (password resets)
                    </p>
                    <p>
                        • <strong>Same Scope:</strong> Both use identical gmail.send scope - just different
                        implementation
                    </p>
                </div>
            </div>

            <div style={{ background: '#e0f2f1', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                <p>
                    <strong>📹 For Google Verification Team:</strong>
                </p>
                <p>
                    This page demonstrates both the OAuth consent screen AND the actual gmail.send scope usage with real
                    reCAPTCHA v3 protection. The consent screen shows the exact permissions requested, while the
                    server-side implementation shows how we securely use the scope for password reset emails.
                </p>
                <p>
                    <strong>Note:</strong> All security features (reCAPTCHA, OAuth2, rate limiting) are active and
                    working.
                </p>
            </div>
        </div>
    );
}
