// hooks/useWeatherData.js
import { useState, useEffect } from "react";
import { weatherService } from "../services/weatherService";

export const useWeatherData = (latitude, longitude, options = {}) => {
  const { autoSelectFirstDay = false } = options;

  const [currentData, setCurrentData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [chosenDate, setChosenDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current weather
  const fetchCurrent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrent(latitude, longitude);
      setCurrentData(data);
      console.log("current", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch daily forecast
  const fetchDaily = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getDaily(latitude, longitude);
      setDailyData(data);

      console.log("fetched daily:", data);

      // Only auto-select if explicitly enabled (for ViewRisk page)
      if (autoSelectFirstDay && data && data.length > 0 && !selectedDay) {
        setSelectedDay(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hourly forecast for a specific date
  const fetchHourly = async (date) => {
    if (!date) return;
    try {
      setLoading(true);
      setError(null);
      console.log(
        "📍 Fetching hourly for date:",
        date,
        "at coords:",
        latitude,
        longitude
      );
      const data = await weatherService.getHourly(latitude, longitude, date);
      console.log("Hourly data received:", data);
      setHourlyData(data);
    } catch (err) {
      setError(err.message);
      setHourlyData(null);
    } finally {
      setLoading(false);
    }
  };

  // Refresh all weather data
  const refreshAll = async () => {
    await Promise.all([fetchCurrent(), fetchDaily()]);
  };

  // Auto-fetch when coordinates change
  useEffect(() => {
    console.log("🌍 useWeatherData - Coordinates changed:", {
      latitude,
      longitude,
    });
    if (latitude && longitude) {
      console.log("Fetching weather data for:", latitude, longitude);
      fetchCurrent();
      fetchDaily();
    } else {
      console.log("❌ No coordinates available");
    }
  }, [latitude, longitude]);

  // Fetch hourly when selectedDay changes
  useEffect(() => {
    if (selectedDay?.time && latitude && longitude) {
      console.log("📅 Selected day changed, fetching hourly");
      fetchHourly(selectedDay.time);
    }
  }, [selectedDay, latitude, longitude]);

  // Fetch hourly when chosenDate changes (independent of selectedDay)
  useEffect(() => {
    if (chosenDate && latitude && longitude) {
      console.log("📆 Chosen date changed, fetching hourly for:", chosenDate);
      fetchHourly(chosenDate);
    }
  }, [chosenDate, latitude, longitude]);

  return {
    currentData,
    dailyData,
    hourlyData,
    selectedDay,
    setSelectedDay,
    chosenDate,
    setChosenDate,
    loading,
    error,
    refreshAll,
  };
};
