import React from "react";
import '../CSS/About.css'
import cat_img from "../Components/Assets/about-cat.png";
import cat_img_background from "../Components/Assets/about-cat-background.png";

const About = () => {
  return (
    <div className="about-container">
      <div className="top-a">
        <p>ABOUT</p>
        <div></div>
        <div></div>
      </div>
      <div className="middle-a">
        <div className="left-a">
          <h1>CHRISTINA SUN IS A PLACE FOR EYEWEAR LOVERS</h1>
          <p>
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. I’m a great place for you to
            tell a story and let your users know a little more about you.
          </p>
        </div>
        <div className="right-a">
          <img src={cat_img} alt="" />
          <img src={cat_img_background} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
