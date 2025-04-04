import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import landmarkLinks from "./LandmarkLinks";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./firebaseConfig";
import Mascot from "./Mascot";


const LandmarkMatch = () => {
  const navigate = useNavigate();
  const [correctCountry, setCorrectCountry] = useState(null);
  const [randomOptions, setRandomOptions] = useState([]);
  const [iframeUrl, setIframeUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [usedCountries, setUsedCountries] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0); // ✅ NEW: Score tracker

  const getRandomCountries = (excludeCountry, allOptions) => {
    const filtered = allOptions.filter((c) => c !== excludeCountry);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const generateQuestion = () => {
    const allCountries = Object.keys(landmarkLinks);
    const available = allCountries.filter(c => !usedCountries.includes(c));

    if (available.length === 0) {
      setGameOver(true);
      return;
    }

    const randomCountry = available[Math.floor(Math.random() * available.length)];
    const landmark = landmarkLinks[randomCountry];
    const wrongAnswers = getRandomCountries(randomCountry, allCountries);
    const options = [...wrongAnswers, randomCountry].sort(() => 0.5 - Math.random());

    setCorrectCountry(randomCountry);
    setIframeUrl(landmark);
    setRandomOptions(options);
    setShowResult(false);
    setSelectedAnswer("");
    setUsedCountries(prev => [...prev, randomCountry]);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = async (selected) => {
    setSelectedAnswer(selected);
    const correct = selected === correctCountry;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1); // ✅ Increase score only on correct
    }

    await updateLandmarkScore(selected, correctCountry, correct);
    setShowResult(true);
  };

  const updateLandmarkScore = async (selectedCountry, correctCountry, wasCorrect) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const db = getFirestore();
    const userRef = doc(db, "quizresults", user.uid);
    const userSnap = await getDoc(userRef);
  
    let userData = userSnap.exists() ? userSnap.data() : {
      username: user.displayName || "Anonymous",
      quizScores: {},
      totalScore: 0,
      totalCorrectAnswers: 0,
      totalQuestions: 0,
      flagQuizScores: {
        totalCorrect: 0,
        totalAttempts: 0,
        perCountry: {},
      },
      landmarkQuizScores: {
        totalCorrect: 0,
        totalAttempts: 0,
        perCountry: {},
      },
    };
  
    const landmarkData = userData.landmarkQuizScores || {
      totalCorrect: 0,
      totalAttempts: 0,
      perCountry: {},
    };
  
    const { totalCorrect, totalAttempts, perCountry } = landmarkData;
  
    const [prevCorrect, prevAttempts] = (perCountry[correctCountry] || "0/0")
      .split("/")
      .map(Number);
  
    const updatedCorrect = wasCorrect ? prevCorrect + 1 : prevCorrect;
    const updatedAttempts = prevAttempts + 1;
  
    const updatedPerCountry = {
      ...perCountry,
      [correctCountry]: `${updatedCorrect}/${updatedAttempts}`,
    };
  
    userData.landmarkQuizScores = {
      totalCorrect: wasCorrect ? totalCorrect + 1 : totalCorrect,
      totalAttempts: totalAttempts + 1,
      perCountry: updatedPerCountry,
    };
  
    await setDoc(userRef, userData);
  };
  

  return (
    <div>
      <title>GeoLink</title>
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

        {/* ✅ Score Display */}
        <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "10px" }}>
          Score: {score}
        </div>

        {/* Game Over */}
        {gameOver ? (
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <h2>🎉 You've completed all landmarks!</h2>
            <p>Final Score: <strong>{score}</strong></p>
            <p>Refresh the page to play again.</p>
          </div>
        ) : (
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
        )}

        {/* Popup Modal */}
        {showResult && !gameOver && (
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
              <h2 style={{ color: isCorrect ? "#4caf50" : "#f44336" }}>
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
      <Mascot
        message={`<strong>Here's a Famous Landmark!</strong><br />Guess the Correct Country!`}
        position="bottom-right"
      />
    </div>
  );
};

export default LandmarkMatch;
