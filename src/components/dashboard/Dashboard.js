import React from 'react';
import GamesList from '../games/GamesList'

const Dashboard = () => {
  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          {/* Przekazujemy komponent GamesList jako dziecko */}
          <GamesList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
