import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../users/UserContext';

const Dashboard = () => {
    const firestore = getFirestore(app);
    const auth = getAuth();
    const navigate = useNavigate();
    const [igdbData, setIgdbData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, updateUser } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/igdb/games');
                setIgdbData(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych z IGDB API:', error);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                updateUser(user);
            }
        });

        fetchData();

        return () => unsubscribe();
    }, [updateUser]);


    const handleAddGame = async (gameId) => {
        if (!user) {
            console.error('Użytkownik nie jest zalogowany.');
            return;
        }

        const userId = user.uid;
        const userDocRef = doc(firestore, 'users',userId);
        const userDoc = await getDoc(userDocRef);

        try {
            if (userDoc.exists()) {
                await updateDoc(userDocRef, {
                    games: arrayUnion(gameId),
                });
                console.log('Gra została dodana do biblioteki użytkownika.');
            } else {
                await setDoc(userDocRef, {
                    games: [gameId],
                });
                console.log('Utworzono nowy rekord użytkownika z grą.');
            }
        } catch (error) {
            console.error('Błąd podczas dodawania gry do biblioteki:', error);
        }
    };

    const handleAddWishlist = async (gameId) => {
        if (!user) {
            console.error('Użytkownik nie jest zalogowany.');
            return;
        }

        const userId = user.uid;
        const userDocRef = doc(firestore, 'users',userId);
        const userDoc = await getDoc(userDocRef);

        try {
            if (userDoc.exists()) {
                await updateDoc(userDocRef, {
                    wishlist: arrayUnion(gameId),
                });
                console.log('Gra została dodana do listy zyczeń użytkownika.');
            } else {
                await setDoc(userDocRef, {
                    wishlist: [gameId],
                });
                console.log('Utworzono nowy rekord użytkownika z grą.');
            }
        } catch (error) {
            console.error('Błąd podczas dodawania gry do listy zyczeń:', error);
        }
    };

    const filteredGames = igdbData ? igdbData.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

    return (
        <div>
            <div className="dashboard container">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="row">
                    <div className="col s12 m6">
                        {filteredGames.length > 0 ? (
                            <ul>
                                {filteredGames.map(game => (
                                    <li key={game.id}>
                                        <strong>ID gry: </strong>{game.id}<br />
                                        <strong>Nazwa: </strong>{game.name}<br />
                                        <strong>Opis: </strong>{game.summary}<br />
                                        <strong>Rating: </strong>{game.age_ratings}<br />
                                        <div className='col s5'>
                                            <button className='btn pink darken-2 waves-effect waves-light btn' onClick={() => handleAddGame(game.id)}>Dodaj grę do biblioteki</button>
                                        </div>
                                        <div className='col s5'>
                                            <button className='btn pink darken-2 waves-effect waves-light btn' onClick={() => handleAddWishlist(game.id)}>Dodaj grę do listy życzeń</button>
                                        </div>
                                        <br />
                                        <br />
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Brak wyników wyszukiwania</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;