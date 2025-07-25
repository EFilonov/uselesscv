'use client';
import {Aside} from './../Aside/Aside';
import { HwithLine } from '../HWithLine/HwithLine';
import { data } from '../../constants/constants';
import { HistoryBlock } from '../HistoryBlock/HistoryBlock';
import { Footer } from '../Footer/Footer';
import {Header} from '../Header/Header';
import { useRef, useEffect, useState,  React, useCallback} from "react";

import './Main.css';

export const Main = () => {
    const [invert, setInvert] = useState(false);
    const[isVisibleName, setIsVisibleName] = useState(false);
    const titleRef = useRef(null);
    const contentRef = useRef();
    const {
        name,
        occupation,
        profile, 
        ehistory,
        education,
        phone,
        email,
        } = data;

    useEffect(() => {
      const headerHeight = 60; // px
      const handleScroll = () => {
        if (!titleRef.current) return;
        const rect = titleRef.current.getBoundingClientRect();
        setInvert(rect.top <= headerHeight);
        setIsVisibleName(rect.top <= 10 ? true: false);
        

      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
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
      
    }
    ,[]);
    
  return (
    <>
      <Header animate={isVisibleName} handleDownload={handleDownload}/>
      <div className="container">
        <main className="main" ref={contentRef}>
          <h1
            className={`titleName${invert ? " invert" : ""}${isVisibleName ? " visible" : ""}`}
            ref={titleRef}
          >
            {name}
          </h1>
          <h3 className="titleProffile">{occupation}</h3>
          <div className="divider"></div>
        <div className="content">
          <div className="aside">
            <Aside data={data}/>
          </div>
           <div className="mainContent">
            <HwithLine line={true}>
              PROFILE
            </HwithLine>
            <div className="regularText profileText">
              {profile}
            </div>
            <HwithLine line={true}>
              EMPLOYMENT HISTORY
            </HwithLine>

            <article className="article">
                {ehistory.map((item, index) =>{
                    return (
                        <HistoryBlock key={index}
                            title={item.title}
                            company={item.company}
                            years={item.date}
                            achivments={item.achivments}
                        />
                    )
                })}
            <div className="divider"></div>
            <div className="educationBlock">
              <HwithLine line={true}>
                EDUCATION
              </HwithLine>
              <HwithLine line={false}>
                {education.school}            
              </HwithLine>
            </div>
            <div className="regularText">
              {education.years}
            </div>
            </article>
          </div>
        </div>
        </main>
      </div>
      <Footer phone={phone} email={email}/>
    </>  
    );
}