'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/api/auth/signin');
    }, [router]);

    return <div>Redirecting...</div>;
}
