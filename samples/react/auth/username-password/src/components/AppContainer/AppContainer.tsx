import { useState, useEffect } from "react";

import "./AppContainer.css";
import { Auth } from "aws-amplify";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import UsernamePassword from "../Username-Password/SignIn/UsernamePassword";
import OAuth from "../OAUTH/OAuth";
import AppHome from "./AppHome";

const AppContainer: React.FC = () => {
  const [currentMode, setCurrentMode] = useState("none");
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    async function fetchCurrUser() {
      await Auth.currentAuthenticatedUser().then((user: any) => {
        setCurrUser(user);
      });
    }

    fetchCurrUser();
  }, []);

  return (
    <div className="app-container">
      <h2>Amplify Auth Workbench</h2>

      <p>Current mode: {currentMode}</p>

      <div className="btn-container">
        <Button
          size="small"
          variation="primary"
          onClick={() => setCurrentMode("Authenticator")}
        >
          Authenticator
        </Button>
        <Button
          size="small"
          variation="primary"
          onClick={() => setCurrentMode("Username/Password")}
        >
          Username/password
        </Button>
        <Button
          size="small"
          variation="primary"
          onClick={() => setCurrentMode("OAUTH")}
        >
          OAUTH
        </Button>
      </div>

      <div className="login-container">
        {currentMode === "Authenticator" ? (
          <Authenticator className="authenticator-container">
            {({ signOut, user }) => <AppHome />}
          </Authenticator>
        ) : currentMode === "Username/Password" ? (
          <UsernamePassword className="sample-app-container" />
        ) : currentMode === "OAUTH" ? (
          <OAuth className="sample-app-container" />
        ) : (
          <div />
        )}
      </div>

      {currUser !== null ? (
        <Button
          backgroundColor={"orange"}
          color={"white"}
          width={"100%"}
          onClick={async () => await Auth.signOut()}
        >
          {" "}
          Sign out
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};
export default AppContainer;
