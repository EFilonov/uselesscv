import "./LangList.css";
import { SkillWithBar } from "../SkillWithBar/SkillWithBar";


export const LangList = ({languages}) => {
  return (
    <div className="skillsList">
      {languages.map((language, index) => {
        return (
          <SkillWithBar key={index} percentage={language.percentage}>
            {language.item}
          </SkillWithBar>
        );
      })}
    </div>
  );
}