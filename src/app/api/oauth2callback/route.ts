import { NextRequest, NextResponse } from 'next/server';

import { google } from 'googleapis';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Определяем правильный redirect URI
    const baseUrl =
        process.env.NEXT_PUBLIC_URL ||
        (request.headers.get('host')?.includes('localhost') ? 'http://localhost:3000' : 'https://uselesscv.vercel.app');

    // ✅ Создаем OAuth2Client с правильным redirect URI
    const oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_ID!,
        process.env.AUTH_GOOGLE_SECRET!,
        `${baseUrl}/api/oauth2callback` // ✅ Правильно устанавливаем redirect URI
    );

    if (error) {
        const redirectUrl =
            state === 'gmail_send_demo' ? `${baseUrl}/oauth-consent-demo?error=${error}` : `${baseUrl}?error=${error}`;
        return NextResponse.redirect(redirectUrl);
    }

    if (!code) {
        const redirectUrl =
            state === 'gmail_send_demo' ? `${baseUrl}/oauth-consent-demo?error=no_code` : `${baseUrl}?error=no_code`;
        return NextResponse.redirect(redirectUrl);
    }

    try {
        console.log('🔄 Exchanging code for tokens...');
        console.log('📍 Using redirect URI:', `${baseUrl}/api/oauth2callback`);

        const { tokens } = await oauth2Client.getToken(code);

        console.log('✅ OAuth Success:');
        console.log('- Access Token:', tokens.access_token ? 'Received' : 'Not received');
        console.log('- Refresh Token:', tokens.refresh_token ? 'Received' : 'Not received');
        console.log('- Scope:', tokens.scope);

        // Для демо - показываем успех
        if (state === 'gmail_send_demo') {
            const redirectUrl = `${baseUrl}/oauth-consent-demo?success=true&scope=${encodeURIComponent(tokens.scope || '')}&has_refresh=${!!tokens.refresh_token}`;
            return NextResponse.redirect(redirectUrl);
        }

        // Для обычного flow
        return NextResponse.redirect(`${baseUrl}?oauth_success=true`);
    } catch (error: any) {
        console.error('❌ Token exchange failed:', error.message);
        console.error('❌ Error details:', error);

        const redirectUrl =
            state === 'gmail_send_demo'
                ? `${baseUrl}/oauth-consent-demo?error=token_exchange_failed&details=${encodeURIComponent(error.message)}`
                : `${baseUrl}?error=token_exchange_failed`;

        return NextResponse.redirect(redirectUrl);
    }
}
