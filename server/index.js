const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// routes files
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
// connect to database
const connectDB = require("./config/db");
connectDB();
//end of database connection
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
// the middlewares
app.use(express.json());
app.use(cors());
//Api Routes
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
// SocketIO setup
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`👥 User joined conversation: ${conversationId}`);
  });

  socket.on("sendMessage", ({ conversationId, message }) => {
    // Emit message to everyone in the room (except sender)
    socket.to(conversationId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// server start
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
