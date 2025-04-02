import "./LoginPopup.css";

const LoginPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button className="action-btn">Login</button>
        <p>Don't have an account? <a href="#">Sign up</a></p>
        <button className="close-popup" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginPopup;
