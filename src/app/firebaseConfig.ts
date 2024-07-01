// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfWm2f2aTJxk5Mo-VVHe6VuyVv40b-PhA",
  authDomain: "project-week-2-1f71d.firebaseapp.com",
  projectId: "project-week-2-1f71d",
  storageBucket: "project-week-2-1f71d.appspot.com",
  messagingSenderId: "607293842691",
  appId: "1:607293842691:web:45cb5d348cd93dda45b536",
  measurementId: "G-GERH9Y54PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);