import axios from "axios";

// Coordinates -> Location
export const getLocationFromCoordinates = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const { data } = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: { lat, lon, format: "json" },
      }
    );
    res.json({ address: data.display_name });
  } catch (err) {
    console.error("Error fetching location: ", err.message);
    res.status(500).json({ message: "Failed to fetch location" });
  }
};

// Location -> Coordinates
export const getCoordinatesFromLocation = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const { data } = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: { q: location, format: "json", limit: 1 },
      }
    );

    if (data.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }
    console.log("received; ", { lat: data[0].lat, lon: data[0].lon });
    res.json({ lat: data[0].lat, lon: data[0].lon });
  } catch (err) {
    console.error("Error fetching coordinates: ", err.message);
    res.status(500).json({ message: "Failed to fetch coordinates" });
  }
};
