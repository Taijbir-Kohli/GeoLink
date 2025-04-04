// Mascot.js
import React from "react";
import "./Mascot.css";

const Mascot = ({ message, position = "default" }) => {
  const speakMessage = () => {
    const plainText = message.replace(/<[^>]+>/g, ""); // Strip HTML tags
    const speech = new SpeechSynthesisUtterance(plainText);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.cancel(); // Stop any current speech
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className={`globey-container ${position}`}>
      <img
        src="/img/GeoLinkMascot.png"
        alt="Globey the mascot"
        className="globey-img"
        onClick={speakMessage} 
        style={{ cursor: "pointer" }}
      />
      <div
        className="speech-bubble"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default Mascot;
