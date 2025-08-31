import { NextRequest, NextResponse } from 'next/server';

import { google } from 'googleapis';

export async function GET(request: NextRequest) {
    console.log('🔄 OAuth callback received');
    console.log('📍 URL:', request.url);

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const scope = searchParams.get('scope');

    console.log('📝 OAuth params:', { code: !!code, state, error, scope });

    // Определяем базовый URL
    const host = request.headers.get('host') || 'uselesscv.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    console.log('🌐 Base URL:', baseUrl);

    if (error) {
        console.log('❌ OAuth error:', error);
        const redirectUrl =
            state === 'gmail_send_demo' ? `${baseUrl}/oauth-test?error=${error}` : `${baseUrl}?error=${error}`;
        return NextResponse.redirect(redirectUrl);
    }

    if (!code) {
        console.log('❌ No authorization code received');
        const redirectUrl =
            state === 'gmail_send_demo' ? `${baseUrl}/oauth-test?error=no_code` : `${baseUrl}?error=no_code`;
        return NextResponse.redirect(redirectUrl);
    }

    try {
        // Создаем OAuth2 клиент с правильным redirect URI
        const oauth2Client = new google.auth.OAuth2(
            process.env.AUTH_GOOGLE_ID!,
            process.env.AUTH_GOOGLE_SECRET!,
            `${baseUrl}/api/oauth2callback`
        );

        console.log('🔄 Exchanging code for tokens...');
        const { tokens } = await oauth2Client.getToken(code);

        console.log('✅ OAuth tokens received:');
        console.log('- Access Token:', !!tokens.access_token);
        console.log('- Refresh Token:', !!tokens.refresh_token);
        console.log('- Scope:', tokens.scope);
        console.log('- Expires:', tokens.expiry_date ? new Date(tokens.expiry_date) : 'Unknown');

        // Проверяем наличие gmail.send scope
        const hasGmailSend = tokens.scope?.includes('gmail.send') || false;
        console.log('📧 Gmail Send scope granted:', hasGmailSend);

        // Редирект для демо
        if (state === 'gmail_send_demo') {
            const redirectUrl =
                `${baseUrl}/oauth-test?` +
                `success=true&` +
                `scope=${encodeURIComponent(tokens.scope || '')}&` +
                `has_refresh=${!!tokens.refresh_token}&` +
                `has_gmail_send=${hasGmailSend}`;

            console.log('🎯 Redirecting to:', redirectUrl);
            return NextResponse.redirect(redirectUrl);
        }

        // Обычный редирект
        return NextResponse.redirect(`${baseUrl}?oauth_success=true`);
    } catch (error: any) {
        console.error('❌ Token exchange failed:', error);

        const redirectUrl =
            state === 'gmail_send_demo'
                ? `${baseUrl}/oauth-test?error=token_exchange_failed&details=${encodeURIComponent(error.message)}`
                : `${baseUrl}?error=token_exchange_failed`;

        return NextResponse.redirect(redirectUrl);
    }
}
