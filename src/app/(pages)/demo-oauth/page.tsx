// src/app/(pages)/demo-oauth/page.tsx
'use client';

import { useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useReCaptcha } from 'next-recaptcha-v3';

// src/app/(pages)/demo-oauth/page.tsx

export default function OAuthDemoPage() {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState('demo@example.com');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { executeRecaptcha } = useReCaptcha();

    const handleForgotPassword = async () => {
        setLoading(true);
        setMessage('');

        try {
            // ✅ Получаем НАСТОЯЩИЙ reCAPTCHA token
            const token = await executeRecaptcha('demo_forgot_password');

            if (!token) {
                setMessage('reCAPTCHA verification failed. Please try again.');
                setLoading(false);
                return;
            }

            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    token // ✅ Используем настоящий token
                })
            });

            const result = await response.json();
            setMessage(result.message || result.error);
        } catch (error) {
            setMessage('Error sending email: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
            <h1>🎥 Gmail Send Scope Demo - Google Verification</h1>

            <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <p>
                    <strong>📋 Project Details:</strong>
                </p>
                <ul>
                    <li>
                        <strong>Project ID:</strong> cv-builder-469009
                    </li>
                    <li>
                        <strong>Application:</strong> Useless CV (Professional CV Builder)
                    </li>
                    <li>
                        <strong>Requested Scope:</strong> <code>https://www.googleapis.com/auth/gmail.send</code>
                    </li>
                    <li>
                        <strong>Purpose:</strong> Send password reset emails to users
                    </li>
                    <li>
                        <strong>Production URL:</strong> https://uselesscv.vercel.app
                    </li>
                </ul>
            </div>

            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
                <h2>📧 Gmail Send Scope Demonstration</h2>
                <p>
                    This demonstrates how our application uses the <strong>gmail.send</strong> scope to send password
                    reset emails.
                </p>

                <div style={{ background: '#fff', padding: '15px', borderRadius: '5px', margin: '15px 0' }}>
                    <h3>🔄 Password Reset Flow:</h3>
                    <ol>
                        <li>User enters email address</li>
                        <li>reCAPTCHA v3 validates user automatically</li>
                        <li>Server uses OAuth2 with gmail.send scope</li>
                        <li>Password reset email sent from uselesscvmail@gmail.com</li>
                    </ol>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <label>
                        <strong>📨 Enter email for password reset demo:</strong>
                    </label>
                    <br />
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            padding: '12px',
                            width: '400px',
                            margin: '10px 0',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        placeholder='Enter email address'
                    />
                </div>

                <button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    style={{
                        padding: '12px 24px',
                        background: loading ? '#ccc' : '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}>
                    {loading
                        ? '⏳ Processing reCAPTCHA & Sending...'
                        : '📧 Send Password Reset Email (Gmail Send Scope)'}
                </button>

                {message && (
                    <div
                        style={{
                            marginTop: '15px',
                            padding: '15px',
                            background: message.includes('error') || message.includes('failed') ? '#ffebee' : '#e8f5e8',
                            borderRadius: '4px',
                            border: `1px solid ${message.includes('error') || message.includes('failed') ? '#f44336' : '#4caf50'}`
                        }}>
                        <strong>Result:</strong> {message}
                    </div>
                )}

                <div style={{ marginTop: '20px', background: '#fff3e0', padding: '15px', borderRadius: '5px' }}>
                    <h4>🔒 Security Features Active:</h4>
                    <ul>
                        <li>✅ reCAPTCHA v3 - Automatic bot protection</li>
                        <li>✅ OAuth2 - Secure Gmail API authentication</li>
                        <li>✅ Rate limiting - Prevents spam</li>
                        <li>✅ Token expiration - 1 hour security window</li>
                    </ul>
                </div>
            </div>

            <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
                <h3>🔐 User Authentication Status (Optional Feature)</h3>
                <p>
                    <em>Note: Gmail send scope works independently of user authentication</em>
                </p>
                <p>
                    <strong>Current Status:</strong> {status}
                </p>
                {session ? (
                    <div>
                        <p>
                            ✅ <strong>Signed in as:</strong> {session.user?.email}
                        </p>
                        <button
                            onClick={() => signOut()}
                            style={{
                                padding: '8px 16px',
                                background: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>
                            ❌ <strong>Not signed in</strong>
                        </p>
                        <button
                            onClick={() => signIn('google')}
                            style={{
                                padding: '10px 20px',
                                background: '#4285f4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                            🔗 Sign in with Google (Standard OAuth - no gmail scope)
                        </button>
                    </div>
                )}
            </div>

            <div style={{ background: '#e0f2f1', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                <p>
                    <strong>📹 For Google Verification Team:</strong>
                </p>
                <p>
                    This page demonstrates the complete gmail.send scope usage with real reCAPTCHA v3 protection. The
                    email functionality works independently and securely sends password reset emails using OAuth2
                    authentication to Gmail API.
                </p>
                <p>
                    <strong>Note:</strong> This demo uses production Gmail API with real email sending capability.
                </p>
            </div>
        </div>
    );
}
