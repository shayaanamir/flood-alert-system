import express from "express";
import {
  getAllAlerts,
  getRecentAlerts,
  getAlertStats,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../controllers/alertController.js";

const router = express.Router();

// GET routes
router.get("/", getAllAlerts);
router.get("/recent", getRecentAlerts);
router.get("/stats", getAlertStats);

// POST route
router.post("/", createAlert);

// PUT route
router.put("/:id", updateAlert);

// DELETE route
router.delete("/:id", deleteAlert);

export default router;
