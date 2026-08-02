import express from "express";

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

// Create Item
router.post("/", createItem);

// Get All Items
router.get("/", getItems);

// Get Single Item
router.get("/:id", getItemById);

// Update Item
router.patch("/:id", updateItem);

// Delete Item
router.delete("/:id", deleteItem);

export default router;