# formidable

### local development

1. configure environment variables. set them in the `/env/.env.local` file. The following are required:

```code
FF_FIREBASE_API_KEY
FF_FIREBASE_APP_ID
FF_FIREBASE_AUTH_DOMAIN
FF_FIREBASE_DATABASE_URL
FF_FIREBASE_MESSAGING_SENDER_ID
FF_FIREBASE_PROJECT_ID
FF_FIREBASE_STORAGE_BUCKET
```

2. follow instructions at https://firebase.google.com/docs/cli to install the firebase cli if you don't have it already
   version at time of writing is 11.20.0

### emulators

to run emulators you will need java 19 installed.

-   to start the firebase emulators use `firebase emulators:start` from the root of the project

### deployment

-   to deploy changes to firebase use `firebase deploy` from the root of the project
-   to deploy changes to firebase functions use `firebase deploy --only functions` from the root of the project
-   to deploy changes to a single function use `firebase deploy --only functions:FUNCTION_NAME` from the root of the project
