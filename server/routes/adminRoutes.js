import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import User from "../models/User.js";
import { getDashboardStats } from "../controllers/adminController.js";

import {
  moderateItem,
  getPendingItems,
} from "../controllers/itemController.js";

const router = express.Router();

router.use(protect, adminOnly);
router.get("/dashboard", getDashboardStats);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-__v");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/items/pending", getPendingItems);

router.patch("/items/:id/moderate", moderateItem);

export default router;