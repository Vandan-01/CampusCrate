import express from "express";
import checkBlocked from "../middleware/checkBlocked.js";

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  markItemReturned,
} from "../controllers/itemController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItemById);

router.post("/", protect, checkBlocked, upload.single("photo"), createItem);

router.patch("/:id/returned", protect, markItemReturned);
router.patch("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

export default router;