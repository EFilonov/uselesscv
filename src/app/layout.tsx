import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Useless CV',
    description: "Landon Harper's Useless CV",
    openGraph: {
        title: 'uselesscv.vercel.app',
        description:
            'Resume website. You can download your CV as a PDF. Print with one click. Just sign in via Google, GitHub, or create your own password.',
        images: [
            {
                url: `https://${process.env.NEXT_PUBLIC_URL}.vercel.app/images/openGraph.png`,
                width: 1200,
                height: 630,
                alt: 'useless-cv Open Graph Image'
            }
        ],
        url: `https://${process.env.NEXT_PUBLIC_URL}.vercel.app/`, // Replace with actual URL
        type: 'website',
        siteName: 'UselessCV',
        locale: 'en_US'
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning lang='en' data-scroll-behavior='smooth'>
            <body>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
};

export default Layout;
