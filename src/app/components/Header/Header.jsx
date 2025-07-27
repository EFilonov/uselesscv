import { Button } from "../Button/Button";
import { Hamburger } from "../Hamburger/Hamburger";
import { UserMenu } from "../UserMenu/UserMenu";
import router from "next/router";
import { SessionProvider } from "next-auth/react";

import "./Header.css";



export const Header = ({animate, handleDownload, handlePrint}) => {
  console.log(process.env.OAUTH_GOOGLE_CLIENT_ID, process.env.OAUTH_GOOGLE_CLIENT_SECRET);
  return (
    <header className="header">
      
      <div className="headerWrapper">
        <h1 className={`headerContent${animate ? " animate" : " hidden"}`}>
            LANDON HARPER
        </h1>
      <div className="headerBtns">
        <SessionProvider>
            <UserMenu handleDownload={handleDownload} handlePrint={handlePrint}/>
        </SessionProvider>
      </div>
     </div>
    </header>
  );
}   