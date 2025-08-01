import React from 'react';

import './SkillWithBar.css';
import { SkillWithBarProps } from './SkillWithBar.props.interface';

export const SkillWithBar: React.FC<SkillWithBarProps> = ({ children, percentage }) => {
    return (
        <div className='skillBar'>
            <div className='skillName'>{children}</div>
            <span className='bar' style={{ width: `${percentage}%` }}></span>
        </div>
    );
};
