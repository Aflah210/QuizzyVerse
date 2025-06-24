const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// @route   GET api/questions/:category
// @desc    Get 7 random questions from a category
// @access  Public
router.get('/:category', async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $match: { category: req.params.category } },
      { $sample: { size: 7 } },
    ]);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 