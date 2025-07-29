import React from "react";
import { FooterProps } from "./Footer.props.interface";

import "./Footer.css";
import { data } from "./../../constants/data";

export const Footer: React.FC = () => {
  const { phone, email, address } = data;
  return (
    <footer className='footer'>
      <p className='footerText'>
        <span className="footerDetails">{`© ${new Date().getFullYear()} Landon Harper — Resume`}</span>
        <span className='footerContact'>
          <a href={data.phone.full} className="footerPhone" type="tel">
            {phone.short}
          </a>
        </span>
        <span className='footerContact'>
          <a href={data.email.full} className="footerEmail" type="tel">
            {email.short}
          </a>
        </span>
        <span className='footerLocation'>
          {address}
        </span>
      </p>
    </footer>
  );
};