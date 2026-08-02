<<<<<<< Updated upstream
=======
import express from "express";

import {
  createClaim,
  getClaims,
  updateClaim,
  deleteClaim,
} from "../controllers/claimController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createClaim);
router.get("/", protect, getClaims);
router.patch("/:id", protect, updateClaim);
router.delete("/:id", protect, deleteClaim);

export default router;
>>>>>>> Stashed changes
