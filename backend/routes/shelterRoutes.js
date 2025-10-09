import express from "express";
import { getshelterByZone } from "../controllers/shelterController.js";

const router = express.Router();

router.post("/by-zone", getshelterByZone);

export default router;
