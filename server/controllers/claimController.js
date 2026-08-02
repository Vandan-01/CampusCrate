import Claim from "../models/Claim.js";
import Item from "../models/Item.js";

export const createClaim = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This item is no longer available for claims",
      });
    }

    if (item.postedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot claim your own item",
      });
    }

    const existingClaim = await Claim.findOne({
      itemId,
      claimantId: req.user._id,
      status: "pending",
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending claim for this item",
      });
    }

    const claim = await Claim.create({
      itemId,
      claimantId: req.user._id,
      message,
    });

// Create a Claim
export const createClaim = async (req, res) => {
  try {
    const claim = await Claim.create(req.body);

    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      data: claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getClaims = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "admin") {
      filter = {};
    } else {
      const userItems = await Item.find({
        postedBy: req.user._id,
      }).select("_id");

      const itemIds = userItems.map((item) => item._id);

      filter = {
        $or: [
          { claimantId: req.user._id },
          { itemId: { $in: itemIds } },
        ],
      };
    }

    const claims = await Claim.find(filter)
      .populate("itemId", "title category status postedBy")
      .populate("claimantId", "name email avatar")
      .sort({ createdAt: -1 });
// Get All Claims
export const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("itemId", "title category status")
      .populate("claimantId", "name email");

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateClaim = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    const claim = await Claim.findById(req.params.id).populate("itemId");
// Update Claim Status
export const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    const item = claim.itemId;

    if (
      item.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot manage this claim",
      });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This claim has already been processed",
      });
    }

    claim.status = status;
    await claim.save();

    if (status === "approved") {
      item.status = "claimed";
      await item.save();

      await Claim.updateMany(
        {
          itemId: item._id,
          _id: { $ne: claim._id },
          status: "pending",
        },
        {
          $set: { status: "rejected" },
        }
      );
    }

    res.status(200).json({
      success: true,
      message:
        status === "approved"
          ? "Claim approved and item marked as claimed"
          : "Claim rejected",
    res.status(200).json({
      success: true,
      message: "Claim updated successfully",
      data: claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
// Delete Claim
export const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndDelete(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (
      claim.claimantId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this claim",
      });
    }

    await claim.deleteOne();

    res.status(200).json({
      success: true,
      message: "Claim deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};