import React from 'react';

import { UserMenu } from '../UserMenu/UserMenu';
import './Header.css';
import { HeaderProps } from './Header.props.interface';

export const Header: React.FC<HeaderProps> = ({ animate, handleDownload, handlePrint }) => {
    return (
        <header className='header'>
            <div className='headerWrapper'>
                <h1 className={`headerContent${animate ? ' animate' : ' hidden'}`}>LANDON HARPER</h1>
                <div className='headerBtns'>
                    <UserMenu handleDownload={handleDownload} handlePrint={handlePrint} />
                </div>
            </div>
        </header>
    );
};
