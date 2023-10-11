import { addDoc, collection } from "@firebase/firestore";
import {firestore} from "./config/firebaseConfig"
import { db } from ""

const addUserToFirestore = (user) => {
    db.collection('users').add({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    // Dodaj inne pola, które chcesz zapisać w bazie danych
  })
  .then((docRef) => {
    console.log('Użytkownik dodany z ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Błąd podczas dodawania użytkownika: ', error);
  });
};
