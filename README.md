# 💬 Realtime Chat App

A full-stack chat application built with **React**, **Express**, **MongoDB**, and **Socket.IO**, featuring secure authentication and blazing-fast real-time messaging. Messages sync instantly across users, with no page reload required.

---

## 🚀 Tech Stack

| Layer     | Tools                             |
|-----------|-----------------------------------|
| Frontend  | React, Axios, Socket.IO Client    |
| Backend   | Node.js, Express, MongoDB         |
| Realtime  | Socket.IO (room-based WebSockets) |
| Auth      | JWT with protected API routes     |

---

## ✨ Features

- 🔐 User login & registration with JWT  
- 💬 Real-time message broadcasting  
- ✅ Username resolution with `.populate()`  
- 🧵 Chat history per conversation  
- 📡 Room-based Socket.IO structure  
- ⚙️ Modular, scalable codebase

---

## 📁 Folder Structure

```plaintext
client/
├── src/
│   ├── pages/
│   │   └── ChatWindow.js
│   ├── utils/
│   │   └── socket.js
│   └── App.js

server/
├── models/
│   ├── User.js
│   └── Message.js
├── routes/
│   ├── userRoutes.js
│   └── chatRoutes.js
├── config/
│   └── db.js
└── index.js  (Express + Socket.IO setup)
```

---

## 🌿 Environment Variables

### Server `.env`

```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
```

### Client `.env`

```env
REACT_APP_SOCKET_URL=http://localhost:5000
```


---

## 📡 How Messaging Works

1. User navigates to `/chat/:convoId`  
2. Frontend emits `joinConversation` via Socket.IO  
3. On message send:
   - Backend saves it with `Message.create()`
   - Then populates `sender.username`
   - Emits to `conversationId` room via `io.to(...)`
4. Other user instantly receives the `newMessage` event

---

## 🛠️ Setup Instructions

### 1. Clone and install

```bash
git clone https://github.com/yourusername/chat-app
cd chat-app

# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 2. Configure `.env` files

Add `.env` files as shown above.

### 3. Start both servers

```bash
# In /server
npm run dev

# In /client
npm start



## 👨‍💻 Built by Ammar Fayed

Proficient in backend development, API design.
