import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const gamesCollection = collection(firestore, 'games');
        const querySnapshot = await getDocs(gamesCollection);
        const gamesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGames(gamesData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchDataFromFirebase();
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
      <h2>Games List</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <strong>{game.title}</strong> - {game.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesList;
