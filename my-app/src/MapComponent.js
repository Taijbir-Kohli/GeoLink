import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "./countries.json"; // GeoJSON file

const MapComponent = ({ onCountryClick }) => {
  const onEachCountry = (feature, layer) => {
    layer.on("click", () => {
      onCountryClick(feature.properties.name); // Get country name
    });
  };

  return (
    <MapContainer center={[25, 80]} zoom={3} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={countriesData} onEachFeature={onEachCountry} />
    </MapContainer>
  );
};

export default MapComponent;
