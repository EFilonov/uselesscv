import React from 'react';

import { clientData } from '@/app/interfaces/clientData.interface';

import { useStore } from '../../store/zustandStore';
import { SkillWithBar } from '../SkillWithBar/SkillWithBar';
import './LangList.css';

export const LangList: React.FC = () => {
    const data = useStore((state) => state.data);
    const languages = data?.languages || [];

    return (
        <div className='skillsList'>
            {languages.map((language, index) => {
                return (
                    <SkillWithBar key={language.fields.item} percentage={language.fields.percentage}>
                        {language.fields.item}
                    </SkillWithBar>
                );
            })}
        </div>
    );
};
