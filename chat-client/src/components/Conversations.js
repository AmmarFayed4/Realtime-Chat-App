import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const token = localStorage.getItem("chatToken");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chats/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setConversations(res.data))
      .catch((err) => console.error("Conversation fetch failed:", err));
  }, [token]);

  return (
    <div>
      <h2>Your Conversations</h2>
      <Link to="/new-conversation">➕ New Conversation</Link>
      <ul>
        {conversations.map((convo) => (
          <li key={convo._id}>
            <Link to={`/chat/${convo._id}`}>
              {convo.participants.map((p) => (
                <span key={p._id}>{p.username} </span>
              ))}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;
