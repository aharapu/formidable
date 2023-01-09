// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.FF_FIREBASE_API_KEY,
    authDomain: import.meta.env.FF_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.FF_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.FF_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.FF_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.FF_FIREBASE_APP_ID,
};
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
