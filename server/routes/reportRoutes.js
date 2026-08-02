import express from "express";

import {
  createReport,
  getReports,
  updateReport,
  blockUser,
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, getReports);
router.patch("/:id", protect, updateReport);
router.patch("/user/:id/block", protect, blockUser);
const router = express.Router();

router.post("/", createReport);

router.get("/", getReports);

router.patch("/:id", updateReport);

router.patch("/user/:id/block", blockUser);

export default router;