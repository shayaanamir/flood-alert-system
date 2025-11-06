import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

// Global Components
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

// Icon Components
import { WarningIcon, BellIcon, ShelterIcon, RainfallIcon } from '../components/icons';

// Dashboard Components
import SummaryCard from "../components/homePage_dashboard/SummaryCard";
import RainHotspotMap from "../components/admin_dashboard/RainHotspotMap";
import ShelterMap from "../components/ShelterMap";
import WeatherSummary from "../components/homePage_dashboard/WeatherSummary";
import CommunityReports from "../components/homePage_dashboard/CommunityReports";
import RainfallChart from "../components/homePage_dashboard/RainfallChart";
import RecentAlerts from "../components/homePage_dashboard/RecentAlerts";

// Services
import { shelterService } from "../services/shelterService";
import { weatherService } from "../services/weatherService";

const DEFAULT_COORDS = { lat: 19.0760, lon: 72.8777 }; // Mumbai fallback
const NEARBY_RADIUS_KM = 10; // 10 km radius
const WEATHER_REFRESH_MS = 5 * 60 * 1000; // 5 minutes

// Helper function to compare weather data and prevent unnecessary re-renders
const weatherDataEqual = (prev, next) => {
  if (!prev && !next) return true;
  if (!prev || !next) return false;
  
  return (
    prev.temperature === next.temperature &&
    prev.precipitation === next.precipitation &&
    prev.windSpeed === next.windSpeed &&
    prev.humidity === next.humidity &&
    prev.timestamp === next.timestamp
  );
};

