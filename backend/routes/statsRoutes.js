// routes/statsRoutes.js
import express from "express";
import {
  getDashboardStats,
  getShelterStats,
  getReportStats,
} from "../controllers/statsController.js";

const router = express.Router();

// GET - Get dashboard statistics (for Quick Views)
router.get("/dashboard", getDashboardStats);

// GET - Get detailed shelter statistics
router.get("/shelters", getShelterStats);

// GET - Get detailed report statistics
router.get("/reports", getReportStats);

export default router;