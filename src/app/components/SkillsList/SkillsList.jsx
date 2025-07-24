import "./SkillsList.css";
import { SkillWithBar } from "../SkillWithBar/SkillWithBar";


export const SkillsList = ({skills}) => {
  
  return (
    <div className="skillsList">
      {skills.map((skill, index) => {
        return (
          <SkillWithBar key={index} percentage={skill.percentage}>
            {skill.item}
          </SkillWithBar>
        );
      })}
    </div>
  );
}