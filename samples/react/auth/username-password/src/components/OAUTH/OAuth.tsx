import { Button } from "@aws-amplify/ui-react";

import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const OAuth: React.FC<{ className: string }> = (props) => {
  return (
    <div className={props.className}>
      <Button
        onClick={() =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          })
        }
      >
        Google
      </Button>
    </div>
  );
};

export default OAuth;
