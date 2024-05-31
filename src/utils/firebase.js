// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP02iHzZo_rVLONYifg6FdDrWLiKlMOC4",
  authDomain: "netflixgpt-476ca.firebaseapp.com",
  projectId: "netflixgpt-476ca",
  storageBucket: "netflixgpt-476ca.appspot.com",
  messagingSenderId: "140379683669",
  appId: "1:140379683669:web:c3462c94fea70cd8bb4ddc",
  measurementId: "G-BJDJS3K71Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();