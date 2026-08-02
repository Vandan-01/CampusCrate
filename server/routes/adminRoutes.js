import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import User from "../models/User.js";

import {
  moderateItem,
  getPendingItems,
} from "../controllers/itemController.js";

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

// Get all users
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

// Get pending items
router.get("/items/pending", getPendingItems);

// Approve / reject item
router.patch("/items/:id/moderate", moderateItem);

export default router;