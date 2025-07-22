import "./SkillsList.css";
import { SkillWithBar } from "../SkillWithBar/SkillWithBar";


export const SkillsList = ({children}) => {
  return (
    <div className="skillsList">
      <SkillWithBar percentage={100}>
             Performance optimization
      </SkillWithBar>
      <SkillWithBar percentage={100}>
             Troubleshooting and solutions deployment
      </SkillWithBar>
      <SkillWithBar percentage={100}>
             Analytical and thinking skills
      </SkillWithBar>
      <SkillWithBar percentage={100}>
            Software design and development
      </SkillWithBar>
      <SkillWithBar percentage={100}>
            Coding and scripting
      </SkillWithBar>
    </div>
  );
}