import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import landmarkLinks from "./LandmarkLinks";

const LandmarkMatch = () => {
  const navigate = useNavigate();
  const [correctCountry, setCorrectCountry] = useState(null);
  const [randomOptions, setRandomOptions] = useState([]);
  const [iframeUrl, setIframeUrl] = useState("");

  // Utility to get 3 random incorrect countries
  const getRandomCountries = (excludeCountry) => {
    const countries = Object.keys(landmarkLinks).filter(
      (c) => c !== excludeCountry
    );
    const shuffled = countries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Setup new question on mount or refresh
  useEffect(() => {
    const allCountries = Object.keys(landmarkLinks);
    const randomCountry =
      allCountries[Math.floor(Math.random() * allCountries.length)];
    const landmark = landmarkLinks[randomCountry];
    const wrongAnswers = getRandomCountries(randomCountry);
    const allOptions = [...wrongAnswers, randomCountry].sort(() => 0.5 - Math.random());

    setCorrectCountry(randomCountry);
    setIframeUrl(landmark);
    setRandomOptions(allOptions);
  }, []);

  const handleAnswer = (selected) => {
    if (selected === correctCountry) {
      alert("✅ Correct!");
    } else {
      alert(`❌ Oops! The correct answer was ${correctCountry}.`);
    }

    // Refresh question
    window.location.reload();
  };

  return (
    <div>
      {/* Header */}
      <div className="header-container">
        <img src="/favicon.ico" alt="GeoLink logo" className="logo" />
        <h1 className="title">GeoLink</h1>
        <button className="games-button" onClick={() => navigate("/games")}>
          Games
        </button>
      </div>

      {/* Game Section */}
      <div style={{ padding: "40px", fontFamily: "Fredoka, sans-serif" }}>
        <h1>🗺️ Landmark Match</h1>
        <p>Can you guess the country of this landmark?</p>

        {/* Landmark iframe */}
        <div style={{ margin: "30px 0", textAlign: "center" }}>
          <iframe
            src={iframeUrl}
            title="Landmark View"
            width="800"
            height="450"
            style={{ borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {randomOptions.map((country, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(country)}
              style={{
                padding: "12px 24px",
                fontSize: "1rem",
                fontFamily: "Fredoka, sans-serif",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#4a75f9",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                transition: "0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#3657c3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4a75f9")}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandmarkMatch;
