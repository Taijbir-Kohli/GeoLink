import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const FlagQuiz = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="header-container">
        <img src="/favicon.ico" alt="GeoLink logo" className="logo" />
        <h1 className="title">GeoLink</h1>
        <button className="games-button" onClick={() => navigate("/games")}>
          Games
        </button>
      </div>

      <div style={{ padding: "40px", fontFamily: "Fredoka, sans-serif" }}>
        <h1>🧠 Flag Quiz</h1>
        <p>Coming soon... Test your knowledge of flags around the world!</p>
      </div>
    </div>
  );
};

export default FlagQuiz;
