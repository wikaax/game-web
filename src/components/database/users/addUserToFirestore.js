import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig';

const addUserToFirestore = async (user) => {
  try {
    const usersCollection = collection(firestore, 'users');
    const userDocRef = doc(usersCollection, user.id);

    await setDoc(userDocRef, {
      userId: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      games: [],
      wishlist: [],
      ratings: [],
    });

    console.log('User added to Firestore successfully');
  } catch (error) {
    console.error('Error adding user to Firestore: ', error);
  }
};

export default addUserToFirestore;
