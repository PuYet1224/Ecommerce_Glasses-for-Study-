import React from "react";
import "../CSS/Contact.css";
import location_icon from "../Components/Assets/location.png";
import phone_icon from "../Components/Assets/telephone.png";
import email_icon from "../Components/Assets/email.png";
import like_icon from "../Components/Assets/like.png";
import facebook_icon from "../Components/Assets/facebook.png";
import twitter_icon from "../Components/Assets/twitter.png";
import instagram_icon from "../Components/Assets/instagram.png";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "cae5a2e9-6521-43ff-a50a-40fab5720eb1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact-container">
      <div className="top">
        <p>Let's Connect</p>
        <h1>Contact Us</h1>
      </div>
      <div className="middle-contact">
        <div className="left-contact">
          <div>
            <img src={location_icon} alt="" />
            <h2>Address</h2>
            <p>MUMBAI , MAHARASHTRA</p>
          </div>
          <div>
            <img src={phone_icon} alt="" />
            <h2>Phone</h2>
            <p>+91-7715960149</p>
          </div>
          <div>
            <img src={email_icon} alt="" />
            <h2>Phone</h2>
            <p>support@optiquekart.in</p>
          </div>
          <div>
            <img src={like_icon} alt="" />
            <h2>Social Media</h2>
            <div>
              <img src={facebook_icon} alt="" />
              <img src={twitter_icon} alt="" />
              <img src={instagram_icon} alt="" />
            </div>
          </div>
        </div>
        <div className="right-c">
          <div className="contact-col">
            <form onSubmit={onSubmit}>
              <label>Your name</label>
              <input type="text" name="name" required />
              <label>Phone Number</label>
              <input type="tel" name="phone" required />
              <label>Write your messages here</label>
              <textarea name="message" rows="6" required></textarea>
              <button type="submit" className="btn dark-btn">
                Submit now
              </button>
            </form>
            <span>{result}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
