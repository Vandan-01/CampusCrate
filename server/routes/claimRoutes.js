import express from "express";
import checkBlocked from "../middleware/checkBlocked.js";

import {
  createClaim,
  getClaims,
  updateClaim,
  deleteClaim,
} from "../controllers/claimController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, checkBlocked, createClaim);
router.get("/", protect, getClaims);

router.patch("/:id", protect, adminOnly, updateClaim);

router.delete("/:id", protect, deleteClaim);

export default router;