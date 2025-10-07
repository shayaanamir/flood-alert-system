import express from "express";
import cors from "cors";
import floodRoutes from "./routes/floodRoutes.js";
import coordinatesRoutes from "./routes/coordinatesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Flood route
app.use("/weather-data", floodRoutes);

app.use("/location-conversion", coordinatesRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
