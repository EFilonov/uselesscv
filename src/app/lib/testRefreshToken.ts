// src/app/lib/testRefreshToken.ts
import * as dotenv from 'dotenv';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

dotenv.config({ path: '.env.local' });

async function testGmailSendScope() {
    console.log('🧪 Testing Gmail send scope with refresh token...');

    const oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_ID!,
        process.env.AUTH_GOOGLE_SECRET!,
        'http://localhost:3000/api/oauth2callback'
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.MAIL_REFRESH_TOKEN!
    });

    try {
        console.log('🔑 Getting access token...');
        const accessTokenResponse = await oauth2Client.getAccessToken();

        if (!accessTokenResponse.token) {
            throw new Error('No access token received');
        }

        console.log('✅ Access token received successfully');

        // Тестируем SMTP соединение
        console.log('📬 Testing SMTP with OAuth2...');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_FROM!,
                clientId: process.env.AUTH_GOOGLE_ID!,
                clientSecret: process.env.AUTH_GOOGLE_SECRET!,
                refreshToken: process.env.MAIL_REFRESH_TOKEN!,
                accessToken: accessTokenResponse.token
            }
        });

        // Проверяем соединение
        await transporter.verify();
        console.log('✅ SMTP connection verified');

        // Отправляем тестовое письмо
        console.log('📮 Sending test email...');
        const testResult = await transporter.sendMail({
            from: `"Test OAuth2" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_FROM,
            subject: 'Test Email - OAuth2 Gmail Send Scope',
            text: 'This email was sent using OAuth2 with gmail.send scope only.',
            html: `
                <h2>✅ OAuth2 Test Successful!</h2>
                <p>This email was sent using:</p>
                <ul>
                    <li>OAuth2 authentication</li>
                    <li>gmail.send scope only</li>
                    <li>Refresh token: ${process.env.MAIL_REFRESH_TOKEN?.substring(0, 20)}...</li>
                </ul>
                <p>Time: ${new Date().toISOString()}</p>
            `
        });

        console.log('🎉 Test email sent successfully!');
        console.log('📬 Message ID:', testResult.messageId);
        console.log('📧 From:', testResult.envelope.from);
        console.log('📧 To:', testResult.envelope.to);
    } catch (error: any) {
        console.error('❌ Error details:');
        console.error('- Message:', error.message);
        console.error('- Code:', error.code);
        console.error('- Response:', error.response);

        if (error.code === 'EAUTH' || error.message.includes('unauthorized_client')) {
            console.error('🚨 OAuth2 ISSUE: Refresh token invalid or wrong scope');
            console.error('🔧 Solution: Generate new refresh token with gmail.send scope');
        }
    }
}

testGmailSendScope();

// npx tsx src/app/lib/testRefreshToken.ts
