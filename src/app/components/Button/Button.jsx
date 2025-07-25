import "./Button.css";

export const Button = ({ children, onClick}) => {
  return (
    <button className="btn2" onClick={onClick}>
        <span className="spn2">{children}</span>
    </button>
);
}