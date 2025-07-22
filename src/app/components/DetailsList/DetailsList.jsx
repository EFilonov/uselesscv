
import { HwithLine } from "../HWithLine/HwithLine";

import "./DetailsList.css";

export const DetailsList = ({children}) => {
  return (
    <div className="detailsList">
       <HwithLine line={false}>
        ADDRESS
      </HwithLine>
      <div className="regularText">
        2435 Lincoln Avenue
        San Diego, CA 92104
        United States
      </div>
      <HwithLine line={false}>
        PHONE
      </HwithLine>
      <a href="tel:+16195550147" className="regularText" type="tel" >
        (619) 555-0147
      </a>
      <HwithLine line={false}>
        EMAIL
      </HwithLine>
        <a href="mailto:lharper@gmail.com" className="regularText">
        lharper@gmail.com
        </a>
      <HwithLine line={false}>
        NATIONALITY
      </HwithLine>
        <div className="regularText">
        American
      </div>
    </div>
  );
}