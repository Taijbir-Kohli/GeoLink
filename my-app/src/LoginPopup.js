import { useState } from "react";
import { auth } from "./firebaseConfig"; // Import your Firebase auth configuration
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import "./LoginPopup.css";

const LoginPopup = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
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
