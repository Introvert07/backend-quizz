import express from "express";
import questions from "../data/Questions.js";
import Submission from "../models/Submission.js";
import User from "../models/User.js";

const router = express.Router();

// Get all questions
router.get("/", (req, res) => {
  res.json(questions);
});

// Submit answers
router.post("/submit", async (req, res) => {
  const { userId, answers } = req.body; // answers: [{ question, answer, timeTaken }]
  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ message: "User not found" });

    const processed = answers.map(a => {
      const q = questions.find(q => q.text === a.question);
      return { ...a, correct: q.correctAnswer.toLowerCase().trim() === a.answer.toLowerCase().trim() };
    });

    const submission = await Submission.create({ user: userId, answers: processed });
    res.json({ message: "Submission saved", submission });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
