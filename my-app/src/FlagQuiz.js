import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import FlagQuizMap from "./FlagQuizMap";
import countriesData from "./countries.json";

const FlagQuiz = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [targetCountry, setTargetCountry] = useState(null);

  const getCountryCode = (name) => {
    const country = require("iso-3166-1-alpha-2").getCode(name);
    return country || null;
  };

  const pickRandomCountry = () => {
    const allValidCountries = countriesData.features
      .map(f => f.properties.name)
      .filter(name => getCountryCode(name)); // Only valid ISO

    const newTarget = allValidCountries[Math.floor(Math.random() * allValidCountries.length)];
    setTargetCountry(newTarget);
    setSelectedCountry(null); // Reset selection
  };

  useEffect(() => {
    pickRandomCountry(); // On load
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const isCorrect = selectedCountry === targetCountry;
  const countryCode = getCountryCode(targetCountry);

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

      {/* Main Content */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        alignItems: "flex-start",
        padding: "40px",
        fontFamily: "Fredoka, sans-serif"
      }}>
        {/* Map */}
        <div style={{ flex: "0 0 60%", minWidth: "500px" }}>
          <FlagQuizMap onCountryClick={handleCountrySelect} />
        </div>

        {/* Flag Info */}
        <div style={{
          flex: "1",
          background: "#fef3a5",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minWidth: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center"
        }}>
          <h2 style={{ marginBottom: "20px" }}>🧠 Flag Quiz</h2>

          {targetCountry && countryCode ? (
            <img
              src={`https://flagsapi.com/${countryCode}/flat/64.png`}
              alt={`${targetCountry} flag`}
              className="flag-image"
              style={{
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
              }}
            />
          ) : (
            <p>Loading flag...</p>
          )}

          {selectedCountry && (
            <>
              <p>
                You selected: <strong>{selectedCountry}</strong>
              </p>
              <h3 style={{
                color: isCorrect ? "#4caf50" : "#f44336",
                marginTop: "10px"
              }}>
                {isCorrect ? "✅ Correct!" : "❌ Try Again!"}
              </h3>
            </>
          )}

          {!selectedCountry && <p>Click a country to guess the flag!</p>}

          {isCorrect && (
            <button
              onClick={pickRandomCountry}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#4a75f9",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
              }}
            >
              🎉 Next Flag
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlagQuiz;
