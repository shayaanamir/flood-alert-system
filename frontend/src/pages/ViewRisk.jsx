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

        <div className="risk-forecast-row">
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
      </div>

      <Footer />
    </div>
  );
};

export default ViewRisk;