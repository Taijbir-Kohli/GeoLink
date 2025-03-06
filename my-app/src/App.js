import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";
import quizData from "./QuizData"; 
import Quiz from "./quiz.js";
import "./quiz.css"; 

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const openQuiz = (country) => {
    setSelectedQuiz(quizData[country] || []);
    setShowPopup(true);
  };

  return (
    <div>
      <h1>GeoLink: Select a Country</h1>
      <MapComponent onCountryClick={setSelectedCountry} />

      {selectedCountry && (
        <div className="country-info">
          <h2>{selectedCountry}</h2>
          <p>{historyData[selectedCountry] || "No history available."}</p>
          <button className="more-info-button" onClick={() => openQuiz(selectedCountry)}>
            Take Quiz
          </button>
        </div>
      )}

      {showPopup && selectedQuiz && (
        <Quiz 
          selectedCountry={selectedCountry} 
          quizQuestions={selectedQuiz} 
          onClose={() => setShowPopup(false)} 
        />
      )}
    </div>
  );
};

export default App;
