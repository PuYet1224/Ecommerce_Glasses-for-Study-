import React from "react";
import "./Advertisement.css";
import img_1 from "../Assets/hero-img-1.png";
import img_2 from "../Assets/hero-img-2.png";
import img_3 from "../Assets/hero-img-3.jpg";
import img_4 from "../Assets/hero-img-4.png";
import { motion } from "framer-motion";

const transition = { type: "tween", duration: 1 };

const Advertisement = () => {
  return (
    <div className="advertisement-container">
      <div className="top">
        <motion.div
          initial={{ marginLeft: "-40rem", opacity: 0 }}
          whileInView={{ marginLeft: "-30rem", opacity: 1 }}
          transition={transition}
          className="left-p"
          viewport={{ once: true }}
        >
          <img src={img_2} alt="" />
          <div className="top-des">
            <h1>PICK ME</h1>
            <p>Our top selling sunglasses are now on glasses</p>
            <button>GLASSES</button>
          </div>
        </motion.div>
        <motion.div
          initial={{ marginRight: "-40rem", opacity: 0 }}
          whileInView={{ marginRight: "-30rem", opacity: 1 }}
          transition={transition}
          className="right-p"
          viewport={{ once: true }}
        >
          <img src={img_1} alt="" />
        </motion.div>
      </div>
      <div className="middle">
        <motion.div
          initial={{ marginLeft: "-30rem", opacity: 0 }}
          whileInView={{ marginLeft: "-20rem", opacity: 1 }}
          transition={transition}
          className="left-f"
          viewport={{ once: true }}
        >
          <img src={img_3} alt="" />
        </motion.div>
        <motion.div
          initial={{ marginRight: "-50rem", opacity: 0 }}
          whileInView={{ marginRight: "-40rem", opacity: 1 }}
          transition={transition}
          className="right-f"
          viewport={{ once: true }}
        >
          <p>FOR ALL THOSE STARING DIGITAL DEVICES ALL DAY & NIGHT</p>
          <div></div>
          <button>BUY NOW</button>
        </motion.div>
      </div>
      <div className="bottom">
        <motion.div
          initial={{ marginLeft: "-47rem", opacity: 0 }}
          whileInView={{ marginLeft: "-37rem", opacity: 1 }}
          transition={transition}
          className="left-g"
          viewport={{ once: true }}
        >
          <p>GET ALL THE CONTACT LENSES BRANDS AT BEST PRICES</p>
          <div></div>
          <button>SHOP NOW</button>
        </motion.div>
        <motion.div
          initial={{ marginRight: "-25rem", opacity: 0 }}
          whileInView={{ marginRight: "-15rem", opacity: 1 }}
          transition={transition}
          className="right-g"
          viewport={{ once: true }}
        >
          <img src={img_4} alt="" />
        </motion.div>
      </div>
    </div>
  );
};

export default Advertisement;
