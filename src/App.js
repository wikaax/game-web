import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateGame from './components/games/CreateGame';
import Home from './components/Home';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement, incrementByAmount } from './authSlice';
// import { selectAuthValue } from './selectors';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<CreateGame />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
