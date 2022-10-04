# s3-album-vue

The project demonstrate VueJS components provided by AWS Amplify for Authentication and Storage. The project promotes "LOW-CODE" and readily availalble VueJS components for seemless integration with AWS Serverless Backend and other AWS services.

A detailed walkthrough of the project available on Dev.to

Blog : https://dev.to/awscommunity-asean/aws-amplify-and-front-end-development-5geg

Author : https://dev.to/zachjonesnoel

## Project setup

### Installing dependencies
```
npm install
```

### Setting up Amplify
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


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
