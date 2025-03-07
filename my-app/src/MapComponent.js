import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "./countries.json";

// Recenter Button Component
const RecenterButton = () => {
  const map = useMap(); // Access the map instance
  const recenterMap = () => {
    map.setView([25, 80], 3); // Set the map center and zoom level
  };

  return (
    <button
      onClick={recenterMap}
      style={{
        position: "absolute",
        top: "10px", // Position at the top of the map
        right: "10px", // Position at the right side of the map
        padding: "10px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        cursor: "pointer",
        zIndex: 1000 // Ensures the button stays on top
      }}
    >
      Recenter Map
    </button>
  );
};

const MapComponent = ({ onCountryClick }) => {
  const onEachCountry = (feature, layer) => {
    layer.on("click", () => {
      onCountryClick(feature.properties.name);
    });
  };

  const bounds = [
    [-90, -10], // South-West corner (Lat, Long)
    [90, 180],   // North-East corner (Lat, Long)
  ];

  return (
    <MapContainer 
      center={[25, 80]} 
      zoom={3} 
      style={{ height: "500px", width: "100%" }}
      maxBounds={bounds} // Bounds to restrict dragging
      maxBoundsViscosity={1.0} // Set the resistance of dragging within bounds
    >
      {/* Recenter Button */}
      <RecenterButton />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={countriesData} onEachFeature={onEachCountry} />
    </MapContainer>
  );
};

export default MapComponent;
