import express from "express";

import {
  createClaim,
  getClaims,
  updateClaim,
  deleteClaim,
} from "../controllers/claimController.js";

const router = express.Router();

router.post("/", createClaim);

router.get("/", getClaims);

router.patch("/:id", updateClaim);

router.delete("/:id", deleteClaim);

export default router;