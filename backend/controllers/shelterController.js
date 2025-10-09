import axios from "axios";

const API_URL = "https://68e65b6c21dd31f22cc53de3.mockapi.io/api/shelter"; // replace with actual

// Fetch all shelter data and filter by zone
export const getshelterByZone = async (req, res) => {
  try {
    const { zone } = req.query; // frontend sends ?zone=41

    // Fetch all data from MockAPI
    const response = await axios.get(API_URL);
    const allshelter = response.data;

    // Filter by zone if provided
    const filtered = zone
      ? allshelter.filter((item) => item.zone === Number(zone))
      : allshelter;

    res.json(filtered);
  } catch (err) {
    console.error("Error fetching shelter data:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch shelter data", error: err.message });
  }
};
