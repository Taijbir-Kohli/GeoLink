import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";
import quizData from "./QuizData";
import Quiz from "./quiz.js";
import landmarkLinks from "./LandmarkLinks.js";
import WelcomePopup from "./WelcomePopup";
import "./quiz.css";
import "./App.css";
import "./streetview.css";
import { useRef } from "react";


const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [history, setHistory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const countryInfoRef = useRef(null); 


  let speechSynthesisInstance = window.speechSynthesis;

  const fetchCountryHistory = async (countryName) => {
    // For backend testing
    try {
      // Fetch from Spring Boot API first
      const response = await fetch(`http://localhost:8080/api/countries/${countryName}`);
      if (response.ok) {
        const data = await response.text();
        return data;
      }
    } catch (error) {
      console.error("Spring Boot API unavailable, trying Wikipedia...");
    }
    // For real time deployment through wiki
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
  };
  const handleCountryClick = async (countryName) => {
    if (isSpeaking) {
      speechSynthesisInstance.cancel();
      setIsSpeaking(false);
    }
    setSelectedCountry(countryName);
    const historyText = await fetchCountryHistory(countryName);
    setHistory(historyText);

    if (countryInfoRef.current) {
      setTimeout(() => {
        countryInfoRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200); // slight delay to allow render
    }    
    // setHistory(historyData[countryName] || "No history available.");
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

  return (
    <div>
      <title>GeoLink</title>

      {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />}
      <div className="header-container">
      <img src="/favicon.ico" alt="GeoLink logo" className="logo" />
        <h1 className="title">GeoLink</h1>
      </div>

      <MapComponent onCountryClick={handleCountryClick} />

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
            <img src="/img/test.jpg" alt={`${selectedCountry} flag`} className="flag-image" />
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
    </div>
  );
};

export default App;
