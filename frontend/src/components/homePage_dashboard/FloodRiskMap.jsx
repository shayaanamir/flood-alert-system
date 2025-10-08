import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Hardcoded data for this component
const floodAreas = [
  { id: 1, name: "Worli", lat: 19.0176, lng: 72.8146, risk: "high" },
  { id: 2, name: "Bandra", lat: 19.0596, lng: 72.8295, risk: "moderate" },
  { id: 3, name: "Andheri", lat: 19.1136, lng: 72.8697, risk: "moderate" },
  { id: 4, name: "Dadar", lat: 19.0178, lng: 72.8478, risk: "high" },
  { id: 5, name: "Kurla", lat: 19.0728, lng: 72.8826, risk: "critical" },
];

const FloodRiskMap = () => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case "critical": return "#dc2626";
      case "high": return "#ea580c";
      case "moderate": return "#eef65dff";
      default: return "#3b82f6";
    }
  };

  const getRiskRadius = (risk) => {
    switch (risk) {
      case "critical": return 2000;
      case "high": return 1500;
      case "moderate": return 1000;
      default: return 500;
    }
  };

  return (
    <MapContainer center={[19.0760, 72.8777]} zoom={11} className="map-placeholder">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {floodAreas.map((area) => (
        <React.Fragment key={area.id}>
          <Circle
            center={[area.lat, area.lng]}
            radius={getRiskRadius(area.risk)}
            pathOptions={{
              color: getRiskColor(area.risk),
              fillColor: getRiskColor(area.risk),
              fillOpacity: 0.2,
            }}
          />
          <Marker position={[area.lat, area.lng]}>
            <Popup>
              <div className="map-popup">
                <strong>{area.name}</strong><br />
                <span className={`risk-${area.risk}`}>{area.risk} Risk</span>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default FloodRiskMap;