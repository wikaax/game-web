import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [igdbData, setIgdbData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/igdb/games');
                setIgdbData(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych z IGDB API:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
        <h1>Dane z IGDB</h1>
        {igdbData.length > 0 ? (
            <ul>
                {igdbData.map(game => (
                    <li key={game.id}>
                        <strong>Tytuł: </strong>{game.name}<br />
                        <strong>Gatunki: </strong>{game.genres.map(genre => genre.name).join(', ')}<br />
                        <strong>Firma: </strong>{game.involved_companies.map(company => company.company.name).join(', ')}
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

export default Dashboard;