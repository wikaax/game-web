import { Link } from "react-router-dom"

const GamesList = ({ games, name}) => {
    return (
        <div className="games-list section">
            <h2>{ name }</h2>
            {games.map((game) => (
                <div className="game-preview" key={game.id}>
                    <Link to={`/games/${game.id}`}>
                        <h2>{ game.name }</h2>
                        <p>Author: { game.author }</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default GamesList;