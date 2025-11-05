import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import SearchBox from '../components/SearchBox';
import LocationCard from '../components/LocationCard';
import RiskAssessment from '../components/RiskAssessment';
import RainfallForecast from '../components/RainfallForecast';
import { useLocationConversion } from '../hooks/useLocationConversion';
import { useWeatherData } from '../hooks/useWeatherData';
import { locationService } from '../services/locationService';
import '../styles/viewRisk.css';

const ViewRisk = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const lastLocationRef = useRef('');

  // Initialize location conversion hook
  const {
    latitude,
    longitude,
    location,
    setLatitude,
    setLongitude,
    setLocation,
    handleGetCoordinates,
    loading: locationLoading
  } = useLocationConversion();

  // Initialize weather data hook with chosenDate
  const {
    currentData,
    dailyData,
    hourlyData,
    selectedDay,
    chosenDate,
    setChosenDate,
    loading: weatherLoading,
    error: weatherError
  } = useWeatherData(latitude, longitude);

  // Debug: Log the data
  useEffect(() => {
    console.log('Current Data:', currentData);
    console.log('Daily Data:', dailyData);
    console.log('Selected Day:', selectedDay);
    console.log('Chosen Date:', chosenDate);
    console.log('Hourly Data:', hourlyData);
    console.log('Latitude:', latitude, 'Longitude:', longitude);
  }, [currentData, dailyData, selectedDay, chosenDate, hourlyData, latitude, longitude]);

  // Set initial location only once
  useEffect(() => {
    if (!isInitialized) {
      setLocation('Mumbai, Maharashtra');
      setIsInitialized(true);
    }
  }, [isInitialized, setLocation]);

  // Trigger coordinate fetch when location changes
  useEffect(() => {
    if (location && isInitialized && location !== lastLocationRef.current) {
      lastLocationRef.current = location;
      handleGetCoordinates();
    }
  }, [location, isInitialized]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocation(searchQuery);
      setSearchQuery(''); // Clear search input after search
    }
  };

  const handleUseLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toString();
        const lon = position.coords.longitude.toString();
        
        // Set coordinates first
        setLatitude(lat);
        setLongitude(lon);
        
        // Fetch the actual location name using reverse geocoding
        try {
          const address = await locationService.getLocationFromCoords(lat, lon);
          setLocation(address);
          lastLocationRef.current = address; // Update ref to prevent duplicate fetches
        } catch (error) {
          console.error('Error getting location name:', error);
          setLocation('Your Current Location'); // Fallback if reverse geocoding fails
          lastLocationRef.current = 'Your Current Location';
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enable location permissions.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser');
  }
};

  // Example: Function to handle date selection in ViewRisk
  const handleDateChange = (date) => {
    console.log('ViewRisk: Date changed to', date);
    setChosenDate(date);
  };

  const isLoading = locationLoading || weatherLoading;

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

        {weatherError && (
          <div className="error-message">
            Error loading weather data: {weatherError}
          </div>
        )}

        {isLoading ? (
          <div className="loading-message">Loading weather data...</div>
        ) : (
          <>
            <LocationCard 
              location={location || 'Mumbai, Maharashtra'}
              weatherData={currentData}
            />

            <div className="risk-forecast-row">
              <RiskAssessment 
                weatherData={currentData}
                chosenDate={chosenDate}
                onDateChange={handleDateChange}
              />
              <RainfallForecast 
                hourlyData={hourlyData}
                chosenDate={chosenDate}
              />
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ViewRisk;