import { HwithLine } from "../HWithLine/HwithLine";
import { DetailsList } from "../DetailsList/DetailsList";
import { SkillsList } from "../SkillsList/SkillsList";
import { LangList } from "../LangList/LangList";

import "./Aside.css";


export const Aside = () => {
  return (
   <aside className="aside">
        <HwithLine line={true}>
            DETAILS
        </HwithLine>
        <DetailsList/> 
        <div className='skillsWrapper'>  
            <HwithLine line={true}>
                SKILLS
            </HwithLine>
            <SkillsList/> 
        </div>
            <div className='langsWrapper'>  
            <HwithLine line={true}>
                LANGUAGES
            </HwithLine>
            <LangList/> 
        </div>
    </aside>
  );
}