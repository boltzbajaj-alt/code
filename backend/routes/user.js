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
