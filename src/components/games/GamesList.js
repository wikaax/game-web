import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/getData";

const GamesList = ({ games, name }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (!data) {
        return <div>Loading...</div>;
    }

    if (data.length === 0) {
        return <div>No games available.</div>;
    }
    return (
        // <div className="games-list section">
        //     <h2>{ name }</h2>
        //     {games.map((game) => (
        //         <div className="game-preview" key={game.id}>
        //             <Link to={`/games/${game.id}`}>
        //                 <h2>{ game.name }</h2>
        //                 <p>Author: { game.author }</p>
        //             </Link>
        //         </div>
        //     ))}
        // </div>
        <div className="games-list">
            {data.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
      </div>
    );
}
 
export default GamesList;