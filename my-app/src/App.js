
import { useState } from "react";
import MapComponent from "./MapComponent";
import historyData from "./HistoryData";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div>
      <h1>GeoLink: Select a Country</h1>
      <MapComponent onCountryClick={setSelectedCountry} />
      {selectedCountry && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
          <h2>{selectedCountry}</h2>
          <p>{historyData[selectedCountry] || "No history available."}</p>
        </div>
      )}
    </div>
  );
};

export default App;
