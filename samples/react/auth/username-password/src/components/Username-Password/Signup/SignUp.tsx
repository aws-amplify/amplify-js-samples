import { Button, TextField } from "@aws-amplify/ui-react";
import { useState } from "react";
import { Auth } from "@aws-amplify/auth";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <TextField
        width={"100%"}
        label="Username"
        placeholder="johndoe@email.com"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setUsername(e.currentTarget.value);
        }}
      />
      <TextField
        width={"100%"}
        label="Username"
        placeholder="johndoe@email.com"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setUsername(e.currentTarget.value);
        }}
      />

      <Button
        onClick={() => {
          console.log("danger");
        }}
      >
        Sign up{" "}
      </Button>
    </div>
  );
}
