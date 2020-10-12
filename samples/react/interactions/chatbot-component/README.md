This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

#### Setup Backend

1. Login or [Create](https://portal.aws.amazon.com/billing/signup?type=enterprise#/start) an AWS Account.
2. In a terminal, clone this repo.

```bash
$ git clone https://github.com/wlee221/chatbot-sample-app.git
$ cd chatbot-sample-app
```

3. Install the [Amplify CLI](https://github.com/aws-amplify/amplify-cli) `npm install -g @aws-amplify/cli`. Ensure you are in the directory you just cloned.
4. If it’s your first time using the CLI, you will need to configure it by running `amplify configure`. Follow the instructions to create an IAM profile locally.
5. Now let’s initialize an Amplify project in this directory with `amplify init`. Choose defaults when prompted. 

```
$ amplify init
? Enter a name for the environment  dev
? Choose your default editor: (pick an editor)
? Do you want to use an AWS profile? Y (this should be the profile you created in step #4)
```

6. Lastly, the CLI will provision our backend resources using the config files in the `amplify` directory. To provision these resources in the cloud, run `amplify push`. Confirm you want to use the Auth and the Interactions category.

#### Install Application

```bash
npm install
npm run start
```
The app should run on http://localhost:3000/.

#### Customizing Header with Slots

If you wish to add more to the header than just text, you can use a [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) element to replace the header content with your own markup. For example:

_App.js_

```javascript
import logo from './amplify-logo.svg';
// ...

function App() {
  // ...
  return (
    <div className="content">
      <AmplifyChatbot
        botTitle="Chatbot Lex"
        botName="BookTrip_dev"
        welcomeMessage="Hello, how can I help you?"
        voiceEnabled={true}
      >
        <div slot="header" className="header-slot">
          <img alt="" src={logo} height="40px" />
          Amplify Bot
        </div>
      </AmplifyChatbot>
      <br />
    </div>
  );
}
```
