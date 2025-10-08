import express from "express";
import { getHourlyWeather } from "../controllers/floodController.js";
import { getDailyWeather } from "../controllers/floodController.js";
import { getCurrentWeather } from "../controllers/floodController.js";

const router = express.Router();

router.get("/hourly", getHourlyWeather);
router.get("/daily", getDailyWeather);
router.get("/current", getCurrentWeather);

export default router;
