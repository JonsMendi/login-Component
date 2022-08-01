import React, { useEffect, useState } from "react";

// To not create an huge chain of props we use Context.
// In auth-context.js we define a main state value in AuthContext.
// Then we import AuthContext and we wrapped all the app with it making the access to "isLoggedIn" state everywhere.
// This is completed using th "Provider" that contains a "value".
// This "value" is the key state ('isLoggedIn' in auth-context.js) that will have the value os "isLoggedIn" state in App.js.
// This means that every time that "isLoggedIn" in App.js is updated, it will update the "isLoggedIn" in auth-context
// and make this state accessible in every component without props chain.
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

// Under, with AuthContextProvider we centralize all the Authentication process in this file.
// Afterwords, in index.js we wrapped the entire app with AuthContextProvider and then we will
// be able to access all the Authentication process (even methods) through useContext().
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggedInHandler = (email, password) => {
    // eventually will it will check if is valid, and if it is, then setIsLoggedIn becomes true.
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const savedLocalStorageInformation = localStorage.getItem("isLoggedIn");

    if (savedLocalStorageInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loggedInHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
