# Authentication using Amplify withAuthenticator(HoC) Component

## What Are We Building?

In this example, we will use the [withAuthenticator UI Component](https://docs.amplify.aws/ui/auth/authenticator/q/framework/react-native) to allow users to signup and signin.

We have bootstrapped this application using [Expo](https://github.com/expo/expo) and will focus on the logic that adds authentication.

<img src="https://amplify-demo-assets.s3.amazonaws.com/screenshot.png" alt="screenshot" height="400px"/>

## Let's Get Started!

## Setup

1. Login or [Create](https://portal.aws.amazon.com/billing/signup?type=enterprise#/start) an AWS Account.
2. In a terminal, clone this repo.
3. Install the [Amplify CLI](https://github.com/aws-amplify/amplify-cli) `npm install -g @aws-amplify/cli`. Ensure you are in the directory you just cloned.
4. If it’s your first time using the CLI, you will need to configure it by running `amplify configure`. Follow the instructions to create an IAM profile locally.
5. Now let’s initialize an Amplify project in this directory. `amplify init`

```
$ amplify init
? Enter a name for the environment  dev
? Choose your default editor: (pick an editor)
? Do you want to use an AWS profile? Y (this should be the profile you created in step #4)
```

6. Lastly, the CLI will provision our backend resources using the config files in the `amplify` directory. To provision these resources in the cloud, run `amplify push`. Confirm you want to use the Auth category.

## Running the App

1. `npm install`
2. `npm run start`
3. The app should run on http://localhost:19006/. Try creating an account and signing in.

## A Closer Look

Now that you've built the app, let's take a look under the hood and explore how it works.

### Frontend

Let's dive into the frontend components. In this app, the important logic is in `App.js`.

The `withAuthenticator` component renders your App component after a successful user signed in, and it prevents non-sign-in users to interact with your app. In this case, we need to display a sign-out button to trigger the related process.

To display a sign-out button or customize other, set includeGreetings = true in the parameter object. It displays a greetings section on top of your app, and a sign-out button is displayed in the authenticated state.

```
export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true,
});
```

This works out of the box and displays a standard SignIn/SignOut interface for users.

`Note`: The withAuthenticator HOC wraps an Authenticator component. Using [Authenticator](https://docs.amplify.aws/ui/auth/authenticator/q/framework/react-native#using-the-authenticator-component) directly gives you more customization options for your UI.

### Backend

The Amplify CLI is responsible for building the necessary modules in the backend to support user authentication, which in this case lives in the AWS cloud. To be more specific, we will use Amazon Cognito, so there is no need to build your own backend.

The config files in the `amplify` folder contain these instructions. If you start from scratch, run `amplify add auth` to build these files. Then run, `amplify push` to deploy them on AWS.

## Next Steps

- Read our [Authentication documentation](https://docs.amplify.aws/ui/auth/authenticator/q/framework/react-native) to further customize your app. There are many advanced use cases to build upon.
- Join our communities on [Twitter](https://twitter.com/awsamplify) and [Discord](https://discord.gg/amplify)
