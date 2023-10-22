import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig';

const addUserToFirestore = async (user) => {
  try {
    const usersCollection = collection(firestore, 'users');
    await addDoc(usersCollection, {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      games: []
    });
    console.log('User added to Firestore successfully');
  } catch (error) {
    console.error('Error adding user to Firestore: ', error);
  }
};

export default addUserToFirestore;
