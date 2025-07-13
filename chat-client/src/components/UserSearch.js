import React, { useState } from "react";
import axios from "axios";

const UserSearch = ({ onSelectUser }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("chatToken");

  const search = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/users/search?query=${query}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setResults(res.data);
  };

  return (
    <div>
      <input
        placeholder="Search users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <ul>
        {results.map((user) => (
          <li key={user._id}>
            <button onClick={() => onSelectUser(user)}>
              {user.username} ({user.email})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
