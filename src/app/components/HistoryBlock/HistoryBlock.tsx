import React from 'react';

import { data } from '../../constants/data';
import './HistoryBlock.css';

export const HistoryBlock: React.FC = () => {
    const { ehistory } = data;

    return (
        <div className='historyBlock'>
            {ehistory.map((history, idx) => {
                return (
                    <div key={idx}>
                        <div className='historyHeader'>
                            <div className='historyTitle'>{history.title}</div>
                            <div className='historyCompany'>{history.company}</div>
                        </div>
                        <div className='historyYears'>{history.date}</div>
                        <ul className='historyList'>
                            {history.achievements.map((item, index) => (
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
