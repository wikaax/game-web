import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyList = () => {
    const [igdbData, setIgdbData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/igdb/games');
                setIgdbData(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych z IGDB API:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleAddGame = (gameId) => {
        console.log('Dodano grę do biblioteki o ID:', gameId);
    };

    const handleAddWishlist = (gameId) => {
        console.log('Dodano grę do listy życzeń o ID:', gameId);
    };

    return (
        <div>
            <h1>Dane z IGDB</h1>
            {igdbData ? (
                <ul>
                    {igdbData.map(game => (
                        <li key={game.id}>
                            <strong>ID gry: </strong>{game.id}<br />
                            <strong>Nazwa: </strong>{game.name}<br />
                            <button onClick={() => handleAddGame(game.id)}>Dodaj grę do biblioteki</button>
                            <button onClick={() => handleAddWishlist(game.id)}>Dodaj grę do listy życzeń</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ładowanie danych...</p>
            )}
        </div>
    );
};

export default MyList;
