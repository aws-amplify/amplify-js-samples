# Photo Album Sample App

This is a React sample application for simple storage with graphQL.

## Description

Photo Album is a data-driven web app that lets users upload to shared, secure photo galleries. The app is mainly based on two dependencies from Amplify JS repo, which is `aws-amplify` and `aws-amplify-react`. The three categories from AWS Amplify being used are Cognito (Authentication), S3 (Storage) and AppSync (API). The specific features are as follows.

| Features | Details | AWS Resources Used |
| --- | --- | --- |
| Sign up | Allowing user to sign up and authenticate, so that we know who owns photos | Auth (Cognito) |
| Sign in | Allowing user to sign in with their password, so that they can access their own photo album | Auth (Cognito) |
| Sign out | Allowing user to sign out in case that unauthenticated users get access to private data | Auth (Cognito) |
| Store photo objects | Storing and serving photos so that users have a place for both photo uploading and downloading | Storage (S3)
| Store metadata | Storing data about albums, photos and permissions, so that API has a fast and reliable place to query and save | API (AppSync & DynamicDB) |
| Sync data | Building an API server so that the app has a way to conduct CRUD operations on albums and photos from database | API (AppSync & DynamicDB) |

## How to run sample app locally

### Prerequisite:

* NPM
* Amplify CLI

### Steps
#### Provision AWS Resources
We will use `auth`, `storage` and `api` categories. Choose the following options for each category:
```bash
$ amplify init
? Choose the type of app that you are building
 - JavaScript

$ amplify add auth
? Do you want to use the default authentication and security configuration?
 - Default configuration
? How do you want users to be able to sign in?
 - Username
? Do you want to configure advanced settings?
 - No, I am done

$ amplify add storage
? Plase select from one of the below mentioned services
 - Content (Images, audio, video, etc.)
? Who should have access: 
 - Auth users only
? What kind of access do you want for Authenticated users?
 - Toggle all options
? Do you want to add a Lambda Trigger for your S3 Bucket? (y/N)
 - No

$ amplify add api
? Choose an authorization type for the API
 - Amazon Cognito User Pool
? Do you have an annotated GraphQL schema? (y/N)
 - Yes
? Provide your schema file path:
 -[SCHEMA_FILE_PATH]

$ amplify push
? Do you want to generate code for your newly created GraphQL API (Y/n)
 - No
```
**Notes:**
* For the questions not mentioned above, choose the default option. After the configuration, an `aws-exports.js` should be generated under `./src`
* The schema file path is `./schemas/simple_model.graphql`

#### Build and Launch the app
```bash
$ yarn
$ yarn start
```


