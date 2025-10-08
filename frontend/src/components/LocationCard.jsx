import React, { useEffect, useState } from 'react';
import '../styles/components/LocationCard.css';

const LocationCard = ({ location, weatherData }) => {
  const [weather, setWeather] = useState('Loading...');
  const [temperature, setTemperature] = useState('--°C');

  useEffect(() => {
    if (weatherData) {
      // Map weather codes to descriptions
      const weatherCode = weatherData.weather_code || 0;
      let weatherDesc = 'Clear';
      
      if (weatherCode === 0) weatherDesc = 'Clear';
      else if (weatherCode === 1) weatherDesc = 'Mainly Clear';
      else if (weatherCode === 2) weatherDesc = 'Partly Cloudy';
      else if (weatherCode === 3) weatherDesc = 'Overcast';
      else if (weatherCode >= 45 && weatherCode <= 48) weatherDesc = 'Foggy';
      else if (weatherCode >= 51 && weatherCode <= 57) weatherDesc = 'Drizzle';
      else if (weatherCode >= 61 && weatherCode <= 67) weatherDesc = 'Rain';
      else if (weatherCode >= 71 && weatherCode <= 77) weatherDesc = 'Snow';
      else if (weatherCode >= 80 && weatherCode <= 82) weatherDesc = 'Rain Showers';
      else if (weatherCode >= 85 && weatherCode <= 86) weatherDesc = 'Snow Showers';
      else if (weatherCode >= 95) weatherDesc = 'Thunderstorm';
      
      setWeather(weatherData.weather_description || weatherDesc);
      
      // Use correct temperature field
      const temp = weatherData.temperature_2m || weatherData.temperature || 0;
      setTemperature(`${Math.round(temp)}°C`);
    }
  }, [weatherData]);

  return (
    <div className="location-card">
      <div className="location-info">
        <svg className="location-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#efefef">
          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
        </svg>
        <span className="location-name">{location}</span>
      </div>
      <div className="weather-info">
        <svg className="weather-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF">
          <path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/>
        </svg>
        <span className="weather-text">{weather}</span>
        <span className="temperature">{temperature}</span>
      </div>
    </div>
  );
};

export default LocationCard;