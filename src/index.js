import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';
import PlayerCard from './components/PlayerCard';
import Login from './components/Login';

const App = () => {

  const [singlePlayer, setSinglePlayer] = useState("")
  const [token, setToken] = useState(window.localStorage.getItem("token"||""));
  console.log('token at index', token)

  return (
    <div>
      <BrowserRouter>
      <nav >
          <h1><Link to="/">Welcome to Baseball</Link></h1>
          <Navigation />
          <Search setSinglePlayer={setSinglePlayer}/>
        </nav>

        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/players/:switcher" element={<PlayerCard singlePlayer={singlePlayer} token={token}/>} />

            <Route path="/auth" element={<Login token={token}/>} />

          </Routes>
        </main>

        <footer>

        </footer>
      </BrowserRouter>
    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);