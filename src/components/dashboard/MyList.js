import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { getAuth } from 'firebase/auth';


const MyList = () => {
    const [igdbData, setIgdbData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const auth = getAuth();

    // Efekt pobierający dane z IGDB i aktualnie zalogowanego użytkownika
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/igdb/games');
                setIgdbData(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych z IGDB API:', error);
            }
        };

        // Pobierz aktualnie zalogowanego użytkownika z Firebase
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        fetchData();

        // Odsubskrybuj nasłuchiwanie po odmontowaniu komponentu
        return () => unsubscribe();
    }, []);

    const handleAddGame = async (gameId) => {
        try {
            // Sprawdź, czy użytkownik jest zalogowany
            if (!user) {
                console.error('Użytkownik nie jest zalogowany.');
                return;
            }

            // Uzyskaj identyfikator aktualnie zalogowanego użytkownika
            const userId = user.uid;

            const response = await axios.post('http://localhost:4000/api/user/games', {
                userId: userId,
                gameId: gameId,
            });
            console.log('Gra została dodana do biblioteki użytkownika:', response.data);
        } catch (error) {
            console.error('Błąd podczas dodawania gry do biblioteki:', error);
        }
    };

    const handleAddWishlist = async (gameId) => {
        try {
            // Sprawdź, czy użytkownik jest zalogowany
            if (!user) {
                console.error('Użytkownik nie jest zalogowany.');
                return;
            }

            // Uzyskaj identyfikator aktualnie zalogowanego użytkownika
            const userId = user.uid;

            const response = await axios.post('http://localhost:4000/api/user/wishlist', {
                userId: userId,
                gameId: gameId,
            });
            console.log('Gra została dodana do listy życzeń użytkownika:', response.data);
        } catch (error) {
            console.error('Błąd podczas dodawania gry do listy życzeń:', error);
        }
    };



    const filteredGames = igdbData ? igdbData.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

    return (
        <div>
            <div className="dashboard-container">
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
                                        <button onClick={() => handleAddGame(game.id)}>Dodaj grę do biblioteki</button>
                                        <button onClick={() => handleAddWishlist(game.id)}>Dodaj grę do listy życzeń</button>
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

export default MyList;
