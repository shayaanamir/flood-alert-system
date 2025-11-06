// services/shelterService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/shelter";

// Existing function - get shelters by zone
export const getShelterByZone = async (zone) => {
  try {
    const res = await axios.get(`${API_BASE_URL}`, {
      params: zone ? { zone } : {},
    });
    console.log("Fetched Shelter Data:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching shelter data:", err);
    throw err;
  }
};

// New utility object for additional shelter operations
export const shelterService = {
  // Get all shelters with optional filters
  async getShelters(params = {}) {
    try {
      const res = await axios.get(API_BASE_URL, { params });
      console.log("Fetched Shelter Data:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching shelters:", err);
      throw err;
    }
  },

  // Get shelters near a location
  async getNearbyShelters(lat, lon, radiusKm = 10) {
    try {
      const res = await axios.get(`${API_BASE_URL}/nearby`, {
        params: { lat, lon, radius_km: radiusKm }
      });
      console.log("Fetched Nearby Shelter Data:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching nearby shelters:", err);
      throw err;
    }
  },

  // Get a single shelter by ID
  async getShelterById(id) {
    try {
      const res = await axios.get(`${API_BASE_URL}/${id}`);
      console.log("Fetched Shelter by ID:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching shelter:", err);
      throw err;
    }
  },

  // Alias for backward compatibility
  getShelterByZone
};