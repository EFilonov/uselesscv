import React from 'react';

import './HwithLine.css';
import { HwithLineProps } from './HwithLine.props.interface';

export const HwithLine: React.FC<HwithLineProps> = ({ children, line = false }) => {
    return (
        <>
            <h2 className='hWithLine'>{children}</h2>
            {line && <span className='line'></span>}
        </>
    );
};
