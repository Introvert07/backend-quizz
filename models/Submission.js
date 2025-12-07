import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [
    {
      question: String,
      answer: String,
      correct: Boolean,
      timeTaken: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
