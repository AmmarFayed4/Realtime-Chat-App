import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // adjust if hosted elsewhere

const ChatWindow = () => {
  const { convoId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const token = localStorage.getItem("chatToken");

  // Join conversation and listen for incoming messages
  useEffect(() => {
    socket.emit("joinConversation", convoId); // join the room
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, [convoId]);

  // Fetch existing messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chats/messages/${convoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch messages:",
          err.response?.data || err.message
        );
      }
    };

    fetchMessages();
  }, [convoId, token]);

  // Send new message
  const handleSend = async () => {
    if (!newMsg.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chats/message",
        { conversationId: convoId, content: newMsg },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Emit real-time message
      socket.emit("sendMessage", {
        conversationId: convoId,
        message: res.data,
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
    } catch (err) {
      console.error("Send failed:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h3>Chat</h3>
      <div className="chat-box">
        {messages.map((msg) => (
          <div className="message" key={msg._id}>
            <strong>{msg.sender?.username || "Unknown"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMsg}
        placeholder="Type your message..."
        onChange={(e) => setNewMsg(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatWindow;
