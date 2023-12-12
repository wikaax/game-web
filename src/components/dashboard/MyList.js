import React, { useState, useEffect } from 'react';
import fetchDataFromFirestore from '../actions/fetchDataFromFirestore';
import { useSelector } from 'react-redux';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import M from 'materialize-css';

const MyList = ({ igdbData }) => {
  const [userGames, setUserGames] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedReviews, setSelectedReviews] = useState({});
  const user = useSelector((state) => state.auth.currentUser);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Rozpoczęto pobieranie danych użytkownika...');
      try {
        const allUsersData = await fetchDataFromFirestore('users');
        console.log('Pobrano dane użytkowników:', allUsersData);

        const currentUserData = allUsersData.find(
          (userData) => userData.email === user.email
        );

        if (currentUserData) {
          setUserGames(currentUserData.games || []);
          setUserWishlist(currentUserData.wishlist || []);
          setRatings(currentUserData.ratings || {});
          setReviews(currentUserData.reviews || {});
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

  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'));
  }, [loading]);

  const handleRemoveGame = async (gameId, listType) => {
    try {
      const userId = user.uid;
      const userDocRef = doc(firestore, 'users', userId);

      const updatedList =
        listType === 'games'
          ? userGames.filter((id) => id !== gameId)
          : userWishlist.filter((id) => id !== gameId);

      await updateDoc(userDocRef, {
        [listType]: updatedList,
      });

      console.log('Usunięto grę z listy:', gameId);

      if (listType === 'games') {
        setUserGames(updatedList);
      } else if (listType === 'wishlist') {
        setUserWishlist(updatedList);
      }
    } catch (error) {
      console.error('Błąd podczas usuwania gry z listy:', error);
    }
  };

  const handleRateGame = async (gameId) => {
    try {
      if (userGames.includes(gameId)) {
        const userId = user.uid;
        const userDocRef = doc(firestore, 'users', userId);

        await updateDoc(userDocRef, {
          ratings: {
            ...ratings,
            [gameId]: selectedRating,
          },
        });

        setRatings((prevRatings) => ({
          ...prevRatings,
          [gameId]: selectedRating,
        }));

        console.log('Ocena gry została zaktualizowana:', ratings);
      }
    } catch (error) {
      console.error('Błąd podczas oceniania gry:', error);
    }
  };

  const handleReviewGame = async (gameId) => {
    try {
      if (userGames.includes(gameId)) {
        const userId = user.uid;
        const userDocRef = doc(firestore, 'users', userId);

        const updatedReviews = {
          ...reviews,
          [gameId]: selectedReviews[gameId],
        };

        await updateDoc(userDocRef, {
          reviews: updatedReviews,
        });

        setReviews(updatedReviews);

        console.log('Recenzja gry została zaktualizowana:', updatedReviews);
      }
    } catch (error) {
      console.error('Błąd podczas dodawania recenzji do gry:', error);
    }
  };

  if (loading) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  function renderGameList(gameList, listType) {
    return (
      <>
        {gameList.length > 0 ? (
          <div>
            {gameList.map((gameId) => {
              const game = igdbData.find((game) => game.id === gameId);
  
              return (
                <div key={gameId} className="card">
                  <div className="card-content">
                    {game ? (
                      <>
                        <span className="card-title">{game.name}</span>
                        <p>
                          <strong>ID: </strong>{game.id}
                          <br />
                          {listType === 'games' && (
                            <>
                              <strong>Ocena użytkownika: </strong>
                              <span>
                                {ratings[gameId] !== undefined
                                  ? ratings[gameId]
                                  : 'Brak oceny'}
                              </span>
                              <select
                                value={selectedRating}
                                onChange={(e) =>
                                  setSelectedRating(Number(e.target.value))
                                }
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                  <option key={value} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                              <br />
                              <strong>Recenzja użytkownika: </strong>
                              <span>
                                {reviews[gameId] !== undefined
                                  ? reviews[gameId]
                                  : 'Brak recenzji'}
                              </span>
                              <textarea
                                className="materialize-textarea"
                                value={selectedReviews[gameId] || ''}
                                onChange={(e) => {
                                  const updatedReviews = {
                                    ...selectedReviews,
                                    [gameId]: e.target.value.substring(0, 300),
                                  };
                                  setSelectedReviews(updatedReviews);
                                }}
                                maxLength={300}
                                rows="4"
                                cols="50"
                                placeholder="Dodaj recenzję (maks. 300 znaków)"
                              ></textarea>
                              <div className="button-container">
                                <button className="btn indigo lighten-1" onClick={() => handleRateGame(gameId)}>
                                  Zatwierdź ocenę
                                </button>
                                <span>&nbsp;</span>
                                <button className='btn indigo lighten-1' onClick={() => handleReviewGame(gameId)}>
                                  Dodaj recenzję
                                </button>
                                <span>&nbsp;</span>
                                <button className='btn indigo lighten-1' onClick={() => handleRemoveGame(gameId, listType)}>
                                  Usuń grę
                                </button>
                              </div>
                              <hr />
                            </>
                          )}
                          {listType === 'wishlist' && (
                            <div className="button-container">
                              <button className='btn indigo lighten-1' onClick={() => handleRemoveGame(gameId, listType)}>
                                Usuń grę
                              </button>
                            </div>
                          )}
                        </p>
                      </>
                    ) : (
                      <p>Brak danych dla gry o ID {gameId}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
          {renderGameList(userGames, 'games')}
        </div>
        <div className="col s12 m6">
          <h4>Lista życzeń</h4>
          {renderGameList(userWishlist, 'wishlist')}
        </div>
      </div>
    </div>
  );
};

export default MyList;
