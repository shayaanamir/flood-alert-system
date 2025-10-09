// hooks/useMultiLocationAlerts.js
import { useState, useEffect } from "react";
import { weatherService } from "../services/weatherService";

// Static array of 7 monitoring locations
const MONITORING_LOCATIONS = [
  { name: "Beijing", lat: "39.9042", lon: "116.4074" },
  { name: "New York", lat: "40.7128", lon: "-74.0060" },
  { name: "Paris", lat: "48.8566", lon: "2.3522" },
  { name: "Tokyo", lat: "35.6762", lon: "139.6503" },
  { name: "Sydney", lat: "-33.8688", lon: "151.2093" },
  { name: "Cape Town", lat: "-33.9249", lon: "18.4241" },
  { name: "Rio de Janeiro", lat: "-22.9068", lon: "-43.1729" },
  { name: "Toronto", lat: "43.6532", lon: "-79.3832" },
  { name: "Dubai", lat: "25.276987", lon: "55.296249" },
  { name: "Berlin", lat: "52.5200", lon: "13.4050" },
];

export const useMultiLocationAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAllLocations = async () => {
    setLoading(true);
    setError(null);
    const newAlerts = [];

    try {
      // Fetch weather data for all locations in parallel
      const weatherPromises = MONITORING_LOCATIONS.map(async (location) => {
        try {
          const dailyData = await weatherService.getDaily(
            location.lat,
            location.lon
          );

          // Filter days with precipitation >= 10mm
          const alertDays = dailyData.filter(
            (day) => day.precipitationSum >= 1
          );

          if (alertDays.length > 0) {
            return {
              location: location.name,
              coordinates: { lat: location.lat, lon: location.lon },
              alertDays: alertDays,
              maxPrecipitation: Math.max(
                ...alertDays.map((d) => d.precipitationSum)
              ),
            };
          }
          return null;
        } catch (err) {
          console.error(`Error fetching data for ${location.name}:`, err);
          return null;
        }
      });

      const results = await Promise.all(weatherPromises);

      // Filter out null results and set alerts
      const validAlerts = results.filter((alert) => alert !== null);
      setAlerts(validAlerts);
    } catch (err) {
      setError(err.message);
      console.error("Error checking locations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAllLocations();

    // Refresh alerts every 30 minutes
    const interval = setInterval(checkAllLocations, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    alerts,
    loading,
    error,
    refresh: checkAllLocations,
  };
};
