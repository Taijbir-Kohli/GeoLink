import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Mascot from "./Mascot";

const GamesPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <title>GeoLink</title>
      {/* Header reused from front page */}
      <div className="header-container">
        <img src="/favicon.ico" alt="GeoLink logo" className="logo" />
        <h1 className="title">GeoLink</h1>
        <button className="games-button" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="leaderboard-button" onClick={() => navigate("/leaderboard")}>
          Leaderboard
        </button>
      </div>

      {/* Page Content */}
      <div style={{ padding: "40px", fontFamily: "Fredoka, sans-serif" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>
          Choose a Game 🎮
        </h1>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* Game 1 */}
          <div
            className="game-card"
            onClick={() => navigate("/FlagQuiz")}
          >
            <h2>🧠 Flag Quiz</h2>
            <p>Test your knowledge of global geography!</p>
          </div>

          {/* Game 2 */}
          <div
            className="game-card"
            onClick={() => navigate("/LandmarkMatch")}
          >
            <h2>🗺️ Landmark Match</h2>
            <p>Match countries with their famous landmarks!</p>
          </div>
        </div>
      </div>
      <Mascot message={`<strong>Let's Play a Game, Click one to get started!`} />
    </div>
  );
};

export default GamesPage;
