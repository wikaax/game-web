// import { createSlice } from '@reduxjs/toolkit';
// import db from '../config/firebaseConfig';

// const dataSlice = createSlice({
//   name: 'data',
//   initialState: [],
//   reducers: {
//     setData: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const { setData } = dataSlice.actions;

// export const fetchData = () => async dispatch => {
//   try {
//     // const response = await db.collection('games').get();
//     // console.log(response.doc);
//     // const data = response.docs.map(doc => doc.data());
//     // dispatch(setData(data));
//     const collectionRef = db.collection('games');
//     const snapshot = await collectionRef.get();
//     const data = snapshot.docs.map(doc => doc.data());
//     dispatch(setData(data));
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// export default dataSlice.reducer;

import { collection, getDocs } from "firebase/firestore";
import db from "../config/firebaseService";

export const fetchData = async () => {
  const gamesCollection = collection(db, "games"); // "games" to nazwa twojej kolekcji w Firestore
  const querySnapshot = await getDocs(gamesCollection);
  console.log('pobrano dane');
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

