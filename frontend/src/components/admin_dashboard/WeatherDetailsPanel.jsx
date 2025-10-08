// components/dashboard/WeatherDetailsPanel.jsx
import React from "react";
import CurrentInfo from "../CurrentInfo";

export const WeatherDetailsPanel = ({ currentData, loading }) => {
  if (loading) {
    return (
      <div className="dashboard-default dashboard-forecast-graph">
        <div className="dashboard-default weather-details">
          <h3>Weather Details</h3>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (!currentData) {
    return (
      <div className="dashboard-default dashboard-forecast-graph">
        <div className="dashboard-default weather-details">
          <h3>Weather Details</h3>
          <p>No weather data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-default dashboard-forecast-graph">
      <div className="dashboard-default weather-details">
        <h3>Weather Details</h3>
        <div className="weather-details-grid">
          {Object.entries(currentData)
            .filter(([key]) => key !== "time" && key !== "interval")
            .map(([key, value]) => (
              <CurrentInfo key={key} label={key} value={value} />
            ))}
        </div>
      </div>
    </div>
  );
};
