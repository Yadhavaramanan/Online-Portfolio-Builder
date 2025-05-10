const express = require('express');
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create or Update Portfolio
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { templateId, name, title, bio, email, phone, location, skills, experience, education, projects } = req.body;
    const existingPortfolio = await Portfolio.findOne({ userId: req.user.id });

    if (existingPortfolio) {
      existingPortfolio.set({ templateId, name, title, bio, email, phone, location, skills, experience, education, projects });
      await existingPortfolio.save();
      return res.json(existingPortfolio);
    }

    const newPortfolio = new Portfolio({ userId: req.user.id, templateId, name, title, bio, email, phone, location, skills, experience, education, projects });
    await newPortfolio.save();

    res.json(newPortfolio);
  } catch (err) {
    res.status(500).json({ message: 'Error saving portfolio' });
  }
});

// Get User's Portfolio
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
});

router.get("/templates/user", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user
    const templates = await Template.find({ userId }); // Fetch templates for the user
    res.status(200).json({ templates });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
});

module.exports = router;
