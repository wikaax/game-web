// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAklJ6-Jw2vymGOZyr-hhQVi8u4ydiTLZw",
  authDomain: "game-web-39421.firebaseapp.com",
  projectId: "game-web-39421",
  storageBucket: "game-web-39421.appspot.com",
  messagingSenderId: "1052409711532",
  appId: "1:1052409711532:web:355f5d3215d077e2810809",
  measurementId: "G-EB9TX25V7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.firestore().setting({ timestampsInSnapshots: true});

export default firebase;