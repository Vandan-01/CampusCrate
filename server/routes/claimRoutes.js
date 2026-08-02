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
const router = express.Router();

router.post("/", createClaim);

router.get("/", getClaims);

router.patch("/:id", updateClaim);

router.delete("/:id", deleteClaim);

export default router;