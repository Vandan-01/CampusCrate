import express from "express";
import passport from "../config/passport.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

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
    failureRedirect: "/",
  }),
  (req, res) => {

    const token = generateToken(req.user._id);

    res.json({
      message: "Login Successful",
      token,
      user: req.user,
    });

  }
);

export default router;