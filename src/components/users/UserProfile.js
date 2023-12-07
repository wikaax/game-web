import React, { useState, useEffect } from "react";
import fetchDataFromFirestore from "../actions/fetchDataFromFirestore";
import { useSelector } from 'react-redux';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const user = useSelector(state => state.auth.currentUser);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
        console.log("Rozpoczęto pobieranie danych użytkownika...");
        try {
          const allUsersData = await fetchDataFromFirestore('users');
          console.log("Pobrano dane użytkowników:", allUsersData);
      
          const currentUserData = allUsersData.find(userData => userData.email === user.email);
      
          if (currentUserData) {
            const libraryCount = await getLibraryCount(user.uid, currentUserData.games);
            const wishlistCount = await getWishlistCount(user.uid, currentUserData.wishlist);
            const reviewsCount = await getReviewsCount(user.uid, currentUserData.reviews);

            setUserData({
              ...currentUserData,
              libraryCount,
              wishlistCount,
              reviewsCount,
            });

            setEditedUserData({
              ...currentUserData,
              libraryCount,
              wishlistCount,
              reviewsCount,
            });
          } else {
            console.log("Nie znaleziono danych dla bieżącego użytkownika.");
          }
      
          setLoading(false);
        } catch (error) {
          console.error("Błąd podczas pobierania danych użytkownika:", error);
          setLoading(false);
        }
      };

    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const userId = user.uid;
      const userDocRef = doc(firestore, 'users', userId);

      await updateDoc(userDocRef, {
        firstName: editedUserData.firstName,
        lastName: editedUserData.lastName,
        password: editedUserData.password,
      });

      const libraryCount = await getLibraryCount(userId, editedUserData.games);
      const wishlistCount = await getWishlistCount(userId, editedUserData.wishlist);
      const reviewsCount = await getReviewsCount(userId, editedUserData.reviews);

      setUserData({
        ...editedUserData,
        libraryCount,
        wishlistCount,
        reviewsCount,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Błąd podczas aktualizacji danych użytkownika:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };

  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const getLibraryCount = async (userId, games) => {
    return games ? games.length : 0;
  };

  const getWishlistCount = async (userId, wishlist) => {
    return wishlist ? wishlist.length : 0;
  };

  const getReviewsCount = async (userId, reviews) => {
    return reviews ? Object.keys(reviews).length : 0;
  };

  if (loading) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  if (!userData) {
    return <div>Nie znaleziono danych dla bieżącego użytkownika.</div>;
  }

  return (
    <div className="dashboard container">
        <div className="row">
            <div className="col s12 m6">
                <h4><strong>{userData.firstName} {userData.lastName}</strong></h4>
                <p>Email: {userData.email}</p>
                <p>Liczba gier w bibliotece: {userData.libraryCount || 'Brak danych'}</p>
                <p>Liczba gier na liście życzeń: {userData.wishlistCount || 'Brak danych'}</p>
                <p>Liczba recenzji: {userData.reviewsCount || 'Brak danych'}</p>

                {isEditing ? (
                  <div>
                    <label>Imię:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editedUserData.firstName}
                      onChange={handleInputChange}
                    />
                    <label>Nazwisko:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editedUserData.lastName}
                      onChange={handleInputChange}
                    />
                    <label>Hasło:</label>
                    <input
                      type="password"
                      name="password"
                      value={editedUserData.password}
                      onChange={handleInputChange}
                    />
                    
                    <button className="btn indigo lighten-1 waves-effect waves-light btn" onClick={handleSaveClick}>Zapisz</button>
                    <button className="btn indigo lighten-1 waves-effect waves-light btn" onClick={handleCancelClick}>Anuluj</button>
                  </div>
                ) : (
                  <button className="btn indigo lighten-1 waves-effect waves-light btn" onClick={handleEditClick}>Edytuj dane</button>
                )}
            </div>
        </div>
    </div>
  );
};

export default UserProfile;