import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ["junior", "admin"], default: "junior" }
});

export default mongoose.model("User", userSchema);
