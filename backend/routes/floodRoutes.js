import express from "express";
import { getHourlyWeather } from "../controllers/floodController.js";
import { getDailyWeather } from "../controllers/floodController.js";

const router = express.Router();

router.get("/hourly", getHourlyWeather);
router.get("/daily", getDailyWeather);

export default router;
