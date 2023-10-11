// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// // import { firestoreReducer } from 'redux-firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAklJ6-Jw2vymGOZyr-hhQVi8u4ydiTLZw",
//   authDomain: "game-web-39421.firebaseapp.com",
//   projectId: "game-web-39421",
//   storageBucket: "game-web-39421.appspot.com",
//   messagingSenderId: "1052409711532",
//   appId: "1:1052409711532:web:fa3ca6f871732006810809",
//   measurementId: "G-X7Q44HE48Y"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export const db=firebase.firestore();
// export default firebase

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAklJ6-Jw2vymGOZyr-hhQVi8u4ydiTLZw",
  authDomain: "game-web-39421.firebaseapp.com",
  projectId: "game-web-39421",
  storageBucket: "game-web-39421.appspot.com",
  messagingSenderId: "1052409711532",
  appId: "1:1052409711532:web:fa3ca6f871732006810809",
  measurementId: "G-X7Q44HE48Y",
  // databaseURL: "https://game-web-39421-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const db = getFirestore(app);

// export default app;