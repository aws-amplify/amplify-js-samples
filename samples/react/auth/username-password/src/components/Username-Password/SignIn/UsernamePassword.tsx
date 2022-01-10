import React, { useState } from "react";
import { Auth } from "@aws-amplify/auth";
import { Button, PasswordField, TextField } from "@aws-amplify/ui-react";
import "./username-password.css";

type Props = {
  className: string;
};

const UsernamePassword: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  async function signIn() {
    await Auth.signIn(username, password)
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  }

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: "eddvar@amazon.com",
        password: "superSecurePassword",
        attributes: {
          email: "eddvar@amazon.com",
          // optional - E.164 number convention
          // other custom attributes
        },
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function confirmUser() {
    try {
      await Auth.confirmSignUp(username, confirmationCode).then((res) => {
        console.log(res);
      });
    } catch (error) {}
  }

  return (
    <div>
      <div className="username-pw-container">
        <form>
          <TextField
            width={"100%"}
            label="Username"
            placeholder="johndoe@email.com"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUsername(e.currentTarget.value);
            }}
          />
          <br />
          <PasswordField
            label="Password"
            placeholder="********"
            type="password"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <br />
          <Button size="small" width={"100%"} onClick={signIn}>
            Log in
          </Button>
          <br />
          <br />
          <Button size="small" onClick={signUp} width={"100%"}>
            Sign up{" "}
          </Button>
        </form>

        <div>
          <h2>Confirm Signup</h2>
          <TextField
            width={"100%"}
            label="Username"
            placeholder="johndoe@email.com"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUsername(e.currentTarget.value);
            }}
          />
          <br />
          <TextField
            width={"100%"}
            label="Confirmation code"
            placeholder="123456"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setConfirmationCode(e.currentTarget.value);
            }}
          />
          <Button size="small" onClick={confirmUser} width={"100%"}>
            Confirm Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsernamePassword;
