import React from 'react';

const WeatherSummary = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <div className="dashboard-card weather-summary-card">
        <h3 className="card-title">Weather Summary</h3>
        <p>Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card weather-summary-card">
      <h3 className="card-title">Weather Summary</h3>
      <ul className="weather-list">
        <li><span>Temperature</span> <strong>{weatherData.temperature}°C</strong></li>
        <li><span>Rainfall</span> <strong>{weatherData.precipitation}mm/h</strong></li>
        <li><span>Wind Speed</span> <strong>{weatherData.windSpeed} km/h</strong></li>
        <li><span>Humidity</span> <strong>{weatherData.humidity}%</strong></li>
      </ul>
    </div>
  );
};

export default WeatherSummary;