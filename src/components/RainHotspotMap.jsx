import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// Enhanced sample data with more points
const sampleGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Koramangala",
        rainfall: 145,
        avgHistorical: 45,
        trend: "up",
      },
      geometry: { type: "Point", coordinates: [77.6117, 12.9352] },
    },
    {
      type: "Feature",
      properties: {
        name: "Indiranagar",
        rainfall: 98,
        avgHistorical: 38,
        trend: "stable",
      },
      geometry: { type: "Point", coordinates: [77.6408, 12.9716] },
    },
    {
      type: "Feature",
      properties: {
        name: "Whitefield",
        rainfall: 167,
        avgHistorical: 42,
        trend: "up",
      },
      geometry: { type: "Point", coordinates: [77.7499, 12.9698] },
    },
    {
      type: "Feature",
      properties: {
        name: "Jayanagar",
        rainfall: 56,
        avgHistorical: 35,
        trend: "down",
      },
      geometry: { type: "Point", coordinates: [77.5833, 12.925] },
    },
    {
      type: "Feature",
      properties: {
        name: "Malleshwaram",
        rainfall: 23,
        avgHistorical: 28,
        trend: "down",
      },
      geometry: { type: "Point", coordinates: [77.57, 13.0] },
    },
    {
      type: "Feature",
      properties: {
        name: "Electronic City",
        rainfall: 189,
        avgHistorical: 48,
        trend: "up",
      },
      geometry: { type: "Point", coordinates: [77.6648, 12.8456] },
    },
    {
      type: "Feature",
      properties: {
        name: "Hebbal",
        rainfall: 71,
        avgHistorical: 32,
        trend: "stable",
      },
      geometry: { type: "Point", coordinates: [77.5971, 13.0358] },
    },
    {
      type: "Feature",
      properties: {
        name: "BTM Layout",
        rainfall: 134,
        avgHistorical: 41,
        trend: "up",
      },
      geometry: { type: "Point", coordinates: [77.6101, 12.9165] },
    },
  ],
};

const getColor = (d) =>
  d > 150
    ? "#b91c1c"
    : d > 100
    ? "#dc2626"
    : d > 60
    ? "#f97316"
    : d > 30
    ? "#fbbf24"
    : d > 10
    ? "#60a5fa"
    : "#bfdbfe";

const getRiskLevel = (rainfall) =>
  rainfall > 150
    ? "Critical"
    : rainfall > 100
    ? "High"
    : rainfall > 40
    ? "Medium"
    : "Low";

const getRiskColor = (rainfall) =>
  rainfall > 150
    ? "#b91c1c"
    : rainfall > 100
    ? "#dc2626"
    : rainfall > 40
    ? "#f97316"
    : "#22c55e";

const styleFeature = (feature) => {
  const rainfall = feature.properties?.rainfall ?? 0;
  return {
    fillColor: getColor(rainfall),
    weight: 2,
    color: "#ffffff",
    fillOpacity: 0.7,
  };
};

const pointToLayer = (feature, latlng) => {
  const val = feature.properties?.rainfall ?? 0;
  const r = Math.max(8, Math.min(35, Math.sqrt(val) * 2));
  const circle = L.circleMarker(latlng, {
    radius: r,
    fillColor: getColor(val),
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9,
    className: "pulse-marker",
  });

  const trend = feature.properties?.trend;
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const trendColor =
    trend === "up" ? "#ef4444" : trend === "down" ? "#22c55e" : "#94a3b8";

  const popupHtml = `
    <div style="font-family: system-ui; min-width: 200px; padding: 4px;">
      <div style="font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${getColor(
          val
        )}; display: inline-block;"></span>
        ${feature.properties?.name || "Unknown"}
      </div>
      <div style="background: #f8fafc; border-radius: 6px; padding: 10px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #64748b; font-size: 13px;">Current Rainfall</span>
          <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${val.toFixed(
            1
          )} mm</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #64748b; font-size: 13px;">Historical Avg</span>
          <span style="font-weight: 500; color: #475569; font-size: 13px;">${
            feature.properties?.avgHistorical ?? "n/a"
          } mm</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b; font-size: 13px;">Trend</span>
          <span style="font-weight: 600; color: ${trendColor}; font-size: 14px;">${trendIcon}</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: ${getRiskColor(
        val
      )}15; border-radius: 6px; border-left: 3px solid ${getRiskColor(val)};">
        <span style="color: #64748b; font-size: 12px;">Risk Level:</span>
        <span style="font-weight: 700; color: ${getRiskColor(
          val
        )}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">${getRiskLevel(
    val
  )}</span>
      </div>
    </div>
  `;
  circle.bindPopup(popupHtml, { className: "custom-popup" });

  const tooltipHtml = `
    <div style="font-weight: 600; font-size: 12px;">
      ${feature.properties?.name}: <span style="color: ${getColor(
    val
  )}">${val.toFixed(1)} mm</span>
    </div>
  `;
  circle.bindTooltip(tooltipHtml, { className: "custom-tooltip" });
  return circle;
};

