


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxeaWlaSYzk_wz1RbCybNJn5buPypt_c8",
  authDomain: "foodiessub-auth.firebaseapp.com",
  projectId: "foodiessub-auth",
  storageBucket: "foodiessub-auth.appspot.com", // ✅ fix this small typo
  messagingSenderId: "635509465205",
  appId: "1:635509465205:web:f0fbde7ccb30d81ca3583c",
  measurementId: "G-TKQDLT6F1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);