# Authentication using the Amplify Angular Authenticator Component

[Amplify UI Components](https://docs.amplify.aws/ui/q/framework/angular) is an open-source toolkit that makes it easier for developers to add common use cases to their applications. The toolkit comes out of the box with a UI interface that is connected to Amplify’s backend services.

## What Are We Building?

In this example, we will use the [Authenticator UI Component](https://docs.amplify.aws/ui/auth/authenticator/q/framework/angular) to allow users to signup and signin.

We have bootstrapped this application using the [Angular CLI](https://cli.angular.io/).

<img src="https://amplify-demo-assets.s3.amazonaws.com/screenshot.png" alt="screenshot" height="400px"/>

## Let's Get Started!

## Setup

1. Login or [Create](https://portal.aws.amazon.com/billing/signup?type=enterprise#/start) an AWS Account.
2. In a terminal, clone this repo
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
3. The app should run on http://localhost:4200/. Try creating an account and signing in.

## A Closer Look

Now that you've built the app, let's take a look under the hood and explore how it works.

### Frontend

Let's dive into the frontend components. In this app, the important logic is in `app.component.ts`.

Using the \*ngIf directive we can conditionally render the application based on whether a user is authenticated and signed in. If a user isn’t signed in, let’s display the `AmplifyAuthenticator`:

```
<amplify-container *ngIf="authState !== 'signedin'">
	<amplify-authenticator></amplify-authenticator>
</amplify-container>
```

If this is signed in, we can route to a user dashboard component or simply display their username.

```
<div *ngIf="authState === 'signedin' && user">
    // Application Logic
    <span>Hello, {{ user.username }}</span>
</div>
```

This works out of the box and displays a standard SignIn/SignOut interface for users.

### Backend

The Amplify CLI is responsible for building the necessary modules in the backend to support user authentication, which in this case lives in the AWS cloud. To be more specific, we will use Amazon Cognito, so there is no need to build your own backend.

The config files in the `amplify` folder contain these instructions. If you start from scratch, run `amplify add auth` to build these files. Then run, `amplify push` to deploy them on AWS.

## Next Steps

- Read our [Authentication documentation](https://docs.amplify.aws/ui/auth/authenticator/q/framework/angular) to further customize your app. There are many advanced use cases to build upon.
- Join our communities on [Twitter](https://twitter.com/awsamplify) and [Discord](https://discord.gg/amplify)
