import React, { useState, useEffect } from "react";
import { dbFirestore } from "./firebaseConfig"; // Ensure you're importing Firestore correctly
import { collection, getDocs } from "firebase/firestore";
import "./Leaderboard.css"; // Style for leaderboard page

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // Use Firestore collection for quiz results
      const quizResultsCollection = collection(dbFirestore, "quizresults");
      const snapshot = await getDocs(quizResultsCollection);
      const users = snapshot.docs.map((doc) => doc.data());
      
      // Sort users by totalScore in descending order
      const sortedUsers = users
        .map((user) => ({
          username: user.username,
          totalScore: user.totalScore || 0,
        }))
        .sort((a, b) => b.totalScore - a.totalScore);

      setLeaderboard(sortedUsers);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
