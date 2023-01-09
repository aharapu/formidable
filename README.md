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

### deployment

-   to deploy changes to firebase use `firebase deploy` from the root of the project
