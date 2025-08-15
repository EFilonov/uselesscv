export async function validateRecaptcha(token: string, secret: string) {
    try {
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secret}&response=${token}`
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (typeof data.success !== 'boolean') {
            throw new Error('Invalid response format: missing "success" property');
        }

        return data;
    } catch (error) {
        console.error('Error validating reCAPTCHA:', error);
        throw error;
    }
}
