import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Conversations from "./components/Conversations";
import ChatWindow from "./components/ChatWindow";
import NewConversation from "./components/NewConversation";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/conversations" element={<Conversations />} />
      <Route path="/chat/:convoId" element={<ChatWindow />} />
      <Route path="/new-conversation" element={<NewConversation />} />
    </Routes>
  </BrowserRouter>
);

export default App;
