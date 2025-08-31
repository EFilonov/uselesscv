// src/app/lib/emailServiceSMTP.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM!,
        pass: process.env.GMAIL_APP_PASSWORD!
    }
});

export const sendPasswordResetEmailSMTP = async (to: string, resetToken: string, userName?: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: {
            name: 'CV Builder Support',
            address: process.env.EMAIL_FROM!
        },
        to,
        subject: 'Password Reset Request - CV Builder',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
                <div style="background: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #e0e0e0;">
                    <h2 style="color: #333333; margin-top: 0; font-weight: 600;">Password Reset Request</h2>
                    
                    <p style="font-size: 16px; color: #333333; line-height: 1.5;">
                        Hello ${userName || 'User'},
                    </p>
                    
                    <p style="font-size: 16px; color: #333333; line-height: 1.5;">
                        You requested a password reset for your <strong>CV Builder</strong> account.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" 
                           style="background: #333333; color: #ffffff; padding: 15px 30px; 
                                  text-decoration: none; border-radius: 4px; display: inline-block; 
                                  font-weight: bold; font-size: 16px; border: 2px solid #333333;">
                            Reset Password
                        </a>
                    </div>
                    
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 4px; margin: 30px 0; border-left: 4px solid #333333;">
                        <p style="margin: 0; font-size: 14px; color: #666666;">
                            <strong>Important:</strong> This link will expire in 1 hour for security reasons.
                        </p>
                    </div>
                    
                    <p style="font-size: 14px; color: #666666; line-height: 1.5;">
                        If you didn't request this password reset, please ignore this email. 
                        Your account remains secure.
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                    
                    <div style="text-align: center;">
                        <p style="font-size: 12px; color: #999999; margin: 0;">
                            Sent by <strong>CV Builder</strong> - Professional CV Builder<br>
                            <a href="${process.env.NEXT_PUBLIC_URL}" style="color: #666666; text-decoration: none;">
                                ${process.env.NEXT_PUBLIC_URL}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ SMTP Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ SMTP Email sending failed:', error);
        throw error;
    }
};

// Test function for connection verification
export const testSMTPConnection = async () => {
    try {
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully');
        return { success: true, message: 'SMTP connection working' };
    } catch (error) {
        console.error('❌ SMTP connection failed:', error);
        return { success: false, error: error };
    }
};
