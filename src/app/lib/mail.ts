import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.AUTH_GOOGLE_ID!,
    process.env.AUTH_GOOGLE_SECRET!,
    `${process.env.NEXT_PUBLIC_URL}/oauth2callback` // или свой редирект, если получал токен через сайт
);

oauth2Client.setCredentials({
    refresh_token: process.env.MAIL_REFRESH_TOKEN!
});

export async function sendPasswordResetEmail(to: string, token: string) {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_FROM!,
            clientId: process.env.EMAIL_CLIENT_ID!,
            clientSecret: process.env.EMAIL_CLIENT_SECRET!,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN!,
            accessToken: accessToken.token!
        }
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`;

    const mailOptions = {
        from: `"Useless-cv Support Team" <${process.env.EMAIL_FROM}>`,
        to,
        subject: 'Password Reset Request',
        text: `Use the following link to reset your password: ${resetUrl}`,
        html: `
            <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
                <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
                    <h2 style="color: #222; margin-top: 0;">Reset your password</h2>
                    <p style="font-size: 16px; color: #444;">
                        We received a request to reset your password for your Useless-cv account.<br>
                        Click the button below to set a new password:
                    </p>
                    <a href="${resetUrl}" style="
                        display: inline-block;
                        padding: 12px 24px;
                        margin: 24px 0;
                        background:rgb(68, 63, 63);
                        color: #fff;
                        text-decoration: none;
                        font-weight: bold;
                        border-radius: 4px;
                        font-size: 16px;
                        box-shadow: 0 1px 4px rgba(25, 118, 210, 0.15);
                    ">Reset Password</a>
                    <p style="font-size: 14px; color: #888;">
                        If you did not request a password reset, please ignore this email.<br>
                        This link will expire in 1 hour.
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                    <p style="font-size: 12px; color: #bbb;">
                        &copy; ${new Date().getFullYear()} Useless-cv. All rights reserved.
                    </p>
                </div>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
}
