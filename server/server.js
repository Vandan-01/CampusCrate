import "./config/env.js";

import express from "express";
import cors from "cors";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);


app.get("/", (req, res) => {
    res.json({ message: "CampusCrate API Running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});