import React from "react";
import "./Footer.css";
import phone_icon from "../Assets/phone-call.png";
import mail_icon from "../Assets/gmail.png";
import linkedin_icon from "../Assets/linkedin.png";
import facebook_icon from "../Assets/facebook.png";
import instagram_icon from "../Assets/instagram.png";
import twitter_icon from "../Assets/twitter.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="first-column">
        <p className="toc">CONNECT WITH US</p>
        <div>
          <img src={phone_icon} alt="" />
          <img src={linkedin_icon} alt="" />
          <img src={mail_icon} alt="" />
        </div>
      </div>
      <div className="second-column">
        <p className="toc">BECOME A MEMBER</p>
        <div>
            <input placeholder="Enter your email here*" type="text" name="" id="" />
            <button>Subscribe Now</button>
        </div>
      </div>
      <div className="third-column">
        <p className="toc">FOLLOW US</p>
        <div>
          <img src={facebook_icon} alt="" />
          <img src={twitter_icon} alt="" />
          <img src={instagram_icon} alt="" />
        </div>
      </div>
      <div className="fourth-column">
        <ul>
          <li>ABOUT US</li>
          <li>PRIVACY</li>
          <li>RETURN POLICY</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
