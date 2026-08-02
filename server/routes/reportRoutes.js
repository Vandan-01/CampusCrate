import express from "express";

import {
  createReport,
  getReports,
  updateReport,
  blockUser,
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/", createReport);

router.get("/", getReports);

router.patch("/:id", updateReport);

router.patch("/user/:id/block", blockUser);

export default router;