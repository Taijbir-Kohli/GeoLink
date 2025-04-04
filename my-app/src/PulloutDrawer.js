import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./PulloutDrawer.css";

const PulloutDrawer = ({ onLoginClick, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quizResults, setQuizResults] = useState({});

  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!user) return;

      const db = getFirestore();
      const userQuizRef = doc(db, "quizresults", user.uid);
      const userData = await getDoc(userQuizRef);

      if (userData.exists()) {
        const data = userData.data();
        // Assuming quizScores is the correct field for storing individual quiz results
        setQuizResults({
          quizScores: data.quizScores || {},
          flagQuizScores: data.flagQuizScores?.perCountry || {},
          landmarkQuizScores: data.landmarkQuizScores?.perCountry || {},


        });
        fetchQuizResults();
      }
    };

    fetchQuizResults();
  }, [user]); // Re-fetch when user changes

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Drawer Toggle Button */}
      <button className="drawer-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Pullout Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <h2>Menu</h2>
        <div className="drawer-content">
        {/* Display Quiz Results */}
        {user && (
  <>
    <h3>Quiz Results</h3>
    {quizResults.quizScores && Object.keys(quizResults.quizScores).length > 0 ? (
      <ul>
        {Object.entries(quizResults.quizScores).map(([country, score]) => (
          <li key={country}>
            {country}: {score}
          </li>
        ))}
      </ul>
    ) : (
      <p>No quiz results yet.</p>
    )}

    <h3>Flag Quiz Accuracy</h3>
    {quizResults.flagQuizScores && Object.keys(quizResults.flagQuizScores).length > 0 ? (
      <ul>
        {Object.entries(quizResults.flagQuizScores).map(([country, value]) => (
          <li key={country}>
            {country}: {value}
          </li>
        ))}
      </ul>
    ) : (
      <p>No flag quiz data yet.</p>
    )}


    <h3>Landmark Quiz Accuracy</h3>
    {quizResults.landmarkQuizScores && Object.keys(quizResults.landmarkQuizScores).length > 0 ? (
      <ul>
        {Object.entries(quizResults.landmarkQuizScores).map(([country, value]) => (
          <li key={country}>
            {country}: {value}
          </li>
        ))}
      </ul>
    ) : (
      <p>No landmark quiz data yet.</p>
    )}
    


  </>
  )}
          </div>



        {/* If the user is logged in, show the Logout button, otherwise show the Login button */}
        {user ? (
          <button className="login-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="login-btn" onClick={onLoginClick}>Login</button>
        )}
      </div>
    </>
  );
};

export default PulloutDrawer;
