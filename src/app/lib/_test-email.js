const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function testEmailConnection() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_ID,
        process.env.AUTH_GOOGLE_SECRET,
        `${process.env.NEXT_PUBLIC_URL}/api/oauth2callback`
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.MAIL_REFRESH_TOKEN
    });

    try {
        const accessTokenResponse = await oauth2Client.getAccessToken();
        console.log('✅ Access token obtained:', !!accessTokenResponse.token);

        // Проверяем Gmail API
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
        const profile = await gmail.users.getProfile({ userId: 'me' });
        console.log('✅ Gmail profile:', profile.data.emailAddress);
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testEmailConnection();
