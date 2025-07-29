import React from "react";
import { SkillWithBar } from "../SkillWithBar/SkillWithBar";
import { data } from "../../constants/data"; 

import "./LangList.css";

export const LangList: React.FC = () => {
  const { languages } = data;
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
};