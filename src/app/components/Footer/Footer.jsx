import "./Footer.css";

export const Footer = ({phone, email}) => {
  return (
    <footer className='footer'>
      <p className='footerText'>
        <span className="footerDetails">{`© ${new Date().getFullYear()} Landon Harper — Resume`}</span>
        <span className='footerContact'>
            <a href={phone.full} className="footerPhone" type="tel" >
                {phone.short}
            </a>
        </span>
        <span className='footerContact'>
            <a href={email.full} className="footerEmail" type="tel" >
                {email.short}
            </a>
        </span>
        <span className='footerLocation'>
            San Diego, CA
        </span>
      </p>
    </footer>
  );
}