function Legend({
  position = "bottomright",
  grades = [0, 10, 30, 60, 100, 150],
}) {
  const map = useMap();
  useEffect(() => {
    const legend = L.control({ position });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 14px 16px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.3);
        font-family: system-ui;
      `;
      const labels = grades.map((from, i) => {
        const to = grades[i + 1];
        return `
          <div style="display: flex; align-items: center; margin: 6px 0;">
            <span style="background:${getColor(
              from + 1
            )}; width: 24px; height: 16px; display: inline-block; margin-right: 10px; border-radius: 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></span>
            <span style="font-size: 13px; color: #475569; font-weight: 500;">${from}${
          to ? "–" + to : "+"
        } mm</span>
          </div>
        `;
      });
      div.innerHTML = `
        <div style="font-weight: 700; font-size: 14px; color: #1e293b; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
          Rainfall Intensity
        </div>
        ${labels.join("")}
      `;
      return div;
    };
    legend.addTo(map);
    return () => legend.remove();
  }, [map, grades, position]);
  return null;
}

function MapHeatManager({ heatPoints }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !heatPoints || heatPoints.length === 0) return;
    const heat = L.heatLayer(heatPoints, {
      radius: 30,
      blur: 25,
      maxZoom: 17,
      gradient: {
        0.0: "#3b82f6",
        0.3: "#10b981",
        0.5: "#fbbf24",
        0.7: "#f97316",
        0.9: "#ef4444",
        1.0: "#b91c1c",
      },
    });
    heat.addTo(map);
    return () => map.removeLayer(heat);
  }, [map, heatPoints]);
  return null;
}

export default function RainHotspotMap({
  center = [12.9716, 77.5946],
  zoom = 12,
  data = sampleGeoJson,
}) {
  const [geoData, setGeoData] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setGeoData((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        newData.features.forEach((f) => {
          const jitter = (Math.random() - 0.5) * 12;
          const newRainfall = Math.max(
            0,
            (f.properties.rainfall ?? 0) + jitter
          );
          const oldRainfall = f.properties.rainfall ?? 0;

          f.properties.rainfall = newRainfall;
          f.properties.trend =
            newRainfall > oldRainfall + 2
              ? "up"
              : newRainfall < oldRainfall - 2
              ? "down"
              : "stable";
        });
        return newData;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heatPoints = useMemo(() => {
    return geoData.features
      .filter((f) => f.geometry.type === "Point")
      .map((f) => {
        const [lon, lat] = f.geometry.coordinates;
        const intensity = Math.min(
          Math.max((f.properties?.rainfall ?? 0) / 100, 0.1),
          1.8
        );
        return [lat, lon, intensity];
      });
  }, [geoData]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <style>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          background: #f8fafc;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 0;
          overflow: hidden;
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        
        .custom-tooltip {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: white;
          padding: 6px 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          font-family: system-ui;
        }
        
        .custom-tooltip::before {
          border-top-color: rgba(15, 23, 42, 0.95);
        }
        
        .leaflet-control-layers {
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .pulse-marker {
          animation: markerPulse 2s ease-in-out infinite;
        }
        
        @keyframes markerPulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street Map">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Dark Mode">
            <TileLayer
              attribution="&copy; CartoDB"
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution="Imagery &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Rain Stations">
            <GeoJSON data={geoData} pointToLayer={pointToLayer} />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Heatmap">
            <div />
          </LayersControl.Overlay>
        </LayersControl>

        <Legend />
        <MapHeatManager heatPoints={heatPoints} />
      </MapContainer>
    </div>
  );
}
