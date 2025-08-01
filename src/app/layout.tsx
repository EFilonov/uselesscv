import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Useless CV',
    description: "Landon Harper's Useless CV"
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
