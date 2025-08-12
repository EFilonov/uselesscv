import React from 'react';

import { useStore } from '../../store/zustandStore';
import './HistoryBlock.css';

export const HistoryBlock: React.FC = () => {
    const data = useStore((state) => state.data);
    const ehistory = data?.achievements || [];

    return (
        <div className='historyBlock'>
            {ehistory.map((history) => {
                return (
                    <div key={history.fields.title} className='historyItem'>
                        <div className='historyHeader'>
                            <div className='historyTitle'>{history.fields.title}</div>
                            <div className='historyCompany'>{history.fields.company}</div>
                        </div>
                        <div className='historyYears'>{history.fields.date}</div>
                        <ul className='historyList'>
                            {history.fields.achievements.map((item, index) => (
                                <li key={index} className='historyItem'>
                                    <span className='historyBullet'></span>
                                    <div className='historyText'>{item}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};
