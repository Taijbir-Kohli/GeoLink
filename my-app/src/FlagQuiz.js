import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import FlagQuizMap from "./FlagQuizMap"; // ← custom map
// import getCountryCode from ".App.js/getCountryCode";



const FlagQuiz = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    // const code = getCountryCode(country);
    // if (code) {
    //   alert(`https://flagsapi.com/${code}/flat/64.png`);
    // }
  };

  return (
    <div>
      <div className="header-container">
        <img src="/favicon.ico" alt="GeoLink logo" className="logo" />
        <h1 className="title">GeoLink</h1>
        <button className="games-button" onClick={() => navigate("/games")}>
          Games
        </button>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        alignItems: "flex-start",
        padding: "40px",
        fontFamily: "Fredoka, sans-serif"
      }}>
        {/* 📍Map takes 60% width */}
        <div style={{ flex: "0 0 60%", minWidth: "500px" }}>
          <FlagQuizMap onCountryClick={handleCountrySelect} />
        </div>

        {/* 📦 Flag & info section on the right */}
        <div style={{
          flex: "1",
          background: "#fef3a5",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minWidth: "250px"
        }}>
          <h2 style={{ marginBottom: "20px" }}>🧠 Flag Quiz</h2>
          {selectedCountry ? (
            <>
              <p><strong>You selected:</strong> {selectedCountry}</p>
              <img
                //src={`https://flagsapi.com/${getCountryCode(selectedCountry)}/flat/64.png`}
                src={`https://flagsapi.com/IN/flat/64.png`}
                alt={`${selectedCountry} flag`}
                className="flag-image"
              />
            </>
          ) : (
            <p>Click a country to view its flag!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlagQuiz;
