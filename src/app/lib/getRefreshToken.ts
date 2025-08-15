// src/app/lib/getRefreshToken.ts
import { config } from 'dotenv';
import { google } from 'googleapis';
import open from 'open';
import path from 'path';
import readline from 'readline';

// Load .env
config({ path: path.resolve(process.cwd(), '.env.local') });

const OAuth2 = google.auth.OAuth2;

// Use simple redirect URI
const REDIRECT_URI = 'http://localhost:3000';

const oauth2Client = new OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    REDIRECT_URI // ←  here
);

const scopes = ['https://mail.google.com/'];

async function getRefreshToken() {
    console.log('🔍 Environment check:');
    console.log('- Client ID:', process.env.AUTH_GOOGLE_ID ? 'Set' : 'Missing');
    console.log('- Client Secret:', process.env.AUTH_GOOGLE_SECRET ? 'Set' : 'Missing');
    console.log('- Redirect URI:', REDIRECT_URI);

    if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
        console.error('❌ Missing AUTH_GOOGLE_ID or AUTH_GOOGLE_SECRET');
        return;
    }

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    });

    console.log('\n🔗 Authorize this app by visiting this url:');
    console.log(authUrl);
    console.log('\n📋 After authorization, you will be redirected to a page that may show an error.');
    console.log('📋 Copy the ENTIRE URL from the address bar (including the code parameter)');

    await open(authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('\nPaste the full redirect URL here (or just the code): ', async (input) => {
            rl.close();
            try {
                // Extract code from URL or use as is
                let code = input.trim();
                if (code.includes('code=')) {
                    const urlParams = new URL(input).searchParams;
                    code = urlParams.get('code') || code;
                }

                console.log('🔄 Exchanging code for tokens...');
                const { tokens } = await oauth2Client.getToken(code);

                console.log('\n✅ Success! New tokens received:');
                console.log('🔑 Refresh Token:', tokens.refresh_token);
                console.log('🎟️ Access Token:', tokens.access_token?.substring(0, 20) + '...');

                console.log('\n📝 Add this to your .env.local:');
                console.log(`MAIL_REFRESH_TOKEN=${tokens.refresh_token}`);

                resolve(tokens);
            } catch (error: any) {
                console.error('❌ Error retrieving tokens:', error.message);
                console.error('Make sure the code is correct and try again.');
            }
        });
    });
}

getRefreshToken();

// npx tsx src/app/lib/getRefreshToken.ts
