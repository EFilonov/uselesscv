import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { UserMenu } from '../UserMenu/UserMenu';
import { useStore } from './../../store/zustandStore';
import './Header.css';
import { HeaderProps } from './Header.props.interface';

export const Header: React.FC<HeaderProps> = ({ animate, handleDownload, handlePrint }) => {
    const data = useStore((state) => state.data);
    return (
        <header className='header'>
            <div className='headerWrapper'>
                <h1 className={`headerContent${animate ? ' animate' : ' hidden'}`}>{data?.name}</h1>
                <Image src='/Logo.svg' alt='Logo' width={140} height={40} className='logoLarge headerLogo' />
                <Image src='/LogoSmall.svg' alt='Logo' width={50} height={24} className='logoSmall headerLogo' />
                <div className='headerBtns'>
                    <UserMenu handleDownload={handleDownload} handlePrint={handlePrint} />
                </div>
            </div>
        </header>
    );
};
