import { useState, useEffect } from "react";
import "./Landing.css";

function LandingPage({ onSelectAccount }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    fetch("https://panorbit.in/api/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="card-list">Select an account</h1>
      <div className="scrollable-container">
        <div className="card-list">
          {users.map((user) => (
            <div
              className="card"
              key={user.id}
              onClick={() => onSelectAccount(user)}
            >
              <div className="card-content">
                <img src={user.profilepicture} alt={user.username} />
                <p>
                  <span>{user.name}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
