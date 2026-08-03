import express from "express";
import checkBlocked from "../middleware/checkBlocked.js";
import adminOnly from "../middleware/adminMiddleware.js";

import {
  createReport,
  getReports,
  updateReport,
  blockUser,
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, checkBlocked, createReport);
router.get("/", protect, adminOnly, getReports);
router.patch("/:id", protect, adminOnly, updateReport);
router.patch("/user/:id/block", protect, adminOnly, blockUser);

export default router;