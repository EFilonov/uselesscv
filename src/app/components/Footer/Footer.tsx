import React from 'react';

import { useStore } from '../../store/zustandStore';
import './Footer.css';

export const Footer: React.FC = () => {
    const data = useStore((state) => state.data);
    const transformName = (name: string) => {
        const parts = name.toLocaleLowerCase().split(' ');
        return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    };
    return (
        <footer className='footer'>
            <div className='footerText'>
                <div className='footerDetails'>{`© ${new Date().getFullYear()} ${transformName(data?.name || '')}`}</div>
                <div className='footerContact'>
                    <a href={data?.phoneFull} className='footerPhone' type='tel'>
                        {data?.phoneShort}
                    </a>
                </div>
                <div className='footerContact'>
                    <a href={data?.emailFull} className='footerEmail' type='tel'>
                        {data?.emailShort}
                    </a>
                </div>
            </div>
            <div className='privacyTerms'>
                <a href='/terms' className='footerTerms'>
                    Terms of Use
                </a>

                <a href='/privacy' className='footerPrivacy'>
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
};
