import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggedInHandler = (email, password) => {
    // eventually will it will check if is valid, and if it is, then setIsLoggedIn becomes true.
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn", "1");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const savedLocalStorageInformation = localStorage.getItem("isLoggedIn");

    if (savedLocalStorageInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Header isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      {isLoggedIn && <Home onLogout={logoutHandler} />}
      {!isLoggedIn && <Login onLogin={loggedInHandler} />}
    </div>
  );
}

export default App;
