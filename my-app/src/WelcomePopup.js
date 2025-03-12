import React from "react";
import "./welcomePopup.css";

const WelcomePopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>WELCOME TO</h2>
        <h1 className="title">GEOLINK</h1>
        <p>CLICK ON A COUNTRY TO BEGIN!</p>
        <button className="begin-button" onClick={onClose}>
          BEGIN
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
