import { useState } from "react";
import {
  MapContainer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css"; // reuse styles
import countriesData from "./countries.json";
import { GeoJSON, TileLayer } from "react-leaflet";

const RecenterButton = () => {
  const map = useMap();
  const recenterMap = () => {
    map.setView([25, 80], 3);
  };
  return (
    <button className="recenter-button" onClick={recenterMap}>
      Recenter Map
    </button>
  );
};

const brightColors = [
  "#FF6F61", "#6B5B95", "#88B04B", "#FFA500", "#F7CAC9",
  "#92A8D1", "#955251", "#B565A7", "#009B77", "#EFC050",
  "#45B8AC", "#D65076", "#2E8B57", "#FF7F50", "#FFD700"
];

const FlagQuizMap = ({ onCountryClick }) => {
  const onEachCountry = (feature, layer) => {
    const randomColor = brightColors[Math.floor(Math.random() * brightColors.length)];
    layer.setStyle({
      fillColor: randomColor,
      fillOpacity: 0.6,
      color: "#ffffff",
      weight: 1,
    });

    layer.on("mouseover", function () {
      this.setStyle({ fillOpacity: 0.8, weight: 2 });
    });

    layer.on("mouseout", function () {
      this.setStyle({ fillOpacity: 0.6, weight: 1 });
    });

    layer.on("click", () => {
      onCountryClick(feature.properties.name);
    });

    const el = layer.getElement();
    if (el) el.style.cursor = "pointer";
  };

  const bounds = [
    [-90, -10],
    [90, 180],
  ];

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[25, 80]}
        zoom={3}
        className="map-container"
        minZoom={3}
        zoomSnap={0.5}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        {/* ✅ Optionally REMOVE TileLayer or leave it if you want the base map */}
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <GeoJSON data={countriesData} onEachFeature={onEachCountry} />
        <RecenterButton />
      </MapContainer>
    </div>
  );
};

export default FlagQuizMap;
