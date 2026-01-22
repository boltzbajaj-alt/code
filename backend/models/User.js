const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { // Add this
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    degree: {
      type: String,
      default: "",
    },

    yearOfGraduation: {
      type: Number,
    },

    collegeName: {
      type: String,
      default: "",
    },

    fieldOfStudy: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      insta: { type: String, default: "" },
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    currentLevel: {
      type: String,
      default: "intermediate",
    },

    primaryGoal: {
      type: [String],
      default: [],
    },

    preferredCodingLanguage: {
      type: [String],
      default: [],
    },

    targetPlatform: {
      type: [String],
      default: [],
    },

    dailyPractice: {
      type: String,
      default: "",
    },

    emailNotification: {
      type: Boolean,
      default: false,
    },

    salutation: {
      type: String,
      default: "",
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    todayQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    streak: {
      type: Number,
      default: 0,
    },

    lastActiveDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
