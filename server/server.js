import "./config/env.js";

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "CampusCrate API Running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});