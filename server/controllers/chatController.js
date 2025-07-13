const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// createConversation controller
const createConversation = async (req, res) => {
  try {
    const sender = req.user.id;
    const recipient = req.body.recipientId;

    if (!recipient) {
      return res.status(400).json({ message: "Recipient ID is required." });
    }
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, recipient] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, recipient],
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({
      message:
        "💥 Something went wrong while handling the conversation. Please try again or check your connection.",
    });
    console.error("Chat error:", error);
  }
};
// sendMassage controller
const sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const { conversationId, content } = req.body;
    if (!conversationId || !content) {
      return res
        .status(400)
        .json({ message: "Conversation ID and message content are required." });
    }
    const newMessage = await Message.create({
      conversationId,
      sender,
      content,
    });
    const populatedMessage = await Message.findById(newMessage._id).populate(
      "sender",
      "username"
    );
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: newMessage._id,
    });
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({
      message: "📨 Failed to send the message. Please try again later.",
    });
  }
};
// fetchMessages cotroller
const fetchMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).populate(
      "sender",
      "username email"
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({
      message: "📩 Failed to retrieve messages. Try again shortly.",
    });
  }
};
// fetchConversation controller
const fetchConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({ participants: userId })
      .populate("participants", "username email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Fetch conversations error:", error);
    res.status(500).json({
      message: "💬 Unable to fetch conversations at this time.",
    });
  }
};

module.exports = {
  createConversation,
  sendMessage,
  fetchMessages,
  fetchConversations,
};
