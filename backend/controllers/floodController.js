import axios from "axios";

export const getHourlyWeather = async (req, res) => {
  try {
    // const lat = 52.52;
    // const long = 13.41;
    const { lat, lon, date } = req.query;

    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=rain,temperature_2m,precipitation_probability,weather_code&start_date=${date}&end_date=${date}`
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching flood data: ", err.message);
    res.status(500).json({ message: "Falied to fetch flood data" });
  }
};

export const getDailyWeather = async (req, res) => {
  try {
    // const lat = 52.52;
    // const long = 13.41;
    const { lat, lon } = req.query;

    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,precipitation_sum,precipitation_probability_max,temperature_2m_max,temperature_2m_min&forecast_days=3`
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching flood data: ", err.message);
    res.status(500).json({ message: "Falied to fetch flood data" });
  }
};

export const getCurrentWeather = async (req, res) => {
  try {
    const { lat, lon, date } = req.query;

    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=wind_speed_10m,pressure_msl,temperature_2m,relative_humidity_2m,weather_code,precipitation`
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching flood data: ", err.message);
    res.status(500).json({ message: "Falied to fetch flood data" });
  }
};
