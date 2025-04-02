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
      const userQuizRef = doc(db, "quizResults", user.uid);
      const userData = await getDoc(userQuizRef);
      
      if (userData.exists()) {
        setQuizResults(userData.data());
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

          {/* Display Quiz Results */}
          {user && (
          <>
            <h3>Quiz Results</h3>
            {Object.keys(quizResults).length > 0 ? (
              <ul>
                {Object.entries(quizResults).map(([country, score]) => (
                  <li key={country}>{country}: {score}</li>
                ))}
              </ul>
            ) : (
              <p>No quiz results yet.</p>
            )}
          </>
        )}

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