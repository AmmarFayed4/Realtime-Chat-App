const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  searchUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User Authentication & Profile Routes
router.post("/register", registerUser); // Register new user
router.post("/login", loginUser); // Login user & get JWT token
router.get("/profile", protect, getUserProfile); // Get user profile (Protected)
router.put("/update", protect, updateUserProfile); // Update user profile (Protected)
router.get("/search", protect, searchUsers);
module.exports = router;
