import React, { useState, useEffect } from 'react';
import fetchDataFromFirestore from '../actions/fetchDataFromFirestore';
import { useSelector } from 'react-redux';
import { getFirestore, doc, updateDoc, arrayRemove } from 'firebase/firestore';

const MyList = ({ igdbData }) => {
  const [userGames, setUserGames] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const user = useSelector(state => state.auth.currentUser);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Rozpoczęto pobieranie danych użytkownika...');
      try {
        const allUsersData = await fetchDataFromFirestore('users');
        console.log('Pobrano dane użytkowników:', allUsersData);

        const currentUserData = allUsersData.find(userData => userData.email === user.email);

        if (currentUserData) {
          setUserGames(currentUserData.games || []);
          setUserWishlist(currentUserData.wishlist || []);
        } else {
          console.log('Nie znaleziono danych dla bieżącego użytkownika.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRemoveGame = async (gameId) => {
    try {
      const userId = user.uid;
      const userDocRef = doc(firestore, 'users', userId);

      await updateDoc(userDocRef, {
        games: arrayRemove(gameId),
      });

      console.log('Usunięto grę z listy:', gameId);

      // Aktualizuj lokalny stan po usunięciu gry
      setUserGames(prevGames => prevGames.filter(id => id !== gameId));
    } catch (error) {
      console.error('Błąd podczas usuwania gry z listy:', error);
    }
  };

  const handleRateGame = async (gameId, rating) => {
    try {
      const userId = user.uid;
      const userDocRef = doc(firestore, 'users', userId);
      console.log('Próbuję ocenić grę:', gameId, 'Ocena:', rating);
  
      await updateDoc(userDocRef, {
        ratings: {
          ...ratings,
          [gameId]: Number(rating),
        },
      });
  
      setRatings(prevRatings => {
        const newRatings = {
          ...prevRatings,
          [gameId]: Number(rating),
        };
        console.log('Ocena gry została zaktualizowana:', newRatings);
        return newRatings;
      });
      console.log('Ocena gry została zaktualizowana:', ratings);
    } catch (error) {
      console.error('Błąd podczas oceniania gry:', error);
    }
  };

  if (loading) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  function renderGameList(gameList) {
    return (
      <>
        {gameList.length > 0 ? (
          <ul>
            {gameList.map(gameId => {
              const game = igdbData.find(game => game.id === gameId);
              const userRating = ratings[gameId] !== undefined ? ratings[gameId] : 0;
  
              return (
                <li key={gameId}>
                  {game ? (
                    <div>
                      <strong>Nazwa gry: </strong>{game.name}<br />
                      <strong>ID </strong>{game.id}<br />
                      <strong>Ocena użytkownika: </strong>
  
                      <button onClick={() => handleRemoveGame(gameId)}>Usuń z listy</button>
  
                      <hr />
                    </div>
                  ) : (
                    <p>Brak danych dla gry o ID {gameId}</p>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Twoja lista jest pusta.</p>
        )}
      </>
    );
  }

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <h4>Moja biblioteka</h4>
          {renderGameList(userGames)}
        </div>
        <div className="col s12 m6">
          <h4>Lista życzeń</h4>
          {renderGameList(userWishlist)}
        </div>
      </div>
    </div>
  );

};

export default MyList;
