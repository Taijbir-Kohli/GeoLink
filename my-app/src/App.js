// import { useState } from "react";
// import MapComponent from "./MapComponent";
// import historyData from "./HistoryData";
// import quizData from "./QuizData"; 
// import Quiz from "./quiz.js";
// import "./quiz.css"; 

// const App = () => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   const openQuiz = (country) => {
//     setSelectedQuiz(quizData[country] || []);
//     setShowPopup(true);
//   };

//   return (
//     <div>
//       <h1>GeoLink: Select a Country</h1>
//       <MapComponent onCountryClick={setSelectedCountry} />

//       {selectedCountry && (
//         <div className="country-info">
//           <h2>{selectedCountry}</h2>
//           <p>{historyData[selectedCountry] || "No history available."}</p>
//           <button className="more-info-button" onClick={() => openQuiz(selectedCountry)}>
//             Take Quiz
//           </button>
//         </div>
//       )}

//       {showPopup && selectedQuiz && (
//         <Quiz 
//           selectedCountry={selectedCountry} 
//           quizQuestions={selectedQuiz} 
//           onClose={() => setShowPopup(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default App;


import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";
import quizData from "./QuizData";
import Quiz from "./quiz.js";
import "./quiz.css";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [history, setHistory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Function to fetch country history from API or local data
  const fetchCountryHistory = async (countryName) => {



    // Example for fetching from spring server. It uses country data right now (not needed), but will use for user data later.
    
    //   try {
    //   // Fetch from Spring Boot API first
    //   const response = await fetch(`http://localhost:8080/api/countries/${countryName}`);
    //   if (response.ok) {
    //     const data = await response.text();
    //     return data;
    //   }
    // } catch (error) {
    //   console.error("Spring Boot API unavailable, trying Wikipedia...");
    // }

    
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



    try {
      // Fetch summary from Wikipedia API
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

    // Final fallback: Use local history data
    return historyData[countryName] || "No history available.";
  };

  // Handle country click event
  const handleCountryClick = async (countryName) => {
    setSelectedCountry(countryName);
    const historyText = await fetchCountryHistory(countryName);
    setHistory(historyText);
  };

  const openQuiz = (country) => {
    setSelectedQuiz(quizData[country] || []);
    setShowPopup(true);
  };

  return (
    <div>
      <h1>GeoLink: Select a Country</h1>
      <MapComponent onCountryClick={handleCountryClick} />

      {selectedCountry && (
        <div className="country-info">
          <h2>{selectedCountry}</h2>
          <p>{history}</p>
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
