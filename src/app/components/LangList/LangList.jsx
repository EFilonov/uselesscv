import "./LangList.css";
import { SkillWithBar } from "../SkillWithBar/SkillWithBar";


export const LangList = ({children}) => {
  return (
    <div className="skillsList">
      <SkillWithBar percentage={100}>
        English
      </SkillWithBar>
      <SkillWithBar percentage={75}>
        French
      </SkillWithBar>
    </div>
  );
}