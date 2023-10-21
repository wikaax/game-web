import React from 'react';
import { auth, firestore } from '../config/firebaseConfig';

const GamesList = ({ games }) => {

    const handleAssignGame = async (gameId) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = firestore.collection('users').doc(user.uid);
                await userRef.update({
                    games: firestore.FieldValue.arrayUnion(gameId),
                });
                console.log('Gra została dodana do Twojej biblioteki.');
            } else {
                console.error('Użytkownik nie jest zalogowany.');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania gry do biblioteki:', error);
        }
    };

    return (
        <div className="games-list">
            <h2>Games List</h2>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        <strong>{game.title}</strong> - {game.companyName}
                        <button onClick={() => handleAssignGame(game.id)}>Dodaj grę</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GamesList;
