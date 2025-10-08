// services/weatherService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/weather-data";

export const weatherService = {
  // Fetch current weather data
  async getCurrent(lat, lon) {
    try {
      const res = await axios.get(`${BASE_URL}/current?lat=${lat}&lon=${lon}`);
      return res.data.current;
    } catch (err) {
      console.error("Error fetching current weather:", err);
      throw err;
    }
  },

  // Fetch daily forecast
  async getDaily(lat, lon) {
    try {
      const res = await axios.get(`${BASE_URL}/daily?lat=${lat}&lon=${lon}`);
      const dailyData = res.data.daily;

      return dailyData.time.map((date, idx) => ({
        time: date,
        weatherCode: dailyData.weather_code[idx],
        precipitationSum: dailyData.precipitation_sum[idx],
        precipitationProbabilityMax:
          dailyData.precipitation_probability_max[idx],
        tempMax: dailyData.temperature_2m_max[idx],
        tempMin: dailyData.temperature_2m_min[idx],
      }));
    } catch (err) {
      console.error("Error fetching daily forecast:", err);
      throw err;
    }
  },

  // Fetch hourly forecast for a specific date
  async getHourly(lat, lon, date) {
    try {
      const res = await axios.get(
        `${BASE_URL}/hourly?lat=${lat}&lon=${lon}&date=${date}`
      );
      const hourlyData = res.data.hourly;

      return hourlyData.time.map((hourTime, idx) => ({
        time: hourTime,
        temperature: hourlyData.temperature_2m[idx] ?? null,
        rain: hourlyData.rain[idx] ?? null,
        precipitationProbability:
          hourlyData.precipitation_probability[idx] ?? null,
        weatherCode: hourlyData.weather_code[idx] ?? null,
      }));
    } catch (err) {
      console.error("Error fetching hourly forecast:", err);
      throw err;
    }
  },
};
