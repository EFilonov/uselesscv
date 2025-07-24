import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';


export const metadata: Metadata = {
    title: 'Useless CV',
    description: 'Landon Harper\'s Useless CV',
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning lang='en'>
            <body >
                {children}
            </body>
        </html>
    );
};

export default Layout;
