import { HwithLine } from "../HWithLine/HwithLine";
import { DetailsList } from "../DetailsList/DetailsList";
import { SkillsList } from "../SkillsList/SkillsList";
import { LangList } from "../LangList/LangList";

import "./Aside.css";


export const Aside = ({data}) => {
    
  return (
   <aside className="aside">
        <HwithLine line={true}>
            DETAILS
        </HwithLine>
        <DetailsList data={data}/> 
        <div className='skillsWrapper'>  
            <HwithLine line={true}>
                SKILLS
            </HwithLine>
            <SkillsList skills={data.skills}/> 
        </div>
            <div className='langsWrapper'>  
            <HwithLine line={true}>
                LANGUAGES
            </HwithLine>
            <LangList languages={data.languages}/> 
        </div>
    </aside>
  );
}