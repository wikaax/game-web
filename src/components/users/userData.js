import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const fetchUserData = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('UID użytkownika:', user.uid);
      console.log('Adres e-mail użytkownika:', user.email);
      console.log('Nazwa użytkownika:', user.displayName);
      // Inne informacje o użytkowniku dostępne w obiekcie 'user'.
    } else {
      console.log('Użytkownik nie jest zalogowany.');
    }
  });
};
