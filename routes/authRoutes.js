import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.json({ message: "User already exists" });
    const user = await User.create({ name, email });
    res.json({ message: "Registration successful", user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });
    res.json({ message: "Login successful", user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
