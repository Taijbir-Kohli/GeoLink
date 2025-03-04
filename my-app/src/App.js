import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <h1>GeoLink: Select a Country</h1>
      <MapComponent onCountryClick={setSelectedCountry} />
      
      {selectedCountry && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
          <h2>{selectedCountry}</h2>
          <p>{historyData[selectedCountry] || "No history available."}</p>
          <button 
            onClick={() => setShowPopup(true)} 
            style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
          >
            More Info
          </button>
        </div>
      )}

      {/* Pop-up Modal */}
      {showPopup && (
        <div 
          style={{
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            backgroundColor: "rgba(0,0,0,0.5)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            zIndex: 1000 // Ensures the popup is above the map
          }}
          onClick={() => setShowPopup(false)}
        >
          <div 
            style={{
              background: "white", 
              padding: "20px", 
              borderRadius: "8px", 
              width: "50%",
              maxWidth: "400px",
              textAlign: "center",
              position: "relative",
              zIndex: 1001 // Ensures the popup content is above the overlay
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <h2>{selectedCountry} - Detailed History</h2>
            <p>{historyData[selectedCountry] || "No additional history available."}</p>
            <button 
              onClick={() => setShowPopup(false)} 
              style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
