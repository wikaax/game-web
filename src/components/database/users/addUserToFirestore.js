import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig'; // Import your Firebase configuration

const addUserToFirestore = async (user) => {
  try {
    const usersCollection = collection(firestore, 'users');
    await addDoc(usersCollection, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      // Add other fields you want to save in the database
    });
    console.log('User added to Firestore successfully');
  } catch (error) {
    console.error('Error adding user to Firestore: ', error);
  }
};

export default addUserToFirestore;
