import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { CssBaseline } from '@mui/material';

import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'CV Builder',
    description: 'Professional CV and Portfolio Builder',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-96x96.png',
        apple: '/apple-touch-icon.png'
    },
    verification: {
        google: 'lzOJyxyPgl5b1VMB1GfBw4jkDL3jfNNNBmRpew5YGZA'
    },

    openGraph: {
        title: 'Professional CV Builder by Evgen',
        description: 'Create and manage your professional CV with ease',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_URL}/images/openGraph.png`,
                width: 1200,
                height: 630,
                alt: 'uselesscv Open Graph Image'
            }
        ],
        url: process.env.NEXT_PUBLIC_URL,
        type: 'website',
        siteName: 'CV Builder',
        locale: 'en_US'
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning lang='en' data-scroll-behavior='smooth'>
            <body>
                {/* Normalize CSS  */}
                {/* <CssBaseline /> */}
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
};

export default Layout;
