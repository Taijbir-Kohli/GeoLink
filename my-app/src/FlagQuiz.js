import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import FlagQuizMap from "./FlagQuizMap";
import countriesData from "./countries.json";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./firebaseConfig"; // Import Firebase auth
import Mascot from "./Mascot";

const FlagQuiz = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [targetCountry, setTargetCountry] = useState(null);
  const [usedCountries, setUsedCountries] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0); 

  const getCountryCode = (name) => {
    const country = require("iso-3166-1-alpha-2").getCode(name);
    return country || null;
  };

  const pickRandomCountry = () => {
    const allValidCountries = countriesData.features
      .map((f) => f.properties.name)
      .filter((name) => getCountryCode(name));

    const available = allValidCountries.filter((name) => !usedCountries.includes(name));

    if (available.length === 0) {
      setGameOver(true);
      return;
    }

    const newTarget = available[Math.floor(Math.random() * available.length)];
    setTargetCountry(newTarget);
    setSelectedCountry(null);
    setUsedCountries((prev) => [...prev, newTarget]);
  };

  useEffect(() => {
    pickRandomCountry(); // Load first flag
  }, []);

  const handleCountrySelect = async (country) => {
    setSelectedCountry(country);
  
    const isAnswerCorrect = country === targetCountry;
  
    if (!isAnswerCorrect && auth.currentUser) {
      const user = auth.currentUser;
      const db = getFirestore();
      const userRef = doc(db, "quizresults", user.uid);
      const userData = await getDoc(userRef);
  
      let userResults = userData.exists() ? userData.data() : {
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
      };
  
      const currentAttempts = userResults.flagQuizScores?.totalAttempts || 0;
      const perCountry = userResults.flagQuizScores.perCountry || {};
  
      const [correct, attempts] = (perCountry[targetCountry] || "0/0").split("/").map(Number);
  
      perCountry[targetCountry] = `${correct}/${attempts + 1}`;
  
      userResults.flagQuizScores = {
        ...userResults.flagQuizScores,
        totalAttempts: currentAttempts + 1,
        perCountry,
      };
  
      await setDoc(userRef, userResults);
    }
  };
  
  

  const isCorrect = selectedCountry === targetCountry;
  const countryCode = getCountryCode(targetCountry);

  const handleNext = async () => {
    const isAnswerCorrect = selectedCountry === targetCountry;
  
    if (isAnswerCorrect) {
      setScore((prev) => prev + 1);
    }
  
    const user = auth.currentUser;
  
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, "quizresults", user.uid);
      const userData = await getDoc(userRef);
  
      let userResults = userData.exists() ? userData.data() : {
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
  
      const currentCorrect = userResults.flagQuizScores?.totalCorrect || 0;
      const currentAttempts = userResults.flagQuizScores?.totalAttempts || 0;
      const perCountry = userResults.flagQuizScores.perCountry || {};
  
      const [correct, attempts] = (perCountry[targetCountry] || "0/0").split("/").map(Number);
  
      perCountry[targetCountry] = `${correct + 1}/${attempts + 1}`;
  
      userResults.flagQuizScores = {
        totalCorrect: currentCorrect + 1,
        totalAttempts: currentAttempts + 1,
        perCountry,
      };
  
      await setDoc(userRef, userResults);
    }
  
    pickRandomCountry(); // Move to next
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

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          alignItems: "flex-start",
          padding: "40px",
          fontFamily: "Fredoka, sans-serif",
        }}
      >
        {/* Map */}
        <div style={{ flex: "0 0 60%", minWidth: "500px" }}>
          <FlagQuizMap onCountryClick={handleCountrySelect} />
        </div>

        {/* Flag Info */}
        <div
          style={{
            flex: "1",
            background: "#fef3a5",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            minWidth: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>🧠 Flag Quiz</h2>

          {/* ✅ Score display */}
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "20px" }}>
            Score: {score}
          </div>

          {gameOver ? (
            <>
              <p>🎉 You've guessed all the flags for this session!</p>
              <p>Final Score: <strong>{score}</strong></p>
              <p>Refresh the page to play again.</p>
            </>
          ) : (
            <>
              {targetCountry && countryCode ? (
                <img
                  src={`https://flagsapi.com/${countryCode}/flat/64.png`}
                  alt={`${targetCountry} flag`}
                  className="flag-image"
                  style={{
                    marginBottom: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
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
                  <h3
                    style={{
                      color: isCorrect ? "#4caf50" : "#f44336",
                      marginTop: "10px",
                    }}
                  >
                    {isCorrect ? "✅ Correct!" : "❌ Try Again!"}
                  </h3>
                </>
              )}

              {!selectedCountry && <p>Click a country to guess the flag!</p>}

              {isCorrect && (
                <button
                  onClick={handleNext}
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
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  🎉 Next Flag
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <Mascot
        message={`<strong>Here's a Flag!</strong><br />Click the matching country.`}
        position="bottom-left"
      />
    </div>
  );
};

export default FlagQuiz;
