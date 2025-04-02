import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "./PulloutDrawer.css";

const PulloutDrawer = ({ onLoginClick, user }) => {
  const [isOpen, setIsOpen] = useState(false);

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
