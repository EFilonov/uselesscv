import Image from 'next/image';

import { auth } from '@/app/auth';

import './profile.css';

const Page = async () => {
    const session = await auth();

    if (!session || !session.user) {
        return (
            <div className='profile-page'>
                <div className='profileContainer'>
                    <h1 className='profile-title'>Profile Page</h1>
                    <p>Please sign in to view your profile information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='profile-page'>
            <div className='profileContainer'>
                <h1 className='profile-title'>{`Profile Page for ${session.user.name}`}</h1>
                <div className='profile-info'>
                    {session.user.image && (
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
                        <strong>Name:</strong> {session.user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {session.user.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
