import React from 'react';
import '../styles/components/RainfallForecast.css';

const RainfallForecast = () => {
  // Updated forecast data to match the design
  const updatedForecastData = [
    { time: '00:00', intensity: 'light', amount: '2mm' },
    { time: '03:00', intensity: 'light', amount: '4mm' },
    { time: '06:00', intensity: 'moderate', amount: '' },
    { time: '09:00', intensity: 'heavy', amount: '12mm' },
    { time: '12:00', intensity: 'moderate', amount: '' },
    { time: '15:00', intensity: 'moderate', amount: '6mm' },
    { time: '18:00', intensity: 'light', amount: '3mm' },
    { time: '21:00', intensity: 'light', amount: '1mm' }
  ];

  const getIntensityColor = (intensity) => {
    switch (intensity.toLowerCase()) {
      case 'light':
        return '#4A90E2';
      case 'moderate':
        return '#F5A623';
      case 'heavy':
        return '#E74C3C';
      default:
        return '#4A90E2';
    }
  };


  return (
    <div className="rainfall-forecast-card">
      <div className="forecast-header">
        <div className="forecast-icon">
          <span className="rain-icon">🌧️</span>
        </div>
        <h3 className="forecast-title">24-Hour Rainfall Forecast</h3>
      </div>

      <div className="forecast-timeline">
        {updatedForecastData.map((item, index) => (
          <div key={index} className="forecast-item">
            <div className="time-slot">
              <span className="clock-icon">🕐</span>
              <span className="time-text">{item.time}</span>
            </div>
            
            <div className="rainfall-display">
              {item.amount && (
                <div className="rainfall-amount">
                  <span className="amount-text">{item.amount}</span>
                </div>
              )}
            </div>
            
            <div className="bar-container">
              <div 
                className={`intensity-bar ${item.intensity}`}
                style={{ backgroundColor: getIntensityColor(item.intensity) }}
              >
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="forecast-legend">
        <div className="legend-item">
          <div className="legend-color light-rain"></div>
          <span className="legend-text">Light Rain (0-5mm)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color moderate-rain"></div>
          <span className="legend-text">Moderate Rain (5-10mm)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color heavy-rain"></div>
          <span className="legend-text">Heavy Rain (10+ mm)</span>
        </div>
      </div>
    </div>
  );
};

export default RainfallForecast;