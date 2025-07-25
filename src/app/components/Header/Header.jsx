import { Button } from "../Button/Button";
import router from "next/router";

import "./Header.css";

export const Header = ({animate, handleDownload}) => {
  
  return (
    <header className="header">
      
      <div className="headerWrapper">
        {/* <div className="headerName"> */}
          <h1 className={`headerContent${animate ? " animate" : " hidden"}`}>
            LANDON HARPER
          </h1>
        {/* </div> */}
      <div className="headerBtns">
        <Button 
          onClick={()=>handleDownload()}
          >PDF</Button >
        <Button>Print</Button>
        <Button>Login</Button>
      </div>  
      </div>
    </header>
  );
}