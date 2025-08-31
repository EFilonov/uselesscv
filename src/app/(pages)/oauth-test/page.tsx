// src/app/(pages)/oauth-test/page.tsx
'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

// src/app/(pages)/oauth-test/page.tsx

// src/app/(pages)/oauth-test/page.tsx

export default function OAuthTestPage() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState('');

    useEffect(() => {
        const success = searchParams.get('success');
        const error = searchParams.get('error');
        const scope = searchParams.get('scope');
        const hasRefresh = searchParams.get('has_refresh');
        const hasGmailSend = searchParams.get('has_gmail_send');

        if (success) {
            setResult(
                `✅ OAuth Consent SUCCESS!\n\n` +
                    `📧 Gmail Send Scope: ${hasGmailSend === 'true' ? 'GRANTED ✅' : 'NOT GRANTED ❌'}\n` +
                    `🔄 Refresh Token: ${hasRefresh === 'true' ? 'Received ✅' : 'Not received ❌'}\n` +
                    `🔑 Full Scope: ${scope || 'Unknown'}\n\n` +
                    `🎯 PERFECT! Google verification team can see that gmail.send scope was successfully granted.`
            );
        } else if (error) {
            setResult(`❌ OAuth Error: ${error}`);
        }
    }, [searchParams]);

    const handleDirectOAuth = () => {
        // Используем прямую ссылку на продакшен
        const url =
            'https://accounts.google.com/oauth/authorize?' +
            'client_id=33174385992-t5iou6h1o2sku6hkdg2fo1rp07bsopje.apps.googleusercontent.com&' +
            'redirect_uri=https%3A//uselesscv.vercel.app/api/oauth2callback&' +
            'scope=openid%20email%20profile%20https%3A//www.googleapis.com/auth/gmail.send&' +
            'response_type=code&' +
            'access_type=offline&' +
            'prompt=consent&' +
            'state=gmail_send_demo';

        console.log('Opening OAuth URL:', url);
        window.location.href = url;
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
            {/* Показываем результат если есть */}
            {result && (
                <div
                    style={{
                        background: result.includes('SUCCESS') ? '#e8f5e8' : '#ffebee',
                        padding: '20px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        textAlign: 'left',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-line',
                        border: `2px solid ${result.includes('SUCCESS') ? '#4caf50' : '#f44336'}`
                    }}>
                    <h3>🎯 OAuth Consent Result:</h3>
                    <div>{result}</div>
                </div>
            )}

            <h1>🧪 OAuth Consent Test - Gmail Send Scope</h1>

            <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h2>For Google Verification Team</h2>
                <p>
                    <strong>Project ID:</strong> cv-builder-469009
                </p>
                <p>
                    <strong>Scope:</strong> https://www.googleapis.com/auth/gmail.send
                </p>
                <p>
                    <strong>Purpose:</strong> Password reset emails
                </p>
            </div>

            <button
                onClick={handleDirectOAuth}
                style={{
                    padding: '20px 40px',
                    fontSize: '18px',
                    background: '#4285f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}>
                🔗 Show OAuth Consent Screen (gmail.send)
            </button>

            <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
                <h3>What you&apos;ll see:</h3>
                <ul>
                    <li>✅ Google OAuth consent screen</li>
                    <li>✅ &ldquo;Send email on your behalf&rdquo; permission</li>
                    <li>✅ gmail.send scope explicitly shown</li>
                    <li>✅ English language</li>
                </ul>
            </div>

            <div
                style={{
                    background: '#f3e5f5',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    textAlign: 'left'
                }}>
                <h3>Technical Details:</h3>
                <p>
                    <strong>Client ID:</strong> 33174385992-t5iou6h1o2sku6hkdg2fo1rp07bsopje.apps.googleusercontent.com
                </p>
                <p>
                    <strong>Redirect URI:</strong> https://uselesscv.vercel.app/api/oauth2callback
                </p>
                <p>
                    <strong>Scope:</strong> openid email profile https://www.googleapis.com/auth/gmail.send
                </p>
            </div>

            <div
                style={{
                    background: '#e8f5e8',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    textAlign: 'left'
                }}>
                <h3>📝 Instructions for Google Team:</h3>
                <ol>
                    <li>Click the blue button above</li>
                    <li>You&apos;ll see Google&apos;s OAuth consent screen</li>
                    <li>Verify that &ldquo;gmail.send&rdquo; scope is clearly displayed</li>
                    <li>Confirm language is set to English</li>
                    <li>Grant permission to see the success result</li>
                </ol>
                <p>
                    <em>This demonstrates the exact OAuth flow that our password reset feature uses.</em>
                </p>
            </div>
        </div>
    );
}
