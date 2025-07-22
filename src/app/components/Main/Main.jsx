import {Aside} from './../Aside/Aside';
import { HwithLine } from '../HWithLine/HwithLine';
import { data } from '../../constants/constants';
import { HistoryBlock } from '../HistoryBlock/HistoryBlock';

import './Main.css';

export const Main = () => {
    const {
        name,
        occupation,
        profile, 
        ehistory,
        education 
        } = data;
  return (
    <>
      <header className="header">
       Header
      </header>
      <div className="container">
        <main className="main">
          <h1 className="titleName">{name}</h1>
          <h3 className="titleProffile">{occupation}</h3>
          <div className="divider"></div>
        <div className="content">
          <div className="aside">
            <Aside />
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
      <footer className='footer'>
        
      </footer>
      
    </>
  );
}