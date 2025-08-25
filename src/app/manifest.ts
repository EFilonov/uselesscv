import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Useless CV - Professional CV Builder',
        short_name: 'Useless CV',
        description: 'Create and manage your professional CV with ease',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        orientation: 'portrait-primary',
        scope: '/',
        lang: 'en',
        categories: ['productivity', 'business', 'education'],
        icons: [
            {
                src: '/android/android-launchericon-192-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/android/android-launchericon-512-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/ios/180.png',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/ios/16.png',
                sizes: '16x16',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/ios/32.png',
                sizes: '32x32',
                type: 'image/png',
                purpose: 'any'
            }
        ],
        shortcuts: [
            {
                name: 'Create New CV',
                short_name: 'New CV',
                description: 'Create a new professional CV',
                url: '/profile',
                icons: [
                    {
                        src: '/android/android-launchericon-96-96.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            }
        ]
    };
}
