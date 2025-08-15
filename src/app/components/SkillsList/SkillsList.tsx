import React from 'react';

import { useStore } from '../../store/zustandStore';
import { SkillWithBar } from '../SkillWithBar/SkillWithBar';
import './SkillsList.css';

export const SkillsList: React.FC = () => {
    const data = useStore((state) => state.data);
    const skills = data?.skills || [];
    return (
        <div className='skillsList'>
            {skills.map((skill, index) => {
                return (
                    <SkillWithBar key={skill.fields.skillItem} percentage={skill.fields.skillPercentage}>
                        {skill.fields.skillItem}
                    </SkillWithBar>
                );
            })}
        </div>
    );
};
