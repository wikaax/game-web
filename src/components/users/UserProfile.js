import React, { useState, useEffect } from "react";
import fetchDataFromFirestore from "../actions/fetchDataFromFirestore";
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    const fetchUserData = async () => {
        console.log("Rozpoczęto pobieranie danych użytkownika...");
        console.log("Oczekiwane user:", user.email, ' jego id: ', user.uid);
        try {
          const allUsersData = await fetchDataFromFirestore('users');
          console.log("Pobrano dane użytkowników:", allUsersData);
      
          const currentUserData = allUsersData.find(userData => userData.email === user.email);
          console.log("Pobrano dane użytkownika przed ustawieniem w stanie:", currentUserData);
      
          if (currentUserData) {
            console.log("Ustawianie danych użytkownika w stanie:", currentUserData);
            setUserData(currentUserData);
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
      // Jeśli użytkownik nie istnieje, zakończ ładowanie
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  if (!userData) {
    return <div>Nie znaleziono danych dla bieżącego użytkownika.</div>;
  }

  return (
    <div className="user-profile">
      <h5>Profil użytkownika {userData.username}</h5>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserProfile;
