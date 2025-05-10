require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");

// Validate environment variables on startup
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT secrets must be defined in .env file');
}

// Helper function to generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};

// Input validation middleware
const validateSignupInput = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }
  next();
};

// Signup endpoint
router.post('/signup', validateSignupInput, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.trim().toLowerCase() },
        { username: username.trim() }
      ]
    });

    if (existingUser) {
      const message = existingUser.email === email.toLowerCase() 
        ? "Email already in use" 
        : "Username already taken";
      return res.status(400).json({ success: false, message });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(newUser._id);

    res.status(201).json({
      success: true,
      tokens: { accessToken, refreshToken },
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error during registration",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Signin endpoint
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.json({
      success: true,
      tokens: { accessToken, refreshToken },
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error during login",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Token refresh endpoint
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.json({
      success: true,
      accessToken: newAccessToken
    });

  } catch (err) {
    console.error("Refresh Token Error:", err);
    res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
});

// Session verification with proper token handling
router.get('/verify-session', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ isAuthenticated: false });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token || token === 'null' || token === 'undefined') {
      return res.json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.json({ isAuthenticated: false });
    }

    res.json({
      isAuthenticated: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Session verification error:", err);
    res.json({ isAuthenticated: false });
  }
});

// Password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });

  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;