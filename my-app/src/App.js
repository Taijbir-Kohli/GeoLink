import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";
import quizData from "./QuizData";
import Quiz from "./quiz.js";
import landmarkLinks from "./LandmarkLinks.js";
import WelcomePopup from "./WelcomePopup";
import "./quiz.css";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [history, setHistory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  let speechSynthesisInstance = window.speechSynthesis;

  const handleCountryClick = (countryName) => {
    if (isSpeaking) {
      speechSynthesisInstance.cancel();
      setIsSpeaking(false);
    }
    setSelectedCountry(countryName);
    setHistory(historyData[countryName] || "No history available.");
  };

  const fetchQuiz = async (country) => {
    try {
      const response = await fetch(`http://localhost:8080/api/quizzes/${encodeURIComponent(country)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Quiz API failed.", error);
    }
    return [];
  };

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

  return (
    <div>
      <title>GeoLink</title>

      {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />}
      <h1>GeoLink</h1>
      <MapComponent onCountryClick={handleCountryClick} />

      {selectedCountry && (
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
      )}

      {showPopup && selectedQuiz && (
        <Quiz
          selectedCountry={selectedCountry}
          quizQuestions={selectedQuiz}
          onClose={() => setShowPopup(false)}
        />
      )}

      {showStreetView && (
        <div className="popup-overlay" onClick={() => setShowStreetView(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>360° View - {selectedCountry}</h2>
            <iframe
              src={streetViewUrl}
              width="100%"
              height="400px"
              style={{ border: "none" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <button className="close-button" onClick={() => setShowStreetView(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
