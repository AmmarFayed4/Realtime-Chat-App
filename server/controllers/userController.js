const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// register controller
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });
    res.status(201).json({
      message: "🎉 User created successfully. Welcome aboard!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({
      message:
        "🚨 Registration failed. Something went wrong on our end. Please try again later.",
    });
    console.log(error);
  }
};
// login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({
        message:
          "❌ Invalid email or password. Please double-check your credentials and try again.",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      res.status(401).json({
        message:
          "❌ Invalid email or password. Please double-check your credentials and try again.",
      });
    }
    res.status(200).json({
      message: "✅ Login successful. Welcome back!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message:
        "🚨 Login failed due to a server error. Please try again later or contact support if the issue persists.",
    });
    console.log(error);
  }
};
// Get User Profile (Protected)
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(404).json({
      message:
        "❌ Unable to retrieve profile. The user may not exist or something went wrong on our end.",
    });
  }
};

// Update User Profile (Protected)
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } else {
    res.status(404).json({
      message:
        "❌ Unable to retrieve profile. The user may not exist or something went wrong on our end.",
    });
  }
};
// search for user
const searchUsers = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const keyword = {
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    };

    const users = await User.find(keyword).select("-password"); // exclude sensitive data
    res.json(users);
  } catch (error) {}
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  searchUsers,
};
