import { NextRequest, NextResponse } from 'next/server';

import { google } from 'googleapis';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_ID!,
        process.env.AUTH_GOOGLE_SECRET!,
        `${process.env.NEXT_PUBLIC_URL}/api/oauth2callback`
    );

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        return new NextResponse(
            `<html><body>
                <h2>Authorization successful</h2>
                <p>Refresh token: ${tokens.refresh_token}</p>
                <p>Save this token as MAIL_REFRESH_TOKEN environment variable</p>
                <p>You can close this window</p>
            </body></html>`,
            {
                headers: { 'Content-Type': 'text/html' }
            }
        );
    } catch (error: any) {
        console.error('Authorization error:', error);
        return NextResponse.json({ error: 'Failed to get tokens', details: error.message }, { status: 500 });
    }
}
