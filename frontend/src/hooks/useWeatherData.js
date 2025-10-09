// hooks/useWeatherData.js
import { useState, useEffect } from "react";
import { weatherService } from "../services/weatherService";

export const useWeatherData = (latitude, longitude) => {
  const [currentData, setCurrentData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current weather
  const fetchCurrent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrent(latitude, longitude);
      setCurrentData(data);
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
      console.log("fetched daily:", dailyData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hourly forecast for selected day
  const fetchHourly = async (date) => {
    if (!date) return;

    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getHourly(latitude, longitude, date);
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
    if (latitude && longitude) {
      fetchCurrent();
      fetchDaily();
    }
  }, [latitude, longitude]);

  // Fetch hourly when day is selected
  useEffect(() => {
    if (selectedDay?.time) {
      fetchHourly(selectedDay.time);
    }
  }, [selectedDay]);

  return {
    currentData,
    dailyData,
    hourlyData,
    selectedDay,
    setSelectedDay,
    loading,
    error,
    refreshAll,
  };
};
