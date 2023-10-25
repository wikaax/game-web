import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from '../src/components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateGame from './components/games/CreateGame';
import UserProfile from './components/users/UserProfile';
import MyList from './components/dashboard/MyList';
import { UserProvider } from './components/users/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/create' element={<CreateGame />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/mylist' element={<MyList />} />
            <Route path='/profile' element={<UserProfile />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>

  );
}

export default App;
