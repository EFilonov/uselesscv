'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { data } from '../../constants/data';
import { Aside } from '../Aside/Aside';
import { Footer } from '../Footer/Footer';
import { HwithLine } from '../HWithLine/HwithLine';
import { Header } from '../Header/Header';
import { HistoryBlock } from '../HistoryBlock/HistoryBlock';
import './Main.css';

export const Main = () => {
    const [invert, setInvert] = useState(false);
    const [isVisibleName, setIsVisibleName] = useState(false);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const { name, occupation, profile, education } = data;

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
            margin: [5, 8, 5, 5],
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
            <div className='container'>
                <main className='main' ref={contentRef}>
                    <h1
                        className={`titleName${invert ? ' invert' : ''}${isVisibleName ? ' visible' : ''}`}
                        ref={titleRef}>
                        {name}
                    </h1>
                    <h3 className='titleProffile'>{occupation}</h3>
                    <div className='divider'></div>
                    <div className='content'>
                        <div className='aside'>
                            <Aside />
                        </div>
                        <div className='mainContent'>
                            <HwithLine line={true}>PROFILE</HwithLine>
                            <div className='regularText profileText'>{profile}</div>
                            <HwithLine line={true}>EMPLOYMENT HISTORY</HwithLine>

                            <article className='article'>
                                <HistoryBlock />
                                <div className='divider'></div>
                                <div className='educationBlock'>
                                    <HwithLine line={true}>EDUCATION</HwithLine>
                                    <HwithLine line={false}>{education.school}</HwithLine>
                                </div>
                                <div className='regularText'>{education.years}</div>
                            </article>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};
