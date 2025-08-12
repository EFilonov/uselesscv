'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { data as staticData } from '../../constants/data';
import { Aside } from '../Aside/Aside';
import { Footer } from '../Footer/Footer';
import { HwithLine } from '../HWithLine/HwithLine';
import { Header } from '../Header/Header';
import { HistoryBlock } from '../HistoryBlock/HistoryBlock';
import './Main.css';

interface MainProps {
    data?: any;
}

export const Main = ({ data: dynamicData }: MainProps) => {
    const data = staticData;
    console.log('data', dynamicData);
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
            <main className='main'>
                <div className='pdfWrapper' ref={contentRef}>
                    <div className='container'>
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
                    </div>
                    <div className='container letterContainer'>
                        <div className='coverLeteer'>
                            <div className='applicant'></div>
                            <h3>Landon Harper</h3>
                            <div className='applicantInfo'>
                                <p>2435 Lincoln Avenue</p>
                                <p>San Diego, CA 92104</p>
                                <p>lharper@gmail.com</p>
                                <p>(619) 555-0147</p>

                                <h3>August 6, 2025</h3>
                                <p>Hiring Manager</p>
                                <p>Nexora Technologies</p>
                                <p>500 Innovation Way</p>
                                <p>San Francisco, CA 94107</p>
                            </div>

                            <div className='hiringPerson'></div>
                            <article className='letterText'>
                                <h4>Dear Hiring Manager,</h4>
                                <p>
                                    I am writing to express my interest in the Software Developer position at Nexora
                                    Technologies. With over three years of experience in full-stack web development and
                                    a passion for performance optimization, I am excited about the opportunity to
                                    contribute to your mission of building scalable and innovative web platforms.
                                </p>
                                <p>
                                    In my current role at TechNova Solutions, I led the development of a payment
                                    microservice that reduced API response times by 40% and played a key role in
                                    migrating our monolithic architecture to a Django and React-based stack. These
                                    initiatives significantly improved both system performance and developer
                                    productivity. Additionally, implementing CI/CD pipelines using GitHub Actions and
                                    Docker helped us accelerate our release cycles by 25%.
                                </p>
                                <p>
                                    Previously, at BrightEdge Labs, I focused on enhancing frontend performance for an
                                    e-commerce platform, raising its Lighthouse score from 62 to 92. I also contributed
                                    to the development of a machine learning-powered product recommendation engine that
                                    increased conversion rates by 12%.{' '}
                                </p>
                                <p>
                                    I am particularly drawn to Nexora’s emphasis on high-performance systems and modern
                                    development practices. I believe my strong foundation in Python and JavaScript,
                                    along with my hands-on experience with scalable architectures and deployment
                                    pipelines, make me a strong fit for your team. I am eager to continue growing
                                    professionally in a collaborative and forward-thinking environment like yours.{' '}
                                </p>
                                <p>
                                    Thank you for considering my application. I would welcome the opportunity to further
                                    discuss how I can contribute to Nexora’s continued success. Please feel free to
                                    contact me at your convenience.
                                </p>
                                <p>
                                    <span>Sincerely,</span> <span>Landon Harper</span>
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
