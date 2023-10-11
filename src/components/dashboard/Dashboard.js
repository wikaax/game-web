import GamesList from "../games/GamesList";
import useFetch from "../actions/useFetch";
import Notifications from "./Notifications";

const Dashboard = () => {
    const { data: games, isPending, error } = useFetch('http://localhost:8000/games');

    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m6">
                    { error && <div>{ error }</div> }
                    { isPending && <div>Loading...</div> }
                    {games && <GamesList games={games} title="All games"/>}
                </div>
                <div className="col s12 m5 offset-m1">
                    <Notifications />
                </div>
            </div>
            
        </div>
    );
}
 
export default Dashboard;