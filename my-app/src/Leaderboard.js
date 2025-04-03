import React, { useState, useEffect } from "react";
import { dbFirestore } from "./firebaseConfig"; // Ensure you're importing Firestore correctly
import { collection, getDocs } from "firebase/firestore";
import "./Leaderboard.css"; // Style for leaderboard page
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // Use Firestore collection for quiz results
      const quizResultsCollection = collection(dbFirestore, "quizresults");
      const snapshot = await getDocs(quizResultsCollection);
      const users = snapshot.docs.map((doc) => doc.data());
      
      // Sort users by totalScore (percentage) in descending order
      const sortedUsers = users
        .map((user) => {
          // Calculate total score as percentage (if available)
          const totalQuestions = user.totalQuestions || 0; // Total number of questions attempted
          const totalCorrectAnswers = user.totalCorrectAnswers || 0;
          const percentage = user.totalScore;
          return {
            username: user.username,
            totalCorrectAnswers,
            totalQuestions,
            percentage,
          };
        })
        .sort((a, b) => b.percentage - a.percentage); // Sort by percentage, descending

      setLeaderboard(sortedUsers);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      {/* Header reused from front page */}
      <div className="header-container">
        <img src="/favicon.ico" alt="GeoLink logo" className="logo" />
        <h1 className="title">GeoLink</h1>
        <button className="leaderboard-button" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

   
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Total Correct Answers</th>
              <th>Total Questions Attempted</th>
              <th>Total Percentage</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.totalCorrectAnswers}</td> {/* Display total correct answers */}
                <td>{user.totalQuestions}</td>
                <td>{user.percentage}%</td> {/* Display percentage */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
