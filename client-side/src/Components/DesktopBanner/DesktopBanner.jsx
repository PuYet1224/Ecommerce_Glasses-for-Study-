import React, { useRef, useEffect } from "react";
import "./DesktopBanner.css";
import desktop_banner1 from "../Assets/banner-1.jpg";
import desktop_banner2 from "../Assets/banner-2.jpg";
import desktop_banner3 from "../Assets/banner-3.jpg";

const DesktopBanner = () => {
  const slider = useRef(null);
  let tx = 0;

  const sliderForward = () => {
    if (tx > -200) {
      tx -= 100;
    } else {
      tx = 0;
    }
    if (slider.current) {
      slider.current.style.transition = "transform 0.4s ease-in-out";
      slider.current.style.transform = `translateX(${tx}%)`;
    }
  };
  useEffect(() => {
    const interval = setInterval(sliderForward, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="desktop-banner">
      <div className="slider">
        <ul ref={slider}>
          <li>
            <img src={desktop_banner1} alt="" />
          </li>
          <li>
            <img src={desktop_banner2} alt="" />
          </li>
          <li>
            <img src={desktop_banner3} alt="" />
          </li>
        </ul>
        <div className="slogan">
          OUR NEW ARRIVALS ARE HERE
          <div className="dot dot-top-left"></div>
          <div className="dot dot-bottom-left"></div>
          <div className="dot dot-top-right"></div>
          <div className="dot dot-bottom-right"></div>
        </div>
      </div>
    </div>
  );
};

export default DesktopBanner;
