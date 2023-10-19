import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
.then(() => {
    console.log('Trwała sesja została ustawiona');
})
.catch((error) => {
    console.error('Błąd ustawiania trwałości danych uwierzytelnienia:', error);
});

const firestore = getFirestore(app);

export { app, auth, firestore };
