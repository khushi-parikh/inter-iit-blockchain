import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import './App.css';

import PageNotFound from './Components/pages/PageNotFound';
import Home from './Components/pages/Home';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/pages/Profile';
import Login from './Components/pages/Login';
import Fixedcomp from './Components/fixed/Fixedcomp';
import SongPage from './Components/Music/SongPage';
import PlayList from './Components/Music/PlayList';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Fixedcomp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songpage" element={<SongPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Playlist" element={<PlayList PlaylistName={''} NumOfSongs={0} />} />


        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
