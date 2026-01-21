const express = require("express");
const Question = require("../models/Question");
const User = require("../models/User");

const router = express.Router();

//  Add new question
router.post("/add", async (req, res) => {
  try {
    const {
      title,
      platform,
      difficulty,
      wayOfSolving,
      confidenceLevel,
      userId,
    } = req.body;

    const question = await Question.create({
      title,
      platform,
      difficulty,
      wayOfSolving,
      confidenceLevel,
      userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { questions: question._id },
      $inc: { totalQuestions: 1 },
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions of a user

router.get("/user/:userId", async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.params.userId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update confidence level

router.patch("/:id/confidence", async (req, res) => {
  try {
    const { confidenceLevel } = req.body;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { confidenceLevel },
      { new: true }
    );

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
