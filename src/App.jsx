import { useState } from "react";
import LandingPage from "./componenets/landingpage/LandingPage";
import ProfilePage from "./componenets/profilepage/ProfilePage";

function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleSelectAccount = (account) => {
    setSelectedAccount(account.id); // Pass the user ID instead of the entire account object
  };

  const handleSignOut = () => {
    setSelectedAccount(null);
  };

  return (
    <div className="app">
      {!selectedAccount ? (
        <LandingPage onSelectAccount={handleSelectAccount} />
      ) : (
        <ProfilePage userId={selectedAccount} onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;
