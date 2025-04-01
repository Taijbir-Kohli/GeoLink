import React from "react";
import "./welcomePopup.css";

const WelcomePopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div id="box" className="spinning-globe" />
        <div className="welcome-text">
          <h2>WELCOME TO</h2>
          <h1 className="title">GEOLINK</h1>
          <p></p>
          <button className="begin-button" onClick={onClose}>
            BEGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
