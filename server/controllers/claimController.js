import Claim from "../models/Claim.js";
import Item from "../models/Item.js";

export const createClaim = async (req, res) => {
  try {
    const { itemId, message, answer } = req.body;

    if (!itemId || !message || !answer) {
      return res.status(400).json({
        success: false,
        message: "Item ID, message and answer are required",
      });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // User cannot claim their own item
    if (item.postedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot claim your own item",
      });
    }

    // Prevent duplicate claims
    const existingClaim = await Claim.findOne({
      itemId,
      claimantId: req.user._id,
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a claim for this item",
      });
    }

    const claim = await Claim.create({
      itemId,
      claimantId: req.user._id,
      message,
      answer,
    });

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
        message: "Invalid claim status",
      });
    }

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (claim.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Claim has already been processed",
      });
    }

    const item = await Item.findById(claim.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Associated item not found",
      });
    }

    if (
      item.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this claim",
      });
    }

    claim.status = status;
    await claim.save();

    if (status === "approved") {
      item.status = "claimed";
      await item.save();
    }

    const updatedClaim = await Claim.findById(claim._id)
      .populate("itemId", "title category status")
      .populate("claimantId", "name email");

    res.status(200).json({
      success: true,
      message: `Claim ${status}`,
      data: updatedClaim,
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