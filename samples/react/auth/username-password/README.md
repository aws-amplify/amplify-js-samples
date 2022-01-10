### Amplify JS: Delete User Sample App

To get started you would need to create an Amplify project following the getting started with the authentication documentation. This getting started guide goes over how to setup authentication on your application as well. You will need to setup authentication in order to test this feature.

https://docs.amplify.aws/start/q/integration/react/

Next, you will run ```yarn start``` to start the development server and you will create a new user.

You will use the authenticator tab to create a new user and login. After logging in you will see a large delete user button. After you click that, you will refresh your screen. When you refresh you screen it should bring you back to the login screen. If you try to login with the same user credentials it should say "User does not exist"