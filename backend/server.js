import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import floodRoutes from "./routes/floodRoutes.js";
import coordinatesRoutes from "./routes/coordinatesRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import shelterRoutes from "./routes/shelterRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import damageRoutes from "./routes/damageRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
await connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Flood route
app.use("/weather-data", floodRoutes);

app.use("/location-conversion", coordinatesRoutes);

// app.use("/login-signup", loginRoutes);

app.use("/shelter", shelterRoutes);

//Login Page
app.use("/login-signup", authRoutes);

// Profile routes
app.use("/profile", profileRoutes);

// Damage report routes
app.use("/damage-reports", damageRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));