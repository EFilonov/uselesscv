import React from 'react';

import { useStore } from '../../store/zustandStore';
import './Footer.css';

export const Footer: React.FC = () => {
    const data = useStore((state) => state.data);

    return (
        <footer className='footer'>
            <p className='footerText'>
                <span className='footerDetails'>{`© ${new Date().getFullYear()} Landon Harper — Resume`}</span>
                <span className='footerContact'>
                    <a href={data?.phoneFull} className='footerPhone' type='tel'>
                        {data?.phoneShort}
                    </a>
                </span>
                <span className='footerContact'>
                    <a href={data?.emailFull} className='footerEmail' type='tel'>
                        {data?.emailShort}
                    </a>
                </span>
            </p>
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
