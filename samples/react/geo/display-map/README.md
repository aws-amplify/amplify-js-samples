# Displaying a map using Amplify Geo

[Amplify Geo](https://docs.amplify.aws/lib/geo/getting-started/q/platform/js/) is a library that provides APIs and map UI components for maps and location search for JavaScript-based web apps.

## What is this app?

In this example, we used [Display Map Tutorial](https://docs.amplify.aws/lib/geo/maps/q/platform/js/) to create a simple app that displays a map.

We have bootstrapped this application using [Create React App](https://github.com/facebook/create-react-app) and will focus on the logic needed to add a map to your application.

## Disclaimer

This app is not meant to be copied and run out of the box. It will get you most of the way there but you will need to use the Amplify provision your own Amplify Map resources and create an `aws-exports.js` file. Attempting to run this application as is will fail due to the missing `aws-exports` file.

## How to Provision your own Amplify Map Resources

- Copy this project into your own workspace
- Install Amplify CLI
  - `npm i -g @aws-amplify/cli`
- Create a new Amplify project
  - `amplify init`
- Create Geo resources
  - `amplify add geo`
  - Refer to [Amplify Geo CLI docs](https://docs.amplify.aws/cli/geo/maps/) for more detailed instructions on options
- Publish changes
  - `amplify push`

## Next Steps

- Read more of our [Geo documentation](https://docs.amplify.aws/lib/geo/maps/q/platform/js/) to further customize your app. There are many advanced use cases to build upon.
- Join our communities on [Twitter](https://twitter.com/awsamplify) and [Discord](https://discord.gg/amplify)
