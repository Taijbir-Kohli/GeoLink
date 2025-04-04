import { useState } from "react";
import { auth, dbFirestore } from "./firebaseConfig"; // Import Firestore methods
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore methods
import "./LoginPopup.css";

const LoginPopup = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [username, setUsername] = useState(""); // New state for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Handle Sign-Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);

        // Send email verification
        await sendEmailVerification(userCredential.user);
        console.log("Verification email sent!");

        alert("Sign-up successful! Please check your email to verify your account.");
        setIsSignUp(false); // Switch to login mode after sign-up

        await setDoc(doc(dbFirestore, "quizresults", userCredential.user.uid), {
          username: username,
          quizScores: {}, // For country-based quizzes
          totalScore: 0,
          totalCorrectAnswers: 0,
          totalQuestions: 0,
          flagQuizScores: {
            totalCorrect: 0,
            totalAttempts: 0,
            perCountry: {}, // Track correct/attempts by country
          },
          landmarkQuizScores: {
            totalCorrect: 0,
            totalAttempts: 0,
            perCountry: {}, // Track correct/attempts by country for landmarks
          },
        });        

        // Optionally, store username in localStorage for leaderboard or later use
        localStorage.setItem("username", username);
        
      } else {
        // Handle Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if email is verified
        if (!user.emailVerified) {
          alert("Please verify your email before logging in.");
          return;
        }

        localStorage.setItem("token", await user.getIdToken());
        console.log("User logged in:", user);

        // Retrieve username from Firestore after login
        const userDoc = await getDoc(doc(dbFirestore, "quizresults", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          localStorage.setItem("username", userData.username); // Store username in localStorage
        }

        onClose(); // Close login popup on success
      }
    } catch (error) {
      setError(error.message); // Show error if login/signup fails
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAuth();
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress} // Add Enter key handler
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} // Add Enter key handler
        />
        <button className="action-btn" onClick={handleAuth}>
          {isSignUp ? "Sign Up" : "Login"}
        </button>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </a>
        </p>
        <button className="close-popup" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginPopup;
