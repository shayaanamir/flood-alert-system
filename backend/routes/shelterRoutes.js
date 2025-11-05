// import express from "express";
// import { getshelterByZone } from "../controllers/shelterController.js";

// const router = express.Router();

// router.post("/by-zone", getshelterByZone);

// export default router;

import express from "express";
import {
  getShelters,
  getShelterById,
} from "../controllers/shelterController.js";

const router = express.Router();

router.get("/", getShelters); // Read all / search
router.get("/:id", getShelterById); // Read one

export default router;
