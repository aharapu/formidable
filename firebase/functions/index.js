const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {Timestamp} = require("firebase-admin/firestore");
admin.initializeApp();

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
    // TODO -> check if user is already in database (by email) and update it?
      const {uid, email, displayName} = user;

      const userDoc = admin.firestore().collection("users").doc(uid);
      const now = Timestamp.now();

      const data = {
        email,
        displayName: displayName || "",
        createdAt: now,
        updatedAt: now,
      };

      return userDoc.set(data);
    });
