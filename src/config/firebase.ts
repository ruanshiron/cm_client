import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

try {
  firebase.initializeApp(config);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  firebase.firestore().settings({ host: "localhost:8080", ssl: false });
  firebase.auth().useEmulator("http://localhost:9099/");
  firebase.functions().useEmulator("localhost", 5001);
}

firebase.firestore().enablePersistence();

export const functions = firebase.functions();

export const database = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();
