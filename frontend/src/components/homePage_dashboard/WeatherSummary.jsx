import React, { useEffect, useState } from "react";

const DEFAULT_COORDS = { lat: 19.0760, lon: 72.8777 }; // Mumbai fallback
const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

const WeatherSummary = ({ weatherData }) => {
  const [localData, setLocalData] = useState(weatherData);
  const [loading, setLoading] = useState(!weatherData);
  const [error, setError] = useState(null);

  // Update localData whenever parent passes new weatherData
  useEffect(() => {
    if (weatherData) {
      setLocalData(weatherData);
      setLoading(false);
      setError(null);
      console.log("WeatherSummary received prop:", weatherData);
    }
  }, [weatherData]);

  // Fallback live fetch if prop is not provided
  useEffect(() => {
    if (weatherData) return; // HomePage already handles API

    let mounted = true;
    let intervalId = null;

    const fetchWeather = async (lat, lon) => {
      try {
        setLoading(true);
        setError(null);

        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}` +
          `&longitude=${lon}` +
          `&hourly=temperature_2m,precipitation,relativehumidity_2m,windspeed_10m` +
          `&current_weather=true&timezone=auto`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Weather fetch failed (${res.status})`);
        const data = await res.json();

        const hourlyTimes = data.hourly?.time || [];
        let nearestIndex = 0;
        if (hourlyTimes.length > 0) {
          const now = Date.now();
          let minDiff = Infinity;
          hourlyTimes.forEach((t, i) => {
            const diff = Math.abs(now - new Date(t).getTime());
            if (diff < minDiff) {
              minDiff = diff;
              nearestIndex = i;
            }
          });
        }

        const temperature =
          data.hourly?.temperature_2m?.[nearestIndex] ??
          data.current_weather?.temperature ??
          null;
        const precipitation =
          data.hourly?.precipitation?.[nearestIndex] ??
          data.current_weather?.precipitation ??
          0;
        const windSpeed =
          data.hourly?.windspeed_10m?.[nearestIndex] ??
          data.current_weather?.windspeed ??
          null;
        const humidity =
          data.hourly?.relativehumidity_2m?.[nearestIndex] ?? null;

        const parsed = {
          temperature,
          precipitation,
          windSpeed,
          humidity,
        };

        if (mounted) {
          setLocalData(parsed);
          setLoading(false);
          console.log("WeatherSummary fetched live:", parsed);
        }
      } catch (err) {
        console.error("WeatherSummary error:", err);
        if (mounted) {
          setError(err.message || "Failed to fetch weather");
          setLoading(false);
        }
      }
    };

    const start = async () => {
      let lat = DEFAULT_COORDS.lat;
      let lon = DEFAULT_COORDS.lon;

      if (navigator.geolocation) {
        try {
          const pos = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 8000,
            })
          );
          lat = pos.coords.latitude;
          lon = pos.coords.longitude;
        } catch {
          // fallback silently
        }
      }

      await fetchWeather(lat, lon);
      intervalId = setInterval(() => fetchWeather(lat, lon), REFRESH_MS);
    };

    start();

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [weatherData]);

  // ---- render ----
  if (loading) {
    return (
      <div className="dashboard-card weather-summary-card">
        <h3 className="card-title">Weather Summary</h3>
        <p>Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-card weather-summary-card">
        <h3 className="card-title">Weather Summary</h3>
        <p style={{ color: "#b91c1c" }}>Error: {error}</p>
      </div>
    );
  }

  if (!localData) {
    return (
      <div className="dashboard-card weather-summary-card">
        <h3 className="card-title">Weather Summary</h3>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card weather-summary-card">
      <h3 className="card-title">Weather Summary</h3>
      <ul className="weather-list">
        <li>
          <span>Temperature</span>{" "}
          <strong>{localData.temperature?.toFixed(1) ?? "--"}°C</strong>
        </li>
        <li>
          <span>Rainfall</span>{" "}
          <strong>{localData.precipitation?.toFixed(1) ?? "--"}mm/h</strong>
        </li>
        <li>
          <span>Wind Speed</span>{" "}
          <strong>{localData.windSpeed?.toFixed(1) ?? "--"} km/h</strong>
        </li>
        <li>
          <span>Humidity</span>{" "}
          <strong>{localData.humidity?.toFixed(0) ?? "--"}%</strong>
        </li>
      </ul>
    </div>
  );
};

export default WeatherSummary;
