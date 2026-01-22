const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   POST /api/user/sync
 * @desc    Create user in DB after Clerk login
 */
router.post("/sync", async (req, res) => {
  try {
    const { clerkUserId, email, username, image } = req.body;

    if (!clerkUserId || !email || !username) {
      return res.status(400).json({ error: "clerkUserId, email, and username are required." });
    }

    let user = await User.findOne({ clerkUserId });

    if (!user) {
      user = await User.create({
        clerkUserId,
        email,
        username,
        image,
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/user/:clerkUserId/profile
 */
router.get("/:clerkUserId/profile", async (req, res) => {
  try {
    const user = await User.findOne({
      clerkUserId: req.params.clerkUserId,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/user/:clerkUserId/profile
 */
router.put("/:clerkUserId/profile", async (req, res) => {
  try {
    const {
      degree,
      fieldOfStudy,
      yearOfGraduation,
      collegeName,
      country,
      username,
      salutation,
      currentLevel,
      primaryGoal,
      preferredCodingLanguage,
      targetPlatform,
      dailyPractice,
      emailNotification,
      socialLinks,
    } = req.body;

    if (!degree || !fieldOfStudy || !yearOfGraduation || !collegeName || !country || !username || !salutation) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.findOneAndUpdate(
      { clerkUserId: req.params.clerkUserId },
      {
        degree,
        fieldOfStudy,
        yearOfGraduation,
        collegeName,
        country,
        username,
        salutation,
        currentLevel,
        primaryGoal,
        preferredCodingLanguage,
        targetPlatform,
        dailyPractice,
        emailNotification,
        socialLinks,
        profileCompleted: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/user/:clerkUserId/dashboard
 */
router.get("/:clerkUserId/dashboard", async (req, res) => {
  try {
    const user = await User.findOne({
      clerkUserId: req.params.clerkUserId,
    }).populate("questions");

    const high = user.questions.filter(q => q.confidenceLevel === "HIGH");
    const medium = user.questions.filter(q => q.confidenceLevel === "MEDIUM");
    const low = user.questions.filter(q => q.confidenceLevel === "LOW");

    res.json({
      totalQuestions: user.totalQuestions,
      highConfidence: high.length,
      mediumConfidence: medium.length,
      lowConfidence: low.length,
      streak: user.streak,
      todayQuestions: user.todayQuestions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
