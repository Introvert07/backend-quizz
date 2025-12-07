import express from "express";
import Submission from "../models/Submission.js";
import User from "../models/User.js";

const router = express.Router();

// Get all submissions
router.get("/submissions", async (req, res) => {
  try {
    const subs = await Submission.find().populate("user");
    res.json(subs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
