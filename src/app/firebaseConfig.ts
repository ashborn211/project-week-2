// firebaseConfig.ts

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfWm2f2aTJxk5Mo-VVHe6VuyVv40b-PhA",
  authDomain: "project-week-2-1f71d.firebaseapp.com",
  projectId: "project-week-2-1f71d",
  storageBucket: "project-week-2-1f71d.appspot.com",
  messagingSenderId: "607293842691",
  appId: "1:607293842691:web:45cb5d348cd93dda45b536",
  measurementId: "G-GERH9Y54PR",
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

// Export Firebase services and Firestore functions
export {
  auth,
  provider,
  db,
  storage,
  storageRef,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
};
