import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      category,
      location,
      date,
      photoUrl,
      claimQuestion,
      tags,
    } = req.body;

    const item = await Item.create({
      type,
      title,
      description,
      category,
      location,
      date,
      photoUrl,
      claimQuestion,
      tags,
      postedBy: req.user._id,
    });
// Create Item
export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const {
      type,
      category,
      status,
      search,
    } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const items = await Item.find(filter)
      .populate("postedBy", "name email avatar")
      .sort({ createdAt: -1 });
// Get All Items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("postedBy", "name email");

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Item
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "postedBy",
      "name email avatar"
      "name email"
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
// Update Item
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (
      item.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot update this item",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "location",
      "date",
      "photoUrl",
      "claimQuestion",
      "tags",
      "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    await item.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
// Delete Item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (
      item.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this item",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const markItemReturned = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (
      item.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot mark this item as returned",
      });
    }

    if (item.status !== "claimed") {
      return res.status(400).json({
        success: false,
        message: "Only claimed items can be marked as returned",
      });
    }

    item.status = "returned";

    await item.save();

    res.status(200).json({
      success: true,
      message: "Item marked as returned",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};