// hooks/useLocationConversion.js
import { useState } from "react";
import { locationService } from "../services/locationService";

const DEFAULT_COORDS = {
  lat: "19.0760", // Mumbai
  lon: "72.8777",
};

export const useLocationConversion = (onLocationChange) => {
  const [latitude, setLatitude] = useState(DEFAULT_COORDS.lat);
  const [longitude, setLongitude] = useState(DEFAULT_COORDS.lon);
  const [location, setLocation] = useState("");
  const [addressResult, setAddressResult] = useState("");
  const [coordsResult, setCoordsResult] = useState("");
  const [mode, setMode] = useState("toLocation"); // "toLocation" or "toCoords"
  const [loading, setLoading] = useState(false);

  // Toggle between coordinate-to-location and location-to-coordinate modes
  const handleSwap = () => {
    setMode(mode === "toLocation" ? "toCoords" : "toLocation");
    setLatitude(DEFAULT_COORDS.lat);
    setLongitude(DEFAULT_COORDS.lon);
    setLocation("");
    setAddressResult("");
    setCoordsResult("");
  };

  // Convert coordinates to location
  const handleGetLocation = async () => {
    if (!latitude || !longitude) {
      alert("Enter both latitude and longitude!");
      return;
    }

    try {
      setLoading(true);
      const address = await locationService.getLocationFromCoords(
        latitude,
        longitude
      );
      setAddressResult(address);
      setLocation(address);

      // Notify parent component of location change
      if (onLocationChange) {
        onLocationChange({ lat: latitude, lon: longitude, address });
      }
    } catch (err) {
      alert("Error fetching location");
    } finally {
      setLoading(false);
    }
  };

  // Convert location to coordinates
  const handleGetCoordinates = async () => {
    if (!location) {
      alert("Enter a location!");
      return;
    }

    try {
      setLoading(true);
      const coords = await locationService.getCoordsFromLocation(location);

      setCoordsResult(coords);
      setLatitude(coords.lat);
      setLongitude(coords.lon);

      // Notify parent component of location change
      if (onLocationChange) {
        onLocationChange({
          lat: coords.lat,
          lon: coords.lon,
          address: location,
        });
      }
    } catch (err) {
      if (err.message === "No results found") {
        setCoordsResult("No results found");
      } else {
        alert("Error fetching coordinates");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    latitude,
    longitude,
    location,
    addressResult,
    coordsResult,
    mode,
    loading,
    setLatitude,
    setLongitude,
    setLocation,
    handleSwap,
    handleGetLocation,
    handleGetCoordinates,
  };
};
