// firebaseConfig.ts

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional for Firebase SDK version 7.20.0 and later
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const provider = new GoogleAuthProvider();

// Set persistence for authentication
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Local persistence successfully set");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Export Firebase services
export { auth, provider, db, storage, storageRef };
