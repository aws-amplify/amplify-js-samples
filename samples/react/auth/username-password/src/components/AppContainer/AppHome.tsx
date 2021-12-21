import { Button } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

export default function AppHome() {
  async function signOut() {
    await Auth.signOut();
  }
  // async function deleteUser() {
  //   console.log(user);
  //   Auth.deleteUser();
  // }

  return (
    <div>
      <main>
        <h1>Hello world</h1>
        {/* <Button onClick={deleteUser}>Delete User</Button> */}
        <Button onClick={signOut}>Sign out</Button>
      </main>
    </div>
  );
}
