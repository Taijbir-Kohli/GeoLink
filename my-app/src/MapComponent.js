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
        top: "10px",
        right: "10px",
        padding: "10px 20px",
        backgroundColor: "#4a75f9",
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        zIndex: 400
      }}      
    >
      Recenter Map
    </button>
  );
};

const brightColors = [
  "#FF6F61", "#6B5B95", "#88B04B", "#FFA500", "#F7CAC9",
  "#92A8D1", "#955251", "#B565A7", "#009B77", "#EFC050",
  "#45B8AC", "#D65076", "#2E8B57", "#FF7F50", "#FFD700"
];


const MapComponent = ({ onCountryClick }) => {
  const onEachCountry = (feature, layer) => {
    const randomColor = brightColors[Math.floor(Math.random() * brightColors.length)];
  
    layer.setStyle({
      fillColor: randomColor,
      fillOpacity: 0.6,
      color: "#ffffff", // white border
      weight: 1,
    });
  
    layer.on("mouseover", function () {
      this.setStyle({
        fillOpacity: 0.8,
        weight: 2,
      });
    });
  
    layer.on("mouseout", function () {
      this.setStyle({
        fillOpacity: 0.6,
        weight: 1,
      });
    });
  
    layer.on("click", () => {
      onCountryClick(feature.properties.name);
    });
  
    // Optional: Add pointer on hover
    const el = layer.getElement();
    if (el) el.style.cursor = "pointer";
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
      minZoom={3} // ⬅️ Prevents zooming out further than level 3
      zoomSnap={0.5} // ⬅️ Optional: allows smoother zooming steps
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
