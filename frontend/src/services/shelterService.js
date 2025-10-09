import axios from "axios";

const API_BASE_URL = "http://localhost:5000/shelter";

export const getShelterByZone = async (zone) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/by-zone?zone=${zone}`, {
      params: { zone },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching shelter data:", err);
    throw err;
  }
};
