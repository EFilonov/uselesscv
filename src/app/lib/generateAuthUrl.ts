// src/app/lib/generateAuthUrl.ts
import * as dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config({ path: '.env.local' });

const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID!,
    process.env.AUTH_GOOGLE_SECRET!,
    'http://localhost:3000/api/oauth2callback'
);

// Используем только Gmail send scope
const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent', // Принудительно запрашивает согласие для получения refresh_token
    include_granted_scopes: true
});

console.log('🔗 Open this URL to get new refresh token:');
console.log(authUrl);
console.log('\n📋 After authorization, check the callback URL for the code parameter');
