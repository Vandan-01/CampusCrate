import express from "express";
import passport from "../config/passport.js";
import generateToken from "../utils/generateToken.js";
import protect from "../middleware/authMiddleware.js";
import { getMe } from "../controllers/authController.js";

const router = express.Router();

router.get("/me", protect, getMe);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const token = generateToken(req.user._id);

    res.redirect(
      `${process.env.CLIENT_URL}/auth-success?token=${token}`
    );
  }
);

export default router;