import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const fetchDataFromFirestore = async (collectionName) => {
    try {
        const data = [];
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
        console.error('Błąd podczas pobierania danych z Firestore:', error);
        throw error;
    }
};

export default fetchDataFromFirestore;
