import React, { useState, useMemo, useEffect } from 'react';
import GamesList from '../games/GamesList'
import SearchBar from './SearchBar';
import Fuse from 'fuse.js';
import fetchDataFromFirestore from '../actions/fetchDataFromFirestore';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gamesData = await fetchDataFromFirestore('games');
                setGames(gamesData);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchGames();
    }, [searchTerm]);

    const fuse = useMemo(() => {
        const options = {
            keys: ['title'],
            includeScore: true,
            threshold: 0.3,
        };
        return new Fuse(games, options);
    }, [games]);

    const filteredGames = useMemo(() => {
        if (!searchTerm.trim()) {
            return games;
        }

        const results = fuse.search(searchTerm);
        return results.map(result => result.item);
    }, [games, searchTerm, fuse]);

    return (
        <div className="dashboard container">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="row">
                <div className="col s12 m6">
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error: {error.message}</div>}  
                    <GamesList games={filteredGames} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;