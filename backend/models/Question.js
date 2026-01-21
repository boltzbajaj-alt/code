const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    wayOfSolving: {
      type: String,
      enum: [
        "SOLVED_SELF",
        "TOOK_HINTS",
        "USED_AI",
        "WATCHED_SOLUTION",
      ],
      required: true,
    },

    confidenceLevel: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      required: true,
    },

    confidenceScore: {
      type: Number, // optional future AI usage
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lastSolvedAt: {
      type: Date,
      default: Date.now,
    },

    nextRevisionAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
