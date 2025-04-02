import { useState } from "react";
import "./PulloutDrawer.css";

const PulloutDrawer = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Drawer Toggle Button */}
      <button className="drawer-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Pullout Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        {/* <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button> */}
        <h2>Menu</h2>
        <button className="login-btn" onClick={onLoginClick}>Login</button>
      </div>
    </>
  );
};

export default PulloutDrawer;
