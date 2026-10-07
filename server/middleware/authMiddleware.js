import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const user = await User.findById(decoded.id).select("-__v");

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      if (user.blocked) {
        return res.status(403).json({
          message: "Your account has been blocked",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No Token",
    });
  }
};

export default protect;