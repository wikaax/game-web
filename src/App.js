import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from '../src/components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import UserProfile from './components/users/UserProfile';
import MyList from './components/dashboard/MyList';
import { UserProvider } from './components/users/UserContext';
import axios from 'axios';

function App() {
  const [igdbData, setIgdbData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/igdb/games');
        setIgdbData(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych z IGDB API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard igdbData={igdbData} />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/mylist' element={<MyList igdbData={igdbData} />} />
            <Route path='/profile' element={<UserProfile />} />
            {/* <Route path="/game-details/:id" element={<GameDetails />} /> */}
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
