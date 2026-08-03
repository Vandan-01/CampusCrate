import Item from "../models/Item.js";
import Claim from "../models/Claim.js";
import Report from "../models/Report.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const pendingItems = await Item.countDocuments({
      approvalStatus: "pending",
    });

    const pendingClaims = await Claim.countDocuments({
      status: "pending",
    });

    const reports = await Report.countDocuments();

    const blockedUsers = await User.countDocuments({
      blocked: true,
    });

    res.status(200).json({
      success: true,
      data: {
        pendingItems,
        pendingClaims,
        reports,
        blockedUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};