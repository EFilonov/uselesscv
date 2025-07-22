

import './HwithLine.css';

export const HwithLine = ({children, line = false}) => {
  return (
    <>
      <h2 className="hWithLine" >
        {children}
      </h2>
      {line && <span className="line"></span>}

    </>
  );
};