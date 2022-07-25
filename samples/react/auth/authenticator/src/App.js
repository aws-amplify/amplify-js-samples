import React from "react";
import "./App.css";
import logo from "./logo.svg";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

const App = () => {
  const { user, authStatus, signOut } = useAuthenticator();

  return (
    <>
      {authStatus === "authenticated" ? (
        <div className="App">
          <header className="App-header">
            <div>Hello, {user.username}</div>
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={signOut}>Sign Out</button>
          </header>
        </div>
      ) : (
        <Authenticator />
      )}
    </>
  );
};

export default App;
