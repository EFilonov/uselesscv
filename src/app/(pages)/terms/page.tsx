import Head from 'next/head';

export default function TermsOfUse() {
    return (
        <>
            <Head>
                <title>Terms of Use</title>
                <meta name='description' content='Terms of Use for the educational Next.js project' />
            </Head>
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <h1>Terms of Use</h1>
                <p>
                    <strong>Last updated:</strong> August 8, 2025
                </p>

                <p>
                    By accessing and using this website, you agree to the following terms and conditions. This project
                    is intended solely for educational and demonstration purposes.
                </p>

                <h2>1. Purpose of the Website</h2>
                <p>
                    This application demonstrates web development concepts using the Next.js framework. All displayed
                    user profiles and resumes are fictitious and for training purposes only.
                </p>

                <h2>2. User Accounts</h2>
                <ul>
                    <li>
                        Authentication is handled by Google and GitHub OAuth. Only open profile data (name, email,
                        avatar) provided by these services is accessed.
                    </li>
                    <li>Users should not enter sensitive personal information into the application.</li>
                </ul>

                <h2>3. Acceptable Use</h2>
                <ul>
                    <li>Do not use this site for illegal activities.</li>
                    <li>Do not attempt to compromise the security or functionality of the site.</li>
                    <li>Do not upload or share real personal data.</li>
                </ul>

                <h2>4. Disclaimer</h2>
                <p>
                    The website is provided “as is” without any warranties of any kind. The author is not responsible
                    for any misuse of the application.
                </p>

                <h2>5. Changes to Terms</h2>
                <p>
                    These terms may be updated at any time. Continued use of the site after changes constitutes
                    acceptance of the updated terms.
                </p>

                <h2>6. Contact</h2>
                <p>
                    For any questions regarding these Terms of Use, please contact:
                    <br />
                    <strong>Email:</strong> lharper@gmail.com (for demonstration purposes only)
                </p>
            </main>
        </>
    );
}
