const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createConversation,
  sendMessage,
  fetchMessages,
  fetchConversations,
} = require("../controllers/chatController");

router.post("/conversation", protect, createConversation);
router.get("/conversations", protect, fetchConversations);
router.post("/message", protect, sendMessage);
router.get("/messages/:conversationId", protect, fetchMessages);

module.exports = router;
