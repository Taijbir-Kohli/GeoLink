import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import landmarkLinks from "./LandmarkLinks";

const LandmarkMatch = () => {
  const navigate = useNavigate();
  const [correctCountry, setCorrectCountry] = useState(null);
  const [randomOptions, setRandomOptions] = useState([]);
  const [iframeUrl, setIframeUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const getRandomCountries = (excludeCountry) => {
    const countries = Object.keys(landmarkLinks).filter(c => c !== excludeCountry);
    const shuffled = countries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const generateQuestion = () => {
    const allCountries = Object.keys(landmarkLinks);
    const randomCountry = allCountries[Math.floor(Math.random() * allCountries.length)];
    const landmark = landmarkLinks[randomCountry];
    const wrongAnswers = getRandomCountries(randomCountry);
    const options = [...wrongAnswers, randomCountry].sort(() => 0.5 - Math.random());

    setCorrectCountry(randomCountry);
    setIframeUrl(landmark);
    setRandomOptions(options);
    setShowResult(false);
    setSelectedAnswer("");
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (selected) => {
    setSelectedAnswer(selected);
    setIsCorrect(selected === correctCountry);
    setShowResult(true);
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

      {/* Main content */}
      <div style={{ padding: "0px 40px 40px", fontFamily: "Fredoka, sans-serif", marginTop: "-10px" }}>
        <h1>🗺️ Landmark Match</h1>
        <p>Can you guess the country of this landmark?</p>

        {/* Landmark View & Options side-by-side */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "40px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {/* Iframe Section */}
          <iframe
            src={iframeUrl}
            title="Landmark View"
            width="800"
            height="450"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              border: "none",
            }}
            allowFullScreen
            loading="lazy"
          ></iframe>

            {/* Answer Options on the Right */}
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
            }}
            >
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", fontWeight: "600" }}>
                Pick the Correct Answer
            </h3>

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

        {/* Popup Modal */}
        {showResult && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fef3a5",
                padding: "30px 40px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 8px 20px #000000",
                maxWidth: "400px",
              }}
            >
              <h2
                style={{
                  color: isCorrect ? "#4caf50" : "#f44336"
                }}
              >
                {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
              </h2>

              <p>
                You chose: <strong>{selectedAnswer}</strong>
              </p>
              {!isCorrect && (
                <p>
                  The correct answer was: <strong>{correctCountry}</strong>
                </p>
              )}
              <button
                onClick={generateQuestion}
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
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandmarkMatch;
