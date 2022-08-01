import React, { Fragment, useContext } from "react";
import "./App.css";
import AuthContext from "./store/auth-context";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  const ctx = useContext(AuthContext);

  return (
    // To not create an huge chain of props we use Context.
    // In auth-context.js we define a main state value in AuthContext.
    // Then we import AuthContext and we wrapped all the app with it making the access to "isLoggedIn" state everywhere.
    // This is completed using th "Provider" that contains a "value".
    // This "value" is the key state ('isLoggedIn' in auth-context.js) that will have the value os "isLoggedIn" state in App.js.
    // This means that every time that "isLoggedIn" in App.js is updated, it will update the "isLoggedIn" in auth-context
    // and make this state accessible in every component without props chain.
    <Fragment>
      <Header />
      {ctx.isLoggedIn && <Home />}
      {!ctx.isLoggedIn && <Login />}
    </Fragment>
  );
}

export default App;
