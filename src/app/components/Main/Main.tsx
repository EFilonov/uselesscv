'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { clientData } from '@/app/interfaces/clientData.interface';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { useStore } from '../../store/zustandStore';
import { Aside } from '../Aside/Aside';
import { Footer } from '../Footer/Footer';
import { HwithLine } from '../HWithLine/HwithLine';
import { Header } from '../Header/Header';
import { HistoryBlock } from '../HistoryBlock/HistoryBlock';
import { SkeletonMain } from './../SkeletonMain/SkeletonMain';
import './Main.css';

export const Main = () => {
    const data = useStore((state) => state.data) as clientData | null;
    const isLoading = useStore((state) => state.isLoading);
    const [invert, setInvert] = useState(false);
    const [isVisibleName, setIsVisibleName] = useState(false);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const headerHeight = 60; // px
        const handleScroll = () => {
            if (!titleRef.current) return;
            const rect = titleRef.current.getBoundingClientRect();
            setInvert(rect.top <= headerHeight);
            setIsVisibleName(rect.top <= 10 ? true : false);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDownload = useCallback(async () => {
        const html2pdf = (await import('html2pdf.js')).default;
        const element = contentRef.current;
        const options = {
            margin: [5, 5, 5, 5],
            filename: 'CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        setInvert(false);
        html2pdf().set(options).from(element).save();
    }, []);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    return (
        <>
            <Header animate={isVisibleName} handleDownload={handleDownload} handlePrint={handlePrint} />
            {isLoading ? (
                <SkeletonMain />
            ) : (
                <main className='main'>
                    <div className='pdfWrapper' ref={contentRef}>
                        <div className='container'>
                            <h1
                                className={`titleName${invert ? ' invert' : ''}${isVisibleName ? ' visible' : ''}`}
                                ref={titleRef}>
                                {data?.name}
                            </h1>
                            <h3 className='titleProffile'>{data?.occupation}</h3>
                            <div className='divider'></div>
                            <div className='content'>
                                <div className='aside'>
                                    <Aside />
                                </div>
                                <div className='mainContent'>
                                    <HwithLine line={true}>PROFILE</HwithLine>
                                    <div className='regularText profileText'>{data?.profile}</div>
                                    <HwithLine line={true}>EMPLOYMENT HISTORY</HwithLine>

                                    <article className='article'>
                                        <HistoryBlock />
                                        <div className='divider'></div>
                                        <div className='educationBlock'>
                                            <HwithLine line={true}>EDUCATION</HwithLine>
                                            <HwithLine line={false}>{data?.educationSchool}</HwithLine>
                                        </div>
                                        <div className='regularText'>{data?.educationYears}</div>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <div className='container letterContainer'>
                            <div className='coverLeteer'>
                                {data?.coverLetter && documentToReactComponents(data.coverLetter)}
                            </div>
                        </div>
                    </div>
                </main>
            )}
            <Footer />
        </>
    );
};
