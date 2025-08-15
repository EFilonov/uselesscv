import React from 'react';

import { clientData } from '@/app/interfaces/clientData.interface';

import { useStore } from '../../store/zustandStore';
import { HwithLine } from '../HWithLine/HwithLine';
import './DetailsList.css';

export const DetailsList: React.FC = () => {
    const data = useStore((state) => state.data) as clientData | null;

    return (
        <div className='detailsList'>
            <HwithLine line={false}>ADDRESS</HwithLine>
            <div className='regularText'>{data?.address}</div>
            <HwithLine line={false}>PHONE</HwithLine>
            <a href={data?.phoneFull} className='regularText' type='tel'>
                {data?.phoneShort}
            </a>
            <HwithLine line={false}>EMAIL</HwithLine>
            <a href={data?.emailFull} className='regularText'>
                {data?.emailShort}
            </a>
            <HwithLine line={false}>NATIONALITY</HwithLine>
            <div className='regularText'>{data?.nationality}</div>
        </div>
    );
};
