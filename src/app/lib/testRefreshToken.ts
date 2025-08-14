// src/app/lib/testRefreshToken.ts
import { config } from 'dotenv';
import { google } from 'googleapis';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') });

const OAuth2 = google.auth.OAuth2;

async function testRefreshToken() {
    console.log('🧪 Testing refresh token...');

    // Check environment variables
    console.log('📋 Environment variables check:');
    console.log('- AUTH_GOOGLE_ID:', process.env.AUTH_GOOGLE_ID ? 'Set' : 'Missing');
    console.log('- AUTH_GOOGLE_SECRET:', process.env.AUTH_GOOGLE_SECRET ? 'Set' : 'Missing');
    console.log('- MAIL_REFRESH_TOKEN:', process.env.MAIL_REFRESH_TOKEN ? 'Set' : 'Missing');
    console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);

    if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET || !process.env.MAIL_REFRESH_TOKEN) {
        console.error('❌ Missing required environment variables');
        return false;
    }

    const oauth2Client = new OAuth2(
        process.env.AUTH_GOOGLE_ID,
        process.env.AUTH_GOOGLE_SECRET,
        'http://localhost:3000'
    );

    console.log('🔑 Setting credentials...');
    oauth2Client.setCredentials({
        refresh_token: process.env.MAIL_REFRESH_TOKEN
    });

    try {
        console.log('🔄 Attempting to get access token...');
        const accessTokenResponse = await oauth2Client.getAccessToken();

        console.log('✅ Success! Token details:');
        console.log('- Access token:', accessTokenResponse.token ? 'Received' : 'Missing');
        console.log('- Status:', accessTokenResponse.res?.status);
        console.log('- Token length:', accessTokenResponse.token?.length);

        return true;
    } catch (error: any) {
        console.error('❌ Refresh token test failed:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error status:', error.status);

        if (error.message.includes('invalid_grant')) {
            console.error('🚨 Refresh token is invalid or expired');
            console.error('Solutions:');
            console.error('1. Generate new refresh token using getRefreshToken.ts');
            console.error('2. Check OAuth consent screen configuration');
            console.error('3. Verify authorized redirect URIs');
        }

        if (error.message.includes('No refresh token')) {
            console.error('🚨 Refresh token not found');
            console.error('Check MAIL_REFRESH_TOKEN in .env.local');
        }

        return false;
    }
}

// Run if file is called directly
if (require.main === module) {
    testRefreshToken();
}

export { testRefreshToken };

// npx tsx src/app/lib/testRefreshToken.ts
