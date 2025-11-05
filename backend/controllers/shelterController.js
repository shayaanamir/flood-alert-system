// import axios from "axios";

// const API_URL = "https://68e65b6c21dd31f22cc53de3.mockapi.io/api/shelter"; // replace with actual

// // Fetch all shelter data and filter by zone
// export const getshelterByZone = async (req, res) => {
//   try {
//     const { zone } = req.query; // frontend sends ?zone=41

//     // Fetch all data from MockAPI
//     const response = await axios.get(API_URL);
//     const allshelter = response.data;

//     // Filter by zone if provided
//     const filtered = zone
//       ? allshelter.filter((item) => item.zone === Number(zone))
//       : allshelter;

//     res.json(filtered);
//   } catch (err) {
//     console.error("Error fetching shelter data:", err.message);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch shelter data", error: err.message });
//   }
// };

import Shelter from "../models/Shelter.js";

//Get all shelters (with optional zone filter)
export const getShelters = async (req, res) => {
  try {
    const { zone, search } = req.query;
    const filter = {};

    if (zone) filter.zone = zone;
    if (search) filter.name = { $regex: search, $options: "i" }; // fuzzy search by name

    const shelters = await Shelter.find(filter);
    console.log(shelters);
    res.json(shelters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get single shleter by ID
export const getShelterById = async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id);
    if (!shelter) return res.status(404).json({ message: "Shelter not found" });
    res.json(shelter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
