// Mascot.js
import React from "react";
import "./Mascot.css";

const Mascot = () => {
  return (
    <div className="globey-container">
      <img src="/img/GeoLinkMascot.png" alt="Globey the mascot" className="globey-img" />
      <div className="speech-bubble">
        <p>
          <strong>Hi, My name is Globey!</strong><br />
          Click on a country to Learn More!
        </p>
      </div>
    </div>
  );
};

export default Mascot;
