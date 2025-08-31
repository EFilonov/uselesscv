import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 Environment variables check:');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM!,
        pass: process.env.GMAIL_APP_PASSWORD!
    }
});

async function simpleTest() {
    try {
        // Проверяем что переменные загружены
        if (!process.env.EMAIL_FROM || !process.env.GMAIL_APP_PASSWORD) {
            console.error('❌ Missing credentials in environment variables!');
            console.error('Check your .env.local file');
            return;
        }

        console.log('🧪 Testing SMTP connection...');
        await transporter.verify();
        console.log('✅ Connection successful!');

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_FROM,
            subject: 'SMTP Test Email - CV Builder (SECURE)',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #333;">✅ SMTP Test Successful!</h2>
                    <p>This email was sent using:</p>
                    <ul>
                        <li>Gmail SMTP server</li>
                        <li>App Password authentication</li>
                        <li>Environment variables (SECURE)</li>
                        <li>From: ${process.env.EMAIL_FROM}</li>
                        <li>Time: ${new Date().toISOString()}</li>
                    </ul>
                    <p><strong>SMTP setup is working correctly and secure!</strong></p>
                </div>
            `
        });

        console.log('✅ Email sent successfully!');
        console.log('📬 Message ID:', info.messageId);
        console.log('🎯 Check your inbox!');
    } catch (error) {
        console.error('❌ Error:', error);

        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error code:', (error as any).code);
        }
    }
}

if (process.env.EMAIL_FROM && process.env.GMAIL_APP_PASSWORD) {
    simpleTest();
} else {
    console.error('❌ Please set EMAIL_FROM and GMAIL_APP_PASSWORD in .env.local');
}

//src/app/lib/testSMTP.ts