const HomePage = () => {
  const [activeLayer, setActiveLayer] = useState("Shelters");
  const [weatherData, setWeatherData] = useState(null);
  const [alertStats, setAlertStats] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([]);

  // Location & shelters
  const [coords, setCoords] = useState(() => {
    try {
      const saved = localStorage.getItem("user_coords");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [nearbySheltersCount, setNearbySheltersCount] = useState(0);
  const [nearbyShelters, setNearbyShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);

  // Risk thresholds (mm per hour)
  const HIGH_RISK_THRESHOLD = 50;
  const MEDIUM_RISK_THRESHOLD = 20;

  const getRiskLevel = (precipMmPerHour) => {
    if (precipMmPerHour == null) return "...";
    if (precipMmPerHour >= HIGH_RISK_THRESHOLD) return "High";
    if (precipMmPerHour >= MEDIUM_RISK_THRESHOLD) return "Medium";
    return "Low";
  };

  // Find nearby shelters using the service
  const findNearbyShelters = async (latitude, longitude, radiusKm = NEARBY_RADIUS_KM) => {
    try {
      const latNum = Number(latitude);
      const lonNum = Number(longitude);
      
      if (!isFinite(latNum) || !isFinite(lonNum)) {
        console.warn("findNearbyShelters invalid coords:", latitude, longitude);
        setNearbyShelters([]);
        setNearbySheltersCount(0);
        return;
      }

      const response = await shelterService.getNearbyShelters(latNum, lonNum, radiusKm);
      
      if (response.success && response.data) {
        const shelters = response.data.sort((a, b) => 
          (a.distance_km ?? 9999) - (b.distance_km ?? 9999)
        );
        setNearbyShelters(shelters);
        setNearbySheltersCount(shelters.length);
      } else {
        setNearbyShelters([]);
        setNearbySheltersCount(0);
      }
    } catch (err) {
      console.error("Error finding nearby shelters:", err);
      setNearbyShelters([]);
      setNearbySheltersCount(0);
    }
  };

  // Try to obtain coords (localStorage first, else geolocation)
  useEffect(() => {
    if (coords && coords.lat != null && coords.lon != null) {
      findNearbyShelters(coords.lat, coords.lon);
      return;
    }

    if (!navigator.geolocation) {
      setCoords(DEFAULT_COORDS);
      findNearbyShelters(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const obj = { lat: latitude, lon: longitude };
        setCoords(obj);
        try { localStorage.setItem("user_coords", JSON.stringify(obj)); } catch {}
        findNearbyShelters(latitude, longitude);
      },
      (err) => {
        console.warn("Geolocation failed; using default coords", err);
        setCoords(DEFAULT_COORDS);
        findNearbyShelters(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, []); // run once

  // Weather fetch (Open-Meteo) - ensures we pick nearest hourly precipitation
  useEffect(() => {
    let isMounted = true;
    let interval = null;

    async function fetchWeather() {
      try {
        const lat = coords?.lat ?? DEFAULT_COORDS.lat;
        const lon = coords?.lon ?? DEFAULT_COORDS.lon;

        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}` +
          `&longitude=${encodeURIComponent(lon)}` +
          `&hourly=temperature_2m,precipitation,relativehumidity_2m,windspeed_10m` +
          `&current_weather=true&timezone=auto`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
        const data = await res.json();

        // find nearest hourly index to now
        const hourlyTimes = Array.isArray(data.hourly?.time) ? data.hourly.time : [];
        let nearestIndex = 0;
        if (hourlyTimes.length > 0) {
          const nowTs = Date.now();
          let minDiff = Infinity;
          for (let i = 0; i < hourlyTimes.length; i++) {
            const t = new Date(hourlyTimes[i]).getTime();
            const diff = Math.abs(nowTs - t);
            if (diff < minDiff) {
              minDiff = diff;
              nearestIndex = i;
            }
          }
        }

        const hourlyPrecip = Array.isArray(data.hourly?.precipitation) ? data.hourly.precipitation : [];
        const hourlyTemp = Array.isArray(data.hourly?.temperature_2m) ? data.hourly.temperature_2m : [];
        const hourlyHum = Array.isArray(data.hourly?.relativehumidity_2m) ? data.hourly.relativehumidity_2m : [];
        const hourlyWind = Array.isArray(data.hourly?.windspeed_10m) ? data.hourly.windspeed_10m : [];
        const current = data.current_weather || {};

        // use hourly nearest or current fallback if available
        const precipitation = (hourlyPrecip.length > 0 ? hourlyPrecip[nearestIndex] : (current.precipitation ?? 0)) ?? 0;
        const temperature = (hourlyTemp.length > 0 ? hourlyTemp[nearestIndex] : current.temperature) ?? null;
        const humidity = (hourlyHum.length > 0 ? hourlyHum[nearestIndex] : null) ?? null;
        const windSpeed = (hourlyWind.length > 0 ? hourlyWind[nearestIndex] : current.windspeed) ?? null;
        const timestamp = hourlyTimes[nearestIndex] ?? (current.time ?? new Date().toISOString());

        const parsed = {
          temperature,
          precipitation, // mm for the hour
          windSpeed,
          humidity,
          timestamp,
          hourly: {
            time: hourlyTimes,
            precipitation: hourlyPrecip,
            temperature: hourlyTemp,
            humidity: hourlyHum,
            windspeed: hourlyWind,
          }
        };

        if (!isMounted) return;
        
        // Only update state if data has actually changed
        setWeatherData(prevData => {
          if (weatherDataEqual(prevData, parsed)) {
            console.log("Weather data unchanged, skipping update");
            return prevData; // Return same reference to prevent re-render
          }
          console.log("HomePage parsed weather (updated):", parsed);
          return parsed;
        });
      } catch (err) {
        if (isMounted) console.error("fetchWeather error", err);
      }
    }

    // initial fetch and periodic refresh
    fetchWeather();
    interval = setInterval(fetchWeather, WEATHER_REFRESH_MS);

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [coords]);

  // Alerts & recent
  useEffect(() => {
    fetch("http://localhost:5000/alerts/stats")
      .then(res => res.json())
      .then(data => { if (data.success) setAlertStats(data.data); })
      .catch(err => console.error("Error fetching alert stats:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/alerts/recent")
      .then(res => res.json())
      .then(data => { if (data.success) setRecentAlerts(data.data); })
      .catch(err => console.error("Error fetching recent alerts:", err));
  }, []);

  const summaryCardData = [
    {
      id: 1,
      icon: <WarningIcon />,
      title: "Current Risk Level",
      value: getRiskLevel(weatherData?.precipitation),
      subtitle: "Based on live data",
      customClass: "risk-level"
    },
    {
      id: 2,
      icon: <BellIcon />,
      title: "Active Alerts",
      value: alertStats ? alertStats.total.toString() : "...",
      subtitle: alertStats ? `${alertStats.critical} critical, ${alertStats.moderate} moderate` : "Loading...",
      customClass: "active-alerts"
    },
    {
      id: 3,
      icon: <ShelterIcon />,
      title: "Nearby Shelters",
      value: typeof nearbySheltersCount === "number" ? nearbySheltersCount.toString() : "...",
      subtitle: `Available within ${NEARBY_RADIUS_KM}km`,
      customClass: "nearby-shelters"
    },
    {
      id: 4,
      icon: <RainfallIcon />,
      title: "Rainfall (Now)",
      value: weatherData ? `${Number(weatherData.precipitation ?? 0).toFixed(1)} mm` : "...",
      subtitle: "Real-time data",
      customClass: "rainfall-total"
    }
  ];

  const mapLayers = ["Shelters", "Rainfall"];

  const handleShelterSelect = (shelter) => {
    setSelectedShelter(shelter);
  };

  return (
    <>
      <div className="homepage">
        <Header loggedOut={false} />
        <main className="dashboard-container">
          <div className="summary-cards-grid">
            {summaryCardData.map((card) => (
              <SummaryCard key={card.id} {...card} />
            ))}
          </div>

          {nearbyShelters.length > 0 && (
            <div className="dashboard-card nearby-list-card">
              <h3>Nearby Shelters (within {NEARBY_RADIUS_KM} km)</h3>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                {nearbyShelters.slice(0, 5).map((s) => (
                  <li key={s.id || s._id}>
                    <strong>{s.name}</strong>
                    {s.distance_km != null ? ` – ${s.distance_km.toFixed(1)} km` : ""}
                    {s.address ? ` · ${s.address}` : ""}
                    {s.status ? ` · ${s.status}` : ""}
                  </li>
                ))}
              </ul>
              {nearbyShelters.length > 5 && (
                <p style={{ margin: "8px 0 0 1rem", fontSize: "14px", color: "#64748b" }}>
                  + {nearbyShelters.length - 5} more shelters
                </p>
              )}
            </div>
          )}

          <div className="main-dashboard-grid">
            <div className="dashboard-card map-card">
              <div className="card-header-alt">
                <h3>Real-time Maps</h3>
                <div className="map-toggles">
                  {mapLayers.map((layer) => (
                    <button
                      key={layer}
                      className={`toggle-btn ${activeLayer === layer ? "active" : ""}`}
                      onClick={() => setActiveLayer(layer)}
                    >
                      {layer}
                    </button>
                  ))}
                </div>
              </div>
              
             <div style={{ height: "500px", width: "100%", overflow: "hidden", position: "relative" }}>
              {activeLayer === "Rainfall" ? (
                <div style={{ height: "100%", width: "100%" }}>
                  <RainHotspotMap
                    latitude={coords?.lat ?? DEFAULT_COORDS.lat}
                    longitude={coords?.lon ?? DEFAULT_COORDS.lon}
                    zoom={10}
                    weatherService={weatherService}
                  />
                </div>
              ) : (
                <ShelterMap
                  shelters={nearbyShelters}
                  selectedShelter={selectedShelter}
                  onShelterSelect={handleShelterSelect}
                  center={coords ? [coords.lat, coords.lon] : [DEFAULT_COORDS.lat, DEFAULT_COORDS.lon]}
                  zoom={11}
                  height="500px"
                />
              )}
              </div>
            </div>

            <div className="right-section-container">
              <WeatherSummary weatherData={weatherData} />
              <CommunityReports />
            </div>

            <div className="dashboard-card rainfall-trends-card">
              <h3 className="card-title">Rainfall Trends</h3>
              <RainfallChart hourly={weatherData?.hourly} />
            </div>

            <RecentAlerts alerts={recentAlerts} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;