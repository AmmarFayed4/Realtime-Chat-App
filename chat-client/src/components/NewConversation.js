import React, { useState } from "react";
import axios from "axios";
import UserSearch from "./UserSearch";
import { useNavigate } from "react-router-dom";

const NewConversation = () => {
  const token = localStorage.getItem("chatToken");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleStart = async (user) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chats/conversation",
        { recipientId: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      setMessage("❌ Failed to create conversation.");
    }
  };

  return (
    <div>
      <h2>Start New Conversation</h2>
      <UserSearch onSelectUser={handleStart} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewConversation;
