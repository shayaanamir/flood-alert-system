// services/locationService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/location-conversion";

export const locationService = {
  // Reverse geocoding: coordinates -> location
  async getLocationFromCoords(lat, lon) {
    try {
      const res = await axios.get(
        `${BASE_URL}/location-from-coords?lat=${lat}&lon=${lon}`
      );
      return res.data.address;
    } catch (err) {
      console.error("Error fetching location:", err);
      throw err;
    }
  },

  // Forward geocoding: location -> coordinates
  async getCoordsFromLocation(location) {
    try {
      const res = await axios.get(
        `${BASE_URL}/coords-from-location?location=${location}`
      );

      if (res.data.length === 0) {
        throw new Error("No results found");
      }

      return res.data; // Returns { lat, lon }
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      throw err;
    }
  },
};
