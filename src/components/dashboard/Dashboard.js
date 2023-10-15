import React, { useState, useEffect } from 'react';
import GamesList from "../games/GamesList";

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.igdb.com/v4/games', {
                    method: 'POST',
                    headers: {
                        'Client-ID': '9f6gy9d28792qang0hxswp3gw6hexi',
                        'Authorization': `Bearer 9f6gy9d28792qang0hxswp3gw6hexi`,
                        'Content-Type': 'application/json',
                    },
                    body: 'fields name,summary; limit 10;', // Wybierz pola i ogranicz ilość gier
                });

                const data = await response.json();
                setGames(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m6">
                    { error && <div>{ error }</div> }
                    { isLoading && <div>Loading...</div> }
                    { games && <GamesList games={games} title="All games"/> }
                </div>
                {/* Inne komponenty */}
            </div>
        </div>
    );
}

export default Dashboard;
