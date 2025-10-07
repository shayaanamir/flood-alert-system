import React, { useState } from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import SearchBox from '../components/SearchBox';
import LocationCard from '../components/LocationCard';
import RiskAssessment from '../components/RiskAssessment';
import RainfallForecast from '../components/RainfallForecast';
import '../styles/viewRisk.css';

const ViewRisk = () => {
  const [selectedLocation, setSelectedLocation] = useState('Mumbai, Maharashtra');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedLocation(searchQuery);
    }
  };

  const handleUseLocation = () => {
    setSelectedLocation('Your Current Location');
  };

  const locationData = {
    location: selectedLocation,
    weather: 'Heavy Rain',
    temperature: '28°F',
    riskLevel: 'Moderate',
    riskDescription: 'There is flood risk. Be prepared to take action if conditions worsen.',
    expectedRainfall: 45,
    floodProbability: 65,
    significantFloodingRisk: true,
    rainfallForecast: [
      { time: '00:00', intensity: 'Light', color: '#4A90E2' },
      { time: '03:00', intensity: 'Light', color: '#4A90E2' },
      { time: '06:00', intensity: 'Moderate', color: '#F5A623' },
      { time: '09:00', intensity: 'Heavy', color: '#D0021B' },
      { time: '12:00', intensity: 'Moderate', color: '#F5A623' },
      { time: '15:00', intensity: 'Moderate', color: '#F5A623' },
      { time: '18:00', intensity: 'Light', color: '#4A90E2' },
      { time: '21:00', intensity: 'Light', color: '#4A90E2' }
    ]
  };

  return (
 <div className="view-risk-page">
      <Header />
      
      <div className="view-risk-container">
        <div className="hero-section">
          <div className="hero-icon">
            <div className="water-drop-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#EFEFEF"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
          </div>
          <h1 className="hero-title">Flood Risk Assessment</h1>
          <p className="hero-subtitle">
            Check the current flood risk in your area and receive personalized safety recommendations
          </p>
        </div>

        <SearchBox 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
        />

        <LocationCard 
          location={locationData.location}
          weather={locationData.weather}
          temperature={locationData.temperature}
        />

        <RiskAssessment 
          riskLevel={locationData.riskLevel}
          riskDescription={locationData.riskDescription}
          expectedRainfall={locationData.expectedRainfall}
          floodProbability={locationData.floodProbability}
          significantFloodingRisk={locationData.significantFloodingRisk}
        />

        <RainfallForecast 
          forecastData={locationData.rainfallForecast}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ViewRisk;