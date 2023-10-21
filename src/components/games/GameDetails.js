import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(id);
    const fetchGameDetails = async () => {
      try {
        const gameDocRef = doc(firestore, 'games', id);
        const gameDoc = await getDoc(gameDocRef);
        if (gameDoc.exists()) {
          setGame(gameDoc.data());
        } else {
          console.log('Game not found');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found.</div>;
  }

  return (
    <div className="game-details">
      <h2>{game.title}</h2>
      <p>{game.content}</p>
    </div>
  );
};

export default GameDetails;
