import React from "react";
import { SkillWithBarProps } from "./SkillWithBar.props.interface";

import "./SkillWithBar.css";

export const SkillWithBar: React.FC<SkillWithBarProps> = ({ children, percentage }) => {
  return (
    <div className="skillBar">
      <div className="skillName">{children}</div>
       <span className="bar" style={{ width: `${percentage}%` }}></span>
    </div>
  );
};