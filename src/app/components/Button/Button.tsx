import React from "react";
import { ButtonProps } from "./Button.props.interface";

import "./Button.css";

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="btn2" onClick={onClick}>
      <span className="spn2">{children}</span>
    </button>
  );
};