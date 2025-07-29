import React from "react";
import "./SkillsList.css";
import { SkillWithBar } from "../SkillWithBar/SkillWithBar";
import { data } from "../../constants/data"; 

export const SkillsList: React.FC = () => {
  const { skills } = data;
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
};