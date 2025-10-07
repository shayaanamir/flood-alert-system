import express from "express";
import { getCoordinatesFromLocation } from "../controllers/coordinatesController.js";
import { getLocationFromCoordinates } from "../controllers/coordinatesController.js";
const router = express.Router();

router.get("/coords-from-location", getCoordinatesFromLocation);
router.get("/location-from-coords", getLocationFromCoordinates);

export default router;
