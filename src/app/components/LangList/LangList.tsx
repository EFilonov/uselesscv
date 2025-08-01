import React from 'react';

import { data } from '../../constants/data';
import { SkillWithBar } from '../SkillWithBar/SkillWithBar';
import './LangList.css';

export const LangList: React.FC = () => {
    const { languages } = data;
    return (
        <div className='skillsList'>
            {languages.map((language, index) => {
                return (
                    <SkillWithBar key={index} percentage={language.percentage}>
                        {language.item}
                    </SkillWithBar>
                );
            })}
        </div>
    );
};
