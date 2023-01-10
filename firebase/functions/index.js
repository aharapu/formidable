const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.onUserCreated = functions
    .region("europe-west3")
    .auth.user()
    .onCreate((user) => {
      console.log("User created: ", user);
    });
