import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, ref, get, auth } from "./firebaseConfig";
import { Routes, Route, useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";
// import historyData from "./HistoryData";
// import quizData from "./QuizData";
import Quiz from "./quiz.js";
import landmarkLinks from "./LandmarkLinks.js";
import WelcomePopup from "./WelcomePopup";
import "./quiz.css";
import "./App.css";
import "./streetview.css";
import GamesPage from "./GamesPage";
import FlagQuiz from "./FlagQuiz";
import LandmarkMatch from "./LandmarkMatch";
import Leaderboard from "./Leaderboard";


// Sidebar and Modal components
import PulloutDrawer from './PulloutDrawer.js';
import LoginPopup from './LoginPopup';

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [history, setHistory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const countryInfoRef = useRef(null);
  const navigate = useNavigate();
  const [mascotVisible, setMascotVisible] = useState(true);
  let speechSynthesisInstance = window.speechSynthesis;
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5); // Default volume at 70%


  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.volume = 0.5; 
        audioRef.current.play().catch((e) => {
          console.log("Autoplay blocked:", e);
        });
      }
      window.removeEventListener("click", playAudio);
    };
  
    window.addEventListener("click", playAudio); // listen for first click
    return () => window.removeEventListener("click", playAudio);
  }, [isMuted]);
  


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };


  const fetchCountryHistory = async (countryName) => {
    try {
      if (countryName == "N. Cyprus"){
        countryName = "Northern Cyprus"
      }

      const countryRef = ref(db, 'CountryData/' + countryName);
      const snapshot = await get(countryRef);
      if (snapshot.exists()) {
        return snapshot.val(); // Return the country's history data
      } else {
        console.log("No history found for this country.");
      }
    } catch (error) {
      console.error("Error fetching country history:", error);
    }
  };
  
  // OLD IMPLEMENTATION OF COUNTRY DATA THROUGH SPRING
  // const fetchCountryHistory = async (countryName) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/countries/${countryName}`);
  //     if (response.ok) {
  //       const data = await response.text();
  //       return data;
  //     }
  //   } catch (error) {
  //     console.error("Spring Boot API unavailable, trying Wikipedia...");
  //   }
  // };


  // FOR REAL TIME DEPLOYMENT ON WIKI ------- DO NOT DELETE
  //   try {
  //     const wikiResponse = await fetch(
  //       `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(countryName)}`
  //     );
  //     if (wikiResponse.ok) {
  //       const wikiData = await wikiResponse.json();
  //       return wikiData.extract || "No history available.";
  //     }
  //   } catch (error) {
  //     console.error("Wikipedia API failed, using local fallback.");
  //   }
  //   return historyData[countryName] || "No history available.";
  // };

  const handleCountryClick = async (countryName) => {
    if (isSpeaking) {
      speechSynthesisInstance.cancel();
      setIsSpeaking(false);
    }
    setSelectedCountry(countryName);
    setMascotVisible(false); 
    const historyText = await fetchCountryHistory(countryName);
    setHistory(historyText);

    if (countryInfoRef.current) {
      setTimeout(() => {
        countryInfoRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };


  // NEW IMPLEMENTATION ON FIREBASE
  const fetchQuiz = async (country) => {
    try {
      if (country == "N. Cyprus"){
        country = "Northern Cyprus"
      }
      const quizRef = ref(db, 'quizzes/' + country.toLowerCase()); // Reference to the country quiz data
      const snapshot = await get(quizRef);
      if (snapshot.exists()) {
        return snapshot.val(); // Return the quiz data
      } else {
        console.error("No quiz data found for", country);
      }
    } catch (error) {
      console.error("Error fetching quiz from Firebase:", error);
    }
    return [];
  };
  
  // OLD IMPLEMENTATION OF BACKEND FROM SPRINGBOOT
  // const fetchQuiz = async (country) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/quizzes/${encodeURIComponent(country)}`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Quiz API failed.", error);
  //   }
  //   return [];
  // };


  // OLD IMPLEMENTATION OF BACKEND FOR REAL TIME DEPLOYMENT ON RENDER
 

  // const fetchQuiz = async (country) => {
  //   try {
  //     const response = await fetch(`https://geolink-backend-latest.onrender.com/api/quizzes/${encodeURIComponent(country)}`);
  //     const data = await response.json();
  //     console.log(`Quiz data for ${country}:`, data); // Debugging line
  //     return data;
  //   } catch (error) {
  //     console.error("Quiz API failed.", error);
  //   }
  //   return [];
  // };

  const openQuiz = async (country) => {
    const quizQuestions = await fetchQuiz(country);
    setSelectedQuiz(quizQuestions);
    setShowPopup(true);
  };

  const openStreetView = (country) => {
    if (landmarkLinks[country]) {
      setStreetViewUrl(landmarkLinks[country]);
      setShowStreetView(true);
    } else {
      alert("No 360° view available for this country yet.");
    }
  };

  const enterFullscreen = () => {
    const iframe = document.getElementById("streetview-iframe");
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      } else {
        alert("Fullscreen not supported on this browser.");
      }
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesisInstance.cancel();
      setIsSpeaking(false);
    } else {
      if (history) {
        const speech = new SpeechSynthesisUtterance(history);
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        speech.onend = () => setIsSpeaking(false);
        speechSynthesisInstance.speak(speech);
        setIsSpeaking(true);
      }
    }
  };

  const getCountryCode = (name) => {
    const country = require("iso-3166-1-alpha-2").getCode(name);
    return country;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        autoPlay
        muted={isMuted}
      />
    
      <button
        style={{
          position: "fixed",
          bottom: "7px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "10px",
          backgroundColor: "#4a75f9",
          color: "white",
          border: "none",
          zIndex: 1000,
          cursor: "pointer",
        }}
        onClick={() => setIsMuted((prev) => !prev)}
      >
        {isMuted ? "🔇 Music Off" : "🎵 Music On"}
      </button>
      {/* Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "130px",
          width: "100px",
          zIndex: 1000,
        }}
        disabled={isMuted} // Disable slider when muted
      />
    
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <title>GeoLink</title>

            {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />}

            <PulloutDrawer onLoginClick={handleLoginClick} user={user} />

            <div className="header-container">
              <img src="/favicon.ico" alt="GeoLink logo" className="logo" />
              <h1 className="title">GeoLink</h1>
              <button className="leaderboard-button" onClick={() => navigate("/leaderboard")}>
                Leaderboard
              </button>
              <button className="games-button" onClick={() => navigate("/games")}>
                Games
              </button>
            </div>

            <MapComponent onCountryClick={handleCountryClick} mascotVisible={mascotVisible} />

            {selectedCountry && (
              <div className="country-info-wrapper" ref={countryInfoRef}>
                <div className="country-info">
                  <h2>{selectedCountry}</h2>
                  <p>{history}</p>
                  <div className="button-group">
                    <button className="more-info-button" onClick={() => openQuiz(selectedCountry)}>
                      Take Quiz
                    </button>
                    <button className="street-view-button" onClick={() => openStreetView(selectedCountry)}>
                      360° View
                    </button>
                    <button className="read-aloud-button" onClick={toggleSpeech}>
                      {isSpeaking ? "🔇 Stop" : "🔊 Read Aloud"}
                    </button>
                  </div>
                </div>
                <div className="flag-box">
                  {getCountryCode(selectedCountry) && (
                    <img
                      src={`https://flagsapi.com/${getCountryCode(selectedCountry)}/flat/64.png`}
                      alt={`${selectedCountry} flag`}
                      className="flag-image"
                    />
                  )}
                </div>
              </div>
            )}

            {showPopup && selectedQuiz && (
              <Quiz
                selectedCountry={selectedCountry}
                quizQuestions={selectedQuiz}
                onClose={() => setShowPopup(false)}
              />
            )}

            {showStreetView && (
              <div className="streetview-overlay" onClick={() => setShowStreetView(false)}>
                <div className="streetview-content" onClick={(e) => e.stopPropagation()}>
                  <h2>360° View - {selectedCountry}</h2>
                  <iframe
                    id="streetview-iframe"
                    src={streetViewUrl}
                    title="Street View"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                  <div className="button-bar">
                    <button className="action-button" onClick={enterFullscreen}>
                      Full Screen
                    </button>
                    <button className="action-button" onClick={() => setShowStreetView(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showLoginPopup && (
              <div className="login-popup">
                <LoginPopup onClose={handleCloseLoginPopup} />
              </div>
            )}
          </div>
        }
      />
      
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/FlagQuiz" element={<FlagQuiz />} />
      <Route path="/LandmarkMatch" element={<LandmarkMatch />} />
    </Routes>
    </>
  );
};

export default App;
