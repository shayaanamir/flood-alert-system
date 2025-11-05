import express from "express";
import {
  createDamageReport,
  getAllDamageReports,
  getDamageReportById,
  updateDamageReportStatus,
} from "../controllers/damageController.js";

const router = express.Router();

// POST - Create new damage report
router.post("/", createDamageReport);

// GET - Get all damage reports
router.get("/", getAllDamageReports);

// GET - Get damage report by ID
router.get("/:id", getDamageReportById);

// PATCH - Update damage report status
router.patch("/:id/status", updateDamageReportStatus);

export default router;