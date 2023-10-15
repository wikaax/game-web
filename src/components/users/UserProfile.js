import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const UserProfile = ({ user }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const db = getFirestore();
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                console.log("Dokument użytkownika nie istnieje.");
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    if (!userData) {
        return <div>Ładowanie danych użytkownika...</div>;
    }

    return (
        <div className="user-profile">
            <h1>Profil użytkownika: {userData.username}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default UserProfile;
