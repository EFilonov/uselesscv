import "./SkillWithBar.css";

export const SkillWithBar = ({ children, percentage }) => {
  return (
    <div className="skillBar">
      <div className="skillName">{children}</div>
       <span className="bar" style={{ width: `${percentage}%` }}></span>
    </div>
  );
}