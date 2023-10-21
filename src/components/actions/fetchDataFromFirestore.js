import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const fetchDataFromFirestore = async (collectionName) => {
  const data = [];
  try {
    const collectionRef = collection(firestore, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return data;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    throw error;
  }
};

export default fetchDataFromFirestore;
