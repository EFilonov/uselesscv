'use client';

import Image from 'next/image';

import { BackButton } from '@/app/components/BackButton/BackButton';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { Divider } from '@mui/material';

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
        <div className='profilePage'>
            <div className='profileContainer'>
                <h1 className='profileTitle'>{`Hi ${session?.user?.name ?? ''}`}</h1>
                <p className='profileDescription'>
                    Welcome to your profile page! Here you can view your public account information.
                </p>
                <div className='profileInfo'>
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
                    <div className='profileUser'>
                        <div className='name'>{session?.user?.name}</div>
                        <div className='email'>{session?.user?.email}</div>
                    </div>
                </div>
                <Divider sx={{ mt: 2 }} />
                <div className='contactTo'>
                    <div className='chema'>
                        We use the Contentful CMS to make content editing simple and convenient. Here’s the schema of
                        the data structure for your reference.
                    </div>
                    <div className='graph'>
                        <img src='/graph.png' alt='Contentful Schema' className='schemaImage' />
                    </div>
                </div>
                <div className='reachOut'>
                    If you need editing access, just reach out <span>to us</span> and we’ll be happy to help.
                </div>
                <BackButton caption={'Back to Main'} icon={<HomeWorkIcon />} />
            </div>
        </div>
    );
};
