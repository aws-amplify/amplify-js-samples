import { Button } from "@aws-amplify/ui-react";
import { Auth } from "@aws-amplify/auth";

export default function AppHome() {
  async function deleteUser() {
    console.log(await Auth.currentSession());

    try {
      await Auth.deleteUser().then((res:any) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <main>
        <h1>Welcome to your app...</h1>
        <Button onClick={deleteUser}>Delete User</Button>
      </main>
    </div>
  );
}
