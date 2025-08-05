import { NextRequest, NextResponse } from 'next/server';

import { google } from 'googleapis';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.EMAIL_CLIENT_ID!,
        process.env.EMAIL_CLIENT_SECRET!,
        'http://localhost:3000/api/oauth2callback' // this should be registered in your Google Cloud Console
    );

    try {
        // Exchange `code` for tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Log tokens or save them where needed
        console.log('Received tokens:', tokens);

        return new NextResponse(
            `<html><body><h2>Authorization successful</h2><p>You can close this window</p></body></html>`,
            {
                headers: { 'Content-Type': 'text/html' }
            }
        );
    } catch (error: any) {
        console.error('Authorization error:', error);
        return NextResponse.json({ error: 'Failed to get tokens' }, { status: 500 });
    }
}
