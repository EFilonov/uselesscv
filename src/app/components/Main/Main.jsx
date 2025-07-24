'use client';
import {Aside} from './../Aside/Aside';
import { HwithLine } from '../HWithLine/HwithLine';
import { data } from '../../constants/constants';
import { HistoryBlock } from '../HistoryBlock/HistoryBlock';
import { Footer } from '../Footer/Footer';
import {Header} from '../Header/Header';
import { useRef, useEffect, useState } from "react";

import './Main.css';

export const Main = () => {
    const [invert, setInvert] = useState(false);
    const[isVisibleName, setIsVisibleName] = useState(false);
    const titleRef = useRef(null);

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
    }, [isVisibleName]);
    useEffect(() => {
        console.log(isVisibleName)
    }, [isVisibleName]);

    const {
        name,
        occupation,
        profile, 
        ehistory,
        education,
        phone,
        email,
        } = data;
  return (
    <>
      <Header animate={isVisibleName}/>
      <div className="container">
        <main className="main">
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