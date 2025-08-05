'use client';

import Image from 'next/image';

import { BackButton } from '@/app/components/BackButton/BackButton';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

import './profile.css';
import { useSession } from 'next-auth/react';

export const Profile = () => {
    const { data: session } = useSession();
    if (!session || !session.user) {
        return (
            <div className='profile-page'>
                <div className='profileContainer'>
                    <h1 className='profile-title'>Profile Page</h1>
                    <p>Please sign in to view your profile information.</p>
                    <BackButton caption={'Back to Main'} icon={<HomeWorkIcon />} />
                </div>
            </div>
        );
    }

    return (
        <div className='profile-page'>
            <div className='profileContainer'>
                <h1 className='profile-title'>{`Profile Page for ${session?.user?.name ?? ''}`}</h1>
                <p className='profile-description'>
                    Welcome to your profile page! Here you can view your public account information.
                </p>
                <div className='profile-info'>
                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            alt={session.user.name || 'User Avatar'}
                            className='profile-image'
                            width={100}
                            height={100}
                            priority
                        />
                    )}
                    <p>
                        <strong>Name:</strong> {session?.user?.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {session?.user?.email}
                    </p>
                </div>
                <BackButton caption={'Back to Main'} icon={<HomeWorkIcon />} />
            </div>
        </div>
    );
};
