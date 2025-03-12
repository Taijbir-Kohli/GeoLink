import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";
import quizData from "./QuizData";
import Quiz from "./quiz.js";
import landmarkLinks from "./LandmarkLinks.js";
import "./quiz.css";


const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [history, setHistory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState("");

  const fetchCountryHistory = async (countryName) => {
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
    setSelectedCountry(countryName);
    const historyText = await fetchCountryHistory(countryName);
    setHistory(historyText);
  };

  const openQuiz = (country) => {
    setSelectedQuiz(quizData[country] || []);
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

  return (
    <div>
      <h1>GeoLink: Select a Country</h1>
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

      {/* Street View Popup */}
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
