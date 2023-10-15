import React, { useEffect, useState } from "react";
import { fetchData } from "../actions/fetchData";

const GamesList = ({ name }) => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const data = await fetchData();
                setGames(data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchDataFromAPI();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!games || games.length === 0) {
        return <div>No games available.</div>;
    }

    return (
        <div className="games-list">
            {games.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};

export default GamesList;