const express = require("express");
const mongoose = require("mongoose");
const Portfolio = require("../models/Portfolio");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Create Portfolio
router.post("/", verifyToken, async (req, res) => {
  try {
    const { templateId, name, content } = req.body;
    
    if (!templateId || !name) {
      return res.status(400).json({ message: "Template ID and name are required" });
    }

    const newPortfolio = new Portfolio({ 
      ...req.body, 
      userId: req.user.id 
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (err) {
    console.error("Error saving portfolio:", err);
    res.status(500).json({ message: "Error saving portfolio", error: err.message });
  }
});

// Get all portfolios for current user
router.get("/templates/user", verifyToken, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user.id })
      .select('templateId name title thumbnail updatedAt')
      .sort({ updatedAt: -1 });

    res.json(portfolios);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ message: "Error fetching templates", error: error.message });
  }
});

// Get portfolio by ID with validation
router.get("/:id", verifyToken, async (req, res) => {
  try {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid portfolio ID" });
    }

    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update Portfolio
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid portfolio ID" });
    }

    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this portfolio" });
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    res.json(updatedPortfolio);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ message: "Error updating portfolio", error: error.message });
  }
});

// Delete Portfolio
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid portfolio ID" });
    }

    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this portfolio" });
    }

    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    res.status(500).json({ message: "Error deleting portfolio", error: error.message });
  }
});


module.exports = router;