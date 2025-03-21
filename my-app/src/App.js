import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";
import quizData from "./QuizData";
import Quiz from "./quiz.js";
import landmarkLinks from "./LandmarkLinks.js";
import WelcomePopup from "./WelcomePopup"; // ✅ Import the Welcome Popup
import "./quiz.css";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [history, setHistory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true); // ✅ State for Welcome Popup

  let speechSynthesisInstance = window.speechSynthesis;

  const fetchCountryHistory = async (countryName) => {
    // // For backend testing
    // try {
    //   // Fetch from Spring Boot API first
    //   const response = await fetch(`http://localhost:8080/api/countries/${countryName}`);
    //   if (response.ok) {
    //     const data = await response.text();
    //     return data;
    //   }
    // } catch (error) {
    //   console.error("Spring Boot API unavailable, trying Wikipedia...");
    // }

    // For real time deployment through wiki
    try {
      const wikiResponse = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(countryName)}`
      );
      if (wikiResponse.ok) {
        const wikiData = await wikiResponse.json();
        return wikiData.extract || "No history available.";
      }
    } catch (error) {
      console.error("Wikipedia API failed, using local fallback.");
    }
    return historyData[countryName] || "No history available.";
  };

  const handleCountryClick = async (countryName) => {
    if (isSpeaking) {
      speechSynthesisInstance.cancel();
      setIsSpeaking(false);
    }
    setSelectedCountry(countryName);
    const historyText = await fetchCountryHistory(countryName);
    setHistory(historyText);
  };


  // For realtime deployment on render
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

  // For backend testing
  const fetchQuiz = async (country) => {
    try {
      const response = await fetch(`http://localhost:8080/api/quizzes/${encodeURIComponent(country)}`);
      const data = await response.json();
      console.log(`Quiz data for ${country}:`, data); // Debugging line
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
  

  // const openQuiz = (country) => {
  //   setSelectedQuiz(quizData[country] || []);
  //   setShowPopup(true);
  // };

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
    /* add before GeoLink h1
    <img src="/favicon.ico" alt="GeoLink Logo" className="logo" /> */
    <div>
      <title>GeoLink</title>

      {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />} {/* ✅ Show popup on load */}
      <h1>
        GeoLink
      </h1>
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
