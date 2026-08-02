<<<<<<< Updated upstream
=======
import Claim from "../models/Claim.js";

export const createClaim = async (req, res) => {
  try {
    const claim = await Claim.create({
      ...req.body,
      claimantId: req.user._id,
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
    const claim = await Claim.findByIdAndDelete(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

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
>>>>>>> Stashed changes
