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

const pointToLayer = (feature, latlng) => {
  const val = feature.properties?.rainfall ?? 0;

  // Don't render markers with 0 rainfall
  if (val === 0) {
    return null;
  }

  // Vary radius based on rainfall + random variation for natural look
  const baseRadius = Math.sqrt(val) * 800;
  const randomVariation = Math.random() * 0.2 + 2.3; // 80% to 120% of base
  const radiusInMeters = Math.max(
    1500,
    Math.min(12000, baseRadius * randomVariation)
  );

  // Vary opacity based on rainfall intensity for depth
  const fillOpacity = Math.min(0.85, 0.4 + val / 200);

  const circle = L.circle(latlng, {
    radius: radiusInMeters,
    fillColor: getColor(val),
    color: "#ffffff",
    weight: 1.5,
    opacity: 0.7,
    fillOpacity: fillOpacity,
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
          <span style="color: #64748b; font-size: 13px;">Temperature</span>
          <span style="font-weight: 500; color: #475569; font-size: 13px;">${
            feature.properties?.temperature?.toFixed(1) ?? "n/a"
          }°C</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b; font-size: 13px;">Precipitation Prob</span>
          <span style="font-weight: 600; color: ${trendColor}; font-size: 14px;">${
    feature.properties?.precipitationProb ?? "n/a"
  }%</span>
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
      radius: 35, // Increased radius for smoother blend
      blur: 35, // Increased blur for more natural gradient
      maxZoom: 17,
      max: 1.2, // Reduced max for softer appearance
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

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// Delay helper for rate limiting
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function RainHotspotMap({
  latitude,
  longitude,
  zoom = 10,
  weatherService, // Pass weatherService as prop
}) {
  const [geoData, setGeoData] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  // Generate a more natural-looking grid with randomization
  const generateLocationGrid = (
    centerLat,
    centerLon,
    gridSize = 9, // Increased from 5 to 9 (81 points)
    spacing = 0.15 // Increased from 0.05 to 0.15 (~15km between points)
  ) => {
    const locations = [];
    const halfGrid = Math.floor(gridSize / 2);

    // Ensure centerLat and centerLon are numbers
    const baseLat = parseFloat(centerLat);
    const baseLon = parseFloat(centerLon);

    for (let i = -halfGrid; i <= halfGrid; i++) {
      for (let j = -halfGrid; j <= halfGrid; j++) {
        // Add random offset to break the grid pattern (±30% of spacing)
        const randomOffsetLat = (Math.random() - 0.5) * spacing * 0.6;
        const randomOffsetLon = (Math.random() - 0.5) * spacing * 0.6;

        const lat = baseLat + i * spacing + randomOffsetLat;
        const lon = baseLon + j * spacing + randomOffsetLon;

        // Generate meaningful area names based on direction
        const latDir = i > 0 ? "North" : i < 0 ? "South" : "Central";
        const lonDir = j > 0 ? "East" : j < 0 ? "West" : "Central";
        const distance = Math.abs(i) + Math.abs(j);
        const zone =
          distance === 0
            ? "Center"
            : distance <= 2
            ? "Inner"
            : distance <= 4
            ? "Mid"
            : "Outer";

        locations.push({
          lat,
          lon,
          name: `${zone} ${latDir}${lonDir !== "Central" ? ` ${lonDir}` : ""}`,
        });
      }
    }

    return locations;
  };

  // Fetch weather data with rate limiting and error handling
  const fetchWeatherData = async () => {
    if (!latitude || !longitude) {
      console.warn("No coordinates provided");
      return;
    }

    if (!weatherService) {
      console.error("weatherService is not provided");
      setError("Weather service is not available");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress({ current: 0, total: 0 });

    try {
      const locations = generateLocationGrid(latitude, longitude);
      setProgress({ current: 0, total: locations.length });

      const validResults = [];
      const batchSize = 5; // Process 5 locations at a time
      const delayBetweenBatches = 1000; // 1 second delay between batches

      // Process locations in batches to avoid overwhelming the API
      for (let i = 0; i < locations.length; i += batchSize) {
        const batch = locations.slice(i, i + batchSize);

        const batchPromises = batch.map(async (loc) => {
          try {
            const current = await weatherService.getCurrent(loc.lat, loc.lon);
            const daily = await weatherService.getDaily(loc.lat, loc.lon);

            // Calculate rainfall with slight random variation for natural distribution
            const currentRain = current.rain || 0;
            const dailyRain = daily[0]?.precipitationSum || 0;
            const baseRainfall = currentRain + dailyRain;

            // Add micro-variation (±5%) to break uniformity in weather patterns
            const microVariation = 1 + (Math.random() * 0.1 - 0.05);
            const totalRainfall = baseRainfall * microVariation;

            // Skip locations with 0 rainfall
            if (totalRainfall <= 0.5) {
              return null;
            }

            return {
              type: "Feature",
              properties: {
                name: loc.name,
                rainfall: totalRainfall,
                temperature: current.temperature_2m,
                precipitationProb: daily[0]?.precipitationProbabilityMax || 0,
                trend: "stable",
              },
              geometry: {
                type: "Point",
                coordinates: [loc.lon, loc.lat],
              },
            };
          } catch (error) {
            console.warn(
              `Failed to fetch data for ${loc.name}:`,
              error.message
            );
            return null;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        validResults.push(...batchResults.filter((r) => r !== null));

        setProgress({ current: i + batch.length, total: locations.length });

        // Delay between batches (except for the last batch)
        if (i + batchSize < locations.length) {
          await delay(delayBetweenBatches);
        }
      }

      if (validResults.length === 0) {
        setError("No weather data could be retrieved");
        return;
      }

      // Calculate trends by comparing with previous data
      if (previousData && previousData.features.length > 0) {
        validResults.forEach((result) => {
          const coords = result.geometry.coordinates;
          const prevFeature = previousData.features.find(
            (f) =>
              Math.abs(f.geometry.coordinates[0] - coords[0]) < 0.01 &&
              Math.abs(f.geometry.coordinates[1] - coords[1]) < 0.01
          );

          if (prevFeature) {
            const oldRainfall = prevFeature.properties.rainfall;
            const newRainfall = result.properties.rainfall;

            if (newRainfall > oldRainfall + 2) {
              result.properties.trend = "up";
            } else if (newRainfall < oldRainfall - 2) {
              result.properties.trend = "down";
            } else {
              result.properties.trend = "stable";
            }
          }
        });
      }

      const newGeoData = {
        type: "FeatureCollection",
        features: validResults,
      };

      setPreviousData(newGeoData);
      setGeoData(newGeoData);
      console.log(
        `Successfully loaded ${validResults.length} weather stations`
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  // Fetch data when coordinates change
  useEffect(() => {
    if (latitude && longitude) {
      console.log("Coordinates changed, fetching weather data...");
      fetchWeatherData();
    }
  }, [latitude, longitude]);

  // Auto-refresh every 10 minutes (increased from 5 to reduce load)
  useEffect(() => {
    if (!latitude || !longitude) return;

    const interval = setInterval(() => {
      console.log("Auto-refreshing weather data...");
      fetchWeatherData();
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, [latitude, longitude]);

  const heatPoints = useMemo(() => {
    return geoData.features
      .filter((f) => f.geometry.type === "Point" && f.properties?.rainfall > 0)
      .map((f) => {
        const [lon, lat] = f.geometry.coordinates;
        const intensity = Math.min(
          Math.max((f.properties?.rainfall ?? 0) / 100, 0.1),
          1.8
        );
        return [lat, lon, intensity];
      });
  }, [geoData]);

  const center = useMemo(() => {
    if (latitude && longitude) {
      return [latitude, longitude];
    }
    return [12.9716, 77.5946]; // Default to Bangalore
  }, [latitude, longitude]);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.95)",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontSize: "13px",
            fontWeight: "600",
            color: "#2563EB",
          }}
        >
          <div style={{ marginBottom: "4px" }}>Loading weather data...</div>
          {progress.total > 0 && (
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              {progress.current} / {progress.total} locations
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            background: "rgba(239, 68, 68, 0.95)",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontSize: "13px",
            fontWeight: "600",
            color: "white",
            maxWidth: "300px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>⚠️ {error}</div>
          <button
            onClick={fetchWeatherData}
            style={{
              background: "white",
              color: "#ef4444",
              border: "none",
              padding: "4px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && geoData.features.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.95)",
            padding: "8px 16px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <strong style={{ color: "#1e293b" }}>
            {geoData.features.length}
          </strong>{" "}
          stations loaded
        </div>
      )}

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
          animation: markerPulse 3s ease-in-out infinite;
        }
        

      `}</style>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <MapUpdater center={center} zoom={zoom} />

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
            <GeoJSON
              key={JSON.stringify(geoData)}
              data={geoData}
              pointToLayer={pointToLayer}
            />
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
