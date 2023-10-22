import React from 'react';
import { auth, firestore } from '../config/firebaseConfig';

const GamesList = ({ games }) => {
    const user = auth.currentUser;

    const handleAssignGame = async (gameId) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = firestore.collection('users').doc(user.uid);
                const userDoc = await userRef.get();
                const userData = userDoc.data();
    
                if (userData.games && userData.games.includes(gameId)) {
                    console.log('Ta gra już jest w Twojej bibliotece.');
                } else {
                    const updatedGames = userData.games ? [...userData.games, gameId] : [gameId];
                    await userRef.update({
                        games: updatedGames,
                    });
                    console.log('Gra została dodana do Twojej biblioteki.');
                }
            } else {
                console.error('Użytkownik nie jest zalogowany.');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania gry do biblioteki:', error);
        }
    };
    

return (
    <div className="games-list">
        <h2 className="center-align">Games List</h2>
        <ul className="collection">
            {games.map(game => (
                <li key={game.id} className="collection-item">
                    <div className="row valign-wrapper">
                        <div className="col s10">
                            <h6><strong>{game.title}</strong></h6>
                            <br />
                            { game.content }
                        </div>
                        <div className="col s2">
                            {user && (
                                <button className='btn pink darken-2 waves-effect waves-light right' onClick={() => handleAssignGame(game.id)}>Dodaj grę</button>
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
};

export default GamesList;
