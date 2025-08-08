import Head from 'next/head';

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy</title>
                <meta name='description' content='Privacy Policy for the educational Next.js project' />
            </Head>
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <h1>Privacy Policy</h1>
                <p>
                    <strong>Last updated:</strong> August 8, 2025
                </p>

                <p>
                    This website is an educational project created for demonstration purposes. It includes user
                    authentication features and displays example data, including fictitious personal information.
                </p>

                <h2>1. Data Collection and Use</h2>
                <ul>
                    <li>
                        The site may collect basic publicly available profile information provided by the user during
                        authentication via Google or GitHub OAuth (such as name, email address, and profile picture).
                    </li>
                    <li>
                        Only open data provided by Google and GitHub OAuth is used — no additional personal information
                        is requested or stored.
                    </li>
                    <li>Any data used in this project is processed only for demonstration and learning purposes.</li>
                </ul>

                <h2>2. Example Data</h2>
                <ul>
                    <li>
                        All contact details, names, addresses, and resumes displayed on the site are
                        <strong> sample/fictitious data</strong> created for educational purposes.
                    </li>
                    <li>This information does not represent any real person.</li>
                </ul>

                <h2>3. Data Storage</h2>
                <ul>
                    <li>
                        Any authentication-related data is stored temporarily in the application session or database for
                        the duration of the demonstration.
                    </li>
                    <li>Data is not sold, rented, or shared with third parties.</li>
                </ul>

                <h2>4. Cookies</h2>
                <ul>
                    <li>
                        The site may use cookies or similar technologies to manage authentication sessions and improve
                        functionality.
                    </li>
                    <li>Cookies are not used for tracking or advertising.</li>
                </ul>

                <h2>5. Third-Party Services</h2>
                <ul>
                    <li>
                        Authentication is handled by Google and GitHub OAuth services. These providers share only public
                        profile data in accordance with their own privacy policies.
                    </li>
                </ul>

                <h2>6. Security</h2>
                <ul>
                    <li>Basic technical measures are implemented to protect stored data.</li>
                    <li>
                        As this is a training project, it should not be used for entering sensitive personal
                        information.
                    </li>
                </ul>

                <h2>7. Contact</h2>
                <p>
                    For any questions about this Privacy Policy, please contact:
                    <br />
                    <strong>Email:</strong> lharper@gmail.com (for demonstration purposes only)
                </p>
            </main>
        </>
    );
}
