import React, { useState, useEffect } from "react";
import "./Profile.css";
import UserMap from "../maps/UserMap";

function ProfilePage({ userId, onSignOut }) {
  const [user, setUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState("profile");
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState("");

  useEffect(() => {
    // Fetch user profile details from API
    fetch("https://panorbit.in/api/users.json")
      .then((response) => response.json())
      .then((data) => {
        const user = data.users.find((user) => user.id === userId);
        setUser(user);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    // Fetch chat users from API
    fetch("https://panorbit.in/api/users.json")
      .then((response) => response.json())
      .then((data) => {
        const topChatUsers = data.users.slice(0, 5); // Get the top 5 users
        setChatUsers(topChatUsers);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
  };

  const handleChatUserChange = (event) => {
    setSelectedChatUser(event.target.value);
  };

  const renderProfileScreen = () => {
    return (
      <div className="content">
        <h1>Profile</h1>
        <div className="sign-out-button">
          <img
            className="user-image3"
            src={user.profilepicture}
            alt={user.username}
          />
          <button onClick={onSignOut}>Sign Out</button>
        </div>
        <br />
        <br />
        <div className="grid-container">
          <div className="item item-1">
            <div className="image-container">
              <img
                className="user-image"
                src={user.profilepicture}
                alt={user.username}
              />
            </div>
            <h2 className="name">{user.name}</h2>
            <div className="user-details">
              <p>
                <span className="details-value">
                  Username: <b>{user.username}</b>
                </span>
              </p>
              <p>
                <span className="details-value">
                  e-mail: <b>{user.email}</b>
                </span>
              </p>
              <p>
                <span className="details-value">
                  Phone: <b>{user.phone}</b>
                </span>
              </p>
              <p>
                <span className="details-value">
                  Website: <b>{user.website}</b>
                </span>
              </p>
            </div>
          </div>
          <div className="item item-2">
            <h2>Company</h2>
            <div className="addressDetails">
              <p>
                Name: <b>{user.company.name}</b>
              </p>
              <p>
                catchphrase: <b>{user.company.catchPhrase}</b>
              </p>
              <p>
                bs: <b>{user.company.bs}</b>
              </p>
            </div>
          </div>
          <div className="item item-3">
            <h2>Address:</h2>
            <div className="addressDetails">
              <p>
                Street: <b>{user.address.street}</b>
              </p>
              <p>
                Suite: <b>{user.address.suite}</b>
              </p>
              <p>
                City: <b>{user.address.city}</b>
              </p>
              <p>
                Zipcode: <b>{user.address.zipcode}</b>
              </p>
            </div>
          </div>
          <div className="item item-4">
            <UserMap
              lat={user.address.geo.lat}
              lng={user.address.geo.lng}
              zoom={2}
            />
          </div>
        </div>
        <div className="chat">
          <select value={selectedChatUser} onChange={handleChatUserChange}>
            <option value="">🗨 Chat:</option>
            {chatUsers.map((user) => (
              <option key={user.id} value={user.name}>
                <img
                  className="user-image-dropdown"
                  src={user.profilepicture}
                  alt={user.name}
                />
                {user.name}
              </option>
            ))}
          </select>
          {selectedChatUser && <p>Selected user: {selectedChatUser}</p>}
        </div>
      </div>
    );
  };

  const renderPostsScreen = () => {
    return (
      <div className="content2">
        Coming Soon
        <div className="sign-out-button2">
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
    );
  };

  const renderGalleryScreen = () => {
    return (
      <div className="content2">
        Coming Soon
        <div className="sign-out-button2">
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
    );
  };

  const renderToDoScreen = () => {
    return (
      <div className="content2">
        Coming Soon
        <div className="sign-out-button2">
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "profile":
        return renderProfileScreen();
      case "posts":
        return renderPostsScreen();
      case "gallery":
        return renderGalleryScreen();
      case "todo":
        return renderToDoScreen();
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="navigation">
          <div className="navigation-item">
            <button
              className={activeScreen === "profile" ? "active" : ""}
              onClick={() => handleScreenChange("profile")}
            >
              Profile Details
            </button>
          </div>
          <div className="navigation-item">
            <button
              className={activeScreen === "posts" ? "active" : ""}
              onClick={() => handleScreenChange("posts")}
            >
              Posts Details
            </button>
          </div>
          <div className="navigation-item">
            <button
              className={activeScreen === "gallery" ? "active" : ""}
              onClick={() => handleScreenChange("gallery")}
            >
              Gallery
            </button>
          </div>
          <div className="navigation-item">
            <button
              className={activeScreen === "todo" ? "active" : ""}
              onClick={() => handleScreenChange("todo")}
            >
              ToDo
            </button>
          </div>
        </div>
      </div>
      {renderScreen()}
    </div>
  );
}

export default ProfilePage;
