import React, { useEffect, useState } from 'react';
import '../styles/components/RainfallForecast.css';

const RainfallForecast = ({ hourlyData }) => {
  const [forecastData, setForecastData] = useState([
    { time: '00:00', intensity: 'light', amount: '2%', probability: 2 },
    { time: '03:00', intensity: 'light', amount: '4%', probability: 4 },
    { time: '06:00', intensity: 'moderate', amount: '6%', probability: 6 },
    { time: '09:00', intensity: 'heavy', amount: '12%', probability: 12 },
    { time: '12:00', intensity: 'moderate', amount: '8%', probability: 8 },
    { time: '15:00', intensity: 'moderate', amount: '6%', probability: 6 },
    { time: '18:00', intensity: 'light', amount: '3%', probability: 3 },
    { time: '21:00', intensity: 'light', amount: '1%', probability: 1 }
  ]);

  useEffect(() => {
    console.log('Hourly Data in RainfallForecast:', hourlyData);
    
    if (hourlyData && hourlyData.length > 0) {
      // Log the first item to see ALL available fields
      console.log('First hour data structure:', hourlyData[0]);
      console.log('ALL KEYS in first hour:', Object.keys(hourlyData[0]));
      
      // Convert hourly data to forecast format
      const newForecastData = hourlyData.slice(0, 8).map(hour => {
        // Use only precipitation probability
        const precipProb = hour.precipitationProbability ?? 0;
        
        console.log('Hour:', hour.time, 'Precip Prob:', precipProb, '%');
        
        // Determine intensity based only on precipitation probability
        let intensity = 'light';
        if (precipProb >= 70) {
          intensity = 'heavy';
        } else if (precipProb >= 40) {
          intensity = 'moderate';
        } else {
          intensity = 'light';
        }

        // Format time
        const time = new Date(hour.time).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });

        // Format amount as percentage
        const amount = `${precipProb}%`;

        return {
          time,
          intensity,
          amount,
          probability: precipProb
        };
      });

      console.log('New Forecast Data:', newForecastData);
      setForecastData(newForecastData);
    }
  }, [hourlyData]);

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
          <svg className="rain-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#070707ff">
            <path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/>
          </svg>
        </div>
        <h3 className="forecast-title">24-Hour Rainfall Forecast</h3>
      </div>

      <div className="forecast-timeline">
        {forecastData.map((item, index) => (
          <div key={index} className="forecast-item">
            <div className="time-slot">
              <svg className="clock-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
              </svg>
              <span className="time-text">{item.time}</span>
            </div>
            
            <div className="rainfall-display">
              <div className="rainfall-amount">
                <span className="amount-text">{item.amount}</span>
              </div>
            </div>
            
            <div className="bar-container">
              <div 
                className={`intensity-bar ${item.intensity}`}
                style={{ 
                  backgroundColor: getIntensityColor(item.intensity),
                  height: `${Math.max(8, (item.probability / 100) * 150)}px`
                }}
              >
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="forecast-legend">
        <div className="legend-item">
          <div className="legend-color light-rain"></div>
          <span className="legend-text">Low Chance (&lt;40%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color moderate-rain"></div>
          <span className="legend-text">Medium Chance (40-70%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color heavy-rain"></div>
          <span className="legend-text">High Chance (70%+)</span>
        </div>
      </div>
    </div>
  );
};

export default RainfallForecast;