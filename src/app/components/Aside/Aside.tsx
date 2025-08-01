import React from 'react';

import { DetailsList } from '../DetailsList/DetailsList';
import { HwithLine } from '../HWithLine/HwithLine';
import { LangList } from '../LangList/LangList';
import { SkillsList } from '../SkillsList/SkillsList';
import './Aside.css';

export const Aside: React.FC = () => {
    return (
        <aside className='aside'>
            <HwithLine line={true}>DETAILS</HwithLine>
            <DetailsList />
            <div className='skillsWrapper'>
                <HwithLine line={true}>SKILLS</HwithLine>
                <SkillsList />
            </div>
            <div className='langsWrapper'>
                <HwithLine line={true}>LANGUAGES</HwithLine>
                <LangList />
            </div>
        </aside>
    );
};
