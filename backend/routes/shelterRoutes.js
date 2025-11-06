import express from "express";
import {
  getShelters,
  getNearbyShelters,
  getShelterById,
} from "../controllers/shelterController.js";

const router = express.Router();

router.get("/", getShelters); // Read all / search
router.get("/nearby", getNearbyShelters); // must come BEFORE /:id
router.get("/:id", getShelterById); // Read one

export default router;
