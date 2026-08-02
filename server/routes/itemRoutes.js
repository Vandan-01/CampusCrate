import express from "express";

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  markItemReturned,
} from "../controllers/itemController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getItems);
router.get("/:id", getItemById);


router.post("/", protect, createItem);
router.patch("/:id/returned", protect, markItemReturned);
router.patch("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);
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