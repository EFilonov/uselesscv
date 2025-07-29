import React from "react";
import { HwithLine } from "../HWithLine/HwithLine";
import { data } from "../../constants/data";

import "./DetailsList.css";

export const DetailsList: React.FC = () => {
  
  const { address, phone, email, nationality} = data;
  return (
    <div className="detailsList">
       <HwithLine line={false}>
        ADDRESS
      </HwithLine>
      <div className="regularText">
        {address}
      </div>
      <HwithLine line={false}>
        PHONE
      </HwithLine>
      <a href={phone.full} className="regularText" type="tel" >
        {phone.short}
      </a>
      <HwithLine line={false}>
        EMAIL
      </HwithLine>
        <a href={email.full} className="regularText">
        {email.short}
        </a>
      <HwithLine line={false}>
        NATIONALITY
      </HwithLine>
        <div className="regularText">
        {nationality}
      </div>
    </div>
  );
};