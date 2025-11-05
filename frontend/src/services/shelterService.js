import axios from "axios";

const API_BASE_URL = "http://localhost:5000/shelter";

export const getShelterByZone = async (zone) => {
  try {
    const res = await axios.get(`${API_BASE_URL}`, {
      params: zone ? { zone } : {},
    });
    console.log("Fetched Shelter Data:", res.data); // ✅ Log the returned data

    return res.data;
  } catch (err) {
    console.error("Error fetching shelter data:", err);
    throw err;
  }
};
