import { NextRequest, NextResponse } from 'next/server';

import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID!,
    process.env.AUTH_GOOGLE_SECRET!,
    'http://localhost:3000/api/oauth2callback'
);

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.json({ error: `Authorization failed: ${error}` }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: 'No authorization code received' }, { status: 400 });
    }

    try {
        console.log('🔄 Exchanging code for tokens...');

        const { tokens } = await oauth2Client.getToken(code);

        console.log('✅ Success! New tokens received:');
        console.log('🎟️ Access Token:', tokens.access_token ? 'Received' : 'Not received');
        console.log('🔄 Refresh Token:', tokens.refresh_token ? 'Received' : 'Not received');

        if (tokens.refresh_token) {
            console.log('\n📝 Add this to your .env.local:');
            console.log(`MAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
        }

        return NextResponse.json({
            message: 'Authorization successful!',
            hasRefreshToken: !!tokens.refresh_token,
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token ? 'Received' : 'Not received'
        });
    } catch (error: any) {
        console.error('❌ Token exchange failed:', error.message);
        return NextResponse.json(
            {
                error: 'Failed to exchange code for tokens',
                details: error.message
            },
            { status: 500 }
        );
    }
}
